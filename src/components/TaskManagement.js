"use client";
import Button from "@/shared/Button";
import { AddIcon } from "@/shared/Icon";
import { useRouter } from "next/navigation";
import React from 'react'

const tasks = [
  {
    "id": 1,
    "title": "Design login page",
    "description": "Create the UI for login using TailwindCSS.",
    "status": "To Do",
    "due_date": "2025-06-30"
  },
  {
    "id": 2,
    "title": "Build authentication API",
    "description": "Create /auth/register and /auth/login endpoints using NestJS.",
    "status": "In Progress",
    "due_date": "2025-06-28"
  },
  {
    "id": 3,
    "title": "Task dashboard",
    "description": "Develop dashboard to list all tasks for the logged-in user.",
    "status": "Completed",
    "due_date": "2025-06-25"
  },
  {
    "id": 4,
    "title": "Implement task editing",
    "description": "Allow editing of existing tasks from the UI.",
    "status": "To Do",
    "due_date": "2025-07-01"
  },
  {
    "id": 5,
    "title": "Add JWT token refresh logic",
    "description": "Automatically refresh JWT tokens before expiration.",
    "status": "In Progress",
    "due_date": "2025-06-29"
  }
]

const TaskManagement = () => {
  const router = useRouter();

  const handleDelete = (id) => {
    console.log(id, "id delete");
  }
  return (
    <section>
      <div className="max-w-32 mb-8 ml-auto">
        <Button className="flex gap-2 justify-center items-center" onClick={() => router.push("/tasks/new")}><AddIcon />Add Task</Button>
      </div>
      <div className="overflow-x-auto rounded-lg shadow-md border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                Title
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                Description
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                Status
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                Due Date
              </th>
              <th className="px-4 py-2 text-right text-xs font-medium text-gray-600 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 bg-white">
            {tasks.map((task) => (
              <tr key={task.id} className="hover:bg-gray-50">
                <td className="px-4 py-2 text-sm font-medium text-gray-900">{task.title}</td>
                <td className="px-4 py-2 text-sm text-gray-700">{task.description}</td>
                <td className="px-4 py-2 text-sm">
                  <span
                    className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${task.status === "Completed"
                      ? "bg-green-100 text-green-700"
                      : task.status === "In Progress"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-gray-100 text-gray-800"
                      }`}
                  >
                    {task.status}
                  </span>
                </td>
                <td className="px-4 py-2 text-sm text-gray-600">
                  {new Date(task.due_date).toLocaleDateString()}
                </td>
                <td className="px-4 py-2 text-sm text-right">
                  <button
                    onClick={() => router.push(`/tasks/${task.id}`)}
                    className="text-blue-600 cursor-pointer hover:underline mr-3"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(task.id)}
                    className="text-red-600 cursor-pointer hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>

  )
}

export default TaskManagement