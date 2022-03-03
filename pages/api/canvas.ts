import { createCanvas, Image, loadImage } from "canvas";

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse<string>) {
  const { cols, rows, srcs } = req.body;

  console.log({ cols, rows, srcs });

  const extents = Math.max(cols, rows);
  const imgSize = 3000 / extents;
  const width = imgSize * cols;
  const height = imgSize * rows;
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext("2d");

  console.log("1");

  if (ctx) {
    let i: number = -1;
    for (let rowI = 0; rowI < rows; rowI++) {
      for (let colI = 0; colI < cols; colI++) {
        i++;
        const x = colI * imgSize;
        const y = rowI * imgSize;
        const newImg = await loadImage(srcs[i]);
        ctx.drawImage(newImg, x, y, imgSize, imgSize);
      }
    }
  } else throw new Error("No context produced!");

  console.log("3");

  const x = canvas.toDataURL();

  return res.status(200).json(x);
}
