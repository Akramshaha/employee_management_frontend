import './App.css';
import { Route, Routes } from 'react-router-dom';
import PrivateRoute from './Services/PrivateRoute';
import Login from './Components/Login';
import Dashboard from './Components/Dashboard';
import AddEmployee from './Components/AddEmployee';
import EditEmployee from './Components/EditEmployee';

function App() {

  

  return (
    <>
      <Routes>
      <Route path='/login' element={<Login />} />
      <Route path='/' element={<Login />} />
      <Route 
        path='/dashboard' 
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />

    <Route 
        path='/addEmployee' 
        element={
          <PrivateRoute>
            <AddEmployee />
          </PrivateRoute>
        }
      />
    <Route 
        path='/employee/:id' 
        element={
          <PrivateRoute>
              <EditEmployee />
          </PrivateRoute>
        }
      />

    </Routes>
    </>
  );
}

export default App;
