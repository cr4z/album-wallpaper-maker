// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type CanvasElem = HTMLCanvasElement;

export default async function handler(req: NextApiRequest, res: NextApiResponse<CanvasElem>) {
  const { cols, rows, srcs } = req.body;

  let images: HTMLImageElement[] = srcs.map((src: string) => {
    const img = new Image();
    img.src = src;
    return img;
  });
  images = stripImages(images);
  images = await waitForImagesToLoad(images);
  const extents = Math.max(cols, rows);
  const imgSize = 3000 / extents;
  const canvas = document.createElement("canvas");
  canvas.width = imgSize * cols;
  canvas.height = imgSize * rows;
  const ctx = canvas.getContext("2d");

  if (ctx) {
    let i: number = -1;
    for (let rowI = 0; rowI < rows; rowI++) {
      for (let colI = 0; colI < cols; colI++) {
        i++;
        const x = colI * imgSize;
        const y = rowI * imgSize;
        ctx.drawImage(images[i], x, y, imgSize, imgSize);
      }
    }
  } else throw new Error("No context produced!");

  return res.status(200).json(canvas);
}

async function waitForImagesToLoad(images: HTMLImageElement[]): Promise<HTMLImageElement[]> {
  const promises: Promise<any>[] = [];
  images.map(async (image: HTMLImageElement) => {
    promises.push(
      new Promise<void>(resolve => {
        if (image.complete) {
          if (!(image.naturalWidth === 0)) {
            if (!(image.naturalHeight === 0)) {
              //image completely loaded
              resolve();
            }
          }
        } else {
          image.onload = () => {
            resolve();
          };
        }
      })
    );
  });

  await Promise.allSettled(promises);

  return images;
}

function stripImages(images: HTMLImageElement[]): HTMLImageElement[] {
  images.map(image => {
    image.crossOrigin = "anonymous";
    return image;
  });
  return images;
}
