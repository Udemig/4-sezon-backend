import { useSearchParams } from "react-router-dom";
import api from "../../utils/api";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../components/loader";
import Error from "../../components/error";
import Card from "./card";

const Search = () => {
  // urlde'den parametreleri al
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query");
  const category = searchParams.get("category");

  // api'a gönderilecek parametreler
  const params = {
    category,
    search: query,
  };

  // api'dan hizmetleri al
  const { isLoading, error, data } = useQuery({
    queryKey: ["gigs", params],
    queryFn: () =>
      api.get("/gigs", { params }).then((res) => res.data.gigs),
  });

  return (
    <div>
      <h1>
        {query
          ? `${query} için sonuçlar`
          : category && `${category} kategorisi için sonuçlar`}
      </h1>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Error info={error} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5 my-5">
          {data && data.map((item) => <Card key={item._id} item={item} />)}
        </div>
      )}
    </div>
  );
};

export default Search;
