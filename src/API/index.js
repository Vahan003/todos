import axios from "axios";
import EndpointFactory from "axios-endpoints";

const axiosInstance = axios.create({
  baseURL: "https://6664b7ae932baf9032abe681.mockapi.io/todos",
  responseType: "json",
});

const Endpoint = EndpointFactory(axiosInstance);
const Endpoints = {
  getOrPostTodos: new Endpoint("todos"),
  patchOrDeleteTodos: (id) => new Endpoint("todos/" + id),
};

export default Endpoints;
