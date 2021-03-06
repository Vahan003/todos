import axios from "axios";
import EndpointFactory from "axios-endpoints";

const axiosInstance = axios.create({
  baseURL: "https://todo.eachbase.com/api/VahanMuradyan/",
  responseType: "json",
});

const Endpoint = EndpointFactory(axiosInstance);

export default   {
  getOrPostTodos: new Endpoint("todos"),
  patchOrDeleteTodos: (id) => new Endpoint("todos/" + id),
};
