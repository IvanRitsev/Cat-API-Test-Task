import axios, { AxiosResponse } from "axios";
import { Cats } from "../store/types/types";

export const getCats = (): Promise<AxiosResponse<Cats>> => {
        return axios.get<Cats>(`https://api.thecatapi.com/v1/images/search?limit=50&has_breeds=1&lang=ru&api_key=live_iUz3xBRZfipCJCIU76AfXZjLFx2vjG0vY4Qzp4KrPUKM611CiikqN4eeG9c9uZ0z`);

};