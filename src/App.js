/** @format */

import DashBoard from './features/DashBoard';
import Login from './features/Login';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { loginState } from './recoil/appState';
function App() {
  //const login = true;
  const [login, setLogin] = useRecoilState(loginState);

  useEffect(() => {
    const accessToken =
      sessionStorage.getItem('accessToken') ||
      localStorage.getItem('accessToken');
    if (accessToken) {
      setLogin(true);
    } else {
      setLogin(false);
    }
  }, [login]);

  return (
    <Router>
      <div className='App'>
        <Switch>
          <Route exact path='/login'>
            {!login ? <Login /> : <Redirect to='/' />}
          </Route>
          <Route path='/'>
            {login ? <DashBoard /> : <Redirect to='/login' />}
          </Route>
        </Switch>

        <ToastContainer
          position='bottom-right'
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
    </Router>
  );
}

export default App;
