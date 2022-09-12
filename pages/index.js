import InfoArtist from "../components/InfoArtist";
import SearchForm from "../components/SearchForm";
import { useAppContext } from "../context/AppContext";

const Home = () => {
  const {listArtists} = useAppContext();

  return (
    <>
      <section className="mt-5 max-w-2xl mx-auto px-4">
        <h1 className="block text-6xl font-bold mb-3">Welcome!</h1>
        <SearchForm />
      </section>
      <div className="m-5">
        {listArtists.length > 0 && <InfoArtist listArtists={listArtists} />}        
      </div>
    </>
  );
};

export default Home;
