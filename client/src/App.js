import React, { Component } from 'react';
import PixelEditor from './PixelEditor';
import PixelCollection from './PixelCollection';
import Pencil from './tools/Pencil';
import Pusher from 'pusher-js';
import pushid from 'pushid';
import axios from 'axios';
 
class App extends Component {
    constructor() {
        super();
        this.state = {
          id: '',
          editor : null,
        };
        this.editorRef = React.createRef();
        this.pusher = new Pusher("8367995d3f0fa627b261", {
          cluster: "us3",
          forceTLS: true
        });
        this.channel = this.pusher.subscribe("editor");
    }
    componentDidUpdate() {
      this.runCode();
    }
    runCode = () => {
      console.log(this.editorRef.current)
      const document = this.editorRef.current?.contentDocument;
    };
    componentDidMount() {
        if (this.editorRef.current) {
            this.setState({
                editor : new PixelEditor(this.editorRef.current, 64, 64, new Pencil('black')),
            }) 
        }
        this.setState({
          id: pushid(),
        });
    
        this.channel.bind("code-update", data => {
          console.log(this.state.editor.pixels);
          const { id } = this.state;
          if (data.id === id) return;
          this.state.editor.clear();
          this.state.editor.set(data.pixels);
        });
    }
    
    syncUpdates = () => {
      const data = { 
          id: this.state.id,
          pixels: this.state.editor.pixels,
      };
        axios
        .post("/update-editor", data)
        .catch(err => {
          console.log(err);
        });
    };

    render() {
        const { editor } = this.state;
        return (
            <>
            <canvas onClick={() => {
                this.syncUpdates();
              }} ref={this.editorRef} />
                <button onClick={() => { if (editor) editor.tool = new Pencil() }}>Eraser</button>
                <button onClick={() => { if (editor) editor.tool = new Pencil('black') }}>Pencil</button>
                <button onClick={() => { if (editor) editor.undo() }}>Undo</button>
                <button onClick={() => { if (editor) editor.redo() }}>Redo</button>
            </>
        );
    }
}
 
export default App;