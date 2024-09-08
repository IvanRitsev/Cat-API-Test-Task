import { getCats } from "../../services/CatsService";
import { CatsSlice } from "../slices/CatSlice";
import { AppDispatch } from "../store";

export const fetchCats = () => async (dispatch: AppDispatch) => {

    try {
        dispatch(CatsSlice.actions.fetchCats())
        const res = await getCats();
        if (res.status === 200) {
            dispatch(CatsSlice.actions.fetchCatsSuccess(res))
        }
        else {
            dispatch(CatsSlice.actions.fetchCatsError(res))
        }
    } catch (error) {
        console.log(error);
        
    }
    
}