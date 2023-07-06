import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Container from "@mui/material/Container";

import { Header } from "./components";
import { Home, FullPost, Registration, AddPost, Login } from "./pages";
import { fetchAuthMe, selectIsAuth } from './redux/slices/auth';
import PostsByTags from './components/PostsByTag';

function App() {
    //НЕ РАБОТАЕТ!!!!!!!!!!!!

   //даем понять приложению, авторизован пользователь или нет. Для этого в redux.js делаем новый запрос fetchAuthMe
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);

  React.useEffect(() => {
    dispatch(fetchAuthMe()) //делаем запрос и вытаскиваем информацию о том, авторизован или нет
  }, []);

  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/posts/:id' element={<FullPost />} />
          <Route path='/posts/tags/:tag' element={<PostsByTags />} />
          <Route path='/posts/:id/edit' element={<AddPost />} />  {/* редактирование статей */}
          <Route path='/add-post' element={<AddPost />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Registration />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
