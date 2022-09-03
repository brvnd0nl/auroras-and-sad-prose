import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAppContext } from "../../context/AppContext";
import InfoSong from "../../components/InfoSong";

const AlbumInfo = () => {
  const router = useRouter();

  const { getInfoAlbumLastFM, albumSelected } = useAppContext();

  const { album, artist } = router.query;

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

  },[]);

  return (
    <>
      {albumSelected !== null ? (
        <section className="flex sm:flex-row sm:gap-10 flex-col gap-0  m-5">
          <div className="sm:max-w-2xl max-w-4xl px-4">
            <h1 className="text-7xl font-bold py-3">{albumSelected.name}</h1>
            <img src={albumSelected.image ? albumSelected.image[4]['#text'] : ''} />
            <p className="text-gray-700 mb-8 dark:text-white text-justify">
              {albumSelected.wiki ? albumSelected.wiki.content.substring(0,albumSelected.wiki.content.indexOf('<a href=') - 1) : ""}
            </p>
          </div>
          <div className="sm:p-10 p-5">
            <h1 className="sm:text-5xl text-3xl font-bold">Canciones</h1>

            <ul className="py-2 grid grid-cols-1 gap-0 sm:grid-cols-2 sm:gap-3">
              {/* {albumSelected.tracks && (<p>album encontrado.</p>)} */}
              {albumSelected.tracks ? albumSelected.tracks.track.slice(0, 10).map((item, index) => (
                <InfoSong key={index} data={item} album={albumSelected.name} />
              )): null}
            </ul>
          </div>
        </section>
      ): (
        <>
            <p>No hay Registros</p>
            <p>{albumSelected}</p>
        </>
      )}
    </>
  );
};

export default AlbumInfo;
