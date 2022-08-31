import InfoArtist from "../components/InfoArtist";
import SearchForm from "../components/SearchForm";
import { useAppContext } from "../context/AppContext";

const Home = () => {
  const {listArtists} = useAppContext();

  return (
    <section className="mt-5">
      <h1 className="block text-6xl font-bold mb-3">Lyrics</h1>
      <SearchForm />
      <div className="my-5">
        {listArtists.length > 0 && <InfoArtist listArtists={listArtists} />}        
      </div>
    </section>
  );
};

export default Home;
