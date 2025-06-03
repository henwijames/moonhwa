import axios from "axios";

const apiService = axios.create({
  baseURL: "/api",
});

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
    const response = await apiService.get(`/manwha/${id}`);
    return response.data;
  },

  searchManhwa: async (query) => {
    const response = await apiService.get(`/search/${query}/1?mature=0`);
    return response.data;
  },

  getManhwaChapter: async (manwhaId, chapter) => {
    const response = await apiService.get(`/manwha/${manwhaId}/${chapter}`);
    return response.data;
  },
};

export default apiService;
