import { Pixel, HSL } from './types';

export function colorDistance(color1: Pixel, color2: Pixel): number {
  // Using CIE76 color difference formula for better accuracy
  const rMean = (color1.r + color2.r) / 2;
  const deltaR = color1.r - color2.r;
  const deltaG = color1.g - color2.g;
  const deltaB = color1.b - color2.b;
  
  return Math.sqrt(
    (2 + rMean/256) * deltaR * deltaR +
    4 * deltaG * deltaG +
    (2 + (255-rMean)/256) * deltaB * deltaB
  );
}

// ... (rest of the existing colorUtils.ts code remains the same)