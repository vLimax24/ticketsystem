import { configureStore } from '@reduxjs/toolkit'
import idSlice from './slices/idSlice'

export const store = configureStore({
    reducer: {
        id: idSlice,
    }
})