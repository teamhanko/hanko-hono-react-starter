import './App.css'
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';

import Home from './pages/home';
import Dashboard from './pages/dashboard';
import Profile from './pages/profile';

import PrivateRoute from './components/PrivateRoute';


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route index element={<Home />} />
      <Route path="dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
      <Route path="profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
    </Route>
  )
)

export default function App(){
  return (
    <RouterProvider router={router} />
  )}
