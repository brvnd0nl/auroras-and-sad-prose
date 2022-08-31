import { useEffect } from "react";
import { useRouter } from "next/router";
import {useAppContext} from '../../context/AppContext';

const ArtistInfo = () => {

    const router = useRouter();

    const {idArtist} = router.query;
    const {listArtists} = useAppContext();

    const artist = listArtists.filter(item => item.idArtist === idArtist)[0];

    console.log("artista", artist);


    return (
        <>
            <section className="mt-16">
                {/* <h1 className="text-7xl font-bold">{artist.strArtist}</h1> */}
                <img src={artist.strArtistLogo} />
                <p className="text-gray-700 mb-8 dark:text-white text-justify">{artist.strBiographyEN}</p>
            </section>
        </>
    );
}

export default ArtistInfo;