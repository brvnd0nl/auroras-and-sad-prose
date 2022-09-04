import Link from "next/link";
import { useAppContext } from "../context/AppContext";

const InfoSong = ({ data }) => {
  const { getLyrics } = useAppContext();

  const handleLyrics = async (e) => {
    e.preventDefault();

    const htmlGenius = await getLyrics(data.artist.name, data.name);
    console.log(htmlGenius);
    if (htmlGenius) {
      const response = parseSongHTML(htmlGenius);
      console.log("respuesta", response);
    }
  };

  return (
    <>
      <li className="pb-3 pt-1 sm:pb-4 sm:pt-2">
        <div className="flex items-center space-x-4">
          {/* <div className="flex-shrink-0">
            <img
              className="w-8 h-8 rounded-full"
              src="/docs/images/people/profile-picture-1.jpg"
              alt={data.name}
            />
          </div> */}
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
              {data.name}
            </p>
            <p className="text-sm text-gray-500 truncate dark:text-gray-400">
              {data.artist.name}
            </p>
          </div>
          <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
            {data.duration === null
              ? ""
              : `${Math.floor(data.duration / 60)}:${
                  (data.duration - Math.floor(data.duration / 60) * 60).toLocaleString('es-CO', {
                    minimumIntegerDigits: 2,
                    useGrouping: false
                  })
                }`}
          </div>
          <div>
            <button
              onClick={(e) => handleLyrics(e)}
              tooltip='Get Lyrics'
              title="Get Lyrics"
              type="button"
              className="text-white hover:ring-1 focus:ring-3 focus:outline-none hover:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:hover:ring-blue-800"
            >
              <svg
                aria-hidden="true"
                className=" -mr-1 w-4 h-4"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
            <div
              id="tooltip-default"
              role="tooltip"
              className="inline-block absolute invisible z-10 py-2 px-3 text-sm font-medium text-white bg-white rounded-lg shadow-sm opacity-0 transition-opacity duration-300 tooltip dark:bg-gray-700"
            >
              Get Lyrics
              <div className="tooltip-arrow" data-popper-arrow></div>
            </div>
            
          </div>
        </div>
      </li>

      {/* <div className="p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
        <a href="#">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {data.name}
          </h5>
        </a>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {data.artist.name}
        </p>
        <Link
          href={`/lyrics/${data.name.toLowerCase()}?artist=${data.artist.name.toLowerCase()}&album=${''}`}
        >
          <a
            onClick={(e) => handleLyrics(e)}
            className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Get Lyrics
            <svg
              aria-hidden="true"
              className="ml-2 -mr-1 w-4 h-4"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </a>
        </Link>
      </div> */}
    </>
  );
};

export default InfoSong;
