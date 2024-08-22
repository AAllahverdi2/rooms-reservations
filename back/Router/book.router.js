const express = require('express');
const router = express.Router();
const {
  getAllRooms,
  getRoomById,
  createRoom,
  getAllReservations,
  getReservationById,
  createReservation,
  deleteReservation
} = require('../controller/Book.controller');

router.get('/rooms', getAllRooms);
router.get('/rooms/:id', getRoomById);
router.post('/rooms', createRoom);

router.get('/reservations', getAllReservations);
router.get('/reservations/:id', getReservationById);
router.post('/reservations', createReservation);
router.delete('/reservations/:id', deleteReservation);

module.exports = router;
