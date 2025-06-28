import EditTaskPage from '@/components/EditTask';
import React from 'react'

export const metadata = {
  title: "Task Management System | Edit Task ",
  description: "Modify your task details such as title, status, or due date.",
};

const EditNewTask = () => {
  return (
    <EditTaskPage />
  )
}

export default EditNewTask