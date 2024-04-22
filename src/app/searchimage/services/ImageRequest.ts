import { AxiosRequestConfig } from "axios";

export const imageRequest = (query: string): AxiosRequestConfig => ({
  method: 'GET',
  url: `https://api.unsplash.com/search/photos?per_page=20&query=${query}`,
  headers: {
    Authorization: 'Client-ID vGj0Ajmw-yf-2esp6cKS9pFfYN2wq5cPJ-ewit6SM1U',
  },
});
