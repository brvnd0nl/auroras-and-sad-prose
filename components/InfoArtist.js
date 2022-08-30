import Image from "next/image";

const InfoArtist = ({ datosArtista }) => {
  return (
    <>
      <div>
        {datosArtista.length > 0
          ? datosArtista.map((item) => (
              <div
                key={item.idArtist}
                className="flex flex-col items-center gap-3"
              >
                <p className="text-3xl my-3 font-semibold">{item.strArtist}</p>
                <img src={item.strArtistThumb} width="100px" height="100px" />
                <div>
                  <p className="text-gray-600 mb-8 dark:text-gray-100 text-justify line-clamp-10">
                    {item.strBiographyEN}
                  </p>
                </div>
                <div className="mb-1">
                  <input
                    type="submit"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  ></input>
                </div>
              </div>
            ))
          : null}
      </div>
    </>
  );
};

export default InfoArtist;
