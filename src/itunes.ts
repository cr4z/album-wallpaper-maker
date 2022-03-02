export async function getImgSrcArrayFromInput(searchInput: string): Promise<string[]> {
  const encodedInput = encodeURIComponent(searchInput).replace(/%20/g, "+");
  console.log("1:", encodedInput);

  let response = null;

  const myProxy = "http://cr4z-cors-anywhere.herokuapp.com";

  try {
    response = await fetch(
      `${myProxy}/https://itunes.apple.com/search?term=${encodedInput}&entity=album&media=music`,
      {
        method: "GET",
      }
    );
  } catch (e) {
    console.log("2:", e);
    return [];
  }

  console.log("3:", response);

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
