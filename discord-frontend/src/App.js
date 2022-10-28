import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LoginPage from './authPages/loginPage/LoginPage';
import RegisterPage from './authPages/registerPage/RegisterPage';
import { Dashboard } from './dashboard/Dashboard';

function App() {
  return (
<Router>
  <Routes>
      <Route path='/login' element={<LoginPage />} />
      <Route path='/register' element={<RegisterPage />} />
      <Route path='/' element={<Dashboard />} />
  </Routes>
</Router>
  );
}

export default App;
