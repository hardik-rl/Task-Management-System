import AddTask from '@/components/AddTask';
import React from 'react'

export const metadata = {
  title: "Task Management System | Create Task",
  description: "Add a new task to your task list with due date and status.",
};

const newTask = () => {
  return (
    <AddTask />
  )
}

export default newTask