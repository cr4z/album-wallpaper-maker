// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type AlbumSrcs = string[];

export default async function handler(req: NextApiRequest, res: NextApiResponse<AlbumSrcs>) {
  const encodedSearch = req.query.search.toString();
  const search = decodeURIComponent(encodedSearch);
  const encodedInput = encodeURIComponent(search).replace(/%20/g, "+");

  const response = await fetch(
    `https://itunes.apple.com/search?term=${encodedInput}&entity=album&media=music`,
    {
      method: "GET",
    }
  );

  let json = await response.json();
  const results = json.results;

  const sources: string[] = [];
  results.forEach((result: any) => {
    let imgSrc: string = result.artworkUrl100;
    const x = imgSrc.replace("100x100", "300x300");
    sources.push(x);
  });

  return res.status(200).json(sources);
}
