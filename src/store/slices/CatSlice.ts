import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Cat, Cats } from "../types/types";
import { AxiosResponse } from "axios";

type CatsState = {
    cats: Cats,
    isLoading: boolean,
    response: Response,
    isLiked: boolean,
    filter: 'all' | 'liked',
};

type Response = {
    status: number,
    message: string,
}

const initialState: CatsState = {
    cats: [],
    isLoading: false,
    response: {
        status: 0,
        message: '',
    },
    isLiked: false,
    filter: 'all',
};

export const CatsSlice = createSlice({
    name: 'cats',
    initialState,
    reducers: {
        fetchCats(state) {
            state.isLoading = true;
        },
        fetchCatsSuccess(
            state, 
            action: PayloadAction<AxiosResponse<Cats>>
        ) {
            state.isLoading = false;
            state.cats = action.payload.data;
            state.response = {
                status: action.payload.status,
                message: action.payload.statusText,
            }
        },
        fetchCatsError(state, action: PayloadAction<AxiosResponse<Cats>>) {
            state.isLoading = false;
            state.response = {
                status: action.payload.status,
                message: action.payload.statusText,
            }
        },
        toggleLike(state, action: PayloadAction<string>) {
            const cat = state.cats.find(cat => cat.id === action.payload);
            if(cat) {
                cat.liked = !cat.liked;
            }
        },
        removeCat(state, action: PayloadAction<string>) {
            state.cats = state.cats.filter(cat => cat.id !== action.payload)
        },
        setFilter(state, action: PayloadAction<'all' | 'liked'>) {
            state.filter = action.payload;
        },
        addProduct(state, action: PayloadAction<Cat>) {
           state.cats.unshift(action.payload);
        }
    }
})

export const { removeCat, toggleLike, setFilter, addProduct } = CatsSlice.actions;
export default CatsSlice.reducer;
