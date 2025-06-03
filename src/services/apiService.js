import axios from "axios";

const apiService = axios.create({
  baseURL: "/api",
  maxRedirects: 5,
  validateStatus: function (status) {
    return status >= 200 && status < 500; // Accept all status codes less than 500
  },
});

// Add response interceptor to handle redirects
apiService.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 301 || error.response?.status === 302) {
      // Handle redirect manually if needed
      const redirectUrl = error.response.headers.location;
      return axios.get(redirectUrl);
    }
    return Promise.reject(error);
  }
);

export const manwhaService = {
  getHomePage: async (page = 1, mature = 0) => {
    try {
      const response = await apiService.get(
        `/manwha/home/${page}?mature=${mature}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching manwha data:", error);
      throw error;
    }
  },

  getManhwaDetails: async (id) => {
    try {
      const response = await apiService.get(`/manwha/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching manhwa details:", error);
      throw error;
    }
  },

  searchManhwa: async (query) => {
    try {
      const response = await apiService.get(`/search/${query}/1?mature=0`);
      return response.data;
    } catch (error) {
      console.error("Error searching manhwa:", error);
      throw error;
    }
  },

  getManhwaChapter: async (manwhaId, chapter) => {
    try {
      const response = await apiService.get(`/manwha/${manwhaId}/${chapter}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching chapter:", error);
      throw error;
    }
  },
};

export default apiService;
