import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3";
const TMDB_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMWJlMTU3NTZiMGMyNjMwMjI5MjNhM2NhYzgzZDYyMyIsIm5iZiI6MTc0MTM4MDUyMS4xMTM5OTk4LCJzdWIiOiI2N2NiNWJhOTQyYzc1MjEyNTJmNTg1MDQiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.QYh2dqALqOuZGsloHxPCAnWiUHiYgm5bReSM5hSTLhs"; // Replace with your TMDB token

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
do the changes occur
