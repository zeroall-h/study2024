const Controller=({onClickBtn})=>{
  return (
  <div className="box_btn">
    <button type="button" className="btn" onClick={()=>{onClickBtn(-1)}}>-1</button>
    <button type="button" className="btn" onClick={()=>{onClickBtn(-10)}}>-10</button>
    <button type="button" className="btn" onClick={()=>{onClickBtn(-100)}}>-100</button>    
    <button type="button" className="btn" onClick={()=>{onClickBtn(100)}}>+100</button>
    <button type="button" className="btn" onClick={()=>{onClickBtn(10)}}>+10</button>
    <button type="button" className="btn" onClick={()=>{onClickBtn(1)}}>+1</button>
  </div>
)}

export default Controller;