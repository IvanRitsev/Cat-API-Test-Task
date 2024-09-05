import axios from "axios";

const API_KEY = 'live_iUz3xBRZfipCJCIU76AfXZjLFx2vjG0vY4Qzp4KrPUKM611CiikqN4eeG9c9uZ0z';

export const fetchProducts = async () => {
    return axios.get(`htadssdtps://api.thecatapi.com/v1/images/search?limit=10&breed_ids=abys&api_key=${API_KEY}`);
};