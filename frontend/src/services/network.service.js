import http from "../http-common";

class NetworkDataService {
  getAll() {
    return http.get("/networks");
  }

  get(id) {
    return http.get(`/networks/${id}`);
  }

  create(data) {
    return http.post("/networks", data);
  }

  update(id, data) {
    return http.put(`/networks/${id}`, data);
  }

  delete(id) {
    console.log("lala")
    console.log(id)
    return http.delete(`/networks/${id}`);
  }

  deleteAll() {
    return http.delete(`/networks`);
  }

  findByTitle(title) {
    return http.get(`/networks?title=${title}`);
  }
}

export default new NetworkDataService();