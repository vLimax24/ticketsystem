// idSlice.js
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: any = {
  id: '',
};

const idSlice = createSlice({
  name: 'id',
  initialState,
  reducers: {
    setId: (state, action: PayloadAction<string>) => {
      state.id = action.payload;
    },
  },
});

export const { setId } = idSlice.actions;
export default idSlice.reducer;