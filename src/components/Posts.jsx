import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Grid from '@mui/material/Grid';


import TabPannel from '../components/TabPannel';
import { Post } from '../components/Post';
import { TagsBlock } from '../components/TagsBlock';
import { CommentsBlock } from '../components/CommentsBlock';
import { fetchPosts, fetchTags } from '../redux/slices/posts';

const Posts = ({mode}) => {
  const dispatch = useDispatch() //нужен для того, чтобы отправить асинхронный action из posts.js в папке slices redux
  const [toggleBtn, setToggleBtn] = React.useState(0)
  const { posts, tags } = useSelector(state => state.posts)

  //проверяем авторизованы ли мы
  const userData = useSelector(state => state.auth.data)


  const isPostsLoading = posts.status === 'loading' //проверка загрузки
  const isTagsLoading = tags.status === 'loading'; 

  React.useEffect(() => { //делаем запрос на бэкенд, чтобы получить статьи с помощью axios
    // axios.get('/posts') // делаем запрос на posts
    // // ОБЯЗАТЕЛЬНО устанавливаем в бэкенд библиотеку cors, иначе запрос выполняться не будет
    dispatch(fetchPosts());
    dispatch(fetchTags()); // после этого, чтобы вытянуть тэги из бэкенда, переходим в posts и создаем статусы загрузки для тэгов
  }, []) 
  return (
    <>
      <TabPannel value={mode} index={0}>
            {(isPostsLoading ? [...Array(5)] : [...posts?.items].reverse()).map((object, index) =>  //если условие true, то выводим массив, иначе берем items 
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
                commentsCount={3}
                tags={object.tags}
                isEditable={userData?._id === object.user._id} //ПРОВЕРИТЬ!!!!!!!!!!!!!!!!!!!!!11
              /> //после того, как мы убедились, что все корректно работает, переходим обратно в redux posts и создаем новый запрос
            ))} 
          </TabPannel>
          <TabPannel value={mode} index={1}>
          {
            (isPostsLoading ? [...Array(5)] : [...posts?.items].sort((a, b) => b.viewsCount - a.viewsCount)).map((object, index) =>  //если условие true, то выводим массив, иначе берем items 
              isPostsLoading ? (
                
                <Post key={index} isLoading={true} /> // если статьи загружаются, то показывается это
              ) : ( 
              <Post
                id={object?._id}
                title={object?.title}
                imageUrl={object?.imageUrl ? `http://localhost:4000${object.imageUrl}` : ''} 
                user={object?.user}
                createdAt={object?.createdAt}
                viewsCount={object?.viewsCount}
                commentsCount={object.comments}
                tags={object.tags}
                isEditable={userData?._id === object.user._id} //ПРОВЕРИТЬ!!!!!!!!!!!!!!!!!!!!!11
              /> //после того, как мы убедились, что все корректно работает, переходим обратно в redux posts и создаем новый запрос
            ))} 
          </TabPannel>
          
          
          <Grid xs={4} item>
            <TagsBlock items={tags.items} isLoading={isTagsLoading} />
            <CommentsBlock
              items={[
                {
                  user: {
                    fullName: 'Вася Пупкин',
                    avatarUrl: 'https://mui.com/static/images/avatar/1.jpg',
                  },
                  text: 'Это тестовый комментарий',
                },
                {
                  user: {
                    fullName: 'Иван Иванов',
                    avatarUrl: 'https://mui.com/static/images/avatar/2.jpg',
                  },
                  text: 'When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top',
                },
              ]}
              isLoading={false}
            />
          </Grid>
    </>
  );
}

export default Posts;