import styled from 'styled-components'
import {useEffect, useState} from "react";

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
`

function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

type fakeData = {   id: string;   date: string;   item: string;   amount: number;  description: string }[]

function App() {
  const [month, setMonth] = useState(0)
  const [fakeData, setFakeData] = useState<fakeData>([
    {
      "id": "25600f72-56b4-41a7-a9c2-47358580e2f8",
      "date": "2024-01-05",
      "item": "식비",
      "amount": 100000,
      "description": "세광양대창"
    },
    {
      "id": "25600f72-53b4-4187-a9c2-47358580e2f8",
      "date": "2024-01-10",
      "item": "도서",
      "amount": 40500,
      "description": "모던 자바스크립트"
    },
    {
      "id": "24310f72-56b4-41a7-a9c2-458580ef1f8",
      "date": "2024-02-02",
      "item": "식비",
      "amount": 50000,
      "description": "회식"
    },
    {
      "id": "25600f72-99b4-41z7-e4h6-47312365e2f8",
      "date": "2024-02-02",
      "item": "간식",
      "amount": 500,
      "description": "아이스크림"
    },
    {
      "id": "25143e72-16e2-22a7-a9c2-47358580e2f8",
      "date": "2024-02-02",
      "item": "여행",
      "amount": 1055000,
      "description": "일본여행"
    },
    {
      "id": "25600f72-97p2-14a7-a9c2-47363950e2t8",
      "date": "2024-02-02",
      "item": "미용",
      "amount": 155000,
      "description": "미용실"
    },
    {
      "id": "24312f70-97q2-14a7-a9c2-47132950e2t8",
      "date": "2024-02-02",
      "item": "도서",
      "amount": 75000,
      "description": "자율주행차량 운전주행모드 자동 전환용 인식률 90% 이상의 다중 센서 기반 운전자 상태 인식 및 상황 인식 원천 기술 개발"
    }
  ])
  type ModalData = {
    id: string;
  }
  const [modalData, setModalData] = useState<ModalData>({id: ""})

  useEffect(() => {
    const month = localStorage.getItem("month")
    if (month) {
      setMonth(parseInt(month))
    }
    const fakeData = localStorage.getItem("fakeData")
    if (fakeData) setFakeData(JSON.parse(fakeData))
  }, [])
  const changeMonth = (month: number) => {
    setMonth(month)
    localStorage.setItem("month", month.toString())
  }
  const changeFakeData = (fakeData: fakeData) => {
    setFakeData(fakeData)
    localStorage.setItem("fakeData", JSON.stringify(fakeData))
  }

  return (
    <div style={{display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", padding: "1rem 3rem"}}>
      <div style={{display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: "1rem", background: "aqua", padding: "1rem", borderRadius: "0.5rem"}}>
        {Array.from({ length: 12 }, (_, i) => (
          <Button key={i} onClick={() => changeMonth(i)} style={{backgroundColor: month === i ? "aqua" : ""}}> {i + 1}월 </Button>
        ))}
      </div>
      <div style={{display: "flex", flexDirection: "column", gap: "1rem", marginTop: "1rem"}}>

        {/* 입력란 */}
        <div style={{display: "flex", gap: "1rem", padding: "1rem", background: "aqua", borderRadius: "0.5rem", boxShadow: "0 0 0.5rem rgba(0, 0, 0, 0.1)", justifyContent: "center", alignItems: "center"}}>
          <div style={{display: "flex"}}>
            <label> 날짜 </label>
            <input type="date" defaultValue={new Date().toISOString().split("T")[0]} id="date"/>
          </div>
          <div style={{display: "flex"}}>
            <label> 항목 </label>
            <input type="text" id="item"/>
          </div>
          <div style={{display: "flex"}}>
            <label> 금액 </label>
            <input type="number" id="amount"/>
          </div>
          <div style={{display: "flex"}}>
            <label> 내용 </label>
            <input type="text" id="description"/>
          </div>
          <button onClick={() => {
            changeFakeData([...fakeData, {
              "id": uuidv4(),
              "date": (document.getElementById("date") as HTMLInputElement).value,
              "item": (document.getElementById("item") as HTMLInputElement).value,
              "amount": parseInt((document.getElementById("amount") as HTMLInputElement).value),
              "description": (document.getElementById("description") as HTMLInputElement).value
            }]);
            alert("저장되었습니다.");
          }}> 저장 </button>
        </div>
          {fakeData.filter(data => new Date(data.date).getMonth() === month).map(data => (
          <div style={{display: "flex", padding: "1rem", background: "white", borderRadius: "0.5rem", boxShadow: "0 0 0.5rem rgba(0, 0, 0, 0.1)"}}>
            <div style={{display: "flex", flexDirection: "column", gap: "0.5rem", flex: 1, flexShrink: 1}}>
              <div style={{fontSize: "0.6rem", color: "gray"}}> {data.date} </div>
              <a style={{fontSize: "1rem", fontWeight: 600, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap"}} href="#" onClick={() => {
                setModalData({id: data.id})
              }}>
                {data.item} : {data.description}
              </a>
            </div>
            <div style={{display: "flex", justifyContent: "flex-end", flexShrink: 0, whiteSpace: "nowrap", marginLeft: "1rem"}}>
              <div> {data.amount.toLocaleString()}원 </div>
            </div>
          </div>
        ))}
      </div>

      {/* 모달, 데이터 수정 및 삭제 버튼 추가해서 가능하게끔. */}
      {modalData.id && (
        <div style={{position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", background: "rgba(0, 0, 0, 0.5)", display: "flex", alignItems: "center", justifyContent: "center"}}>
          <div style={{background: "white", padding: "1rem", borderRadius: "0.5rem", boxShadow: "0 0 0.5rem rgba(0, 0, 0, 0.1)"}}>
            <div> 수정 </div>

            <div>
              <div>
                <label> 날짜 </label>
                <input type="date" defaultValue={fakeData.find(data => data.id === modalData.id)?.date} id="modifyDate"/>
              </div>
              <div>
                <label> 항목 </label>
                <input type="text" defaultValue={fakeData.find(data => data.id === modalData.id)?.item} id="modifyItem"/>
              </div>
              <div>
                <label> 금액 </label>
                <input type="number" defaultValue={fakeData.find(data => data.id === modalData.id)?.amount} id="modifyAmount"/>
              </div>
              <div>
                <label> 내용 </label>
                <input type="text" defaultValue={fakeData.find(data => data.id === modalData.id)?.description} id="modifyDescription"/>
              </div>
            </div>

            <div style={{display: "flex", gap: "1rem"}}>
              <button onClick={() => {
                const modifiedData = fakeData.map(data => {
                  if (data.id === modalData.id) {
                    return {
                      "id": data.id,
                      "date": (document.getElementById("modifyDate") as HTMLInputElement).value,
                      "item": (document.getElementById("modifyItem") as HTMLInputElement).value,
                      "amount": parseInt((document.getElementById("modifyAmount") as HTMLInputElement).value),
                      "description": (document.getElementById("modifyDescription") as HTMLInputElement).value
                    }
                  }
                  return data
                })
                changeFakeData(modifiedData)
                setModalData({id: ""})
              }}> 수정 </button>
              <button onClick={() => {
                changeFakeData(fakeData.filter(data => data.id !== modalData.id))
                setModalData({id: ""})
              }}> 삭제 </button>
              <button onClick={() => setModalData({id: ""})}> 닫기 </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
