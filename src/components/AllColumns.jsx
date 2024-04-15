import { Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import { FaPlus} from 'react-icons/fa';

import Header from './Header';
import Footer from './Footer'
import ColumnsContext from "../context/ColumnsContext";
import AddTasks from './AddTasks';
import TasksContent from './TasksContent';
import { FaTrash } from "react-icons/fa";

const AllColumns = () => {

    const { columns, setColumns, handleDeleteColumn } = useContext(ColumnsContext);
    const [showColumnForm, setShowColumnForm] = useState(false);
    const [newColumnName, setNewColumnName] = useState('');

    const handleAddColumn = (event) => {
        event.preventDefault();
        if (newColumnName.trim() !== '') {
            const newColumn = {
                id: columns.length + 1,
                title: newColumnName,
            };
        setColumns([...columns, newColumn]);
        setNewColumnName('');
        console.log(columns)
        }
    }

return (
<>
    <Header/>
    <main>
    {columns.map(column => (
            <div className='board-column' key={column.id}>
            {column.title === 'Todo' ? (
                <>
                <div className='column-header'>
                    <Link to={`/column/${column.title.toLowerCase()}`} className='link'><h2>{column.title}</h2></Link>
                    <button onClick={()=>handleDeleteColumn(column.id)}className="column-trash"><FaTrash/></button>
                </div>
                    <TasksContent columnId={column.id}/>
                    <AddTasks />
                </>
            ) : (
                <>
                <div className='column-header'>
                <Link to={`/column/${column.title.toLowerCase()}`}className='link'><h2>{column.title}</h2></Link>
                <button onClick={()=>handleDeleteColumn(column.id)}className="column-trash"><FaTrash/></button>
                </div>
                <TasksContent columnId={column.id}/>
                </>
            )}
        </div>
        ))}

    {showColumnForm ? (
        <form>
            <input
                type="text"
                placeholder="Enter column name"
                value={newColumnName}
                onChange={(e) => setNewColumnName(e.target.value)}
            />
        <button onClick={handleAddColumn}>Add Column</button>
        </form>) : (
        <div className="addNewColumn-btnSection">
            <button onClick={() => setShowColumnForm(true)} className='addColumnButton' >
                <FaPlus style={{ color: "black", backgroundColor: "white", fontSize: "1em" }}/>
            </button> 
        </div>
    )}
    </main>
    <Footer />
</>    
);
}

export default AllColumns;