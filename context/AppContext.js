import { createContext, useContext, useState } from "react";
// import lyricsSearcher from "lyrics-searcher";
import lyricsFinder from "lyrics-finder";

export const AppContext = createContext();

const LIMIT_DICCIONARY_ITEMS =
  process.env.NEXT_PUBLIC_LIMIT_DICCIONARY_ITEMS || 3;

export const useAppContext = () => {
    const context = useContext(AppContext);
  
    if (!context)
      throw new Error(
        "useAppContext must be used within a AppContextProvider"
      );
  
    return context;
  };

export const AppContextProvider = ({ children }) => {
  const [listArtists, setListArtists] = useState([]);
  const [topAlbums, setTopAlbums] = useState([]);
  const [albumSelected, setAlbumSelected] = useState({});

  const getTokenLastFM_API = async () => {

    const tokenLastFM = "3e621fd2c8f4d097b9b19ff26f8bc320";

    const {token} = await fetch(`https://ws.audioscrobbler.com/2.0/?method=auth.gettoken&api_key=${tokenLastFM}&format=json`)
    .then(async resp => resp.json());

    return tokenLastFM;

  };

  // const searchSongsLastFM_API = async(artist, album) => {    

  //   if (!artist) {
  //     alert("Por favor ingrese el artista a buscar");
  //     return;
  //   }

  //   await fetch(
  //     `https://api.genius.com/search?q=${artist}&access_token=${TOKEN_API_GENIUS}`      
  //   ).then(async(res) => await res.json())
  //   .then(({response}) => {

  //     const {hits} = response;

  //     setTopSongs(hits);

  //   }).catch(err => {
  //     throw new Error(err);
  //   });    
  // };

  const getInfoArtist = async (artist) => {

    const artistArray = listArtists;

    if (!artist) {
      alert("Por favor ingrese el artista a buscar");
      return;
    }

    const response = await fetch(
      `https://www.theaudiodb.com/api/v1/json/2/search.php?s=${artist}`
    );
    const {artists} = await response.json();

    artists.forEach((nItem) => {
      artistArray = artistArray.filter((item) => item.idArtist !== nItem.idArtist);

      artistArray.push(nItem);

      if (artistArray.length > LIMIT_DICCIONARY_ITEMS) artistArray.splice(0, 1);
    });    

    setListArtists(artistArray);
  };

  const getAlbumsLastFM = async (artist) => {

    if (!artist) {
      alert("Por favor ingrese el artista a buscar");
      return;
    }

    const token = await getTokenLastFM_API();

     const {topalbums} = await fetch(`https://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&artist=${artist}&api_key=${token}&format=json`)
     .then(resp => resp.json());


     setTopAlbums(topalbums.album);    
  };

  const getInfoAlbumLastFM = async (artist, album) => {

    if (!artist || !album) {
      alert("Por favor ingrese el artista a buscar");      
    }

    const token = await getTokenLastFM_API();

     const response = await fetch(`https://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=${token}&artist=${artist}&album=${album}&format=json`)
     .then(resp => resp.json());


     setAlbumSelected(response.album);
    
  };

  const getLyrics = async (artist, title) => {
    let lyrics = await lyricsFinder(artist, title) || "Not Found!";
    console.log(lyrics);

    // lyricsSearcher("poets of fall", "carnival of rust")
    // .then((lyrics) => {
    //   console.log(lyrics);
    // })
    // .catch((error) => {
    //   console.error(error);
    // });
  };

    return (
        <AppContext.Provider
          value={{
            listArtists,
            topAlbums,
            albumSelected,
            getInfoArtist,
            getAlbumsLastFM,          
            getInfoAlbumLastFM,
            getLyrics
          }}
        >
          {children}
        </AppContext.Provider>
      );
};