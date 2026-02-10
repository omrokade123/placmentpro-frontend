import API from "./axios";

// GET all approved
export const fetchExperiences = () =>
  API.get("/experiences");

// CREATE
export const createExperience = (data) =>
  API.post("/experiences", data);

// UPVOTE
export const upvoteExperience = (id) =>
  API.post(`/experiences/${id}/upvote`);
