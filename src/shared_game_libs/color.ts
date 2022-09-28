export type RGB = `rgb(${number}, ${number}, ${number})` | `rgb(${number},${number},${number})`;
export type RGBA = `rgba(${number}, ${number}, ${number}, ${number})` | `rgba(${number},${number},${number},${number})`;
export type HEX = `#${string}`;

type color = RGB | RGBA | HEX
export default color