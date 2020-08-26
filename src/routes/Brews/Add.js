import React, { useState } from 'react';
import { Button, CircularProgress, Container, Grid, InputLabel, MenuItem, Paper, Select, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { post } from '../../api';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(0, 3),
  },
  paper: {
    flexDirection: 'column',
    margin: theme.spacing(1),
    padding: theme.spacing(2),
  },
  submit: {
    alignSelf: 'flex-end',
    justifyContent: 'flex-end',
  },
  update: {
    maxWidth: 400,
  }
}));

const ViewBrews = ({ navigate }) => {
  const [brew, setBrew] = useState({});
  const [processing, setProcessing] = useState(false);
  const classes = useStyles();

  const submitBrew = async () => {
    setProcessing(true);
    post('/brews', JSON.stringify(brew))
      .then(res => {
        console.log(res);
        navigate(`../${res.id}`);
      })
      .catch(console.warn);
  }

  return (
    <Container className={classes.root}>
      <Grid container direction="column" spacing={3}>
        <Paper className={classes.paper}>
          <Grid container direction="column">
            <Grid item>New Brew</Grid>
            <TextField
              label="init_date"
              onChange={({ target }) => setBrew({ ...brew, init_date: target.value })}
              type="datetime-local"
              value={brew.init_date}
            />
            <TextField
              label="Ident"
              onChange={({ target }) => setBrew({ ...brew, ident: target.value })}
              value={brew.ident}
            />
            <InputLabel id="category-label">Category</InputLabel>
            <Select
              displayEmpty
              id="category"
              labelId="category-label"
              onChange={({ target }) => setBrew({ ...brew, category: target.value })}
              value={brew.category || ''}
            >
              <MenuItem value="FUNGUS">Fungus</MenuItem>
              <MenuItem value="VEGETABLE">Vegetable</MenuItem>
            </Select>
            <TextField
              label="Ingredients"
              multiline
              onChange={({ target }) => setBrew({ ...brew, ingredients: target.value })}
              value={brew.ingredients}
            />
            {processing
              ? <CircularProgress />
              : <Button className={classes.submit} type="submit" onClick={submitBrew}>
                  Submit
                </Button>
            }
          </Grid>
        </Paper>
      </Grid>
    </Container>
  );
}

export default ViewBrews;
