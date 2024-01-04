// api.js

import axios from "axios";

const instance = axios.create({
  baseURL: "http://101.99.59.48:3001/",
  // timeout: 1000,
});

export const startData = async (data) => {
  const response = await instance.post("/api/router/makecall", { data });
  return response.data;
};

export const createNewProfile = async (nameProfile, nameFile) => {
  const response = await instance.post("/api/profiles/createProfile", {
    nameProfile,
    nameFile,
  });
  return response.data;
};

export const getNameFile = async () => {
  const response = await instance.get("/api/router/gethardname");
  return response.data;
};

export const runFile = async (record) => {
  const response = await instance.post("/api/router/runFile", record);
  return response.data;
};

// export const getResultSpam = async (nameFile) => {
//   const response = await instance.get(
//     `/api/router/resultspam?namefile=${nameFile}`
//   );
//   return response.data;
// };

//
export const saveFileBackEnd = async (data) => {
  const response = await instance.post(`/api/router/saveFile`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const getProfiles = async () => {
  const response = await instance.get("/api/profiles/getProfiles");
  return response.data;
};

export const getLogsResults = async () => {
  const response = await instance.get(`/api/results/getLogResults`);
  return response.data;
};

export const getDetailResult = async (nameProfile) => {
  const response = await instance.get(
    `/api/results/resultDetail/${nameProfile}`
  );
  return response.data;
};

export const deleteProfile = async (nameProfile) => {
  const response = await instance.delete(
    `/api/profiles/delete/${nameProfile}`
  );
  return response.data;
};
