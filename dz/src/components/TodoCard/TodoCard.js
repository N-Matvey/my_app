import React, { useState } from 'react'
import classes from './todocard.module.css'
import ButtonAction from '../ButtonAction/ButtonAction';
const TodoCard = ({
                      task,
                      handleDelete,
                      handleDone ,
                      handleEdit,
                      handleSelectCurrent,
                      iEdit
                  }) => {
    console.log(classes, 'classes');
    const [ newTitle ,setNewTitle ] = useState(task.title);
    if(iEdit) {
        return <div>
            <input
                name='edit'
                value={newTitle}
                onChange={(event) => setNewTitle(event.target.value)}
            />
            <button onClick={() => handleEdit({...task, title: newTitle})} >Save</button>
            <button >Cancel</button>
        </div>
    }
    return (
        <div className={classes.todoCard} style={task.completed ? { textDecoration: 'line-through' } : {}}>
            <div className={classes.todoTitle}>
                <h5>{task.title}</h5>
            </div>
            <div className={classes.buttonGroup}>
                <ButtonAction task={task} handleClick={handleSelectCurrent} type={'edit'}>Edit</ButtonAction>
                <ButtonAction task={task} handleClick={handleDone} type={'done'}>Done</ButtonAction>
                <ButtonAction task={task} handleClick={handleDelete} type={'delete'}>Delete</ButtonAction>
            </div>
        </div>
    )
}

export default TodoCard