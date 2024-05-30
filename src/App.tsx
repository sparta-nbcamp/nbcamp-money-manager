import React, { useEffect, useState } from 'react';
import {Provider, useDispatch, useSelector} from 'react-redux';
import styled from 'styled-components';
import store, { RootState } from './redux/store';
import { changeMonth, changeFakeData, loadFromLocalStorage } from './redux/fakeDataSlice';

const Button = styled.button`
  padding: 1rem 3rem;
  background-color: #f2f2f2;
  border-radius: 0.5rem;
  border: 0.25rem solid #f2f2f2;
  font-size: 1rem;
  font-weight: 600;
  color: #333;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #dcd9d9;
    border-color: #dcd9d9;
  }

  &:focus {
    outline: none;
  }
`;

function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

type ModalData = {
  id: string;
};

const AppContent: React.FC = () => {
  const dispatch = useDispatch();
  const { month, fakeData } = useSelector((state: RootState) => state.fakeData);
  const [modalData, setModalData] = useState<ModalData>({ id: '' });

  useEffect(() => {
    dispatch(loadFromLocalStorage());
  }, [dispatch]);

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        padding: '1rem 3rem',
      }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(6, 1fr)',
          gap: '1rem',
          background: 'aqua',
          padding: '1rem',
          borderRadius: '0.5rem',
        }}
      >
        {Array.from({ length: 12 }, (_, i) => (
          <Button key={i} onClick={() => dispatch(changeMonth(i))} style={{ backgroundColor: month === i ? 'aqua' : '' }}>
            {i + 1}월
          </Button>
        ))}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
        <div
          style={{
            display: 'flex',
            gap: '1rem',
            padding: '1rem',
            background: 'aqua',
            borderRadius: '0.5rem',
            boxShadow: '0 0 0.5rem rgba(0, 0, 0, 0.1)',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <div style={{ display: 'flex' }}>
            <label> 날짜 </label>
            <input type="date" defaultValue={new Date().toISOString().split('T')[0]} id="date" />
          </div>
          <div style={{ display: 'flex' }}>
            <label> 항목 </label>
            <input type="text" id="item" />
          </div>
          <div style={{ display: 'flex' }}>
            <label> 금액 </label>
            <input type="number" id="amount" />
          </div>
          <div style={{ display: 'flex' }}>
            <label> 내용 </label>
            <input type="text" id="description" />
          </div>
          <button
            onClick={() => {
              const newData = [
                ...fakeData,
                {
                  id: uuidv4(),
                  date: (document.getElementById('date') as HTMLInputElement).value,
                  item: (document.getElementById('item') as HTMLInputElement).value,
                  amount: parseInt((document.getElementById('amount') as HTMLInputElement).value),
                  description: (document.getElementById('description') as HTMLInputElement).value,
                },
              ];
              dispatch(changeFakeData(newData));
              alert('저장되었습니다.');
            }}
          >
            저장
          </button>
        </div>
        {fakeData
          .filter((data) => new Date(data.date).getMonth() === month)
          .map((data) => (
            <div
              key={data.id}
              style={{
                display: 'flex',
                padding: '1rem',
                background: 'white',
                borderRadius: '0.5rem',
                boxShadow: '0 0 0.5rem rgba(0, 0, 0, 0.1)',
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1, flexShrink: 1 }}>
                <div style={{ fontSize: '0.6rem', color: 'gray' }}> {data.date} </div>
                <a
                  style={{
                    fontSize: '1rem',
                    fontWeight: 600,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                  href="#"
                  onClick={() => {
                    setModalData({ id: data.id });
                  }}
                >
                  {data.item} : {data.description}
                </a>
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', flexShrink: 0, whiteSpace: 'nowrap', marginLeft: '1rem' }}>
                <div> {data.amount.toLocaleString()}원 </div>
              </div>
            </div>
          ))}
      </div>
      {modalData.id && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              background: 'white',
              padding: '1rem',
              borderRadius: '0.5rem',
              boxShadow: '0 0 0.5rem rgba(0, 0, 0, 0.1)',
            }}
          >
            <div> 수정 </div>
            <div>
              <div>
                <label> 날짜 </label>
                <input type="date" defaultValue={fakeData.find((data) => data.id === modalData.id)?.date} id="modifyDate" />
              </div>
              <div>
                <label> 항목 </label>
                <input type="text" defaultValue={fakeData.find((data) => data.id === modalData.id)?.item} id="modifyItem" />
              </div>
              <div>
                <label> 금액 </label>
                <input type="number" defaultValue={fakeData.find((data) => data.id === modalData.id)?.amount} id="modifyAmount" />
              </div>
              <div>
                <label> 내용 </label>
                <input type="text" defaultValue={fakeData.find((data) => data.id === modalData.id)?.description} id="modifyDescription" />
              </div>
            </div>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button
                onClick={() => {
                  const modifiedData = fakeData.map((data) => {
                    if (data.id === modalData.id) {
                      return {
                        id: data.id,
                        date: (document.getElementById('modifyDate') as HTMLInputElement).value,
                        item: (document.getElementById('modifyItem') as HTMLInputElement).value,
                        amount: parseInt((document.getElementById('modifyAmount') as HTMLInputElement).value),
                        description: (document.getElementById('modifyDescription') as HTMLInputElement).value,
                      };
                    }
                    return data;
                  });
                  dispatch(changeFakeData(modifiedData));
                  setModalData({ id: '' });
                }}
              >
                수정
              </button>
              <button
                onClick={() => {
                  const newData = fakeData.filter((data) => data.id !== modalData.id);
                  dispatch(changeFakeData(newData));
                  setModalData({ id: '' });
                }}
              >
                삭제
              </button>
              <button onClick={() => setModalData({ id: '' })}> 닫기 </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const App: React.FC = () => (
  <Provider store={store}>
    <AppContent />
  </Provider>
);

export default App;
