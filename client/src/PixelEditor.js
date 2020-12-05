import React, {useState, useEffect, useRef} from 'react';
import Canvas from './Canvas';
import Pencil from './tools/Pencil';
import Pusher from 'pusher-js';
import pushid from 'pushid';
import axios from 'axios';
import {withStyles, createStyles} from '@material-ui/styles';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import pencilCursor from './static/pencil_cursor.png'; 
import eraserCursor from './static/eraser_cursor.png';
import Line from './tools/Line';
import Rectangle from './tools/Rectangle';
import KeyboardEventHandler from 'react-keyboard-event-handler';

const PixelEditor = (props) => { 
  const classes = props.classes;
  const [id, setId] = useState('');
  const [currCursor, setCurrCursor] = useState(pencilCursor);
  const [color, setColor] = useState('#000000');
  const [editor, setEditor] = useState(null);
  const editorRef = useRef(null);
  const pusher = new Pusher("8367995d3f0fa627b261", {
    cluster: "us3",
    forceTLS: true
  });
  const channel = pusher.subscribe("editor");
  
  useEffect(() => {
    if (editorRef.current) {
      setEditor(new Canvas(editorRef.current, 64, 64, new Pencil('#000000')));
    }
    setId(pushid);
  }, []);
    
  const syncUpdates = () => {
    channel.bind("code-update", data => {
      if (data.id === id) return;
      editor.clear();
      editor.set(data.pixels);
    });
    const data = { 
      id: id,
      pixels: editor.pixels,
    };
    axios
    .post("/update-editor", data)
    .catch(err => {
      console.log(err);
    });
  };

  return (
    <Box className={classes.backgroundContainer}>
      {/*KEYBOARD EVENT HANDLERS*/}
      <KeyboardEventHandler
      handleKeys={['l']}
      onKeyEvent={() => {
        editor.tool = new Line(color);
        setCurrCursor(pencilCursor);
      }} />
      <KeyboardEventHandler
      handleKeys={['r']}
      onKeyEvent={() => {
        editor.tool = new Rectangle(color);
        setCurrCursor(pencilCursor);
      }} />
      <KeyboardEventHandler
      handleKeys={['p']}
      onKeyEvent={() => {
        editor.tool = new Pencil(color);
        setCurrCursor(pencilCursor);
        }
      }/>
      <KeyboardEventHandler
      handleKeys={['e']}
      onKeyEvent={() => {
        if (editor) {
          editor.tool = new Pencil();
          setCurrCursor(eraserCursor);
        }
        }} />
      <KeyboardEventHandler
      handleKeys={['meta+z']}
      onKeyEvent={() => {if (editor) editor.undo()}} />
      <KeyboardEventHandler
      handleKeys={['meta+shift+z']}
      onKeyEvent={() => {if (editor) editor.redo()}} />
      {/*TOOLBOX*/}
       <Grid className={classes.toolBox}>
            <Grid item>
                <Button 
                  onClick={() => { if (editor) {
                    editor.tool = new Pencil();
                    setCurrCursor(eraserCursor);
                  } 
                }}>Eraser</Button>
            </Grid>
            <Grid item>
                <Button 
                  onClick={() => { if (editor) {
                    editor.tool = new Pencil(color);
                    setCurrCursor(pencilCursor);
                  }
                }}>Pencil</Button>
            </Grid>
            <Grid item>
                <Button 
                  onClick={() => { if (editor) {
                    editor.tool = new Line(color);
                    setCurrCursor(pencilCursor);
                  }
                }}>Line</Button>
            </Grid>
            <Grid item>
                <Button 
                  onClick={() => { if (editor) {
                    editor.tool = new Rectangle(color);
                    setCurrCursor(pencilCursor);
                  }
                }}>Rectangle</Button>
            </Grid>
      </Grid>
      {/*CANVAS*/}
      <Container className={classes.canvasBox}>
        <canvas style={{cursor: `url(${currCursor}) 10 10, auto`}} className={classes.canvas} onClick={() => {
          syncUpdates();
          }} ref={editorRef} />
      </Container>
    </Box>
    );
}

const useStyles = (theme) => createStyles({
  backgroundContainer: {
    display: 'flex',
    backgroundSize: 'cover',
    background: theme.palette.primary.main,
    overflowX: 'hidden',
  },
  toolBox: {
    display: 'block',
    padding: '1rem',
  }, 
  canvasBox: {
    justifyContent: 'center',
  },
  canvas: {
    outline: 'black 3px solid',
    marginTop: '1rem',
    display: 'flex'
  },
});
 
export default withStyles(useStyles)(PixelEditor);