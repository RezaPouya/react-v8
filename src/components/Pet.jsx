import { Link } from "react-router-dom";

const Pet = (props) => {
  const { name, animal, breed, images, location, id } = props;

  let hero = "http://pets-images.dev-apis.com/pets/none.jpg";
  if (images.length) {
    hero = images[0];
  }
  return (
    <Link to={`/details/${id}`} className="relative block">
      <div>
        <img
          src={hero}
          alt={name}
          className="rounded-md shadow-md max-h-full"
        />
      </div>
      <div className="absolute bottom-0 left-0 bg-gradient-to-tr w-full from-white to-transparent-50 block pr-4 pt-4 ">
        <h1>{name}</h1>
        <h2>{`${animal} — ${breed} — ${location}`}</h2>
      </div>
    </Link>
  );
};

export default Pet;
