import axios from "axios";

const client = axios.create({
  baseURL:
    "https://outside-in-dev-api.herokuapp.com/O5qZzrSNoJwXvPHIQ5geBAkhAYxyZtAK",
});

const api = {
  loadRestaurants() {
    return client.get("/restaurants").then(response => response.data);
  },
};

export default api;
