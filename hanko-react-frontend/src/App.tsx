import './App.css'
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import Home from './pages/home';
import Login from './pages/login';
import Dashboard from './pages/dashboard';
import Protected from './pages/protected';
import PrivateRoute from './components/PrivateRoute';



const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route index element={<Home />} />
      <Route path="login" element={<Login />} />
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="protected" element={<PrivateRoute><Protected /></PrivateRoute>} />
    </Route>
  )
)

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
