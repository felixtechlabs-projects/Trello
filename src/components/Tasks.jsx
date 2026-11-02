import React, { useEffect, useMemo, useState } from 'react'
import { fetchMyTasks, updateTaskChecklist } from '../services/task.service';
import { useNavigate } from 'react-router-dom';

const deriveStatus = (checklist) => {
    if (!checklist?.length) return "pending";
    const done = checklist.filter(item => item.completed).length;
    if (done === 0) return "pending";
    return done === checklist.length ? "completed" : "in-progress";
}

const Tasks = () => {
    const [tasks, setTasks] = useState([]);
    const [option, setOption] = useState("all");
    const [expandedTask, setExpandedTask] = useState(null);
    const navigate = useNavigate();
    const toggleTask = (taskId) => {
        setExpandedTask(prev => prev === taskId ? null : taskId);
    }

    const getAllTasks = async () => {
        const docs = await fetchMyTasks();
        setTasks(docs ?? []);
    }

    const filteringTasks = useMemo(() => {
        if (option === "all") {
            return tasks;
        }

        return tasks.filter(task =>
            task.status?.toLowerCase() === option.toLowerCase()
        );
    }, [option, tasks]);

    const changeCompleted = async (event, taskId, checklistName) => {
        const completed = event.target.checked;
        const task = tasks.find(item => item.id === taskId);
        if (!task) return;

        const checklist = (task.checklist ?? []).map(item =>
            item.name === checklistName ? { ...item, completed } : item
        );
        const status = deriveStatus(checklist);

        setTasks(prev => prev.map(item =>
            item.id === taskId ? { ...item, checklist, status } : item
        ));
        await updateTaskChecklist(taskId, checklist, status);
    }

    useEffect(() => {
        getAllTasks();
    }, [])
    return (
        <div className='m-3'>
            <section className='flex justify-between'>
                <h3 className='font-bold text-2xl text-purple-500'> Tasks </h3>
                <button className='font-bold text-xl text-purple-500 border p-2 m-3 rounded-lg'
                    onClick={() => navigate("/create-task")}
                > Add New Task </button>
            </section>
            <section className='flex justify-end'>
                <select onChange={(e) => setOption(e.target.value)} className='border rounded-lg'>
                    <option value={"all"}> All </option>
                    <option value={"pending"}> Pending </option>
                    <option value={"in-progress"}> In-Progress </option>
                    <option value={"completed"}> Completed </option>
                </select>
            </section>
            <table className='w-full border'>
                <thead>
                    <tr className='border h-10'>
                        <th className='border'> Sr.No. </th>
                        <th className='border'> Name </th>
                        <th className='border'> Status </th>
                        <th className='border'> Expand </th>

                    </tr>
                </thead>
                <tbody>
                    {
                        filteringTasks.map((task, index) => {
                            const isExpanded = expandedTask === task.id
                            return (
                                <React.Fragment key={task.id ?? index}>
                                    <tr className='border h-10'>
                                        <td className='border text-center'>{index + 1}</td>
                                        <td className='border text-center'>{task.name}</td>
                                        <td className='border text-center'>{task.status}</td>
                                        <td className='border text-center'>
                                            <button className='p-2 m-3 border rounded-lg' onClick={() => toggleTask(task.id)}>{isExpanded ? "🔼" : "🔽"}</button>
                                        </td>
                                    </tr>
                                    {isExpanded && (
                                        <tr className='border'>
                                            <td className='border'></td>
                                            <td className='border' colSpan={3}>
                                                <ul>
                                                    {(task.checklist ?? []).map((item, i) => (
                                                        <li key={item.name ?? i}>
                                                            <label>
                                                                <input type="checkbox" checked={!!item.completed}
                                                                    onChange={(e) => changeCompleted(e, task.id, item.name)}
                                                                />
                                                                {" "}{item.name}
                                                            </label>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </td>
                                        </tr>
                                    )}
                                </React.Fragment>
                            )
                        })
                    }
                </tbody>

            </table>
        </div>
    )
}

export default Tasks
