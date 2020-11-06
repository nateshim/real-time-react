import { getLineWithColor } from '../utils';
export default class Line {
    constructor(color) {
        this.color = color;
        this.startPosition = { x: -1, y: -1 };
        this.dragging = false;
    }
    handlePointerUp() {
        this.dragging = false;
    }
    handlePointerDown(position, editor) {
        this.dragging = true;
        this.startPosition = position;
        editor.set([{ x: position.x, y: position.y, color: this.color }]);
    }
    handlePointerMove(position, editor) {
        if (this.dragging) {
            const line = getLineWithColor(this.startPosition.x, this.startPosition.y, position.x, position.y, this.color);
            editor.undo();
            editor.set(line);
        }
    }
}
