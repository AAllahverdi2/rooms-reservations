const { Room, Reservation } = require('../Models/book.model');

exports.getAllRooms = async (req, res) => {
  try {
    const rooms = await Room.find().populate('reservations');
    res.json(rooms);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching rooms' });
  }
};

exports.getRoomById = async (req, res) => {
  try {
    const { id } = req.params;
    const room = await Room.findById(id).populate('reservations');
    res.json(room);
  } catch (error) {
    res.status(500).json({ message: 'Room not found' });
  }
};

exports.createRoom = async (req, res) => {
  const { name, capacity } = req.body;
  try {
    const newRoom = new Room({ name, capacity });
    await newRoom.save();
    res.status(201).json(newRoom);
  } catch (error) {
    res.status(400).json({ message: 'Error creating room' });
  }
};

exports.getAllReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find().populate('room');
    res.json(reservations);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching reservations' });
  }
};

exports.getReservationById = async (req, res) => {
  try {
    const { id } = req.params;
    const reservation = await Reservation.findById(id).populate('room');
    res.json(reservation);
  } catch (error) {
    res.status(500).json({ message: 'Reservation not found' });
  }
};

exports.createReservation = async (req, res) => {
    const { roomId, reservedBy, from, to, notes } = req.body;
    try {
      const room = await Room.findById(roomId).populate('reservations');
      
      if (!room) {
        return res.status(404).json({ message: 'Room not found' });
      }
      
      const conflictingReservation = room.reservations.some(
        reservation =>
          (new Date(from) >= new Date(reservation.from) && new Date(from) <= new Date(reservation.to)) ||
          (new Date(to) >= new Date(reservation.from) && new Date(to) <= new Date(reservation.to))
      );
  
      if (conflictingReservation) {
        return res.status(400).json({ message: 'This time slot is already reserved.' });
      }
  
      const newReservation = new Reservation({ room: roomId, reservedBy, from, to, notes });
      await newReservation.save();
  
      room.reservations.push(newReservation);
      await room.save();
  
      res.status(201).json(newReservation);
    } catch (error) {
      console.error('Error creating reservation:', error);
      res.status(500).json({ message: 'Error creating reservation', error: error.message });
    }
  };

exports.deleteReservation = async (req, res) => {
  try {
    const { id } = req.params;
    await Reservation.findByIdAndDelete(id);
    res.status(200).json({ message: 'Reservation deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting reservation' });
  }
};
