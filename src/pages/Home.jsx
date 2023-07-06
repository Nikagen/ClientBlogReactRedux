import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';

import { fetchPosts, fetchTags } from '../redux/slices/posts';
import Posts from './../components/Posts';


export const Home = () => {
  const dispatch = useDispatch() //нужен для того, чтобы отправить асинхронный action из posts.js в папке slices redux
  const [toggleBtn, setToggleBtn] = React.useState(0)
  const { posts, tags } = useSelector(state => state.posts)

  React.useEffect(() => { 
    dispatch(fetchPosts());
    dispatch(fetchTags());
  }, []) 

  return (
    <>
      <Tabs style={{ marginBottom: 15 }} value={toggleBtn}  aria-label="basic tabs example">
        <Tab label="Новые" onClick={() => setToggleBtn(0)}/>
        <Tab label="Популярное" onClick={() => setToggleBtn(1)} />
      </Tabs>
      <Grid container spacing={4}>
        <Posts mode={toggleBtn} />
      </Grid>
    </>
  );
};
