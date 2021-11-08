import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import NetworkDataService from "../services/network.service";

const initialState = [];

export const createNetwork = createAsyncThunk(
  "networks/create",
  async ({ name, description }) => {
    const res = await NetworkDataService.create({ name, description });
    return res.data;
  }
);

export const retrieveNetworks = createAsyncThunk(
  "networks/retrieve",
  async () => {
    const res = await NetworkDataService.getAll();
    return res.data;
  }
);

export const updateNetwork = createAsyncThunk(
  "networks/update",
  async ({ id, data }) => {
    const res = await NetworkDataService.update(id, data);
    return res.data;
  }
);

export const deleteNetwork = createAsyncThunk(
  "networks/delete",
  async ({ id }) => {
    await NetworkDataService.delete(id);
    return { id };
  }
);

export const deleteAllNetworks = createAsyncThunk(
  "networks/deleteAll",
  async () => {
    const res = await NetworkDataService.deleteAll();
    return res.data;
  }
);

export const findNetworksByTitle = createAsyncThunk(
  "networks/findByTitle",
  async ({ title }) => {
    const res = await NetworkDataService.findByTitle(title);
    return res.data;
  }
);

const networkSlice = createSlice({
  name: "network",
  initialState,
  extraReducers: {
    [createNetwork.fulfilled]: (state, action) => {
      state.push(action.payload);
    },
    [retrieveNetworks.fulfilled]: (state, action) => {
      return [...action.payload];
    },
    [updateNetwork.fulfilled]: (state, action) => {
      const index = state.findIndex(network => network.id === action.payload.id);
      state[index] = {
        ...state[index],
        ...action.payload,
      };
    },
    [deleteNetwork.fulfilled]: (state, action) => {
      let index = state.findIndex(({ id }) => id === action.payload.id);
      state.splice(index, 1);
    },
    [deleteAllNetworks.fulfilled]: (state, action) => {
      return [];
    },
    [findNetworksByTitle.fulfilled]: (state, action) => {
      return [...action.payload];
    },
  },
});

const { reducer } = networkSlice;
export default reducer;
