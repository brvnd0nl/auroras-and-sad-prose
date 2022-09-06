import { createContext, useContext, useState } from "react";
import {parseSongHTML} from "../helpers";
// import lyricsSearcher from "lyrics-searcher";
import lyricsFinder from "lyrics-finder";

export const AppContext = createContext();

export const isMobileDevice = () =>
  /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

const LIMIT_ITEMS = process.env.NEXT_PUBLIC_LIMIT_ITEMS || 3;

const dev = process.env.NODE_ENV !== 'production';

export const serverPath = dev ? 'http://localhost:3000' : 'https://auroras-and-sad-prose.netlify.app';

export const useAppContext = () => {
  const context = useContext(AppContext);

  if (!context)
    throw new Error("useAppContext must be used within a AppContextProvider");

  return context;
};

export const AppContextProvider = ({ children }) => {
  const [listArtists, setListArtists] = useState([]);
  const [topAlbums, setTopAlbums] = useState([]);
  const [albumSelected, setAlbumSelected] = useState({});

  const getTokenLastFM_API = async () => {
    const tokenLastFM = "3e621fd2c8f4d097b9b19ff26f8bc320";

    const { token } = await fetch(
      `https://ws.audioscrobbler.com/2.0/?method=auth.gettoken&api_key=${tokenLastFM}&format=json`
    ).then(async (resp) => resp.json());

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
    const { artists } = await response.json();

    artists.forEach((nItem) => {
      artistArray = artistArray.filter(
        (item) => item.idArtist !== nItem.idArtist
      );

      artistArray.unshift(nItem);

      if (artistArray.length > LIMIT_ITEMS)
        artistArray.splice(artistArray.length - 1, 1);
    });

    setListArtists(artistArray);
  };

  const getAlbumsLastFM = async (artist) => {
    if (!artist) {
      // alert("Por favor ingrese el artista a buscar");
      return null;
    }

    const token = await getTokenLastFM_API();

    const { topalbums } = await fetch(
      `https://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&artist=${artist}&api_key=${token}&format=json`
    ).then((resp) => resp.json());

    setTopAlbums(topalbums.album);
  };

  const getInfoAlbumLastFM = async (artist, album) => {
    if (!artist || !album) {
      // alert("Por favor ingrese el artista a buscar");
      return null;
    }

    const token = await getTokenLastFM_API();

    const response = await fetch(
      `https://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=${token}&artist=${artist}&album=${album}&format=json`
    ).then((resp) => resp.json());

    setAlbumSelected(response.album);
  };

  const getLyrics = async (artist, title) => {
    //consulto la cancion para obtener el id

    // const token = "d89b019e916b3663b3965c955deaddc0";
    // const token = "16099f064260947071709a4bc6421891";

    // const {album_id, artist_id, track_id, commontrack_id, has_lyrics} =
    //   (await fetch(
    //     `/api/lyrics/mxm/track.search?q_artist=${artist}&q_track=${title}&page_size=3&page=1&s_track_rating=desc&apikey=${token}`
    //   )
    //     .then(async (resp) => {
    //       const res = await resp.json()
    //       console.log('Resultados', res)
    //       return res;
    //     } )
    //     .then(
    //       (res) =>
    //         res.message.body.track_list.find(
    //           (item) =>
    //             item.track.artist_name.toLowerCase() === artist.toLowerCase() &&
    //             item.track.track_name.toLowerCase() === title.toLowerCase()
    //         ) || null
    //     )
    //     .then((res) => res != null && res.track)) || "Not Found!!!!";

    // if(has_lyrics !== 1){
    //   alert('Lo sentimos, la canción no tiene letra a consultar. Por favor intente mas tarde');
    //   return;
    // }

    // const response =
    //   (await fetch(        
    //     `/api/lyrics/mxm/matcher.lyrics.get?${track_id ? `track_id=${track_id}` : `commontrack_id=${commontrack_id}`}&apikey=${token}`
    //   )
    //     .then(async (resp) => await resp.json())
    //     .then(
    //       (res) =>
    //         res.message.body.lyrics
    //     )
    //   ) || "Not Found!!!!";

    // console.log(response);
    // console.log(response.lyrics_body);

    const response = await fetch(`/api/lyrics/azl/${artist.replace(' ', '').toLowerCase()}/${title.replace(' ', '').toLowerCase()}.html`)
    .then(function (response) {
      // The API call was successful!
      return response.text();
    }).catch(function (err) {
      // There was an error
      console.warn('Something went wrong.', err);
    });
    
    const lyrics = parseSongHTML(response);
    
    return lyrics;
  };

  return (
    <AppContext.Provider
      value={{
        listArtists,
        topAlbums,
        albumSelected,
        isMobileDevice,
        getInfoArtist,
        getAlbumsLastFM,
        getInfoAlbumLastFM,
        getLyrics,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
