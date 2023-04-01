import { useState, useEffect } from 'react';
import './App.css';
import Modal from './components/Modal/Modal';
import Button from './components/Button/Button';
import TaskList from './components/TaskList/TaskList';

function App() {
  const [ show, setShow ] = useState(false);
  const [ newTask, setNewTask ] = useState('');
  const [ tasks, setTasks ] = useState([])
  const [filter, setFilter] = useState('all');


  const handleShow  = () => setShow(!show)

  const handleChangeCheck = (event) => {
    setNewTask(event.target.value);

  }
  // 1.Все таски 2.Выполненные 3.Не выполеннные
  const handleAddTask = () => {
    setTasks((prevState) => [...prevState,
      {
        id: Math.floor(Math.random() * 1000),
        title: newTask,
        completed: false
      }]);
    handleShow();
  }

  const handleDelete = (id) => {
    const deleted = tasks.filter(el => el.id !== id);
    setTasks([...deleted])
    /// filter
  }

  const handleDone = (id) => {
    // const currentIndex = tasks.findIndex(task => task.id === id )
    tasks.map(task => {
      if(task.id === id) {
        return task.completed = !task.completed
      }
      return task
    })
    setTasks([...tasks])
  }
  const handleEdit = (editTodo) => {

    const editList = tasks.map(task => {
      if(task.id === editTodo.id) {
        return editTodo
      }
      return task
    })
    setTasks([...editList])
  }


  useEffect(() => {
    const myLocalList = JSON.parse(localStorage.getItem('tasks'));
    if(myLocalList.length !== 0) {
      setTasks(myLocalList)
    }
  }, [])


  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleClearAll = () => {
    setTasks([]);
    localStorage.clear(); // удаление данных из localStorage
  };

  const [currentEdit, setCurrentEdit] = useState(null);

  return (
      <div className="App">
        {show && <Modal
            handleChangeCheck={handleChangeCheck}
            handleAdd={handleAddTask}
            handleShow={handleShow}  />}

        <Button handleClick={handleShow}>Добавить таск</Button>
        <select value={filter} onChange={handleFilterChange}>
          <option value='all'>Все таски</option>
          <option value='completed'>Выполненные</option>
          <option value='incompleted'>Не выполненные</option>
        </select>
        <Button handleClick={handleClearAll}>Очистить все таски</Button>


        {/* task list */}
        <TaskList
            list={tasks}
            handleDelete={handleDelete}
            handleDone={handleDone}
            handleEdit={handleEdit}
            filter={filter}
        />
      </div>
  );
}

export default App;