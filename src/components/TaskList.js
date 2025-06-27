"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/shared/Button";
import { AddIcon, LoadingIcon } from "@/shared/Icon";

const TaskList = () => {
  const router = useRouter();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const res = await fetch("http://localhost:3001/tasks?limit=10");
        const data = await res.json();
        const mappedTasks = data.map((todo) => ({
          id: todo.id,
          title: todo.title,
          description: todo.description,
          status: todo.status ? "To Do" : "Completed",
          completed: todo.status,
          due_date: new Date().toISOString(),
        }));
        setTasks(mappedTasks);
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTodos();
  }, []);

  // Delete operation
  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:3001/tasks/${id}`, {
        method: "DELETE",
      });
      setTasks((prev) => prev.filter((task) => task.id !== id));
    } catch (error) {
      console.error("Delete failed", error);
    }
  };

  if (loading) return <p className="text-center mt-8">
    <LoadingIcon />
  </p>;

  return (
    <section>
      <div className="max-w-32 mb-8 ml-auto">
        <Button
          className="flex gap-2 justify-center items-center"
          onClick={() => router.push("/tasks/new")}
        >
          <AddIcon />
          Add Task
        </Button>
      </div>
      <div className="overflow-x-auto rounded-lg shadow-md border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Title</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Description</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Status</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Due Date</th>
              <th className="px-4 py-2 text-right text-xs font-medium text-gray-600 uppercase tracking-wider">Actions</th>
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
                      : "bg-gray-100 text-gray-800"
                      }`}
                  >
                    {task.status}
                  </span>
                </td>
                <td className="px-4 py-2 text-sm text-gray-600">
                  {new Date(task.due_date).toLocaleDateString()}
                </td>
                <td className="px-4 py-2 text-sm text-right flex justify-end gap-2">
                  <Button
                    onClick={() => router.push(`/tasks/${task.id}`)}
                    className="!w-[60px]"
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => handleDelete(task.id)}
                    className="!bg-red-600 !w-[60px]"
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default TaskList;
