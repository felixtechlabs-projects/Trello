import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { fetchTasksByStatus } from '../services/task.service';

const Dashboard = () => {
  const [totalTasks, setTotalTasks] = useState(0);
  const [pendingTasks, setPendingTasks] = useState(0);
  const [completedTasks, setCompletedTasks] = useState(0);
  const [progressTasks, setProgressTasks] = useState(0);
  const navigate = useNavigate();

  const fetchingNumbers = async () => {
    const num1 = await fetchTasksByStatus("pending");
    setPendingTasks(num1);

    const num2 = await fetchTasksByStatus("in-progress");
    setProgressTasks(num2);

    const num3 = await fetchTasksByStatus("completed");
    setCompletedTasks(num3);

    setTotalTasks(num1 + num2 + num3);

  }

  useEffect(() => {
    fetchingNumbers();

  }, [])
 
  return (
    <div>
      <h3 className='font-bold text-2xl text-purple-500 text-center'> Dashboard </h3>
      <section className='flex justify-around mt-3'>
        <section className='p-2 border rounded-lg shadow' onClick={() => navigate("/tasks")}>
          <h3 className='font-bold text-2xl text-purple-500 text-center'> Total Tasks </h3>
          <p className='text-xl'> {totalTasks } </p>
        </section>

        <section className='p-2 border rounded-lg shadow' onClick={() => navigate("/tasks")}>
          <h3 className='font-bold text-2xl text-purple-500 text-center'> Completed Tasks </h3>
          <p className='text-xl'> {completedTasks } </p>
        </section>

        <section className='p-2 border rounded-lg shadow' onClick={() => navigate("/tasks")}>
          <h3 className='font-bold text-2xl text-purple-500 text-center'> Pending Tasks </h3>
          <p className='text-xl'> {pendingTasks } </p>
        </section>

        <section className='p-2 border rounded-lg shadow' onClick={() => navigate("/tasks")}>
          <h3 className='font-bold text-2xl text-purple-500 text-center'> In Progress Tasks </h3>
          <p className='text-xl'> {progressTasks } </p>
        </section>
      </section>
    </div>
  )
}

export default Dashboard