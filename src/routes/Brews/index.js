import React from 'react';
import { Router } from '@reach/router';
import Add from './Add';
import List from './List';
import View from './View';

const Brews = () => {
  return (
    <Router>
      <List path="/" />
      <Add path="new" />
      <View path=":id" />
    </Router>
  );
}

export default Brews;
