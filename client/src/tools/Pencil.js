import { getLineWithColor } from '../utils';
export default class Pencil {
    constructor(color) {
        this.color = color;
        this.dragging = false;
    }
    handlePointerUp() {
        this.dragging = false;
    }
    handlePointerDown(position, editor) {
        this.dragging = true;
        this.prevPosition = position;
        editor.set([{ x: position.x, y: position.y, color: this.color }]);
    }
    handlePointerMove(position, editor) {
        if (this.dragging) {
            const line = getLineWithColor(this.prevPosition.x, this.prevPosition.y, position.x, position.y, this.color);
            this.prevPosition = position;
            editor.set(line);
            editor.history.squash();
        }
    }
}
