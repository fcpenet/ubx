import { configureStore } from '@reduxjs/toolkit'
import networkReducer from './slices/networks';

const reducer = {
  networks: networkReducer
}

const store = configureStore({
  reducer: reducer,
  devTools: true,
})

export default store;