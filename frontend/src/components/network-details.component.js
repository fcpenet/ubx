import React, { Component } from "react";
import { connect } from "react-redux";
import { updateNetwork, deleteNetwork } from "../slices/networks";
import NetworkDataService from "../services/network.service";
import { Link } from "react-router-dom";

class Network extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.getNetwork = this.getNetwork.bind(this);
    this.updateContent = this.updateContent.bind(this);
    this.removeNetwork = this.removeNetwork.bind(this);

    this.state = {
      currentNetwork: {
        id: null,
        name: "",
        description: ""
      },
      message: "",
    };
  }

  componentDidMount() {
    this.getNetwork(this.props.match.params.id);
  }

  onChangeTitle(e) {
    const title = e.target.value;

    this.setState(function (prevState) {
      return {
        currentNetwork: {
          ...prevState.currentNetwork,
          title: title,
        },
      };
    });
  }

  onChangeDescription(e) {
    const description = e.target.value;

    this.setState((prevState) => ({
      currentNetwork: {
        ...prevState.currentNetwork,
        description: description,
      },
    }));
  }

  getNetwork(id) {
    NetworkDataService.get(id)
      .then((response) => {
        this.setState({
          currentNetwork: response.data,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  updateContent() {
    this.props
      .updateNetwork({ id: this.state.currentNetwork.id, data: this.state.currentNetwork })
      .unwrap()
      .then((reponse) => {
        console.log(reponse);
        
        this.setState({ message: "The network was updated successfully!" });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  removeNetwork() {
    this.props
      .deleteNetwork({ id: this.state.currentNetwork.id })
      .then(() => {
        this.props.history.push("/networks");
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    const { currentNetwork } = this.state;

    return (
      <div>
        {currentNetwork ? (
          <div className="edit-form">
            <h4>Network</h4>
            <form>
              <div className="form-group">
                <label htmlFor="title">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={currentNetwork.name}
                  onChange={this.onChangeTitle}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  value={currentNetwork.description}
                  onChange={this.onChangeDescription}
                />
              </div>
            </form>

            <Link
                to={"/networks"}
                className="m-3 btn btn-sm btn-primary"
              >
                Back
              </Link>

            <button
              type="submit"
              className="m-3 btn btn-sm btn-success"
              onClick={this.updateContent}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Network...</p>
          </div>
        )}
      </div>
    );
  }
}

export default connect(null, { updateNetwork, deleteNetwork })(Network);
