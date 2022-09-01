import * as cheerio from "cheerio";

export const getHtmlLyrics = async (url) => {
  console.log(url, 'url a consultar');
  await fetch(url, {
    mode: 'cors',
    cache: 'default',
    headers: new Headers({
      "Accept" : "*/*",      
    })
    
  }).then((resp) => console.log(resp));
};

export const parseSongHTML = (htmlText) => {
  const $ = cheerio.load(htmlText);
  const lyrics = $(".lyrics").text();
  const releaseDate = $("release-date .song_info-info").text();
  return {
    lyrics,
    releaseDate,
  };
};
