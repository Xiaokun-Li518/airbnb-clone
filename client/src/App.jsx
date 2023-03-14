import { Routes, Route } from 'react-router-dom'
import './App.css'
import Layout from './Layout';
import './pages/IndexPage'
import IndexPage from './pages/IndexPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

function App() {

  return (
    <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<IndexPage />}/>
          <Route path="/login" element={<LoginPage />}/>
          <Route path="/register" element={<RegisterPage/>}/>
        </Route>

    </Routes>
  );
}

export default App
