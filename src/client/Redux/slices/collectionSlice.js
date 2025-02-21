import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  collectionArr: [],
  collection_id: null,
  collection_title: null,
}

export const collectionSlice = createSlice({
  name: 'collection',
  initialState,
  reducers: {
    //reducer to update collectionArr
    setCollectionArr: (state, action) => {
      state.collectionArr = action.payload
    },
    //reducer to update collection_id in the global state
    setCollection_id: (state, action) => {
      state.collection_id = action.payload;
    },
    //reducer to update collection_title in the global state
    setCollection_title: (state, action) => {
      state.collection_title = action.payload;
    },
  },
});

export const { setCollectionArr, setCollection_id, setCollection_title } = collectionSlice.actions;

export default collectionSlice.reducer;