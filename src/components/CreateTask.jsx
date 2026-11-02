import React, { useState } from 'react'
import { createNewTask } from '../services/task.service';

const CreateTask = () => {
    const [task, setTask] = useState({
        name: "",
        deadline: "",
        checklist: [{
            name: "",
            completed: false
        }]
    })

    const submitted = (e) => {
        e.preventDefault();
        createNewTask(task.name, task.deadline, task.checklist);
    }
    return (
        <div>
            <h3 className='font-bold text-2xl text-purple-500'> Create Task </h3>

            <form onSubmit={submitted}>
                <label htmlFor=""> Enter Name: </label>
                <input type="text" className='w-1/4 border p-2 m-3 rounded-lg'
                    value={task.name} onChange={(e) => setTask({ ...task, name: e.target.value })}
                /> <br /> <br />

                <label htmlFor=""> Enter Deadline </label>
                <input type="date" className='w-1/4 border p-2 m-3 rounded-lg'
                    value={task.deadline} onChange={(e) => setTask({ ...task, deadline: e.target.value })}
                /> <br /> <br />

                <label htmlFor=""> Enter Checklist </label>
                <input type="text" className='w-1/4 border p-2 m-3 rounded-lg'
                    value={task.checklist[0].name}
                    onChange={(e) =>
                        setTask({
                            ...task,
                            checklist: task.checklist.map((item, index) =>
                                index === 0
                                    ? { ...item, name: e.target.value }
                                    : item
                            ),
                        })
                    }
                />
                <button className='p-2 m-3 border rounded-lg'> add new checklist </button>

                    <br /> <br />
                <button type='submit' className='p-2 m-3 border rounded-lg'> Submit </button>
            </form>
        </div>
    )
}

export default CreateTask