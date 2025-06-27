import ProtectedRoute from '@/components/ProtectedRoute';
import TaskManagement from '@/components/TaskManagement';
import React from 'react'

export const metadata = {
    title: "Task Management System | Tasks List",
    description: "View all your tasks in one place. Track your progress easily.",
};

const TaskList = () => {
    return (
        <ProtectedRoute>
            <TaskManagement />
        </ProtectedRoute>
    )
}

export default TaskList