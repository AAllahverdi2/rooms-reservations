import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchRooms = createAsyncThunk('rooms/fetchRooms', async () => {
  const response = await axios.get('http://localhost:4001/api/rooms');
  console.log('Fetched rooms data:', response.data);
  return response.data; 
});

const roomSlice = createSlice({
  name: 'rooms',
  initialState: {
    rooms: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRooms.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchRooms.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.rooms = action.payload; 
      })
      .addCase(fetchRooms.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default roomSlice.reducer;
