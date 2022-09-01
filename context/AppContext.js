import { createContext, useContext, useState } from "react";

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
  const [topSongs, setTopSongs] = useState([]);

  const searchSongsGeniusAPI = async(artist) => {

    const tokenAPI = "VYLQuLo9DKal6LlhBVT4IVdWWNFI0Hd_5Ac3HbBEDoTTZuT5PFzzIPRWIXUknpyV";

    if (!artist) {
      alert("Por favor ingrese el artista a buscar");
      return;
    }

    const response = await fetch(
      `https://api.genius.com/search?q=${artist}&access_token=${tokenAPI}`      
    ).then(async(res) => await res.json())
    .then(({response}) => {

      const {hits} = response;

      setTopSongs(hits);

    }).catch(err => {
      throw new Error(err);
    });    
  };

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

    return (
        <AppContext.Provider
          value={{
            listArtists,
            topSongs,
            getInfoArtist,
            searchSongsGeniusAPI
          }}
        >
          {children}
        </AppContext.Provider>
      );
};