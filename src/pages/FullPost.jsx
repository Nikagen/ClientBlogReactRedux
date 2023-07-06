import React from "react";
import { useParams } from "react-router-dom";

import ReactMarkdown from "react-markdown";

import axios from '../axios'

import { Post } from "../components/Post";
import { Index } from "../components/AddComment";
import { CommentsBlock } from "../components/CommentsBlock";

export const FullPost = () => {
  const [data, setData] = React.useState(); //локальный запрос на статью
  const [isLoading, setLoading] = React.useState(true); //локальный запрос на загрузку

  const { id }  = useParams() //вытаскиваем id из путию Для этого импортируем useParams

  React.useEffect(() => {// с помощью хука useEffect передаем функцию и объясняем, что при первом рендере нам необходимо сделать запрос
    axios
      .get(`posts/${id}`)
      .then((res) => { //берем аксиос, делаем запрос на гет и объясняем, что делаем запрос на id. Затем получаем результат этой информации и сохраняем его в стейт
        setData(res.data)
        setLoading(false)
    })
    .catch((error) => {
        console.warn(error);
        alert('Ошибка при получении статьи')
    })
    }, [])

  //объясняем, что если загрузка идет, то рэндерим post
  if (isLoading) {
    return <Post isLoading={isLoading} isFullPost />
  }
  console.log(data.comments)

  return (
    <>
      <Post
        id={data._id}
        title={data.title}
        imageUrl={data.imageUrl}
        createdAt={data.createdAt}
        viewsCount={data.viewsCount}
        commentsCount={3}
        tags={data.tags}
        isFullPost
      >
        <ReactMarkdown children={data.text} /> 
      </Post>
      <CommentsBlock
        items={data.comments}
        isLoading={isLoading}
      >
        <Index />
      </CommentsBlock>
    </>
  );
};
