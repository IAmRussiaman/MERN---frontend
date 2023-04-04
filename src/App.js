import './App.css';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Home from './pages/Home/Home';
import FullPost from './pages/FullPost/FullPost';
import Registration from './pages/Registration/Registration';
import AddPost from './pages/AddPost/AddPost';
import Login from './pages/Login/Login';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAuthMe, isAuthBoolean } from './redux/slices/auth';
import { useEffect } from 'react';
function App() {
  const dispatch = useDispatch();
  const isAuth = useSelector(isAuthBoolean);
  useEffect(() => {
    dispatch(fetchAuthMe());
  }, []);

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/posts/:id" element={<FullPost />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/addpost" element={<AddPost />} />
        <Route path="/addpost/:id/edit" element={<AddPost />} />
      </Routes>
    </>
  );
}

export default App;
