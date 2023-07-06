import axios from 'axios';

const instance = axios.create({//создаем оболочку аксиоса
    baseURL: 'http://localhost:4000' //здесь объясняем, что деляем всегда запрос на этот путь. Это делается для того, чтобы не пришлось во время выполнения запроса на аксиос дописывать весь путь
}) 

//пишем middleware для проверки наличия токена в авторизации
instance.interceptors.request.use(config => { //объясняем, что должны сделать middleware на запрос и использовать конфигурации аксиоса
    config.headers.Authorization = localStorage.getItem('token'); //здесь указываем, что конфигурация аксиоса, нам необходимо в хеадерс в авторизацию прикрутить то, что есть в локал сторедже
    return config;
}) //это означает, что когда происходит ЛЮБОЙ запрос, всегда проверяй, есть ли в local storage что-то и вшивай в config...

// axios.get('/posts')

export default instance;