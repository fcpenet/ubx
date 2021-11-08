import React, { Component } from "react";
import { connect } from "react-redux";
import { updateCoin, deleteCoin } from "../../slices/coins";
import CoinDataService from "../../services/coin.service";
import { Link } from "react-router-dom";

class EditCoin extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.getCoin = this.getCoin.bind(this);
    this.updateContent = this.updateContent.bind(this);
    this.removeCoin = this.removeCoin.bind(this);

    this.state = {
      currentCoin: {
        id: null,
        name: "",
        networkId: this.props.match.params.networkId,
        description: ""
      },
      message: "",
    };
  }

  componentDidMount() {
    console.log("lalala")
    console.log(this.props.match.params.id)
    this.getCoin(this.props.match.params.id);
  }

  onChangeTitle(e) {
    const title = e.target.value;

    this.setState(function (prevState) {
      return {
        currentCoin: {
          ...prevState.currentCoin,
          title: title,
        },
      };
    });
  }

  onChangeDescription(e) {
    const description = e.target.value;

    this.setState((prevState) => ({
      currentCoin: {
        ...prevState.currentCoin,
        description: description,
      },
    }));
  }

  onChangeNetworkId(e) {
    const networkId = e.target.value;

    this.setState((prevState) => ({
      currentCoin: {
        ...prevState.currentCoin,
        networkId: networkId,
      },
    }));
  }

  getCoin(id) {
    CoinDataService.get(id)
      .then((response) => {
        this.setState({
          currentCoin: response.data,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  updateContent() {
    this.props
      .updateCoin({ id: this.state.currentCoin.id, data: this.state.currentCoin })
      .unwrap()
      .then((reponse) => {
        console.log(reponse);
        
        this.setState({ message: "The coin was updated successfully!" });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  removeCoin() {
    this.props
      .deleteCoin({ id: this.state.currentCoin.id })
      .then(() => {
        this.props.history.push("/coins");
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    const { currentCoin } = this.state;

    return (
      <div>
        {currentCoin ? (
          <div className="edit-form">
            <h4>Coin</h4>
            <form>
              <div className="form-group">
                <label htmlFor="title">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={currentCoin.name}
                  onChange={this.onChangeTitle}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  value={currentCoin.description}
                  onChange={this.onChangeDescription}
                />
              </div>
              <div className="form-group">
                <label htmlFor="Network">Network</label>
                <input
                  type="text"
                  className="form-control"
                  id="network"
                  value={currentCoin.networkId}
                  onChange={this.onChangeNetworkId}
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
            <p>Id not found</p>
          </div>
        )}
      </div>
    );
  }
}

export default connect(null, { updateCoin, deleteCoin })(EditCoin);
