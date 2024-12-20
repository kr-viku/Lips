export interface Pixel {
  r: number;
  g: number;
  b: number;
}

export interface HSL {
  h: number;
  s: number;
  l: number;
}

export interface ColorCluster {
  color: Pixel;
  count: number;
}

export interface ColorRange {
  hue: [number, number];
  saturation: [number, number];
  lightness: [number, number];
}