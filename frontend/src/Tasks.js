import React from 'react';
import axios from 'axios';
import './Tasks.css';
import { useEffect } from 'react';
const Tasks = ({tasks, setTasks, loggedInUser}) => {

  const handleDelete = async (title, description) => {
      try {
          const response = await axios.delete(`http://localhost:5000/deletenote`, {
              data: { title, description } 
          });
          
          setTasks(prevTask => {
            const index = prevTask.findIndex(task => task.title === title && task.description === description);
            if (index !== -1) {
              const newTasks = [...prevTask];
              newTasks.splice(index, 1);
              return newTasks;
            }
            return prevTask;
          });
          
          
            alert(response.data.message);
      } catch (error) {
          console.error('Error deleting note:', error);
          alert('Failed to delete note.');
      }
  };

  const fetchTasks = async () => {
    
    try {
      const response = await axios.get('http://localhost:5000/tasks');
      setTasks(response.data);
      console.log(response.data);
    } catch (error){
        console.error("Error during fetching tasks", error);
    }
  }

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="notes-container">
      <h1 className="notes-title">Tasks</h1>
      <table className="notes-list">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Day</th>
            <th>Month</th>
            <th>Year</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task, index) => (
            loggedInUser !== null && loggedInUser.username === task.un ? 
            (<tr key={index}>
              <td>{task.title}</td>
              <td>{task.description}</td>
              <td>{task.day}</td>
              <td>{task.month}</td>
              <td>{task.year}</td>
              <td className="note-actions">
                <svg
                  onClick={() => handleDelete(task.title, task.description)}
                  viewBox="0 0 24 24"
                  className="delete-icon"
                >
                  <path d="M19 13H5v-2h14v2zm-7-9C6.48 4 2 8.48 2 14s4.48 10 10 10 10-4.48 10-10S17.52 4 12 4zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
                </svg>
              </td>
            </tr>) : null
          ))
          }
        </tbody>
      </table>
    </div>
  );
};

export default Tasks;
