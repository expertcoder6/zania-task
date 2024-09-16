import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface BankDataItem {
  image: string;
}

interface DataState {
  bankData: BankDataItem[];
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
}

const initialState: DataState = {
  bankData: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
};

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBankData.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
      })
      .addCase(
        getBankData.fulfilled,
        (state, action: PayloadAction<BankDataItem[]>) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.bankData = action.payload;
          state.isError = false;
        }
      )
      .addCase(getBankData.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      });
  },
});

export const getBankData = createAsyncThunk<BankDataItem[], void>(
  "GET/DATA",
  async () => {
    try {
      const response = await fetch("../../db.json");
      const data: BankDataItem[] = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

export default dataSlice.reducer;
