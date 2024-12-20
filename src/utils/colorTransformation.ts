import { createCanvasContext, loadImageToCanvas } from './canvas';
import { hexToHSL, rgbToHSL, hslToRGB } from './colorUtils';
import { ColorRange } from './types';

export async function transformLipColor(
  imageData: string,
  targetColor: string
): Promise<string> {
  const image = await loadImageToCanvas(imageData);
  const { canvas, ctx } = createCanvasContext(image.width, image.height);
  
  ctx.drawImage(image, 0, 0);
  const imageDataObj = ctx.getImageData(0, 0, canvas.width, canvas.height);
  
  const targetHSL = hexToHSL(targetColor);
  const lipColorRange: ColorRange = {
    hue: [340, 360],
    saturation: [0.3, 1],
    lightness: [0.2, 0.8]
  };
  
  // Transform colors within the lip range
  for (let i = 0; i < imageDataObj.data.length; i += 4) {
    const r = imageDataObj.data[i];
    const g = imageDataObj.data[i + 1];
    const b = imageDataObj.data[i + 2];
    
    const hsl = rgbToHSL(r, g, b);
    
    if (isInColorRange(hsl, lipColorRange)) {
      const blendedColor = blendColors(hsl, targetHSL);
      const rgb = hslToRGB(blendedColor.h, blendedColor.s, blendedColor.l);
      
      imageDataObj.data[i] = rgb.r;
      imageDataObj.data[i + 1] = rgb.g;
      imageDataObj.data[i + 2] = rgb.b;
    }
  }
  
  ctx.putImageData(imageDataObj, 0, 0);
  return canvas.toDataURL();
}