/** @format */

import { matchSorter } from 'match-sorter';
import React, { useEffect, useState } from 'react';
import ReactTable from 'react-table-6';
import 'react-table-6/react-table.css';
import { toast } from 'react-toastify';
import RestfulUtils from '../../../utils/RestfulUtils';
function LessonTable(props) {
  const { showModalDetail, loadgrid, load } = props;
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const onClickRow = (state, rowInfo, column, instance) => {
    return {
      onDoubleClick: (e, t) => {
        showModalDetail('VIEW', rowInfo.row._original);
      },
      style: {},
    };
  };
  const handleEdit = (row) => {
    return showModalDetail('EDIT', row.row._original);
  };

  const handleDelete = (row) => {
    return showModalDetail('DELETE', row.row._original);
  };

  useEffect(() => {
    feedData();
  }, [loadgrid]);

  const feedData = () => {
    RestfulUtils.get('http://localhost:3030/lessons').then((res) => {
      if (res.status == 200) {
        setData(res.data.data);
        setTotal(res.data.total);
      } else {
        if (res.code === 401) {
          toast.error('Phiên bản hết hạn', { position: 'top-center' });
        }
      }
    });
  };
  return (
    <div>
      <div className='row'>
        <div
          style={{ padding: 0, marginBottom: '10px' }}
          className='col-md-10 '
        >
          <button
            className='btn btn-primary'
            onClick={() => showModalDetail('ADD')}
            style={{ marginLeft: '15px' }}
          >
            <i class='fas fa-plus' style={{ marginRight: '5px' }}></i>
            Thêm
          </button>
        </div>

        <div style={{ textAlign: 'right' }} className='col-md-2 RightInfo'>
          <h5 className='highlight' style={{ fontWeight: 'bold' }}>
            <i className='fas fa-edit' style={{ textAlign: 'left' }}></i>
            {'Tổng'} {total}
            <span
              style={{ marginLeft: '5px' }}
              className='ReloadButton'
              onClick={() => console.log('asdf')}
            >
              <i class='fas fa-sync-alt'></i>
            </span>
          </h5>
        </div>
      </div>

      <div className='col-md-12' style={{ padding: 0 }}>
        <ReactTable
          style={{
            borderWidth: '1px',
            borderColor: '#aaaaaa',
            borderStyle: 'solid',
          }}
          data={data}
          filterable
          defaultFilterMethod={(filter, row) =>
            String(row[filter.id]) === filter.value
          }
          columns={[
            {
              Header: 'STT',
              id: 'index',
              maxWidth: 50,
              filterable: false,
              Cell: (row) => {
                return (
                  <div style={{ textAlign: 'center' }}>
                    <b style={{ marginRight: '10px' }}> {row.index}</b>
                    <span onClick={() => handleEdit(row)} className=''>
                      <i class='far fa-edit'></i>
                    </span>
                  </div>
                );
              },
            },
            {
              Header: (
                <div className='wordwrap' id='lblName'>
                  Tên bài học
                </div>
              ),
              id: 'title',
              accessor: 'title',
              filterMethod: (filter, rows) =>
                // row[filter.id].startsWith(filter.value) &&
                // row[filter.id].endsWith(filter.value),
                matchSorter(rows, filter.value, { keys: ['title'] }),
              filterAll: true,
            },
            {
              Header: (
                <div className='wordwrap' id='lblName'>
                  url
                </div>
              ),
              id: 'url',
              accessor: 'url',
              filterMethod: (filter, rows) =>
                matchSorter(rows, filter.value, { keys: ['url'] }),
              filterAll: true,
            },
            {
              Header: (
                <div className='wordwrap' id='lblName'>
                  Thứ tự
                </div>
              ),
              id: 'priority',
              accessor: 'priority',
              filterMethod: (filter, rows) =>
                matchSorter(rows, filter.value, { keys: ['priority'] }),
              filterAll: true,
            },

            {
              Header: 'Status',
              id: 'status',
              accessor: 'status',
              Cell: ({ value }) => (value ? 'Active' : 'Blook'),
              filterMethod: (filter, row) => {
                if (filter.value === 'all') {
                  return true;
                }
                if (filter.value === 'true') {
                  return row[filter.id] === true;
                }
                return row[filter.id] === false;
              },
              Filter: ({ filter, onChange }) => (
                <select
                  onChange={(event) => onChange(event.target.value)}
                  style={{ width: '100%' }}
                  value={filter ? filter.value : 'all'}
                >
                  <option value='all'>Hiển thị tất cả</option>
                  <option value='true'>Hoạt động</option>
                  <option value='false'>Khóa</option>
                </select>
              ),
            },
            {
              Header: 'Xóa',
              id: '_id',

              Cell: (row) => (
                <div style={{ textAlign: 'center', color: 'red' }}>
                  <span onClick={() => handleDelete(row)} className=''>
                    <i className='far fa-trash-alt'></i>
                  </span>
                </div>
              ),
              filterable: false,
            },
          ]}
          getTheadTrProps={() => {
            return {
              className: 'head',
            };
          }}
          getTrProps={onClickRow}
          defaultPageSize={10}
          noDataText={'Không có dữ liệu'}
          pageText={'Trang'}
          rowsText={'Dòng'}
          previousText={'Lùi'}
          nextText={'Tiến'}
          className='-striped -highlight'
          style={{
            maxHeight: '600px', // This will force the table body to overflow and scroll, since there is not enough room
          }}
        />
      </div>
    </div>
  );
}

export default LessonTable;
