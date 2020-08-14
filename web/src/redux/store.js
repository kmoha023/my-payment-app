import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';// We'll use redux-logger just as an example of adding another middleware
import logger from 'redux-logger'

import configSlice from '../components/features/main/configSlice';


const reducer = {
    configSlice: configSlice,
    // invoice: invoice,
    // vendors: vendors
}

const middleware = [...getDefaultMiddleware(), logger]

const store = configureStore({
    reducer,
    devTools: process.env.NODE_ENV !== 'production',
})

// The store has been created with these options:
// - The slice reducers were automatically passed to combineReducers()
// - redux-thunk and redux-logger were added as middleware
// - The Redux DevTools Extension is disabled for production
// - The middleware, batch, and devtools enhancers were composed together

export default store;