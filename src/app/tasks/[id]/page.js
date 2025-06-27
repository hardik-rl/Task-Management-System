import ProtectedRoute from '@/components/ProtectedRoute';
import React from 'react'

export const metadata = {
  title: "Task Management System | Edit Task ",
  description: "Modify your task details such as title, status, or due date.",
};

const editNewTask = () => {
  return (
    <ProtectedRoute>
      <div className='text-2xl'>Edit Task</div>
    </ProtectedRoute>
  )
}

export default editNewTask