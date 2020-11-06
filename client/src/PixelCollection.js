export default class PixelCollection {
    constructor(width) {
        this.width = width;
        this.pixels = {};
    }
    set({ x, y, color }) {
        const index = this.getIndex(x, y);
        if (color) {
            this.pixels[index] = color;
        }
        else {
            delete this.pixels[index];
        }
    }
    get(x, y) {
        const index = this.getIndex(x, y);
        return this.pixels[index];
    }
    getIndex(x, y) {
        return x + y * this.width;
    }
    getPixel(index) {
        const x = index % this.width;
        const y = Math.floor(index / this.width);
        return { x, y, color: this.pixels[index] };
    }
    *[Symbol.iterator]() {
        const keys = Object.keys(this.pixels);
        for (const index of keys) {
            yield this.getPixel(Number(index));
        }
    }
}
