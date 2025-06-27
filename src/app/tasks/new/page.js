"use client"

import AddTask from '@/components/AddTask';
import ProtectedRoute from '@/components/ProtectedRoute';
import withAuth from '@/hoc/withAuth';
import React from 'react'

// export const metadata = {
//   title: "Task Management System | Create Task",
//   description: "Add a new task to your task list with due date and status.",
// };

const newTask = () => {
  return (
    // <ProtectedRoute>
      <AddTask />
    // {/* </ProtectedRoute> */}
  )
}

export default withAuth(newTask)