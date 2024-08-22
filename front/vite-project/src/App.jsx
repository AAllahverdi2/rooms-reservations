import React from 'react';
import HomePage from './pages/HomePage';
import RoomPage from './pages/RoomPage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import store from './store/index.js'
import { Provider } from 'react-redux';
function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/rooms/:id" element={<RoomPage />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
