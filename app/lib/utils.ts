import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

const comparedPointMax = 1000;

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export type Point = {
  x: number;
  y: number;
}

function euclidDist(point1: Point, point2: Point, offset: Point ): number {
  return Math.sqrt(
    Math.pow(point1.x - point2.x - offset.x, 2)
    + Math.pow(point1.y - point2.y - offset.y, 2)
  );
}

export function limitPathSize(path: Point[]) : Point[] { // todo: remove export (test only)
  if( path.length < comparedPointMax ){
    return  path;
  }
  
  const step = path.length / comparedPointMax;
  let curStep = 0;

  return path.filter((pt,i) => {
    if(curStep > i) return false;
    
    curStep += step;
    return true;
  })
}

/**
 * 
 * finds the average least euclidean distance points on the first path to the second 
 * comparedPointCount is the maximum number of points compared
 * 
 * @param path1 first path to compare
 * @param path2 second path to compare
 */
export function pathDist(refPath: Point[], path2: Point[], offset: Point) { 
  const fpath1 = limitPathSize(refPath);
  const fpath2 = limitPathSize(path2);

  let distSum = 0;
  for(const point of fpath1 ) { // loop each point
    let leastDist = euclidDist(point, fpath2[0], offset);

    for(const refpoint of fpath2) {
      const dist = euclidDist(point, refpoint, offset);
      if(dist < leastDist) leastDist = dist;
    }
    distSum += leastDist;
  }
  return distSum;
}

