import axios from "axios";
import { imageRequest } from "./ImageRequest";

class ImageServiceImpl {
  searchImages = (query: string) => {
    return axios(imageRequest(query))
      .then((response) => Promise.resolve(response.data.results))
      .catch((error) => Promise.reject(error));
  };
}

export default new ImageServiceImpl();
