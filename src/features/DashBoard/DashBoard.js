/** @format */

import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Menu from './Menu';
import Users from '../Users';
import Lesson from '../Lesson';
import Courses from '../Courses';
function DashBoard(props) {
  return (
    <div className=''>
      <Menu />
      <h1>DashBoard</h1>

      <Switch>
        <Route path='/users' exact component={Users} />

        <Route exact path='/lessons'>
          <Lesson />
        </Route>

        <Route exact path='/courses'>
          <Courses />
        </Route>
      </Switch>
    </div>
  );
}

export default DashBoard;
