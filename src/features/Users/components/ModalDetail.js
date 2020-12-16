/** @format */

import React, { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import RestfulUtils from '../../../utils/RestfulUtils';
import { toast } from 'react-toastify';

function ModalDetail(props) {
  const {
    show = false,
    DATA,
    isClear,
    change,
    handleClose,
    access,
    titleModal,
    load,
  } = props;

  const [dataGroup, setDataGroup] = useState({
    _id: '',
    name: '',
    username: '',
    coin: '',
    role: 1,
    status: true,
  });

  useEffect(() => {
    const newDataGroup = {
      ...dataGroup,
      _id: DATA._id || '',
      name: DATA.name || '',
      username: DATA.username || '',
      coin: DATA.coin || '',
      role: DATA.role || 1,
      status: DATA.status || false,
    };

    setDataGroup(newDataGroup);
  }, [DATA, show]);

  const onChange = (type, e) => {
    const newDataGroup = { ...dataGroup };
    newDataGroup[type] = e.target.value;
    setDataGroup(newDataGroup);
  };

  const submitGroup = () => {
    const data = {
      ...dataGroup,
      coin: dataGroup.coin && access == 'ADD' ? dataGroup.coin : 2000,
      password: dataGroup.username,
    };
    delete data._id;
    if (access === 'EDIT') {
      delete data.username;
      delete data.password;
    }

    if (access === 'ADD') {
      RestfulUtils.post('http://localhost:3030/users', { ...data })
        .then((res) => {
          if (res.status === 201 || res.status === 200) {
            toast.success('Thành công');
            handleClose();
            load();
          } else {
            toast.error(res.message);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (access === 'EDIT') {
      RestfulUtils.patch('http://localhost:3030/users/' + dataGroup._id, {
        ...data,
      })
        .then((res) => {
          if (res.status === 201 || res.status === 200) {
            toast.success('Thành công');
            handleClose();
            load();
          } else {
            toast.error(res.message);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      RestfulUtils.remove('http://localhost:3030/users/' + dataGroup._id)
        .then((res) => {
          if (res.status === 201 || res.status === 200) {
            toast.success('Thành công');
            handleClose();
            load();
          } else {
            toast.error(res.message);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const render = () => {
    let xhtml = null;
    if (access === 'DELETE') {
      xhtml = (
        <Modal show={show}>
          <Modal.Header>
            <Modal.Title>
              <div className='title-content col-md-6'>
                {titleModal}{' '}
                <button type='button' className='close' onClick={handleClose}>
                  <span aria-hidden='true'>×</span>
                  <span className='sr-only'>Close</span>
                </button>
              </div>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ overflow: 'auto' }}>
            <div className='panel-body'>
              <div className='add-info-account'>
                <div
                  className={
                    access == 'VIEW' ? 'col-md-12 disable' : 'col-md-12 '
                  }
                  style={{ paddingTop: '11px' }}
                >
                  <div className='col-md-12 row'>
                    <div className='col-md-12'>
                      <h5 className='highlight'>
                        <b>{`Bạn có chắc chắn muốn xóa ${dataGroup.name}`}</b>
                      </h5>
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
          </Modal.Body>
        </Modal>
      );
    } else {
      xhtml = (
        <Modal show={show}>
          <Modal.Header>
            <Modal.Title>
              <div className='title-content col-md-6'>
                {titleModal}{' '}
                <button type='button' className='close' onClick={handleClose}>
                  <span aria-hidden='true'>×</span>
                  <span className='sr-only'>Close</span>
                </button>
              </div>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ overflow: 'auto' }}>
            <div className='panel-body'>
              <div className='add-info-account'>
                <div
                  className={
                    access == 'VIEW' ? 'col-md-12 disable' : 'col-md-12 '
                  }
                  style={{ paddingTop: '11px' }}
                >
                  <div className='col-md-12 row'>
                    <div className='col-md-3'>
                      <h5 className='highlight'>
                        <b>Họ và tên</b>
                      </h5>
                    </div>
                    <div className='col-md-9'>
                      <input
                        maxLength={255}
                        className='form-control'
                        type='text'
                        placeholder={'Họ và tên'}
                        id='txtName'
                        value={dataGroup.name}
                        onChange={(e) => onChange('name', e)}
                      />
                    </div>
                  </div>

                  <div className='col-md-12 row'>
                    <div className='col-md-3'>
                      <h5 className='highlight'>
                        <b>Tài khoản</b>
                      </h5>
                    </div>
                    <div className='col-md-9'>
                      <input
                        disabled={access == 'ADD' ? false : true}
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
                      <h5 className=''>
                        <b>Coin</b>
                      </h5>
                    </div>
                    <div className='col-md-9'>
                      <input
                        maxLength={255}
                        className='form-control'
                        type='number'
                        placeholder={'Coin'}
                        id='txtCoin'
                        value={dataGroup.coin}
                        onChange={(e) => onChange('coin', e)}
                      />
                    </div>
                  </div>

                  <div className='col-md-12 row'>
                    <div className='col-md-3'>
                      <h5 className='highlight'>
                        <b>Quyền hạn</b>
                      </h5>
                    </div>
                    <div className='col-md-9'>
                      <select
                        className='form-control'
                        onChange={(e) => onChange('role', e)}
                      >
                        <option
                          selected={dataGroup.role == 1 ? true : false}
                          value='1'
                        >
                          Học viên
                        </option>
                        <option
                          selected={dataGroup.role == 2 ? true : false}
                          value='2'
                        >
                          Biên tập viên
                        </option>
                      </select>
                    </div>
                  </div>

                  <div className='col-md-12 row'>
                    <div className='col-md-3'>
                      <h5 className='highlight'>
                        <b>Trạng thái</b>
                      </h5>
                    </div>
                    <div className='col-md-9'>
                      <select
                        className='form-control'
                        onChange={(e) => onChange('status', e)}
                      >
                        <option
                          selected={dataGroup.status ? true : false}
                          value='true'
                        >
                          Hoạt động
                        </option>
                        <option
                          selected={!dataGroup.status ? true : false}
                          value='false'
                        >
                          Khóa
                        </option>
                      </select>
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
          </Modal.Body>
        </Modal>
      );
    }
    return xhtml;
  };
  return (
    <div>
      {/* <ToastContainer
        position='bottom-right'
        autoClose={2000}
        closeOnClick
        pauseOnHover
      /> */}
      {render()}
    </div>
  );
}

export default ModalDetail;
