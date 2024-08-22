import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRooms } from '../store/RoomSlice/RoomSlice';
import { Link } from 'react-router-dom';

function HomePage() {
  const dispatch = useDispatch();
  const rooms = useSelector((state) => state.rooms.rooms);
  const roomStatus = useSelector((state) => state.rooms.status);

  useEffect(() => {
    if (roomStatus === 'idle') {
      dispatch(fetchRooms());
    }
  }, [dispatch, roomStatus]);

  return (
    <div>
      <h1>Room Availability Management</h1>
      {roomStatus === 'loading' && <p>Loading...</p>}
      {roomStatus === 'failed' && <p>Error loading rooms</p>}
      <ul>
        {Array.isArray(rooms) ? (
          rooms.map((room) => (
            <li key={room._id}>
              <Link to={`/rooms/${room._id}`}>{room.name}</Link>
            </li>
          ))
        ) : (
          <p>No rooms available</p>
        )}
      </ul>
    </div>
  );
}

export default HomePage;
