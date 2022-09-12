import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAppContext } from "../../context/AppContext";
import InfoSong from "../../components/InfoSong";

const Album = () => {
  const router = useRouter();

  const { getInfoAlbumLastFM, albumSelected } = useAppContext();

  const { album, artist } = router.query;

  const [verTodos, setVerTodos] = useState(false);

  //   const albumSelected =
  //     topAlbums.find(
  //       (item) =>
  //         item.artist.name.toLowerCase() === artist &&
  //         item.name.toLowerCase() === album
  //     ) || null;

  useEffect(() => {
    if (!album || !artist) {
      router.push("/");
    }

    getInfoAlbumLastFM(artist, album);
  }, []);

  const renderSongs = (tracks) => {
    if(tracks){
      if (Array.isArray(tracks.track)) {
        if(verTodos){
          return tracks.track.map((item, index) => (
            <InfoSong key={index} data={item} album={albumSelected.name} />
          ));
        }else{
          return tracks.track.slice(0, 5).map((item, index) => (
            <InfoSong key={index} data={item} album={albumSelected.name} />
          ));
        }                 
      } else {
        return <InfoSong data={tracks.track} album={albumSelected.name} />;
      }
    }else{
      return null;
    }
  };

  return (
    <>
      {albumSelected !== null ? (
        <section className="flex sm:flex-row sm:gap-10 flex-col gap-0  m-5">
          <div className="sm:max-w-2xl max-w-4xl px-4">
            <h1 className="text-7xl font-bold py-3">{albumSelected.name}</h1>
            <img
              className="block ml-auto mr-auto"
              src={albumSelected.image ? albumSelected.image[4]["#text"] : ""}
            />
            <p className="py-2 sm:py-3 text-gray-700 mb-8 dark:text-white text-justify">
              {albumSelected.wiki
                ? albumSelected.wiki.content.substring(
                    0,
                    albumSelected.wiki.content.indexOf("<a href=") - 1
                  )
                : ""}
            </p>
          </div>
          <div className=" w-full sm:p-8 p-5">
            <h1 className="sm:text-5xl text-3xl font-bold">Songs</h1>

            {/* <ul className="py-2 grid grid-cols-1 gap-0 sm:grid-cols-2 sm:gap-3"> */}
            <ul className="py-5 w-full divide-y divide-gray-200 dark:divide-gray-700">
              {renderSongs(albumSelected.tracks)}
            </ul>
            <a
              className="font-medium text-blue-600 dark:text-blue-500 hover:underline float-right cursor-pointer"
              onClick={() => setVerTodos(!verTodos)}
            >
              {verTodos ? "Read less" : "Read more"}
            </a>
          </div>
        </section>
      ) : (
        <>
          <p>No hay Registros</p>
          <p>{albumSelected}</p>
        </>
      )}
    </>
  );
};

export default Album;
