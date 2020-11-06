export default class Rectangle {
    constructor(color) {
        this.color = color;
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
            const xStart = Math.min(position.x, this.startPosition.x);
            const yStart = Math.min(position.y, this.startPosition.y);
            const xEnd = Math.max(position.x, this.startPosition.x);
            const yEnd = Math.max(position.y, this.startPosition.y);
            const pixels = [];
            for (let y = yStart; y <= yEnd; y += 1) {
                for (let x = xStart; x <= xEnd; x += 1) {
                    if (x === xStart || x === xEnd || y === yStart || y === yEnd) {
                        pixels.push({ x, y, color: this.color });
                    }
                }
            }
            editor.undo();
            editor.set(pixels);
        }
    }
}
