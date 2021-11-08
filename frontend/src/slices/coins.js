import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import CoinDataService from "../services/coin.service";

const initialState = [];

export const createCoin = createAsyncThunk(
  "coins/create",
  async ({ name, description, networkId }) => {
    const res = await CoinDataService.create({ name, description, networkId });
    return res.data;
  }
);

export const retrieveCoins = createAsyncThunk(
  "coins/retrieve",
  async ({networkId}) => {
    const res = await CoinDataService.findByNetwork(networkId);
    return res.data;
  }
);

export const updateCoin = createAsyncThunk(
  "coins/update",
  async ({ id, data }) => {
    const res = await CoinDataService.update(id, data);
    return res.data;
  }
);

export const deleteCoin = createAsyncThunk(
  "coins/delete",
  async ({ id }) => {
    await CoinDataService.delete(id);
    return { id };
  }
);

export const deleteAllCoins = createAsyncThunk(
  "coins/deleteAll",
  async () => {
    const res = await CoinDataService.deleteAll();
    return res.data;
  }
);

export const findCoinsByNetwork = createAsyncThunk(
  "coins/findByNetwork",
  async ({ networkId }) => {
    const res = await CoinDataService.findByNetwork(networkId);
    return res.data;
  }
);

const coinSlice = createSlice({
  name: "coin",
  initialState,
  extraReducers: {
    [createCoin.fulfilled]: (state, action) => {
      state.push(action.payload);
    },
    [retrieveCoins.fulfilled]: (state, action) => {
      return [...action.payload];
    },
    [updateCoin.fulfilled]: (state, action) => {
      const index = state.findIndex(coin => coin.id === action.payload.id);
      state[index] = {
        ...state[index],
        ...action.payload,
      };
    },
    [deleteCoin.fulfilled]: (state, action) => {
      let index = state.findIndex(({ id }) => id === action.payload.id);
      state.splice(index, 1);
    },
    [deleteAllCoins.fulfilled]: (state, action) => {
      return [];
    },
    [findCoinsByNetwork.fulfilled]: (state, action) => {
      return [...action.payload];
    },
  },
});

const { reducer } = coinSlice;
export default reducer;
