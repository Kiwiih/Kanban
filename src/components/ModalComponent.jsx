import { useContext, useState, useEffect } from 'react'
import TaskContext from '../context/TaskContext';
//ikoner
import { FaRegTrashAlt, FaWindowClose, FaCheck} from "react-icons/fa";

const ModalComponent = ({ isOpen, onClose, selectedTask}) => {

  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");

  const {tasks, setTasks} = useContext(TaskContext)
  // const task = tasks.find((task)=> task.id === id)
  const taskId = selectedTask ? selectedTask.id : null;

  const handleDelete = (id) => {
    const newTaskList = tasks.filter((task) => task.id !== id);
    setTasks(newTaskList)
    console.log(selectedTask)
  };

  const handleEdit = () => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, title: editTitle, content: editContent };
      }else{
      return task;
      }
    });
    setTasks(updatedTasks); 
    onClose();
  
    };

    useEffect(() => {
      // Update the state when selectedTask changes
      if (selectedTask) {
        setEditTitle(selectedTask.title);
        setEditContent(selectedTask.content);
      }
    }, [selectedTask]);


  return (
    <>
    {isOpen && (
    <div className='taskModal'>
      <div className='modal-Header_Div'>
        <h2 style={{paddingLeft:"1em"}}>Edit: {selectedTask.title}</h2>
        <button className='closeBtn' onClick={onClose}><FaWindowClose /></button>
      </div>
      
      <form className='edit-task-form' onSubmit={(e) => e.preventDefault()}>
            <input
              type="text"
              id="postTitle"
              required
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
            />
            <textarea
              className='editContentInput'
              type="text"
              id="taskConent"
              required
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
            ></textarea>

            <button className="submitButton" type="submit" onClick={() => handleEdit(taskId)}>
            <FaCheck />
            </button>
          </form>
      <div className='trashDiv'>
        <FaRegTrashAlt onClick={()=>handleDelete(taskId)} className='trash'/>
      </div>
    </div>
    )}
  </>
)}

export default ModalComponent