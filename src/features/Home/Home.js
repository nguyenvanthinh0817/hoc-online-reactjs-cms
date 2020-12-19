import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import RestfulUtils from '../../utils/RestfulUtils';

function Home(props) {
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalCourses, setTotalCourses] = useState(0);
  const [totalLessons, setTotalLessons] = useState(0);

  useEffect(() => {
    const loadData = (url, setState) => {
      RestfulUtils.get(url).then((res) => {
        if (res.status == 200) {
          setState(res.data.data.length);
        } else {
          if (res.code === 401) {
            toast.error('Phiên bản hết hạn', { position: 'top-center' });
          }
        }
      });
    };

    loadData('http://localhost:3030/users', setTotalUsers);
    loadData('http://localhost:3030/courses', setTotalCourses);
    loadData('http://localhost:3030/lessons', setTotalLessons);
  }, []);
  return (
    <div className='container'>
      <h1>DashBoard</h1>
      <div className='panel panel-primary'>
        <div className='panel-body'>
          <div className='row'>
            <div className='col-md-6 col-12'>
              <div className='panel panel-primary'>
                <div className='panel-heading'>
                  <h3 className='panel-title'>Học viên</h3>
                </div>
                <div className='panel-body'>
                  <div>Tổng số học viên: {totalUsers}</div>
                </div>
              </div>
            </div>

            <div className='col-md-6 col-12'>
              <div className='panel panel-primary'>
                <div className='panel-heading'>
                  <h3 className='panel-title'>Khóa học</h3>
                </div>
                <div className='panel-body'>
                  <div>Tổng số khóa học: {totalCourses}</div>
                </div>
              </div>
            </div>

            <div className='col-md-6 col-12'>
              <div className='panel panel-primary'>
                <div className='panel-heading'>
                  <h3 className='panel-title'>Bài học</h3>
                </div>
                <div className='panel-body'>
                  <div>Tổng số bài học: {totalLessons}</div>
                </div>
              </div>
            </div>

            <div className='col-md-6 col-12'>
              <div className='panel panel-primary'>
                <div className='panel-heading'>
                  <h3 className='panel-title'>Tổng doanh thu</h3>
                </div>
                <div className='panel-body'>
                  <div>Tổng số coin: 100000</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
