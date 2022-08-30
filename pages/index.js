import { useState, useEffect } from "react";

import InfoArtist from "../components/InfoArtist";

const Home = () => {
  const [artist, setArtist] = useState("");
  const [artists, setArtists] = useState([]);

  const getInfoArtist = async (e) => {
    e.preventDefault();

    if (!artist) {
      alert("Por favor ingrese el artista a buscar");
      return;
    }

    const response = await fetch(
      `https://www.theaudiodb.com/api/v1/json/2/search.php?s=${artist}`
    );
    const data = await response.json();

    setArtists(data.artists);
  };

  return (
    <section className="mt-10">
      <h1 className="block text-6xl font-bold mb-3">Lyrics</h1>
      <form className="" onSubmit={(e) => getInfoArtist(e)}>
        <div className="mb-3">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
            Ingrese el artista:{" "}
          </label>
        </div>
        <div className="mb-3">
          <input
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-300 dark:focus:ring-blue-500 dark:focus:border-blue-500"
            type="text"
            name="artist"
            value={artist}
            onChange={(e) => setArtist(e.target.value)}
          ></input>
        </div>
        <div className="mb-1">
          <input
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          ></input>
        </div>
      </form>
      <div className="my-1">
        <InfoArtist datosArtista={artists} />
      </div>
    </section>
  );
};

export default Home;
