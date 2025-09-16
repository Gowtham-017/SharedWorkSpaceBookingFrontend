import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Landing from "pages/Landing/Landingpage"
import Layout from "components/Layout"
import Login from "pages/Login/Login"
import Signup from "pages/Signup/Signup"
import Dashboard from 'pages/Dashboard/Dashboard';
import Profile from 'pages/Profile/Profile';
import Workspace from 'pages/Workspace/Workspace';

import AdminSignup from "admin/Signup/AdminSignup"
import { AuthProvider } from 'context/AuthContext';
import Edit from 'admin/Edit';
import CreateWorkspace from 'admin/CreateWorkspace';
function App() {
  return (
    <div className="App">
        <BrowserRouter>
        <AuthProvider>
          <Layout>
            <Routes>
              <Route path="/" element={<Landing/>}/>
              <Route path="/login" element={<Login/>}/>
              <Route path="/signup" element={<Signup/>}/>
              <Route path="/dashboard" element={<Dashboard/>}/>
              <Route path="/profile" element={<Profile/>}/>
              <Route path="/workspace" element={<Workspace/>}/>

              <Route path="/signup/admin" element={<AdminSignup/>}/>
              <Route path="/admin/edit" element={<Edit/>}/>
              <Route path="/admin/create" element={<CreateWorkspace/>}/>
              <Route path='*' element={<Navigate to="/"/>}/>
            </Routes>
          </Layout>
          </AuthProvider>
        </BrowserRouter>
    </div>
  );
}
export default App;
