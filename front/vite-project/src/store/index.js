import { configureStore } from '@reduxjs/toolkit';
import roomsReducer from './RoomSlice/RoomSlice';  
import reservationsReducer from './Reservation/Reservation'; 

const store = configureStore({
  reducer: {
    rooms: roomsReducer,
    reservations: reservationsReducer,
  },
});

export default store;
