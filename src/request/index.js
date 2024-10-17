import { axiosInstance } from "../shared/services";
import { Errors } from "../utils/errors";

export const postRequest = async (url, payload, config) => {
  try {
    let data = await axiosInstance.post(url, payload, config);
    return data;
  } catch (error) {
    Errors(error);
  }
};

export const getRequest = async (url, config) => {
  try {
    let data = await axiosInstance.get(url, config);
    return data;
  } catch (error) {
    Errors(error);
  }
};
