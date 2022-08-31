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
            getInfoArtist
          }}
        >
          {children}
        </AppContext.Provider>
      );
};