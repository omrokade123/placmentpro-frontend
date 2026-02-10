import API from "./axios";

export const generateTest = async (config) => {

  const res = await API.post(
    "/practice/generate",
    config
  );

  return res.data;
};
