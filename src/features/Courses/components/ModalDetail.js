/** @format */

import React, { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import RestfulUtils from '../../../utils/RestfulUtils';
import { toast } from 'react-toastify';
import Select from 'react-select';

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
    description: '',
    avatar: '',
    teacher: '',
    price: '',
    lessons: [],
    users: [],
    status: false,
  });

  const [users, setUsers] = useState([]);
  const [lessons, setLessions] = useState([]);
  const [addUsers, setAddUsers] = useState([]);
  const [addLessons, setAddLessons] = useState([]);
  const [subUsers, setSubUsers] = useState([]);
  const [subLessons, setSubLessons] = useState([]);

  useEffect(() => {
    const newDataGroup = {
      ...dataGroup,
      _id: DATA._id || '',
      title: DATA.title || '',
      avatar: DATA.avatar || '',
      description: DATA.description || '',
      teacher: DATA.teacher || '',
      price: DATA.price || '',
      lessons: transactionState(DATA.lessons || []) || [],
      users: transactionState(DATA.users || []) || [],
      status: DATA.status || true,
    };

    setDataGroup(newDataGroup);

    setSubLessons([]);
    setSubUsers([]);
    setAddUsers([]);
    setAddLessons([]);
  }, [DATA, show]);

  const handleCloses = () => {
    handleClose();
  };
  const transaction = (arr = [], key) => {
    const newArr = arr.map((item) => {
      return { value: item._id, label: item[key] };
    });
    return newArr;
  };

  const transactionState = (arr = []) => {
    return arr.map((item) => item._id);
  };

  const transactionSelect = (arr = []) => {
    return arr.map((item) => item.value);
  };
  useEffect(() => {
    RestfulUtils.get('http://localhost:3030/users').then((res) => {
      setUsers(res.data.data);
    });
    RestfulUtils.get('http://localhost:3030/lessons').then((res) => {
      setLessions(res.data.data);
    });
  }, []);

  const onChange = (type, e) => {
    const newDataGroup = { ...dataGroup };
    newDataGroup[type] = e.target.value;
    setDataGroup(newDataGroup);
  };

  const onChangeSelect = (data, setSelect) => {
    setSelect(data);
  };

  const submitGroup = () => {
    const data = {
      ...dataGroup,
    };

    const totalLesson = data.lessons.length;

    data.totalLesson = totalLesson;
    const newUsers = data.users
      .filter((item) => {
        console.log(!transactionSelect(subUsers || []).includes(item));
        return !transactionSelect(subUsers || []).includes(item);
      })
      .concat(transactionSelect(addUsers || []));

    const newLessons = data.lessons
      .filter((item) => {
        return !transactionSelect(subLessons || []).includes(item);
      })
      .concat(transactionSelect(addLessons || []));

    data.lessons = newLessons;
    data.users = newUsers;

    delete data._id;

    if (access === 'ADD') {
      RestfulUtils.post('http://localhost:3030/courses', { ...data })
        .then((res) => {
          if (res.status === 201 || res.status === 200) {
            toast.success('Thành công');
            handleClose();
            load();
          } else {
            if (res.code === 401) {
              toast.error('Phiên bản hết hạn', { position: 'top-center' });
            } else {
              toast.error(res.message);
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (access === 'EDIT') {
      RestfulUtils.patch('http://localhost:3030/courses/' + dataGroup._id, {
        ...data,
      })
        .then((res) => {
          if ((res.status && res.status === 201) || res.status === 200) {
            toast.success('Thành công');
            handleClose();
            load();
          } else {
            if (res.code === 401) {
              toast.error('Phiên bản hết hạn', { position: 'top-center' });
            } else {
              toast.error(res.message);
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      RestfulUtils.remove('http://localhost:3030/courses/' + dataGroup._id)
        .then((res) => {
          if (res.status === 201 || res.status === 200) {
            toast.success('Thành công');
            handleClose();
            load();
          } else {
            if (res.code === 401) {
              toast.error('Phiên bản hết hạn', { position: 'top-center' });
            } else {
              toast.error(res.message);
            }
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
                <button
                  type='button'
                  className='close'
                  onClick={() => handleCloses()}
                >
                  <span aria-hidden='true'>×</span>
                  <span className='sr-only'>Close</span>
                </button>
              </div>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ overflow: 'auto', height: '100%' }}>
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
                        <b>Tên khóa học</b>
                      </h5>
                    </div>
                    <div className='col-md-9'>
                      <input
                        maxLength={255}
                        className='form-control'
                        type='text'
                        placeholder={'Tên khóa học'}
                        id='txtTitle'
                        value={dataGroup.title}
                        onChange={(e) => onChange('title', e)}
                      />
                    </div>
                  </div>

                  <div className='col-md-12 row'>
                    <div className='col-md-3'>
                      <h5 className=''>
                        <b>Giáo viên</b>
                      </h5>
                    </div>
                    <div className='col-md-9'>
                      <input
                        // disabled={access == 'ADD' ? false : true}
                        maxLength={255}
                        className='form-control'
                        type='text'
                        placeholder={'Giáo viên'}
                        id='txtTeacher'
                        value={dataGroup.teacher}
                        onChange={(e) => onChange('teacher', e)}
                      />
                    </div>
                  </div>

                  <div className='col-md-12 row'>
                    <div className='col-md-3'>
                      <h5 className=''>
                        <b>Url ảnh</b>
                      </h5>
                    </div>
                    <div className='col-md-9'>
                      <input
                        // disabled={access == 'ADD' ? false : true}
                        maxLength={255}
                        className='form-control'
                        type='text'
                        placeholder={'Url ảnh'}
                        id='txtAvatar'
                        value={dataGroup.avatar}
                        onChange={(e) => onChange('avatar', e)}
                      />
                    </div>
                  </div>

                  <div className='col-md-12 row'>
                    <div className='col-md-3'>
                      <h5 className=''>
                        <b>Mô tả</b>
                      </h5>
                    </div>
                    <div className='col-md-9'>
                      <textarea
                        //maxLength={255}
                        className='form-control'
                        // placeholder={'Mô tả'}
                        rows='4'
                        id='txtPrice'
                        value={dataGroup.description}
                        onChange={(e) => onChange('description', e)}
                      />
                    </div>
                  </div>

                  <div
                    className='col-md-12 row'
                    style={{ display: access == 'ADD' ? 'none' : 'block' }}
                  >
                    <div className='col-md-3'>
                      <h5 className=''>
                        <b>
                          {' '}
                          {access == 'VIEW'
                            ? 'Học viên'
                            : ' Khai trừ học viên '}
                        </b>
                      </h5>
                    </div>
                    <div className='col-md-9'>
                      <Select
                        closeMenuOnSelect={false}
                        className='basic-multi-select'
                        classNamePrefix='select'
                        isMulti
                        defaultValue={
                          access == 'VIEW'
                            ? transaction(DATA.users || [], 'username')
                            : []
                        }
                        options={transaction(DATA.users || [], 'username')}
                        onChange={(data) => onChangeSelect(data, setSubUsers)}
                      />
                    </div>
                  </div>

                  <div
                    className='col-md-12 row'
                    style={{ display: access == 'VIEW' ? 'none' : 'block' }}
                  >
                    <div className='col-md-3'>
                      <h5 className=''>
                        <b>Thêm học viên</b>
                      </h5>
                    </div>
                    <div className='col-md-9'>
                      <Select
                        closeMenuOnSelect={false}
                        className='basic-multi-select'
                        classNamePrefix='select'
                        isMulti
                        defaultValue={addUsers}
                        options={transaction(users || [], 'username')}
                        onChange={(data) => onChangeSelect(data, setAddUsers)}
                      />
                    </div>
                  </div>

                  <div
                    className='col-md-12 row'
                    style={{ display: access == 'ADD' ? 'none' : 'block' }}
                  >
                    <div className='col-md-3'>
                      <h5 className=''>
                        <b>
                          {access == 'VIEW' ? 'Bài học' : 'Khai trừ bài học'}
                        </b>
                      </h5>
                    </div>
                    <div className='col-md-9'>
                      <Select
                        closeMenuOnSelect={false}
                        className='basic-multi-select'
                        classNamePrefix='select'
                        isMulti
                        defaultValue={
                          access == 'VIEW'
                            ? transaction(DATA.lessons || [], 'title')
                            : []
                        }
                        options={transaction(DATA.lessons || [], 'title')}
                        onChange={(data) => onChangeSelect(data, setSubLessons)}
                      />
                    </div>
                  </div>

                  <div
                    className='col-md-12 row'
                    style={{ display: access == 'VIEW' ? 'none' : 'block' }}
                  >
                    <div className='col-md-3'>
                      <h5 className=''>
                        <b>Thêm bài học</b>
                      </h5>
                    </div>
                    <div className='col-md-9'>
                      <Select
                        closeMenuOnSelect={false}
                        className='basic-multi-select'
                        classNamePrefix='select'
                        isMulti
                        options={transaction(lessons || [], 'title')}
                        onChange={(data) => onChangeSelect(data, setAddLessons)}
                      />
                    </div>
                  </div>

                  <div className='col-md-12 row'>
                    <div className='col-md-3'>
                      <h5 className=''>
                        <b>Tổng số học viên</b>
                      </h5>
                    </div>
                    <div className='col-md-9'>
                      <input
                        disabled={true}
                        maxLength={255}
                        className='form-control'
                        type='number'
                        placeholder={'Tổng số học viên'}
                        id='txtPrice'
                        value={dataGroup.users.length}
                      />
                    </div>
                  </div>

                  <div className='col-md-12 row'>
                    <div className='col-md-3'>
                      <h5 className=''>
                        <b>Tổng số bài học</b>
                      </h5>
                    </div>
                    <div className='col-md-9'>
                      <input
                        disabled={true}
                        maxLength={255}
                        className='form-control'
                        type='number'
                        placeholder={'Tổng số học viên'}
                        id='txtPrice'
                        value={dataGroup.lessons.length}
                      />
                    </div>
                  </div>

                  <div className='col-md-12 row'>
                    <div className='col-md-3'>
                      <h5 className='highlight'>
                        <b>Giá cả</b>
                      </h5>
                    </div>
                    <div className='col-md-9'>
                      <input
                        maxLength={255}
                        className='form-control'
                        type='number'
                        placeholder={'Giá cả'}
                        id='txtPrice'
                        value={dataGroup.price}
                        onChange={(e) => onChange('price', e)}
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
