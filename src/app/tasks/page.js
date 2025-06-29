import TaskList from '@/components/TaskList';
import React from 'react'

export const metadata = {
    title: "Task Management System | Tasks List",
    description: "View all your tasks in one place. Track your progress easily.",
};

const TaskListPage = () => {
    return (
        <TaskList />
    )
}

export default TaskListPage