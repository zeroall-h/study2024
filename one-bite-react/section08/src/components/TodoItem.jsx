import "./TodoItem.css";

const TodoItem = ({ id, isDone, content, date, onUpdate, onDelete }) => {
  const onChangeCheckbox = () => {
    onUpdate(id);
  };
  const onUpdateDelete = () => {
    onDelete(id);
  };
  return (
    <div className="item_todo">
      <input
        type="checkbox"
        className="input_todo_check"
        readOnly
        checked={isDone}
        onChange={onChangeCheckbox}
      />
      <strong className="title_todo">{content}</strong>
      <p className="date">{new Date(date).toLocaleDateString()}</p>
      <button type="button" className="btn_delete" onClick={onUpdateDelete}>
        삭제
      </button>
    </div>
  );
};

export default TodoItem;
