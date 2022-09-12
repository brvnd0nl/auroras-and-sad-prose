import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAppContext } from "../../context/AppContext";
import InfoAlbum from "../../components/InfoAlbum";

const Arist = () => {
  const router = useRouter();

  const { artist } = router.query;

  const { listArtists, topAlbums, getAlbumsLastFM } = useAppContext();

  const artistData =
    listArtists.filter((item) => item.idArtist === artist)[0] || null;

  const [verTodos, setVerTodos] = useState(false);

  useEffect(() => {
    if (artistData === null) {
      router.back();
      return;
    }

    getAlbumsLastFM(artistData.strArtist);
  }, []);

  const renderAlbums = (albums) => {
    if(albums){
      if (Array.isArray(albums)) {
        if(verTodos){
          return topAlbums.map((item, index) => (
            <li key={index}>
              <InfoAlbum data={item} />
            </li>
          ));
        }else{
          return topAlbums.slice(0,10).map((item, index) => (
            <li key={index}>
              <InfoAlbum data={item} />
            </li>
          ))
        }                 
      } else {
        return (
          <li>
            <InfoAlbum data={albums} />
          </li>
        );
      }
    }else{
      return null;
    }
  };

  return (
    <>
      {artistData !== null && (
        <section className="flex sm:flex-row sm:gap-10 flex-col gap-0  m-5">
          <div className="sm:max-w-2xl max-w-4xl px-4">
            {/* <h1 className="text-7xl font-bold">{artist.strArtist}</h1> */}
            <img className="block ml-auto mr-auto" src={artistData.strArtistLogo} />
            <p className="text-gray-700 mb-8 dark:text-white text-justify">
              {artistData.strBiographyEN}
            </p>
          </div>
          <div className="sm:p-10 p-5">
            <h1 className="sm:text-5xl text-3xl font-bold">Albums</h1>

            <ul className="py-2 grid grid-cols-1 gap-0 sm:grid-cols-2 sm:gap-3 sm:auto-rows-min">
              {renderAlbums(topAlbums)}
            </ul>
            <a
              className="font-medium text-blue-600 dark:text-blue-500 hover:underline float-right cursor-pointer"
              onClick={() => setVerTodos(!verTodos)}
            >
              {verTodos ? "Read less" : "Read more"}
            </a>
          </div>
        </section>
      )}
    </>
  );
};

export default Arist;
