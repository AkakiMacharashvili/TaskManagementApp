import React, { useState } from 'react';
import axios from 'axios';
import './CreateTask.css';  

const CreateTask = ({ title, setTitle, description, setDescription,
                      month, setMonth, day, setDay, year, setYear, loggedInUser
                    }) => {
   
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
  
    const handleClick = async (e) => {
        e.preventDefault();
        if (!title || !description) {
            setError('All fields are required.');
            setMessage('');
            return;
        }
        if(loggedInUser === null){
            setError('Log in the system...');
            setMessage('');
            return;
        }
        const curr = { title, description, day, month, year };
        try {
            const response = await axios.post('http://localhost:5000/createTask', curr);
            setMessage(response.data.message);
            setTitle('');
            setDescription('');
            setError('');  
            setDay('');
            setMonth('');
            setYear('');
        } catch (error) {
            console.error('Error creating note:', error);
            setError('Failed to create note.');
        }
    };

    return (
        <div className="create-note-container">
            <h2>Create Task</h2>
            <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
            <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
            
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%'}}>
                <select value={day} onChange={(e) => setDay(e.target.value)}>
                    <option value={"1"}>1</option>
                    <option value={"2"}>2</option>
                    <option value={"3"}>3</option>
                    <option value={"4"}>4</option>
                    <option value={"5"}>5</option>
                    <option value={"6"}>6</option>
                    <option value={"7"}>7</option>
                    <option value={"8"}>8</option>
                    <option value={"9"}>9</option>
                    <option value={"10"}>10</option>
                    <option value={"11"}>11</option>
                    <option value={"12"}>12</option>
                    <option value={"13"}>13</option>
                    <option value={"14"}>14</option>
                    <option value={"15"}>15</option>
                    <option value={"16"}>16</option>
                    <option value={"17"}>17</option>
                    <option value={"18"}>18</option>
                    <option value={"19"}>19</option>
                    <option value={"20"}>10</option>
                    <option value={"21"}>21</option>
                    <option value={"22"}>22</option>
                    <option value={"23"}>23</option>
                    <option value={"24"}>24</option>
                    <option value={"25"}>25</option>
                    <option value={"26"}>26</option>
                    <option value={"27"}>27</option>
                    <option value={"28"}>28</option>
                    <option value={"29"}>29</option>
                    <option value={"30"}>30</option>
                    <option value={"31"}>31</option>
                </select>
                <select value={month} onChange={(e) => setMonth(e.target.value)}>
                    <option value={"January"}>January</option>
                    <option value={"February"}>February</option>
                    <option value={"March"}>March</option>
                    <option value={"April"}>April</option>
                    <option value={"May"}>May</option>
                    <option value={"June"}>June</option>
                    <option value={"July"}>July</option>
                    <option value={"August"}>August</option>
                    <option value={"September"}>September</option>
                    <option value={"October"}>October</option>
                    <option value={"November"}>November</option>
                    <option value={"December"}>December</option>
                </select>
                <select value={year} onChange={(e) => setYear(e.target.value)}>
                    <option value={"2024"}>2024</option>
                    <option value={"2025"}>2025</option>
                    <option value={"2026"}>2026</option>
                    <option value={"2027"}>2027</option>
                    <option value={"2028"}>2028</option>
                </select>
            </div>

            <button type="submit" onClick={handleClick}>Create Task</button>
            {message && <p className="message">{message}</p>}
            {error && <p className="error">{error}</p>}
        </div>
    );
};

export default CreateTask;
