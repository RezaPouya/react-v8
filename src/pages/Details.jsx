import { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
//
import Modal from "../components/Modal";
import getPetQuery from "../http_requests/gets/getPet";
import CachKeysConstants from "../constants/CachKeysConstants";
import Carousel from "../components/classes/Carousel ";
import ErrorBoundary from "../components/ErrorBoundary";

const DetailsPages = () => {
  const { id } = useParams();
  const [showModal, setShowModal] = useState(false);
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
      <Carousel images={pet.images} />;
      <div>
        <h1>{pet.name}</h1>
        <h2>{`${pet.animal} — ${pet.breed} — ${pet.city}, ${pet.state}`}</h2>
        <button onClick={() => setShowModal(true)}>Adopt {pet.name}</button>
        <p>{pet.description}</p>
        {showModal ? (
          <Modal>
            <div>
              <h1>Would you like to adopt {pet.name}?</h1>
              <div className="buttons">
                <button>Yes</button>
                <button onClick={() => setShowModal(false)}>No</button>
              </div>
            </div>
          </Modal>
        ) : null}
      </div>
    </div>
  );
};

// replace export
export default function DetailsErrorBoundary(props) {
  return (
    <ErrorBoundary>
      <DetailsPages {...props} />
    </ErrorBoundary>
  );
}
