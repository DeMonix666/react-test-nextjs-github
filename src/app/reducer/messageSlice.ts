import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    show: false,
    options: {
        // anchorOrigin: {
        //     vertical: 'top',
        //     horizontal: 'center'
        // },
        position: 'top-center',
        autoHideDuration: 6000,
        title: 'Message',
        message: '',
        variant: null
    }
};
const messageSlice = createSlice({
    name: 'message',
    initialState,
    reducers: {
        showMessage: (state, action) => {
            state.show = true;
            state.options = {
                ...initialState.options,
                ...action.payload
            };
        },
        hideMessage: (state, action) => {
            state.show = false;
        }
    }
});

export const { hideMessage, showMessage } = messageSlice.actions;
export const Message = (state: any) => state.message

export default messageSlice.reducer;
