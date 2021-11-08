import React, { Component } from "react";
import { connect } from "react-redux";
import {
  retrieveCoins,
  findCoinsByNetwork,
  deleteCoin,
} from "../../slices/coins";
import { Link } from "react-router-dom";

class CoinsList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.refreshData = this.refreshData.bind(this);
    this.setActiveCoin = this.setActiveCoin.bind(this);
    this.removeCoin = this.removeCoin.bind(this);
    this.networkId = props.networkId;

    this.state = {
      currentCoin: null,
      currentIndex: -1,
      searchTitle: "",
    };
  }

  componentDidMount() {
    console.log("lalalal")
    this.props.retrieveCoins(this.networkId);
  }

  onChangeSearchTitle(e) {
    const searchTitle = e.target.value;

    this.setState({
      searchTitle: searchTitle,
    });
  }

  refreshData() {
    this.setState({
      currentCoin: null,
      currentIndex: -1,
    });
  }

  setActiveCoin(coin, index) {
    this.setState({
      currentCoin: coin,
      currentIndex: index,
    });
  }

  removeCoin(coin) {
    console.log(coin)
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

  render() {
    const { searchTitle, currentCoin, currentIndex } = this.state;
    const { coins } = this.props;
    console.log(currentCoin);
    return (
      <div className="edit-form">
        <div className="col-md-6">
          <div class="row">
            <div className="col-sm-6">
              <h3>Coins under this Network</h3>
            </div>
            <div className="col-sm-1">
              <Link
                to={"/coins/add"}
                className="m-3 btn btn-sm btn-primary"
              >
                Add Coin
              </Link>
            </div>
          </div>

          {coins.length === 0 ? <div>Nothing to show...</div> : null}
          <ul className="list-group">
            {coins &&
              coins.map((coin, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveCoin(coin, index)}
                  key={index}
                >
                  {coin.name}
                </li>
              ))}
          </ul>


        </div>
        <div className="col-md-6">
          {currentCoin ? (
            <div>

              <div class="column">
                <div><h4>{currentCoin.name}</h4></div>
                <div><h6>{currentCoin.description}</h6></div>

                <div class="row">
                  <div className="col-sm-2">
                    <Link
                      to={"/coins/" + currentCoin.id}
                      className="badge badge-warning"
                    >
                      Edit
                    </Link>
                  </div>
                  <div className="col-sm-2">
                    <button
                      className="badge badge-danger"
                      onClick={() => this.removeCoin(currentCoin)}
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
              <p>Please click on a Coin...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    coins: state.coins,
  };
};

export default connect(mapStateToProps, {
  retrieveCoins,
  findCoinsByNetwork,
  deleteCoin,
})(CoinsList);
