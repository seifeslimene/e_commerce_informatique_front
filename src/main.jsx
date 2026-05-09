import './index.css';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router';
import { Provider } from 'react-redux';

import { store } from './store';

import AuthLayout from './layouts/AuthLayout';
import AppLayout from './layouts/AppLayout';

import Homepage from './pages/home';
import Aboutpage from './pages/about';
import Registerpage from './pages/register';
import LoginPage from './pages/login';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route index element={<Homepage />} />
            <Route path='about' element={<Aboutpage />} />
          </Route>
          <Route element={<AuthLayout />}>
            <Route path='register' element={<Registerpage />} />
            <Route path='login' element={<LoginPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
