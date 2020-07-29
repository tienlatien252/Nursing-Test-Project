import React from 'react';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

export default function NavBar() {
  return (
    <div>
      <AppBar position='static'>
        <Toolbar>
          <Button color='inherit' href='/'>Home</Button>
          <Button color='inherit' href='/about'>About</Button>
          <Button color='inherit' href='/login'>Login / Signup</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}