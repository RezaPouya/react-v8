import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import getPetQuery from "../http_requests/gets/getPet";
import CachKeysConstants from "../constants/CachKeysConstants";

const DetailsPages = () => {
  const { id } = useParams();

  const result = useQuery([CachKeysConstants.GetPetDetails, id], getPetQuery);

  if (result.isLoading) {
    return (
      <div className="loading-pane">
        <h2 className="loader">🌀</h2>
      </div>
    );
  }

  const pet = result.data.pets[0];

  if (pet == null || pet == undefined) {
    <h1>Pet Detail Is Not Found</h1>;
  }

  return (
    <div className="details">
      <div>
        <h1>{pet.name}</h1>
        <h2>{`${pet.animal} — ${pet.breed} — ${pet.city}, ${pet.state}`}</h2>
        <button>Adopt {pet.name}</button>
        <p>{pet.description}</p>
      </div>
    </div>
  );
};

export default DetailsPages;
