import { useQuery } from "@tanstack/react-query";
import getBreedsQuery from "../http_requests/gets/getBreeds";
import CachKeysConstants from "../constants/CachKeysConstants";

export default function useBreedList(animal) {
  const apiResults = useQuery(
    [CachKeysConstants.GetBreedList, animal],
    getBreedsQuery
  );

  const results = apiResults?.data?.breeds ?? [];

  return [results, apiResults.status];
}
