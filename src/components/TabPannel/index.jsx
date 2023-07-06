import React from "react";
import Grid from '@mui/material/Grid';

const TabPannel = ({children, value, index }) => {
  return (
    <Grid xs={8} item style={{display: `${value !== index ? "none" : "grid"}`}}>
      {value === index && children}
    </Grid>
  )
}

export default TabPannel;