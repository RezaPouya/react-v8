import { useContext, useState } from "react";
import { useQuery } from "@tanstack/react-query";
//
import Results from "../components/Results";
import useBreedList from "../hooks/useBreedList";
import searchAnimals from "../http_requests/gets/searchAnimals";
import CachKeysConstants from "../constants/CachKeysConstants";
import ErrorBoundary from "../components/ErrorBoundary";
import AdoptedPetContext from "../contexts/AdoptedPetContext";

const ANIMALS = ["bird", "cat", "dog", "rabbit", "reptile"];

const IndexPage = () => {
  const [adoptedPet] = useContext(AdoptedPetContext);

  const [requestParams, setRequestParams] = useState({
    location: "",
    animal: "",
    breed: "",
  });
  const [animal, setAnimal] = useState("");
  const [breeds] = useBreedList(animal);

  const results = useQuery(
    [CachKeysConstants.SearchAnimals, requestParams],
    searchAnimals
  );
  const pets = results?.data?.pets ?? [];

  return (
    <div className="my-0 mx-auto w-11/12">
      <form
        className="p-10 mb-10 rounded-lg bg-gray-200 shadow-lg flex flex-col justify-center items-center"
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target);
          const obj = {
            animal: formData.get("animal") ?? "",
            breed: formData.get("breed") ?? "",
            location: formData.get("location") ?? "",
          };
          setRequestParams(obj);
        }}
      >
        {adoptedPet ? (
          <div className="pet image-container">
            <img src={adoptedPet.images[0]} alt={adoptedPet.name} />
          </div>
        ) : null}
        <label htmlFor="location">
          Location
          <input
            className="search-input"
            type="text"
            id="location"
            name="location"
            placeholder="Location"
          />
        </label>

        <label htmlFor="animal">
          Animal
          <select
            className="search-input"
            id="animal"
            name="animal"
            onChange={(e) => {
              setAnimal(e.target.value);
            }}
            onBlur={(e) => {
              setAnimal(e.target.value);
            }}
          >
            <option />
            {ANIMALS.map((animal) => (
              <option key={animal} value={animal}>
                {animal}
              </option>
            ))}
          </select>
        </label>

        <label htmlFor="breed">
          Breed
          <select
            className="search-input disabled:opacity-40"
            disabled={!breeds.length}
            id="breed"
            name="breed"
          >
            <option />
            {breeds.map((breed) => (
              <option key={breed} value={breed}>
                {breed}
              </option>
            ))}
          </select>
        </label>

        <button className="px-6 py-2 color rounded shadow mt-3 text-white hover:opacity-50 border-none w-60 mb-5 bg-orange-500">
          Submit
        </button>
      </form>
      <Results pets={pets} />
    </div>
  );
};

// replace export
export default function DetailsErrorBoundary(props) {
  return (
    <ErrorBoundary>
      <IndexPage {...props} />
    </ErrorBoundary>
  );
}
