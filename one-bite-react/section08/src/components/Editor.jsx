import { useRef, useState } from 'react';
import './Editor.css';

const Editor = ({onCreate}) =>{
  const [content, setContent] = useState('');
  const contentRef = useRef();
  const onChangeContent = (e) =>{
    setContent(e.target.value);
  }
  const onKeyDown = (e) =>{
    if(e.keyCode === 13){
      onSubmit();
    }
  }
  const onSubmit = () =>{
    if(content===""){
      contentRef.current.focus();
      return;
    }
    onCreate(content);
    setContent("");
  }
  return (
  <div className="box_edit">
    <input type="text" placeholder="새로운 Todo..." className='input_todo' onChange={onChangeContent} ref={contentRef} value={content} onKeyDown={onKeyDown}/>
    <button type="button" className='btn_add' onClick={onSubmit}>추가</button>
  </div>
)}

export default Editor