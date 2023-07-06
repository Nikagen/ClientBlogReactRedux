import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios'

//первый асинхронный запрос
export const fetchPosts = createAsyncThunk('/posts/fetchPosts', async () => { //в скобках объясняем название action
    const { data } = await axios.get('/posts') //объясняем, что нам нужно вытащить data из axios запроса во время его выполнения
    return data;
}); //далее этот запрос отправляем на бэкенд, для этого добавляем его в компонент home в react.useEffect

//запрос на получение тэгов
export const fetchTags = createAsyncThunk('/posts/fetchTags', async () => { //в скобках объясняем название action
    const { data } = await axios.get('/tags') //объясняем, что нам нужно вытащить data из axios запроса во время его выполнения
    return data;
}); //далее этот запрос отправляем на бэкенд, для этого добавляем его в компонент home в react.useEffect
//перед тем как отлавливать действия pending и fulfilled, переходим в бэкенд и создаем получение списка тэгов

export const fetchByTag = createAsyncThunk('/posts/fetchByTag', async (tag) => { 
    const { data } = await axios.get(`/posts/${tag}`) 
    return data;
})

export const fetchRemovePost = createAsyncThunk('/posts/fetchRemovePost', async (id) =>  //в скобках объясняем название action
    axios.delete(`/posts/${id}`) //объясняем, что нам нужно вытащить data из axios запроса во время его выполнения
);

const initialState = {
    posts: {
        items: [],
        status: 'loading'
    },
    tags: {
        items: [],
        status: 'loading'
    },
};

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {},
    extraReducers: { //небходим для того, чтобы отловить действия pending и fulfilled в редаксе и обновлять их в стейте
        [fetchPosts.pending]: (state) => { // здесь описываем состояние нашего асинхронного экшена. Объясняем, что у массива есть ключ fetchPosts
            state.posts.items = [];
            state.posts.status = 'loading'
        }, //т. е если пришел запрос pending, то в стейте в initialState posts обновляем статус на loading
        [fetchPosts.fulfilled]: (state, action) => { // здесь описываем состояние нашего асинхронного экшена. Объясняем, что у массива есть ключ fetchPosts
            state.posts.items = action.payload;
            state.posts.status = 'loaded'
        }, //т. е если пришел запрос fulfilled, то обновляем статус на loaded
        [fetchPosts.rejected]: (state) => { // здесь описываем состояние нашего асинхронного экшена. Объясняем, что у массива есть ключ fetchPosts
            state.posts.items = [];
            state.posts.status = 'error'
        }, //т. е если произошла ошибка, то обновляем статус на error

        [fetchTags.pending]: (state) => { // здесь описываем состояние нашего асинхронного экшена. Объясняем, что у массива есть ключ fetchPosts
            state.tags.items = [];
            state.tags.status = 'loading'
        }, //т. е если пришел запрос pending, то в стейте в initialState posts обновляем статус на loading
        [fetchTags.fulfilled]: (state, action) => { // здесь описываем состояние нашего асинхронного экшена. Объясняем, что у массива есть ключ fetchPosts
            state.tags.items = action.payload;
            state.tags.status = 'loaded'
        }, //т. е если пришел запрос fulfilled, то обновляем статус на loaded
        [fetchTags.rejected]: (state) => { // здесь описываем состояние нашего асинхронного экшена. Объясняем, что у массива есть ключ fetchPosts
            state.tags.items = [];
            state.tags.status = 'error'
        }, //т. е если произошла ошибка, то обновляем статус на error

        [fetchRemovePost.pending]: (state, action) => { // здесь описываем состояние нашего асинхронного экшена. Объясняем, что у массива есть ключ fetchPosts
            state.posts.items = state.posts.items.filter(object => object._id != action.meta.arg); //не дожидаясь ответа, сразу же удаляем статью из массива
        }, //т. е если пришел запрос pending, то в стейте в initialState posts обновляем статус на loading
    } 
})

export const postsReducer = postsSlice.reducer;