import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

import { useForm } from 'react-hook-form';

import styles from "./Login.module.scss";
import { fetchAuth, selectIsAuth } from "../../redux/slices/auth";

export const Login = () => {
  const isAuth = useSelector(selectIsAuth) // проверяем, авторизован ли пользователь. Переходим в папку auth.js. после создания там функции  указываем, эту функцию в этом месте
  const dispatch = useDispatch(); 
  //делаем запрос на авторизацию используем форму с помощью библиотеки react hook form
  //подключаем библиотеку
  const { // указываем функции, которые вернут нам хук
    register, 
    handleSubmit, 
    formState: { errors, isValid }
  } = useForm({ 
    //щдаесь обхясняем изначальные все параметры этой формы
    defaultValues: {
      email: 'test@test.ru',
      password: '12345'
    },
    //теперь, после регистрации полей почты и пароля, объясняем что валидация должна происходить только в том случеа, если поля ввода почты и пароля поменялись
    mode: 'onChange' //до тех пор пока не отправится форма, ошибка высвечиваться не будет. если указать all, то поведение будет на фокусирование на элемент
  });
  
  //создаем функцию, которая выполняется только в том случае, если react hook form понял, что валидация прошла корректно
    //сохраняем информацию о пользователе
  const onSubmit = async (values) => {
    const data = await dispatch(fetchAuth(values));
    
    if (!data.payload) {//если дата пэйлод undefined, то
      return alert('Не удалось авторизоваться')
    }

    //чтобы объявлять, авторизован ли пользователь, необходимо прописать middleware в axios

    if ('token' in data.payload) { //если есть токен в дата пэйлоад, то в этом случае мы авторизованы и сохраняем токен
      window.localStorage.setItem('token', data.payload.token)
    }

    //отправляем данные пароля и почты в бэкенд. Для этого импортируем useDispatch, вытаскиваем его после объявления login 
    //dispatch(fetchAuth(values)) //здесь объясняем, что диспач должен получить объект с имейл и паролем и передаст его бэкенду
  }

  //если пользователь авторизован, то
  if (isAuth) {
    return <Navigate to='/'/> //рендерим навигейт, который в данном случае задает путь до главной страницы
    //после идем в header
  }

  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Вход в аккаунт
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}> 
        <TextField
          className={styles.field}
          label="E-Mail"
          error={Boolean(errors.email?.message)} //если информация об ошибке получена, то тогда это будет true и информацию будет подсвечиваться красным
          helperText={errors.email?.message}
          type="email" //браузерная валидация 
          {...register('email', { required: 'Укажите почту'})} //регестрируем поля для реакт хук форм
          fullWidth
        />
        <TextField 
          className={styles.field} 
          label="Пароль" 
          error={Boolean(errors.password?.message)}
          helperText={errors.password?.message}
          {...register('password', { required: 'Укажите пароль'})} //регестрируем поля для реакт хук форм.
                                                                   //Это нужно для того, что если у нас эти два поля рендерятся, то мы их регестрируем в useForm и он их будет обрабатывать
          fullWidth 
        />
        <Button disabled={!isValid} type="submit" size="large" variant="contained" fullWidth> 
        {/* disabled позволяет выключать кнопку, если не прошел валидацию */}
          Войти
        </Button>
      </form>
    </Paper>
  );
};
