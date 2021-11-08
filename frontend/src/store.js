import { configureStore } from '@reduxjs/toolkit'
import networkReducer from './slices/networks';
import coinReducer from './slices/coins';

const reducer = {
  networks: networkReducer,
  coins: coinReducer
}

const store = configureStore({
  reducer: reducer,
  devTools: true,
})

export default store;