import http from "../http-common";

class CoinDataService {
  getAll() {
    return http.get("/coins");
  }

  get(id) {
    return http.get(`/coins/${id}`);
  }

  create(data) {
    return http.post("/coins", data);
  }

  update(id, data) {
    return http.put(`/coins/${id}`, data);
  }

  delete(id) {
    console.log("lala")
    console.log(id)
    return http.delete(`/coins/${id}`);
  }

  deleteAll() {
    return http.delete(`/coins`);
  }

  findByNetwork(networkId) {
    return http.get(`/coins?networkId=${networkId}`);
  }
}

export default new CoinDataService();