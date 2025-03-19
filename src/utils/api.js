import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3";
const TMDB_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNWE5NmRmNDhkOTM2ZTM0MzgxOTQxYjg5Zjg4Y2NkZSIsIm5iZiI6MTc0MTM4MDUyMS4xMTM5OTk4LCJzdWIiOiI2N2NiNWJhOTQyYzc1MjEyNTJmNTg1MDQiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.P38x2YhciU9ax5lFXtUKjTgHOKTNCl5eSZp7yO2H5NQ";

const headers = {
    Accept: "application/json",
    Authorization: `Bearer ${TMDB_TOKEN}`,
};

export const fetchDataFromApi = async (url, params = {}) => {
    try {
        const { data } = await axios.get(`${BASE_URL}${url}`, { headers, params });
        return data;
    } catch (error) {
        console.error("API Fetch Error:", error.message);
        return null; // Handle errors gracefully
    }
};
