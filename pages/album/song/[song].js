import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAppContext } from "../../../context/AppContext";
import {parseSongHTML} from "../../../helpers";

const Song = () => {

    const router = useRouter();

    const {song, artist} = router.query;

    const [lyrics, setLyrics] = useState("");

    const getLyrics = async (artist, title) => {        
    
        const response = await fetch(`/api/lyrics/azl/${artist.replace(' ', '').toLowerCase()}/${title.replace(' ', '').toLowerCase()}.html`,{
          headers: new Headers({
            "Access-Control-Allow-Origin": "*"
          })
        })
        .then(function (response) {
          // The API call was successful!
          return response.text();
        }).catch(function (err) {
          // There was an error
          console.warn('Something went wrong.', err);
        });
        
        const lyrics = parseSongHTML(response);
        
        setLyrics(lyrics || "");
      };

    useEffect(() => {
        getLyrics(artist, song);
    }, []);

    console.log('song', song, 'artist', artist, 'letra', lyrics);

    return(
        <>
            <section className="mt-5 max-w-2xl mx-auto px-4">
            <h1 className="text-7xl font-bold py-3">{song}</h1>
            <h3 className="text-2xl font-serif py-3">{`From ${artist}`}</h3>
            <p className="py-2 sm:py-3 text-gray-700 mb-8 dark:text-white whitespace-pre-wrap text-center">
              {lyrics ? lyrics : ""}
            </p>
            </section>
        </>
    );
}

export default Song;