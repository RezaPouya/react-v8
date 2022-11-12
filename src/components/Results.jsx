import Pet from "./Pet";

const Results = ({ pets }) => {
  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 align-middle place-content-center">
      {pets.length == 0 ? (
        <h1>No Pets Found</h1>
      ) : (
        pets.map((pet) => {
          return (
            <Pet
              animal={pet.animal}
              key={pet.id}
              name={pet.name}
              breed={pet.breed}
              images={pet.images}
              location={`${pet.city}, ${pet.state}`}
              id={pet.id}
            />
          );
        })
      )}
    </div>
  );
};

export default Results;
