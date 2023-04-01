import React, { useState } from 'react';
import TodoCard from '../TodoCard/TodoCard';

const TaskList = ({
                      list,
                      handleDelete,
                      handleDone,
                      handleEdit,
                      filter,
                  }) => {
    const [currentEdit, setCurrentEdit] = useState();

    const filteredList = list.filter((task) => {
        if (filter === 'completed') {
            return task.completed;
        } else if (filter === 'incompleted') {
            return !task.completed;
        } else {
            return true;
        }
    });

    return (
        <div>
            {filteredList.map((task) => (
                <TodoCard
                    handleDelete={handleDelete}
                    handleDone={handleDone}
                    handleEdit={handleEdit}
                    handleSelectCurrent={setCurrentEdit}
                    iEdit={task.id === currentEdit}
                    key={task.id}
                    task={task}
                />
            ))}
        </div>
    );
};

export default TaskList;