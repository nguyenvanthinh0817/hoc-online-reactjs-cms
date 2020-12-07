/** @format */

import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { loginState } from '../../recoil/appState';
import RestfulUtils from '../../utils/RestfulUtils';
import { toast } from 'react-toastify';
import { Checkbox } from 'react-bootstrap';
function Login(props) {
  const [login, setLogin] = useRecoilState(loginState);
  const [dataGroup, setDataGroup] = useState({ username: '', password: '' });
  const [remember, setRemember] = useState(false);
  useEffect(() => {
    const newDataGroup = { ...dataGroup, username: '', password: '' };
    setDataGroup(newDataGroup);
  }, []);

  const onChange = (type, e) => {
    const newDataGroup = { ...dataGroup };
    newDataGroup[type] = e.target.value;
    setDataGroup(newDataGroup);
  };

  const onChangeRemember = (e) => {
    setRemember(e.target.value);
  };

  const submitGroup = () => {
    const data = {
      ...dataGroup,
      strategy: 'local',
    };

    RestfulUtils.post('http://localhost:3030/authentication', { ...data })
      .then((res) => {
        if (!res.errors && res.status === 201) {
          toast.success('Đăng nhập thành công');
          sessionStorage.setItem('accessToken', res.data.accessToken);
          sessionStorage.setItem('user', JSON.stringify(res.data.user));
          if (remember) {
            localStorage.setItem('accessToken', res.data.accessToken);
            localStorage.setItem('user', JSON.stringify(res.data.user));
          }

          setLogin(true);
        } else {
          toast.error('Tài khoản hoặc mật khẩu không đúng');
        }
      })
      .catch((error) => {
        console.log('catch', error);
      });
  };
  return (
    <div
      style={{ display: 'flex', justifyContent: 'center', marginTop: '150px' }}
    >
      <div
        style={{
          borderColor: 'rgba(123, 102, 102, 0.43)',
          padding: '10px',
        }}
        className='panel col-md-6 col-12 panel-success'
      >
        <div className='title-content col-md-6'>Đăng nhập</div>
        <div className='panel-body'>
          <div className='add-info-account'>
            <div className='col-md-12 ' style={{ paddingTop: '11px' }}>
              <div className='col-md-12 row'>
                <div className='col-md-3'>
                  <h5 className='highlight'>
                    <b>Tài khoản</b>
                  </h5>
                </div>
                <div className='col-md-9'>
                  <input
                    maxLength={255}
                    className='form-control'
                    type='text'
                    placeholder={'Tài khoản'}
                    id='txtUsername'
                    value={dataGroup.username}
                    onChange={(e) => onChange('username', e)}
                  />
                </div>
              </div>

              <div className='col-md-12 row'>
                <div className='col-md-3'>
                  <h5 className='highlight'>
                    <b>Mật khẩu</b>
                  </h5>
                </div>
                <div className='col-md-9'>
                  <input
                    maxLength={255}
                    className='form-control'
                    type='password'
                    placeholder={'Mật khẩu'}
                    id='txtPassword'
                    value={dataGroup.password}
                    onChange={(e) => onChange('password', e)}
                  />
                </div>
              </div>

              <div className='col-md-12 row'>
                <div className='col-md-3'>
                  <Checkbox value={remember} onChange={onChangeRemember}>
                    Nhớ đăng nhập
                  </Checkbox>
                </div>
              </div>

              <div className='col-md-12 row'>
                <div className='pull-right'>
                  <input
                    type='button'
                    onClick={submitGroup}
                    className='btn btn-primary'
                    style={{ marginRight: 15 }}
                    value={'Submit'}
                    id='btnSubmit'
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
