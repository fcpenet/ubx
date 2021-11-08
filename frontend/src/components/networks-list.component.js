import React, { Component } from "react";
import { connect } from "react-redux";
import {
  retrieveNetworks,
  findNetworksByTitle,
  deleteNetwork,
} from "../slices/networks";
import { Link } from "react-router-dom";

class NetworksList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.refreshData = this.refreshData.bind(this);
    this.setActiveNetwork = this.setActiveNetwork.bind(this);
    this.findByTitle = this.findByTitle.bind(this);
    this.removeNetwork = this.removeNetwork.bind(this);

    this.state = {
      currentNetwork: null,
      currentIndex: -1,
      searchTitle: "",
    };
  }

  componentDidMount() {
    this.props.retrieveNetworks();
  }

  onChangeSearchTitle(e) {
    const searchTitle = e.target.value;

    this.setState({
      searchTitle: searchTitle,
    });
  }

  refreshData() {
    this.setState({
      currentNetwork: null,
      currentIndex: -1,
    });
  }

  setActiveNetwork(network, index) {
    this.setState({
      currentNetwork: network,
      currentIndex: index,
    });
  }

  removeNetwork(network) {
    console.log(network)
    this.props
      .deleteNetwork(network)
      .then((response) => {
        console.log(response);
        this.refreshData();
      })
      .catch((e) => {
        console.log(e);
      });
  }

  findByTitle() {
    this.refreshData();

    this.props.findNetworksByTitle({ title: this.state.searchTitle });
  }

  render() {
    const { searchTitle, currentNetwork, currentIndex } = this.state;
    const { networks } = this.props;
    console.log(currentNetwork);
    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by name"
              value={searchTitle}
              onChange={this.onChangeSearchTitle}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.findByTitle}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div class="row">
            <div className="col-sm-6">
              <h4>Crypto Networks</h4>
            </div>
            <div className="col-sm-1">
              <Link
                to={"/networks/add"}
                className="m-3 btn btn-sm btn-primary"
              >
                Add Network
              </Link>
            </div>
          </div>

          {networks.length === 0 ? <div>Nothing to show...</div> : null}
          <ul className="list-group">
            {networks &&
              networks.map((network, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveNetwork(network, index)}
                  key={index}
                >
                  {network.name}
                </li>
              ))}
          </ul>


        </div>
        <div className="col-md-6">
          {currentNetwork ? (
            <div>

              <div class="column">
                <div><h4>{currentNetwork.name}</h4></div>
                <div><h6>{currentNetwork.description}</h6></div>

                <div class="row">
                  <div className="col-sm-2">
                    <Link
                      to={"/networks/" + currentNetwork.id}
                      className="badge badge-warning"
                    >
                      Edit
                    </Link>
                  </div>
                  <div className="col-sm-2">
                    <button
                      className="badge badge-danger"
                      onClick={() => this.removeNetwork(currentNetwork)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a Network...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    networks: state.networks,
  };
};

export default connect(mapStateToProps, {
  retrieveNetworks,
  findNetworksByTitle,
  deleteNetwork,
})(NetworksList);
