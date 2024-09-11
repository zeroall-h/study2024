const Viewer=({count})=>{

  return (
    <dl className="list_count">
      <dt className="title_count">현재 카운트 :</dt>
      <dd className="number">{count}</dd>
    </dl>
)}

export default Viewer;