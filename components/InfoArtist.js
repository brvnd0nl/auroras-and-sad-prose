import Image from "next/image";
import Link from "next/link";

const InfoArtist = ({ listArtists }) => {
  return (
    <>
      <div className="flex flex-row gap-4">
        {listArtists.map((item) => (
          <div
            key={item.idArtist}
            className="max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 overflow-hidden"
          >
            <Link href={`/${item.idArtist}`}>
              <img src={item.strArtistThumb} alt={item.strArtist} className="cursor-pointer" />
            </Link>

            <div className="p-5">
              <Link href={`/${item.idArtist}`}>
                <a>
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {item.strArtist}
                  </h5>
                </a>
              </Link>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 text-justify line-clamp-3">
                {item.strBiographyEN}
              </p>
              <Link href={`/${item.idArtist}`}>              
                <a
                  className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Read more
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
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default InfoArtist;
