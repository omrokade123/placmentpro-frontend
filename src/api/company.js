import API from "./axios";

export const fetchCompanies = () =>
  API.get("/companies");
