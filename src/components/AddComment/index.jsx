import React from "react";
import { useParams } from "react-router-dom";

import styles from "./AddComment.module.scss";

import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import axios from "./../../axios";


export const Index = () => {
  const { id } = useParams();
  const [comment, setComment] = React.useState()
  
  async function sendComment(event) {
    event.preventDefault();
    const {response} = await axios.post(`/comments/${id}`, {...comment, date: new Date()});
    console.log(response);
    console.log(comment.text);
  }
  console.log(id);

  return (
    <>
      <form onSubmit={(event) => sendComment(event)} className={styles.root}>
        <Avatar
          classes={{ root: styles.avatar }}
          src="https://mui.com/static/images/avatar/5.jpg"
        />
        <div className={styles.form}>
          <TextField
            label="Написать комментарий"
            variant="outlined"
            maxRows={10}
            multiline
            fullWidth
            onChange={(event) => setComment({ ...comment, text: event.target.value })}
            InputProps={{onChange: (event) => setComment({ ...comment, text: event.target.value })}}
          />
          <Button type="submit" variant="contained">Отправить</Button>
        </div>
      </form>
    </>
  );
};
