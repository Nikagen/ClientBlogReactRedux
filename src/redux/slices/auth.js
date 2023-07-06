import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios'

export const fetchAuth = createAsyncThunk('auth/fetchAuth', async (params) => { //в скобках async указываем, что необходимо взять информацию со всеми параметрами
    const { data } = await axios.post('/auth/login', params) //в данном случае необходим post запрос для получения информации и сохранения в redux
    return data;
})

//запрос, авторизован ли я
export const fetchAuthMe = createAsyncThunk('auth/fetchAuthMe', async () => { //в скобках async указываем, что необходимо взять информацию со всеми параметрами
    const { data } = await axios.get('/auth/me') //в данном случае необходим post запрос для получения информации и сохранения в redux
    return data;
})    

//запрос на регистрацию
export const fetchRegister = createAsyncThunk('auth/fetchRegister', async (params) => { //в скобках async указываем, что необходимо взять информацию со всеми параметрами
    const { data } = await axios.post('/auth/register', params) //в данном случае необходим post запрос для получения информации и сохранения в redux
    return data;
})    

const initialState = {
    data: null,
    status: 'loading',
};

const authSlice = createSlice({ 
    name: 'auth',
    initialState,
    reducers: { //выход из аккаунта
        logout: (state) => {
            state.data = null;
        }
    },
    //далее необходимо сделать так, что информацию о пользователе мы будем получать из redux (точнее из асинхронного action). Когда мы ее получили, будем сохранять ее стейт. Для этого:
    extraReducers: {
        [fetchAuth.pending]: state => { // здесь описываем состояние нашего асинхронного экшена. Объясняем, что у массива есть ключ fetchPosts
            state.status = 'loading';
            state.data = null;
        }, //т. е если пришел запрос pending, то в стейте в initialState posts обновляем статус на loading
        [fetchAuth.fulfilled]: (state, action) => { // здесь описываем состояние нашего асинхронного экшена. Объясняем, что у массива есть ключ fetchPosts
            state.status = 'loaded';
            state.data = action.payload;
        }, //т. е если пришел запрос fulfilled, то обновляем статус на loaded
        [fetchAuth.rejected]: state => { // здесь описываем состояние нашего асинхронного экшена. Объясняем, что у массива есть ключ fetchPosts
            state.status = 'error';
            state.data = null;
        }, //т. е если произошла ошибка, то обновляем статус на error
        
        [fetchAuthMe.pending]: state => { // здесь описываем состояние нашего асинхронного экшена. Объясняем, что у массива есть ключ fetchPosts
            state.status = 'loading';
            state.data = null;
        }, //т. е если пришел запрос pending, то в стейте в initialState posts обновляем статус на loading
        [fetchAuthMe.fulfilled]: (state, action) => { // здесь описываем состояние нашего асинхронного экшена. Объясняем, что у массива есть ключ fetchPosts
            state.status = 'loaded';
            state.data = action.payload;
        }, //т. е если пришел запрос fulfilled, то обновляем статус на loaded
        [fetchAuthMe.rejected]: state => { // здесь описываем состояние нашего асинхронного экшена. Объясняем, что у массива есть ключ fetchPosts
            state.status = 'error';
            state.data = null;
        }, //т. е если произошла ошибка, то обновляем статус на error

        [fetchRegister.pending]: state => { // здесь описываем состояние нашего асинхронного экшена. Объясняем, что у массива есть ключ fetchPosts
            state.status = 'loading';
            state.data = null;
        }, //т. е если пришел запрос pending, то в стейте в initialState posts обновляем статус на loading
        [fetchRegister.fulfilled]: (state, action) => { // здесь описываем состояние нашего асинхронного экшена. Объясняем, что у массива есть ключ fetchPosts
            state.status = 'loaded';
            state.data = action.payload;
        }, //т. е если пришел запрос fulfilled, то обновляем статус на loaded
        [fetchRegister.rejected]: state => { // здесь описываем состояние нашего асинхронного экшена. Объясняем, что у массива есть ключ fetchPosts
            state.status = 'error';
            state.data = null;
        }, //т. е если произошла ошибка, то обновляем статус на error
    },
});

export const selectIsAuth = state => Boolean(state.auth.data) //создаем функцию, которая получит стейт и проверит, есть ли у auth data. после переходим в login

export const authReducer = authSlice.reducer;

export const { logout } = authSlice.actions; //после переходим в хэдер 