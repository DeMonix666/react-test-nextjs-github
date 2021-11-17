import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'

import typeheadReducer from './reducer/typeheadSlice'
import messageReducer from './reducer/messageSlice'

export function makeStore() {
    return configureStore({
        reducer: { 
            typehead: typeheadReducer,
            message: messageReducer
        },
    })
}

const store = makeStore()

export type AppState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    AppState,
    unknown,
    Action<string>
>

export default store
