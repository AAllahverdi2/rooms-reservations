import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRooms } from '../store/RoomSlice/RoomSlice';
import { fetchReservations } from '../store/Reservation/Reservation';
import { useParams } from 'react-router-dom';

function RoomPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const room = useSelector((state) => state.rooms.rooms.find((room) => room._id === id));
  const reservations = useSelector((state) => state.reservations.reservations);
  const reservationStatus = useSelector((state) => state.reservations.status);

  useEffect(() => {
    dispatch(fetchRooms());
    dispatch(fetchReservations());
  }, [dispatch]);

  if (!room) return <p>Loading room...</p>;

  return (
    <div>
      <h1>{room.name}</h1>
      <h2>Capacity: {room.capacity}</h2>
      <h3>Reservations</h3>
      {reservationStatus === 'loading' && <p>Loading reservations...</p>}
      {reservationStatus === 'failed' && <p>Error loading reservations</p>}
      <ul>
        {reservations
          .filter((reservation) => reservation.room._id === room._id)
          .map((reservation) => (
            <li key={reservation._id}>
              {reservation.reservedBy} from {new Date(reservation.from).toLocaleString()} to {new Date(reservation.to).toLocaleString()}
              <p>{reservation.notes}</p>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default RoomPage;
