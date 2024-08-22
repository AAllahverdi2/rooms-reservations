const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  name: { type: String, required: true },
  capacity: { type: Number, required: true },
  reservations: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Reservation'
    }
  ]
});

const reservationSchema = new mongoose.Schema({
  room: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Room',
    required: true
  },
  reservedBy: { type: String, required: true },
  from: { type: Date, required: true },
  to: { type: Date, required: true },
  notes: String
});

const Room = mongoose.model('Room', roomSchema);
const Reservation = mongoose.model('Reservation', reservationSchema);

module.exports = { Room, Reservation };
