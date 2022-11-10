import { Component } from "react";

// https://react-v8.holt.courses/lessons/react-capabilities/class-components

// Class components have lifecycle methods.
// These for the most part are what useEffect does for function components.
// They're for doing things like making API calls,
// starting and ending transitions/animations, debugging, and other things like that.
//  We don't need to use any here, but let's look at a few of the most common ones.

// simple usage of lifecycle example
// https://btholt.github.io/complete-intro-to-react-v7/lessons/react-capabilities/class-components

// Notice that the handleIndexClick function is an arrow function.
// This is because we need the this in handleIndexClick to be the correct this.
// An arrow function assures that because it will be the scope of where it was defined.
// This is common with how to deal with event handlers with class components.

// The data attribute comes back as a string. We want it to be a number, hence the +.

// We're doing bad accessibility stuff. But this makes it a lot simpler for learning for now.
// But don't do this in production.
class Carousel extends Component {
  state = {
    active: 0,
  };

  static defaultProps = {
    images: ["http://pets-images.dev-apis.com/pets/none.jpg"],
  };

  handleIndexClick = (event) => {
    this.setState({
      active: +event.target.dataset.index,
    });
  };

  render() {
    const { active } = this.state;
    const { images } = this.props;
    return (
      <div className="carousel">
        <img src={images[active]} alt="animal" />
        <div className="carousel-smaller">
          {images.map((photo, index) => (
            // eslint-disable-next-line
            <img
              key={photo}
              src={photo}
              alt="pet thumbnail"
              className={index === active ? "active" : ""}
              onClick={this.handleIndexClick}
              data-index={index}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Carousel;
