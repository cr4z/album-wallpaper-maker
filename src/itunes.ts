export async function getImgSrcArrayFromInput(searchInput: string): Promise<string[]> {
  const encodedInput = encodeURIComponent(searchInput).replace(/%20/g, "+");
  console.log(encodedInput);

  let response = null;

  try {
    response = await fetch(
      `https://itunes.apple.com/search?term=${encodedInput}&entity=album&media=music`,
      {
        method: "GET",
        mode: "no-cors",
      }
    );
  } catch (e) {
    console.log(e);
    return [];
  }

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
