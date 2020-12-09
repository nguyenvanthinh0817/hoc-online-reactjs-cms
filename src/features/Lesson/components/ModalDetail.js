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
    title: '',
    url: '',
    priority: '',
    status: true,
  });

  useEffect(() => {
    const newDataGroup = {
      ...dataGroup,
      _id: DATA._id || '',
      title: DATA.title || '',
      url: DATA.url || '',
      priority: DATA.priority || '',
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
    };
    delete data._id;

    if (access === 'ADD') {
      RestfulUtils.post('http://localhost:3030/lessons', { ...data })
        .then((res) => {
          if (res.status === 201 || res.status === 200) {
            toast.success('Thành công');
            handleClose();
            load();
          } else {
            console.log(res);
            toast.error(res.message);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (access === 'EDIT') {
      RestfulUtils.patch('http://localhost:3030/lessons/' + dataGroup._id, {
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
      RestfulUtils.remove('http://localhost:3030/lessons/' + dataGroup._id)
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
                        <b>{`Bạn có chắc chắn muốn xóa ${dataGroup.title}`}</b>
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
                      <h5 className=''>
                        <b>Tên bài học</b>
                      </h5>
                    </div>
                    <div className='col-md-9'>
                      <input
                        maxLength={255}
                        className='form-control'
                        type='text'
                        placeholder={'Họ và tên'}
                        id='txtTitle'
                        value={dataGroup.title}
                        onChange={(e) => onChange('title', e)}
                      />
                    </div>
                  </div>

                  <div className='col-md-12 row'>
                    <div className='col-md-3'>
                      <h5 className='highlight'>
                        <b>Url</b>
                      </h5>
                    </div>
                    <div className='col-md-9'>
                      <input
                        // disabled={access == 'ADD' ? false : true}
                        maxLength={255}
                        className='form-control'
                        type='text'
                        placeholder={'Url'}
                        id='txtUrl'
                        value={dataGroup.url}
                        onChange={(e) => onChange('url', e)}
                      />
                    </div>
                  </div>

                  <div className='col-md-12 row'>
                    <div className='col-md-3'>
                      <h5 className='highlight'>
                        <b>Thứ tự</b>
                      </h5>
                    </div>
                    <div className='col-md-9'>
                      <input
                        maxLength={255}
                        className='form-control'
                        type='number'
                        placeholder={'Thứ tự'}
                        id='txtPriority'
                        value={dataGroup.priority}
                        onChange={(e) => onChange('priority', e)}
                      />
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
