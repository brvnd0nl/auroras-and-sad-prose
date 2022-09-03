import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAppContext } from "../../context/AppContext";
import InfoAlbum from "../../components/InfoAlbum";

const ArtistInfo = () => {
  const router = useRouter();

  const { idArtist } = router.query;

  const { listArtists, topAlbums, getAlbumsLastFM } = useAppContext();

  const artist =
    listArtists.filter((item) => item.idArtist === idArtist)[0] || null;

  useEffect(() => {
    if (artist === null) {
      router.back();
      return;
    }

    getAlbumsLastFM(artist.strArtist);
  }, []);

  return (
    <>
      {artist !== null && (
        <section className="flex sm:flex-row sm:gap-10 flex-col gap-0  m-5">
          <div className="sm:max-w-2xl max-w-4xl px-4">
            {/* <h1 className="text-7xl font-bold">{artist.strArtist}</h1> */}
            <img src={artist.strArtistLogo} />
            <p className="text-gray-700 mb-8 dark:text-white text-justify">
              {artist.strBiographyEN}
            </p>
          </div>
          <div className="sm:p-10 p-5">
            <h1 className="sm:text-5xl text-3xl font-bold">Albumes</h1>

            <ul className="py-2 grid grid-cols-1 gap-0 sm:grid-cols-2 sm:gap-3">
              {topAlbums.length > 0 &&
                topAlbums.slice(0, 10).map((item, index) => (
                  <li key={index}>
                    <InfoAlbum data={item} />
                  </li>
                ))}
            </ul>
          </div>
        </section>
      )}
    </>
  );
};

export default ArtistInfo;
