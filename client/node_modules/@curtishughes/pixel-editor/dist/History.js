export default class History {
    constructor(maxLength = 99, undoStack = [], redoStack = []) {
        this.maxLength = maxLength;
        this.undoStack = undoStack;
        this.redoStack = redoStack;
    }
    push(delta) {
        this.undoStack = [...this.undoStack.splice(-this.maxLength), delta];
        this.redoStack = [];
    }
    prev() {
        const delta = this.undoStack.pop();
        if (!delta) {
            return undefined;
        }
        const { next: prev, prev: next } = delta;
        this.redoStack.push({ next, prev });
        return next;
    }
    next() {
        const delta = this.redoStack.pop();
        if (!delta) {
            return undefined;
        }
        const { next: prev, prev: next } = delta;
        this.undoStack = [...this.undoStack.splice(-this.maxLength), { next, prev }];
        return next;
    }
    squash() {
        this.undoStack = [
            ...this.undoStack.slice(0, -2),
            this.undoStack.slice(-2).reduce((acc, delta) => ({
                prev: [...delta.prev, ...acc.prev],
                next: [...delta.next, ...acc.next],
            }), { prev: [], next: [] }),
        ];
    }
}
