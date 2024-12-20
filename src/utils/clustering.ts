import { Pixel, ColorCluster } from './types';
import { colorDistance } from './colorUtils';

export function kMeansClustering(pixels: Pixel[], k: number, maxIterations: number): ColorCluster[] {
  // Initialize centroids randomly
  let centroids = pixels
    .sort(() => 0.5 - Math.random())
    .slice(0, k);
  
  let clusters: ColorCluster[] = [];
  let iterations = 0;
  
  while (iterations < maxIterations) {
    // Reset clusters
    clusters = centroids.map(centroid => ({
      color: centroid,
      count: 0
    }));
    
    // Assign pixels to nearest centroid
    pixels.forEach(pixel => {
      const nearestCentroidIndex = findNearestCentroidIndex(pixel, centroids);
      const cluster = clusters[nearestCentroidIndex];
      cluster.color.r = (cluster.color.r * cluster.count + pixel.r) / (cluster.count + 1);
      cluster.color.g = (cluster.color.g * cluster.count + pixel.g) / (cluster.count + 1);
      cluster.color.b = (cluster.color.b * cluster.count + pixel.b) / (cluster.count + 1);
      cluster.count++;
    });
    
    // Update centroids
    const newCentroids = clusters.map(cluster => cluster.color);
    
    // Check for convergence
    if (centroidsEqual(centroids, newCentroids)) {
      break;
    }
    
    centroids = newCentroids;
    iterations++;
  }
  
  return clusters;
}

function findNearestCentroidIndex(pixel: Pixel, centroids: Pixel[]): number {
  let minDistance = Infinity;
  let nearestIndex = 0;
  
  centroids.forEach((centroid, index) => {
    const distance = colorDistance(pixel, centroid);
    if (distance < minDistance) {
      minDistance = distance;
      nearestIndex = index;
    }
  });
  
  return nearestIndex;
}

function centroidsEqual(centroids1: Pixel[], centroids2: Pixel[]): boolean {
  return centroids1.every((centroid, index) => 
    colorDistance(centroid, centroids2[index]) < 1
  );
}

export function findLipColorCluster(clusters: ColorCluster[]): ColorCluster {
  return clusters.reduce((mostLikely, cluster) => {
    const { r, g, b } = cluster.color;
    // Lip colors typically have higher red values relative to green and blue
    const lipColorLikelihood = (r - g) + (r - b);
    const currentLikelihood = (mostLikely.color.r - mostLikely.color.g) + 
                            (mostLikely.color.r - mostLikely.color.b);
    
    return lipColorLikelihood > currentLikelihood ? cluster : mostLikely;
  }, clusters[0]);
}