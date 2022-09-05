import * as cheerio from "cheerio";
import * as h2p from "html2plaintext";

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
  let response = "";
  $('div:not([class])').each(function(){
    var lyrics = h2p($(this).html()); 
    if(lyrics != ''){
      response = lyrics;
    }
  });
  return response;
};
