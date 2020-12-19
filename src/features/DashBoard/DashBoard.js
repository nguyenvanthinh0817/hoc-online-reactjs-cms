/** @format */

import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Menu from './Menu';
import Users from '../Users';
import Lesson from '../Lesson';
import Courses from '../Courses';
import Home from '../Home';
import RefillCoins from '../RefillCoins';
function DashBoard(props) {
  return (
    <div className=''>
      <Menu />
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/users' exact component={Users} />

        <Route exact path='/lessons'>
          <Lesson />
        </Route>

        <Route exact path='/courses'>
          <Courses />
        </Route>

        <Route exact path='/refill-coins'>
          <RefillCoins />
        </Route>
      </Switch>
    </div>
  );
}

export default DashBoard;
