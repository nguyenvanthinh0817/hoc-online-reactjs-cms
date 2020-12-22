/** @format */

import React from 'react';
import { useRecoilState } from 'recoil';
import { NavLink } from 'react-router-dom';
import { loginState } from '../../recoil/appState';

function Menu(props) {
  const [login, setLogin] = useRecoilState(loginState);
  const userString = sessionStorage.getItem('user') || localStorage.getItem('user');
  const user = userString ? JSON.parse(userString) : '';
  const logout = () => {
    sessionStorage.removeItem('accessToken');
    localStorage.removeItem('accessToken');
    sessionStorage.removeItem('user');
    localStorage.removeItem('user');
    setLogin(false);
  };
  return (
    <header>
      <nav className='navbar navbar-default'>
        <div className='container-fluid' style={{ display: 'flex' }}>
          <div style={{ flexGrow: '3' }}>
            <div className='navbar-header'>
              <NavLink className='navbar-brand' to='/'>
                2T-Education
              </NavLink>
            </div>
            <ul className='nav navbar-nav'>
              <li>
                <NavLink
                  exact
                  to='/'
                  activeStyle={{
                    fontWeight: 'bold',
                    color: 'red',
                  }}
                >
                  Trang chủ
                </NavLink>
              </li>
              <li>
                <NavLink
                  to='/users'
                  activeStyle={{
                    fontWeight: 'bold',
                    color: 'red',
                  }}
                >
                  Người dùng
                </NavLink>
              </li>
              <li>
                <NavLink
                  to='/lessons'
                  activeStyle={{
                    fontWeight: 'bold',
                    color: 'red',
                  }}
                >
                  Bài học
                </NavLink>
              </li>
              <li>
                <NavLink
                  to='/courses'
                  activeStyle={{
                    fontWeight: 'bold',
                    color: 'red',
                  }}
                >
                  Khóa học
                </NavLink>
              </li>
              <li>
                <NavLink
                  to='/refill-coins'
                  activeStyle={{
                    fontWeight: 'bold',
                    color: 'red',
                  }}
                >
                  Nạp coins
                </NavLink>
              </li>
              <li>
                <NavLink
                  to='/thong-ke-doanh-so'
                  activeStyle={{
                    fontWeight: 'bold',
                    color: 'red',
                  }}
                >
                  Thống kê doanh số
                </NavLink>
              </li>
            </ul>
          </div>
          <div
            className=''
            style={{
              textAlign: 'center',
              flexGrow: '1',
              display: 'flex',
              justifyContent: 'flex-end',
              padding: '10px',
            }}
          >
            <h5 style={{ fontWeight: 'bold', marginRight: '10px' }}>{user.name}</h5>
            <button className='btn btn-danger' onClick={logout}>
              Đăng xuất
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Menu;
