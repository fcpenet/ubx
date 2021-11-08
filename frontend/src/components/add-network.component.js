import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { createNetwork } from "../slices/networks";

class AddNetwork extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.saveNetwork = this.saveNetwork.bind(this);
    this.newNetwork = this.newNetwork.bind(this);

    this.state = {
      id: null,
      name: "",
      description: "",
      published: false,
      submitted: false,
    };
  }

  onChangeTitle(e) {
    this.setState({
      name: e.target.value,
    });
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value,
    });
  }

  saveNetwork() {
    const { name, description } = this.state;
    this.props
      .createNetwork({ name, description })
      .unwrap()
      .then((data) => {
        this.setState({
          id: data.id,
          name: data.name,
          description: data.description,
          submitted: true,
        });
        console.log(data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  newNetwork() {
    this.setState({
      id: null,
      name: "",
      description: "",
      published: false,
      submitted: false,
    });
  }

  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={this.newNetwork}>
              Add
            </button>
            <Link
                to={"/networks"}
                className="m-3 btn btn-sm btn-primary"
              >
                Back
              </Link>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="title">Name</label>
              <input
                type="text"
                className="form-control"
                id="title"
                required
                value={this.state.name}
                onChange={this.onChangeTitle}
                name="title"
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                className="form-control"
                id="description"
                required
                value={this.state.description}
                onChange={this.onChangeDescription}
                name="description"
              />
            </div>

            <button onClick={this.saveNetwork} className="btn btn-success">
              Submit
            </button>
            <Link
                to={"/networks"}
                className="m-3 btn btn-sm btn-primary"
              >
                Back
              </Link>
          </div>
        )}
      </div>
    );
  }
}

export default connect(null, { createNetwork })(AddNetwork);
