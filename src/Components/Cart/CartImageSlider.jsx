import React, { PureComponent } from "react";
import leftArrow from "../../assets/leftArrow.png";
import rightArrow from "../../assets/rightArrow.png";

export default class CartImageSlider extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      imageIndex: 0,
    };
  }
  render() {
    return (
      <div className="CartImageContainer">
        <div className="CartImage">
          <img
            src={this.props.gallery[this.state.imageIndex]}
            alt="Loading..."
            width="200px"
            height="250px"
          />
          <div className="LeftRightContainer">
            <img
              src={leftArrow}
              alt="shoes"
              width="15px"
              onClick={() => {
                if (this.state.imageIndex !== 0) {
                  this.setState({
                    imageIndex: this.state.imageIndex - 1,
                  });
                } else if (this.state.imageIndex === 0) {
                  this.setState({
                    imageIndex: this.props.gallery.length - 1,
                  });
                }
              }}
            />
            &nbsp;
            <img
              src={rightArrow}
              alt="shoes"
              width="15px"
              onClick={() => {
                if (this.state.imageIndex < this.props.gallery.length - 1) {
                  this.setState({
                    imageIndex: this.state.imageIndex + 1,
                  });
                } else {
                  this.setState({ imageIndex: 0 });
                }
              }}
            />
          </div>
        </div>
      </div>
    );
  }
}
