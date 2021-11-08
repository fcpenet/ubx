import React, { Component } from "react";
import { connect } from "react-redux";
import {
  retrieveNetworks,
  findNetworksByTitle,
  deleteAllNetworks,
} from "../slices/networks";
import { Link } from "react-router-dom";

class NetworksList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.refreshData = this.refreshData.bind(this);
    this.setActiveNetwork = this.setActiveNetwork.bind(this);
    this.findByTitle = this.findByTitle.bind(this);
    this.removeAllNetworks = this.removeAllNetworks.bind(this);

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

  removeAllNetworks() {
    this.props
      .deleteAllNetworks()
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

    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by title"
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
          <h4>Crypto Networks</h4>

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

          <div class="row">        
            <div className="col-sm-5">
              <button
                className="m-3 btn btn-sm btn-danger"
                onClick={this.removeAllNetworks}
              >
                Remove All
              </button>
            </div>
            
            <div className="col-sm-5">
              <button type="button" className="m-3 btn btn-sm btn-primary">      
                <Link to={"/networks/add"} className="nav-link">
                  Add
                </Link>
            </button>
            </div>
            </div>
        </div>
        <div className="col-md-6">
          {currentNetwork ? (
            <div>
              <h4>Network</h4>
              <div>
                <label>
                  <strong>Name:</strong>
                </label>{" "}
                {currentNetwork.name}
              </div>
              <div>
                <label>
                  <strong>Description:</strong>
                </label>{" "}
                {currentNetwork.description}
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
  deleteAllNetworks,
})(NetworksList);
