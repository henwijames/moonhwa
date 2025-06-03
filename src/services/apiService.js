import axios from "axios";

const apiService = axios.create({
  baseURL: "/api",
  validateStatus: function (status) {
    return status >= 200 && status < 500;
  },
  headers: {
    Accept: "application/json",
    "Accept-Language": "en-US,en;q=0.9",
  },
});

// Add response interceptor to handle errors
apiService.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error("API Error:", error.message);

    if (error.response?.status === 403) {
      console.error("Access forbidden. Please check your API access.");
      throw new Error("Access forbidden. Please try again later.");
    }

    if (error.code === "ERR_NETWORK") {
      console.error("Network error. Please check your connection.");
      throw new Error("Network error. Please check your connection.");
    }

    return Promise.reject(error);
  }
);

export const manwhaService = {
  getHomePage: async (page = 1, mature = 0) => {
    try {
      console.log("Fetching home page:", page);
      const response = await apiService.get(
        `/manwha/home/${page}?mature=${mature}`
      );
      console.log("Raw API response:", response);

      if (!response.data) {
        throw new Error("No data received from API");
      }

      // Log the actual data structure
      console.log(
        "Response data structure:",
        JSON.stringify(response.data, null, 2)
      );

      // Check if the data is nested under a property
      const manwhaData = response.data.data || response.data;

      if (!Array.isArray(manwhaData)) {
        console.error("Unexpected data structure:", manwhaData);
        return {
          data: [],
          pagination: {
            currentPage: page,
            totalPages: 1,
            totalItems: 0,
          },
        };
      }

      return {
        data: manwhaData,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(manwhaData.length / 20), // Assuming 20 items per page
          totalItems: manwhaData.length,
        },
      };
    } catch (error) {
      console.error("Home page error:", error);
      if (error.response) {
        console.error("Error response:", error.response.data);
      }
      // Return a default structure in case of error
      return {
        data: [],
        pagination: {
          currentPage: page,
          totalPages: 1,
          totalItems: 0,
        },
      };
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
      console.log("Searching for:", query);
      const response = await apiService.get(`/search/${query}/1?mature=0`);
      console.log("Raw search response:", response);

      if (!response.data) {
        throw new Error("No data received from API");
      }

      // Ensure we have the expected data structure
      const data = response.data.data || [];
      const pagination = response.data.pagination || { totalPages: 1 };

      return {
        data,
        pagination,
      };
    } catch (error) {
      console.error("Search error:", error);
      if (error.response) {
        console.error("Error response:", error.response.data);
      }
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
