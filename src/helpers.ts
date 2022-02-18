export async function getImgSrcArrayFromInput(searchInput: string): Promise<string[]> {
  const encodedInput = encodeURIComponent(searchInput).replace(/%20/g, "+");
  let response = await fetch(
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

  return sources;
}
