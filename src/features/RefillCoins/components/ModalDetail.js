/** @format */

import React, { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import RestfulUtils from '../../../utils/RestfulUtils';
import { toast } from 'react-toastify';

function ModalDetail(props) {
  const { show = false, DATA, isClear, change, handleClose, access, titleModal, load } = props;

  const [dataGroup, setDataGroup] = useState({
    _id: '',
    name: '',
    username: '',
    bankAccount: '',
    bankNameAdmin: '',
    amount: '',
    content: '',
    status: 1,
  });

  useEffect(() => {
    const newDataGroup = {
      ...dataGroup,
      _id: DATA._id || '',
      name: DATA.name || '',
      username: DATA.username || '',
      bankAccount: DATA.bankAccount || '',
      bankNameAdmin: DATA.bankNameAdmin || '',
      amount: DATA.amount || '',
      content: DATA.content || '',
      status: DATA.status || 1,
    };

    setDataGroup(newDataGroup);
  }, [DATA, show]);

  const onChange = (type, e) => {
    const newDataGroup = { ...dataGroup };
    newDataGroup[type] = e.target.value;
    setDataGroup(newDataGroup);
  };

  const submitGroup = (type) => {
    const data = {
      ...dataGroup,
      coin: dataGroup.coin || 0,
      password: dataGroup.username,
    };
    delete data._id;

    if (access === 'VIEW') {
      RestfulUtils.patch('http://localhost:3030/refill-coins/' + dataGroup._id, {
        ...data,
        status: type ? 2 : 3,
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
      RestfulUtils.remove('http://localhost:3030/refill-coins/' + dataGroup._id)
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
                <div className={access == 'VIEW' ? 'col-md-12 disable' : 'col-md-12 '} style={{ paddingTop: '11px' }}>
                  <div className='col-md-12 row'>
                    <div className='col-md-12'>
                      <h5 className=''>
                        <b>{`Bạn có chắc chắn muốn xóa ${dataGroup.name}`}</b>
                      </h5>
                    </div>
                  </div>

                  <div className='col-md-12 row'>
                    <div className='pull-right'>
                      <input type='button' onClick={submitGroup} className='btn btn-primary' style={{ marginRight: 15 }} value={'Submit'} id='btnSubmit' />
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
                <div className={access == 'VIEW' ? 'col-md-12' : 'col-md-12 '} style={{ paddingTop: '11px' }}>
                  <div className='col-md-12 row'>
                    <div className='col-md-3'>
                      <h5 className=''>
                        <b>Họ và tên</b>
                      </h5>
                    </div>
                    <div className='col-md-9'>
                      <input
                        disabled
                        maxLength={255}
                        className='form-control'
                        type='text'
                        placeholder={'Họ và tên'}
                        id='txtName'
                        value={dataGroup.name}
                        // onChange={(e) => onChange('name', e)}
                      />
                    </div>
                  </div>

                  <div className='col-md-12 row'>
                    <div className='col-md-3'>
                      <h5 className=''>
                        <b>Tài khoản</b>
                      </h5>
                    </div>
                    <div className='col-md-9'>
                      <input
                        disabled
                        maxLength={255}
                        className='form-control'
                        type='text'
                        placeholder={'Tài khoản'}
                        id='txtUsername'
                        value={dataGroup.username}
                        // onChange={(e) => onChange('username', e)}
                      />
                    </div>
                  </div>

                  <div className='col-md-12 row'>
                    <div className='col-md-3'>
                      <h5 className=''>
                        <b>Số tài khoản ngân hàng</b>
                      </h5>
                    </div>
                    <div className='col-md-9'>
                      <input
                        disabled
                        maxLength={255}
                        className='form-control'
                        type='number'
                        placeholder={'Số tài khoản ngân hàng'}
                        id='bankAccount'
                        value={dataGroup.bankAccount}
                        // onChange={(e) => onChange('bankA', e)}
                      />
                    </div>
                  </div>

                  <div className='col-md-12 row'>
                    <div className='col-md-3'>
                      <h5 className=''>
                        <b>Tên ngân hàng nhận</b>
                      </h5>
                    </div>
                    <div className='col-md-9'>
                      <input
                        disabled
                        maxLength={255}
                        className='form-control'
                        type='text'
                        placeholder={'Số tài khoản ngân hàng'}
                        id='bankNameAdmin'
                        value={dataGroup.bankNameAdmin}
                        // onChange={(e) => onChange('bankA', e)}
                      />
                    </div>
                  </div>

                  <div className='col-md-12 row'>
                    <div className='col-md-3'>
                      <h5 className=''>
                        <b>Số tiền</b>
                      </h5>
                    </div>
                    <div className='col-md-9'>
                      <input
                        disabled
                        maxLength={255}
                        className='form-control'
                        type='number'
                        placeholder={'Số tiền'}
                        id='amount'
                        value={dataGroup.amount}
                        // onChange={(e) => onChange('bankA', e)}
                      />
                    </div>
                  </div>

                  <div className='col-md-12 row'>
                    <div className='col-md-3'>
                      <h5 className=''>
                        <b>Nội dung</b>
                      </h5>
                    </div>
                    <div className='col-md-9'>
                      <div style={{ minHeight: '100px' }} className='form-control' disabled>
                        {dataGroup.content}
                      </div>
                    </div>
                  </div>

                  <div className='col-md-12 row'>
                    <div className='col-md-3'>
                      <h5 className=''>
                        <b>Trạng thái</b>
                      </h5>
                    </div>
                    <div className='col-md-9'>
                      <select className='form-control' value={dataGroup.status} disabled>
                        <option value='1'>Chờ duyệt</option>
                        <option value='2'>Đã duyệt</option>
                        <option value='3'>Đã từ chối</option>
                      </select>
                    </div>
                  </div>

                  <div className='col-md-12 row'>
                    <div className='pull-right'>
                      <input
                        type='button'
                        disabled={dataGroup.status == 1 ? false : true}
                        onClick={() => submitGroup(true)}
                        className='btn btn-success'
                        style={{ marginRight: 15 }}
                        value={'Duyệt'}
                        id='btnSubmit'
                      />
                    </div>
                    <div className='pull-right'>
                      <input
                        type='button'
                        disabled={dataGroup.status == 1 ? false : true}
                        onClick={() => submitGroup(false)}
                        className='btn btn-warning'
                        style={{ marginRight: 15 }}
                        value={'Từ chối'}
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
