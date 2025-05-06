import { StrictMode } from 'react'
import { Provider } from 'react-redux'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router";
import store from './store'

import BaseLayout from './layouts/BaseLayout'

import Home from './routes/Home'
import Login from './routes/Login'
import User from './routes/User'

import AuthListener from './AuthListener';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <AuthListener />
        <Routes>
          <Route path="/" element={<BaseLayout />}>
            <Route index element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<User />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>,
  </StrictMode>,
)