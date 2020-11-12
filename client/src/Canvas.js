import History from './History';
import PixelCollection from './PixelCollection';
export default class Canvas {
    constructor(_canvas, width, height, tool, history = new History()) {
        this._canvas = _canvas;
        this.width = width;
        this.height = height;
        this.tool = tool;
        this.history = history;
        this._previousPosition = { x: -1, y: -1 };
        this._pixels = new PixelCollection(this.width);
        this._canvas.width = this.width;
        this._canvas.height = this.height;
        this._canvas.style.width = '100%';
        this._canvas.style.imageRendering = 'pixelated';
        this._canvas.addEventListener('mouseup', this.mouseup.bind(this));
        this._canvas.addEventListener('mousedown', this.mousedown.bind(this));
        this._canvas.addEventListener('mousemove', this.mousemove.bind(this));
        this._canvas.addEventListener('touchstart', this.touchstart.bind(this));
        this._canvas.addEventListener('touchmove', this.touchmove.bind(this));
        const context = this._canvas.getContext('2d');
        if (!context) {
            throw new Error('Unable to get get context from canvas');
        }
        this._context = context;
    }
    mouseup(e) {
        const position = this.mousePosition(e);
        this.tool.handlePointerUp(position, this);
    }
    mousedown(e) {
        const position = this.mousePosition(e);
        this.tool.handlePointerDown(position, this);
        this._previousPosition = { ...position };
    }
    mousemove(e) {
        const position = this.mousePosition(e);
        if (position.x !== this._previousPosition.x || position.y !== this._previousPosition.y) {
            this._previousPosition = { ...position };
            this.tool.handlePointerMove(position, this);
        }
    }
    touchstart(e) {
        const position = this.touchPosition(e);
        this.tool.handlePointerDown(position, this);
        this._previousPosition = { ...position };
    }
    touchmove(e) {
        const position = this.touchPosition(e);
        if (position.x !== this._previousPosition.x || position.y !== this._previousPosition.y) {
            this._previousPosition = { ...position };
            this.tool.handlePointerMove(position, this);
        }
    }
    touchPosition(event) {
        event.preventDefault();
        const [touch] = event.touches;
        const rect = this._canvas.getBoundingClientRect();
        const x = ((Math.round(touch.clientX - rect.left) * this._canvas.width) / this._canvas.clientWidth) | 0; // tslint:disable-line
        const y = ((Math.round(touch.clientY - rect.top) * this._canvas.height) / this._canvas.clientHeight) | 0; // tslint:disable-line
        return { x, y };
    }
    mousePosition(event) {
        const x = ((event.offsetX * this._canvas.width) / this._canvas.clientWidth) | 0; // tslint:disable-line
        const y = ((event.offsetY * this._canvas.height) / this._canvas.clientHeight) | 0; // tslint:disable-line
        return { x, y };
    }
    get(x, y) {
        const color = this._pixels.get(x, y);
        return { x, y, color };
    }
    set(pixels, logToHistory = true) {
        const prev = [];
        for (const { x, y, color } of pixels) {
            if (color) {
                this._context.fillStyle = color;
                this._context.fillRect(x, y, 1, 1);
            }
            else {
                this._context.clearRect(x, y, 1, 1);
            }
            prev.push(({ x, y, color: this._pixels.get(x, y) }));
            this._pixels.set({ x, y, color });
        }
        if (logToHistory) {
            this.history.push({ next: pixels, prev });
        }
    }
    get pixels() {
        const pixels = [];
        for (const { x, y } of this._pixels) {
            pixels.push(this.get(x, y));
        }
        return pixels;
    }
    clear() {
        this._context.clearRect(0, 0, this.width, this.height);
        this.history.push({ next: [], prev: this.pixels });
        this._pixels = new PixelCollection(this.width);
    }
    undo() {
        const pixels = this.history.prev();
        if (pixels) {
            this.set(pixels, false);
        }
    }
    redo() {
        const pixels = this.history.next();
        if (pixels) {
            this.set(pixels, false);
        }
    }
}
