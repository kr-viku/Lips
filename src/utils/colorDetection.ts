import { createCanvasContext, loadImageToCanvas } from './canvas';
import { Pixel } from './types';
import { rgbToHex } from './colorUtils';
import { kMeansClustering, findLipColorCluster } from './clustering';

export async function detectDominantLipColor(
  imageData: string
): Promise<string> {
  const image = await loadImageToCanvas(imageData);
  const { canvas, ctx } = createCanvasContext(image.width, image.height);

  ctx.drawImage(image, 0, 0);

  // Focus on the center lower third of the image where lips are likely to be
  const lipRegionY = Math.floor(image.height * 0.6);
  const lipRegionHeight = Math.floor(image.height * 0.25);
  const imageDatas = ctx.getImageData(
    0,
    lipRegionY,
    image.width,
    lipRegionHeight
  );
  console.log(imageDatas);

  const pixels: Pixel[] = [];
  for (let i = 0; i < imageDatas.data.length; i += 4) {
    pixels.push({
      r: imageDatas.data[i],
      g: imageDatas.data[i + 1],
      b: imageDatas.data[i + 2],
    });
  }

  const dominantColors = kMeansClustering(pixels, 5, 10);
  const lipColor = findLipColorCluster(dominantColors);

  return rgbToHex(lipColor.color);
}
