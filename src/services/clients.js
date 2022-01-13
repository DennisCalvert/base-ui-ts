import api from "./base-api";

const baseRoute = "/clients";

export default {
  get: () => api.get(baseRoute),
};
