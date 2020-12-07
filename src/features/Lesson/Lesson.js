/** @format */

import React, { useState } from 'react';
import LessonTable from './components/LessonTable.js';
import ModalDetail from './components/ModalDetail';
function Lesson(props) {
  const [DATA, setDATA] = useState({});
  const [titleModal, setTitleModal] = useState('');
  const [isClear, setIsClear] = useState(true);
  const [loadgrid, setLoadgrid] = useState(true);
  const [access, setAccess] = useState('ADD');
  const [showModal, setShowModal] = useState(false);

  const handleClose = () => setShowModal(false);

  const showModalDetail = (access, DATAUPDATE) => {
    let titleModal = '';
    let DATA = '';

    switch (access) {
      case 'ADD':
        titleModal = 'Thêm';
        break;
      case 'EDIT':
        titleModal = 'Sửa';
        break;
      case 'VIEW':
        titleModal = 'Chi tiết';
        break;
      case 'DELETE':
        titleModal = 'Xóa';
        break;
    }
    if (DATAUPDATE !== undefined) {
      DATA = DATAUPDATE;
    }

    setShowModal(true);
    setAccess(access);
    setTitleModal(titleModal);
    setDATA(DATA);
    setIsClear(true);
    setLoadgrid(false);
  };
  const change = () => {
    setIsClear(false);
  };
  const load = () => {
    setLoadgrid(true);
  };
  return (
    <div
      style={{
        borderColor: 'rgba(123, 102, 102, 0.43)',
        padding: '10px',
      }}
      className='container panel panel-success margintopNewUI'
    >
      <div className='title-content'>Bài học</div>
      <div className='panel-body' style={{ padding: '10px 0' }}>
        <LessonTable load={load} loadgrid={loadgrid} showModalDetail={showModalDetail} />
      </div>

      <ModalDetail
        load={load}
        show={showModal}
        access={access}
        DATA={DATA}
        change={change}
        isClear={isClear}
        handleClose={handleClose}
        titleModal={titleModal}
      />
    </div>
  );
}

export default Lesson;
