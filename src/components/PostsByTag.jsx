import React from 'react';
import { useDispatch, useSelector } from 'react-redux';


import { Post } from '../components/Post';
import { fetchPosts, fetchTags } from '../redux/slices/posts';
import { useParams } from 'react-router-dom';

const PostsByTags = () => {
  const { tag } = useParams();
  const dispatch = useDispatch() //нужен для того, чтобы отправить асинхронный action из posts.js в папке slices redux
  const { posts } = useSelector(state => state.posts)

  //проверяем авторизованы ли мы
  const userData = useSelector(state => state.auth.data)


  const isPostsLoading = posts.status === 'loading' //проверка загрузки

  React.useEffect(() => { //делаем запрос на бэкенд, чтобы получить статьи с помощью axios
    // axios.get('/posts') // делаем запрос на posts
    // // ОБЯЗАТЕЛЬНО устанавливаем в бэкенд библиотеку cors, иначе запрос выполняться не будет
    dispatch(fetchPosts());
    dispatch(fetchTags()); // после этого, чтобы вытянуть тэги из бэкенда, переходим в posts и создаем статусы загрузки для тэгов
  }, []) 
  return (
    <>
       {(isPostsLoading ? [...Array(5)] : [...posts?.items].reverse().filter((post) => !post.tags.indexOf(tag))).map((object, index) =>  //если условие true, то выводим массив, иначе берем items 
        isPostsLoading ? (
          
          <Post key={index} isLoading={true} /> // если статьи загружаются, то показывается это
        ) : ( 
            
          <Post
            id={object?._id}
            title={object?.title}
            imageUrl={object.imageUrl ? `http://localhost:4000${object.imageUrl}` : ''} 
            user={object?.user}
            createdAt={object?.createdAt}
            viewsCount={object?.viewsCount}
            commentsCount={object.comments.length}
            tags={object.tags}
            isEditable={userData?._id === object.user._id} //ПРОВЕРИТЬ!!!!!!!!!!!!!!!!!!!!!11
          /> //после того, как мы убедились, что все корректно работает, переходим обратно в redux posts и создаем новый запрос
        ))} 
    </>
  );
}

export default PostsByTags;