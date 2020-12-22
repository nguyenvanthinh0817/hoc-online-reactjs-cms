import React, { useEffect, useState } from 'react';
import RestfulUtils from '../../utils/RestfulUtils';
import Chart from './components/Chart';
function ThongKeDoanhSo(props) {
  const [year, setYear] = useState('2020');
  const [months, setMonths] = useState({
    0: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
    8: 0,
    9: 0,
    10: 0,
    11: 0,
  });
  const quys = [1, 2, 3, 4];

  const onChange = (e) => {
    setYear(e.target.value);
  };

  useEffect(() => {
    const startYear = new Date(`${year}-1-1`);
    const endDate = new Date(`${year}-12-31`);

    RestfulUtils.get(`http://localhost:3030/refill-coins?$limit=9999&status=2&createdAt[$gte]=${startYear.getTime()}&createdAt[$lte]=${endDate.getTime()}`).then(
      (res) => {
        if (res && res.status == 200) {
          const { data } = res.data;
          const newMonths = {
            0: 0,
            1: 0,
            2: 0,
            3: 0,
            4: 0,
            5: 0,
            6: 0,
            7: 0,
            8: 0,
            9: 0,
            10: 0,
            11: 0,
          };
          data.forEach((item) => {
            const itemDate = new Date(item.createdAt);
            newMonths[itemDate.getMonth()] = newMonths[itemDate.getMonth()] + item.amount;
          });
          setMonths(newMonths);
        }
      }
    );
  }, [year]);

  const fomatNumber = (val) => {
    return val.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,');
  };

  return (
    <div className='container'>
      <h1>Thống kê doanh số</h1>
      <div>
        <div className='form-group'>
          <label className=''>Năm: </label>
          <select className='form-control' value={year} onChange={onChange}>
            <option value='2019'>2019</option>
            <option value='2020'>2020</option>
            <option value='2021'>2021</option>
            <option value='2022'>2022</option>
            <option value='2023'>2023</option>
            <option value='2024'>2024</option>
            <option value='2025'>2025</option>
          </select>
        </div>
      </div>
      <div className='panel panel-primary' style={{ marginTop: '20px' }}>
        <div className='show panel-body'>
          {quys.map((item, index) => {
            let totalMoney = `${months[index * 3] + months[index * 3 + 1] + months[index * 3 + 2]}`;
            let xhtml = (
              <div className='col-md-6 col-12'>
                <div className='panel panel-primary'>
                  <div className='panel-heading'>
                    <h3 className='panel-title'>{`Tổng doanh thu quý ${item}`}</h3>
                  </div>
                  <div className='panel-body'>
                    <div>{fomatNumber(totalMoney)} Đồng</div>
                  </div>
                </div>
              </div>
            );

            return xhtml;
          })}
        </div>
      </div>
    
      <Chart data={months} year={year} />
    </div>
  );
}

export default ThongKeDoanhSo;
