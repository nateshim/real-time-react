import React, { Component } from 'react';
import { Controlled as CodeMirror } from 'react-codemirror2';
import Pusher from 'pusher-js';
import pushid from 'pushid';
import axios from 'axios';
import './ReactEditor.css';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';

class ReactEditor extends Component {
  constructor() {
    super();
    this.state = {
      id: '',
      html: '',
      css: '',
      js: '',
    };
    this.iframe = React.createRef();
    this.pusher = new Pusher("8367995d3f0fa627b261", {
      cluster: "us3",
      forceTLS: true
    });

    this.channel = this.pusher.subscribe("editor");
  }

  componentDidUpdate() {
    this.runCode();
  }

  componentDidMount() {
    this.setState({
      id: pushid(),
    });

    this.channel.bind("code-update", data => {
      const { id } = this.state;
      if (data.id === id) return;

      this.setState({
        html: data.html,
        css: data.css,
        js: data.js,
      });
    });
  }

  syncUpdates = () => {
    const data = { ...this.state };

    axios
      .post("/update-editor", data)
      .catch(console.error);
  };

  runCode = () => {
    const { html, css, js } = this.state;
    const document = this.iframe.current?.contentDocument;
    const documentContents = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Document</title>
        <style>
          ${css}
        </style>
      </head>
      <body>
        ${html}

        <script type="text/javascript">
          ${js}
        </script>
      </body>
      </html>
    `;

    document.open();
    document.write(documentContents);
    document.close();
  };

  render() {
    const { html, js, css } = this.state;
    const codeMirrorOptions = {
      theme: 'material',
      lineNumbers: true,
      scrollbarStyle: null,
      lineWrapping: true,
    };

    return (
      <div className="App">
        <section className="playground">
          <div className="code-editor html-code">
            <div className="editor-header">HTML</div>
            <CodeMirror
              value={html}
              options={{
                mode: 'htmlmixed',
                ...codeMirrorOptions,
              }}
              onBeforeChange={(editor, data, html) => {
                this.setState({ html }, () => this.syncUpdates());
              }}
            />
          </div>
          <div className="code-editor css-code">
            <div className="editor-header">CSS</div>
            <CodeMirror
              value={css}
              options={{
                mode: 'css',
                ...codeMirrorOptions,
              }}
              onBeforeChange={(editor, data, css) => {
                this.setState({ css }, () => this.syncUpdates());
              }}
            />
          </div>
          <div className="code-editor js-code">
            <div className="editor-header">JavaScript</div>
            <CodeMirror
              value={js}
              options={{
                mode: 'javascript',
                ...codeMirrorOptions,
              }}
              onBeforeChange={(editor, data, js) => {
                this.setState({ js }, () => this.syncUpdates());
              }}
            />
          </div>
        </section>
        <section className="result">
          <iframe title="result" className="iframe" ref={this.iframe} />
        </section>
      </div>
    );
  }
}

export default ReactEditor;
