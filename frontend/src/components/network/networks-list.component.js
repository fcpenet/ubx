import React, { Component } from "react";
import { connect } from "react-redux";
import {
  retrieveNetworks,
  findNetworksByTitle,
  deleteNetwork,
} from "../../slices/networks";

import {
  retrieveCoins,
  deleteCoin,
} from "../../slices/coins";
import { Link } from "react-router-dom";
import { CoinsList } from "../coin/coin-list.component";

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

  removeCoin(coin) {
    this.props
      .deleteCoin(coin)
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
                <div class="row"><h4>{currentNetwork.name}</h4></div>
                <div class="row"><h6>{currentNetwork.description}</h6></div>

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
                <div class="row"><p /></div>
                <div class="row"><h5>Coins</h5></div>
                <div class="row">
                  {currentNetwork.coins.length === 0 ? <div>Nothing to show...</div> : null}
                  <ul class="list-group list-group-flush">
                    {currentNetwork.coins &&
                      currentNetwork.coins.map((coin, index) => (
                        <li
                          className="list-group-item"
                          key={index}
                        >
                          <div class="row">
                            <div className="col-sm-5">
                              {coin.name}
                            </div>
                            <div className="col-sm-1">
                              <Link
                                to={"/networks/" + currentNetwork.id +"/coins/" + coin.id}
                                className="badge badge-warning"
                              >
                                Edit
                              </Link>
                            </div>
                            <div className="col-sm-1">
                              <button
                                className="badge badge-danger"
                                onClick={() => this.removeCoin(coin)}
                              >
                                Delete
                              </button>
                            </div>
                          </div>

                        </li>
                      ))}
                  </ul>
                </div>
                <div class="row">
                  <div className="col-sm-5">
                    <Link
                      to={"/networks/" + currentNetwork.id +"/coins/add"}
                      className="m-3 btn btn-sm btn-primary"
                    >
                      Add Coin
                    </Link>
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
  deleteCoin
})(NetworksList);
