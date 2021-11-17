import { createSlice, createAsyncThunk, createEntityAdapter} from "@reduxjs/toolkit";
import type { AppState, AppThunk } from '../../app/store'
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { showMessage } from './messageSlice';
import axios from "axios";

const perPage = 50;
const minLength = 3;

export const searchUser = createAsyncThunk('search/user', async (params: any, { dispatch }) => {
    dispatch(setKeyword(params.keyword));

    if (params.keyword.length < minLength) {
        return {
            data: null,
            page: 1
        };
    }

    const response = await axios
        .get(`https://api.github.com/search/users?q=${params.keyword}&page=${params.page}&per_page=${perPage}`, {
            cancelToken: params.source.token // use to cancel previous request
        })
        .catch((error) => {
            dispatch(showMessage({
                title: `Error ${error.response.status}`,
                message: error.response.data.message
            }));

            return null;
        });
    
    const data = await response.data;

    return {
        page: params.page,
        data: data
    };
});

export const loadMore = createAsyncThunk('search/user-load-more', async (params: any, { dispatch }) => {
    if (params.page <= params.total_page){
        dispatch(searchUser({
            keyword: params.keyword,
            page: params.page,
            source: params.source
        }));
    }
});

export const typeheadSlice = createSlice({
    name: 'typehead',
    initialState: {
        keyword: '',
        items : [],
        total_count: 0,
        page: 1,
        total_page: 0
    },
    reducers: {
        setKeyword: (state, action) => {
            state.keyword = action.payload;
        },
        resetTypehead: (state, action) => {
            state.items = [];
            state.total_count = 0;
            state.page = 1;
            state.total_page = 0;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(searchUser.fulfilled, (state, action) => {
                const currentItems = state.items;
                // state.keyword = action.payload.keyword;
                state.page = action.payload.page;

                if (action.payload.data){
                    const items = action.payload.data.items.map((item) => ({
                        avatar_url: item.avatar_url,
                        id: item.id,
                        login: item.login,
                        html_url: item.html_url
                    }));

                    state.items = [...currentItems, ...items];
                    state.total_count = action.payload.data.total_count;

                    /**
                     * Calculate total page
                     */
                    state.total_page = Math.ceil(state.total_count / perPage);
                } else {
                    state.items = [];
                    state.total_count = 0; 
                    state.total_page = 0;                  
                }
            })
    }
});

export const { resetTypehead, setKeyword } = typeheadSlice.actions;
export const Typehead = (state: any) => state.typehead

export default typeheadSlice.reducer;