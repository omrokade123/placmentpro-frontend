import API from "./axios";

export const createExperience = (data) =>
  API.post("/admin/experiences", data);