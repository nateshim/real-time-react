import { getLine } from './getLine';
export const getLineWithColor = (x0, y0, x1, y1, color) => getLine(x0, y0, x1, y1, (x, y) => ({ x, y, color }));
