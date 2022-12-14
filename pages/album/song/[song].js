import { useRouter } from "next/router";
import * as Genius from "genius-lyrics";

const Song = ({ lyrics }) => {
  const router = useRouter();

  const { song, artist } = router.query;

  return (
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
};

export const getServerSideProps = async (ctx) => {
  const { artist, song } = ctx.query;

  const nSong = song.includes('(') ? song.substring(0, song.indexOf("(") - 1) : song;

  if (!artist || !song) {
    return { redirect: { destination: "/", permanent: false } };
  }

  // const htmlResponse = await fetch(
  //   `${serverPath}/api/lyrics/azl/${artist
  //     .replace(" ", "")
  //     .toLowerCase()}/${song.replace(" ", "").toLowerCase()}.html`,
  //   {
  //     headers: new Headers({
  //       "Access-Control-Allow-Origin": "*",
  //     }),
  //   }
  // )
  //   .then(function (response) {
  //     // The API call was successful!
  //     return response.text();
  //   })
  //   .catch(function (err) {
  //     // There was an error
  //     console.warn("Something went wrong.", err);
  //   });

  // const lyrics = parseSongHTML(htmlResponse);
  //-------------------------------------------------------
  // const uid = '10817';
  // const token = 'qDMDkCMNOobSnc04';

  // const htmlResponse = await fetch(
  //   `https://www.stands4.com/services/v2/lyrics.php?uid=${uid}&tokenid=${token}&artist=${artist
  //     .toLowerCase()}&term=${song.toLowerCase()}&format=json`,
  //   {
  //     headers: new Headers({
  //       "Access-Control-Allow-Origin": "*",
  //     }),
  //   }
  // );

  const Client = new Genius.Client();

  const searches = await Client.songs.search(`${nSong} ${artist}`);

  const songData = searches.find(
    (item) => item.title === nSong && item.artist.name === artist
  );

  if (!songData) {
    return {
      notFound: true,
      redirect: { destination: "/", permanent: false },
    };
  }

  const lyrics = await songData.lyrics();

  return {
    props: {
      lyrics,
      // html: htmlResponse
      // data: songData,
      // allData: searches,
    },
  };
};

export default Song;