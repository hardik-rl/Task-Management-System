"use client"

import EditTaskPage from '@/components/EditTask';
import ProtectedRoute from '@/components/ProtectedRoute';
import withAuth from '@/hoc/withAuth';
import React from 'react'

// export const metadata = {
//   title: "Task Management System | Edit Task ",
//   description: "Modify your task details such as title, status, or due date.",
// };

const EditNewTask = () => {
  return (
    // <ProtectedRoute>
      <EditTaskPage />
    // {/* </ProtectedRoute> */}
  )
}

export default withAuth(EditNewTask)