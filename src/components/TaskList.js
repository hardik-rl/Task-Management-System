"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/shared/Button";
import { AddIcon, LoadingIcon } from "@/shared/Icon";
import ApiCalling from "@/shared/api/ApiCalling";
// import withAuth from "@/hoc/withAuth";
import Loader from "@/shared/Loader";

const TaskList = () => {
  const router = useRouter();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const res = await ApiCalling.apiCallGet("/tasks?limit=10");
        const data = res.data;
        const mappedTasks = data.map((todo) => ({
          id: todo.id,
          title: todo.title,
          description: todo.description,
          status: todo.status,
          completed: todo.status,
          due_date: todo.due_date || new Date().toISOString(),
        }));
        setTasks(mappedTasks.reverse());
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTodos();
  }, []);

  const handleDelete = async (id) => {
    try {
      await ApiCalling.apiCallDelete(`/tasks/${id}`);
      setTasks((prev) => prev.filter((task) => task.id !== id));
    } catch (error) {
      console.error("Delete failed", error);
    }
  };

   if (loading) return <Loader />;

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

      <div className="w-full overflow-auto rounded-lg shadow-md border border-gray-200">
        <table className="min-w-[700px] w-full table-auto divide-y divide-gray-200">
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
                      : task.status === "In Progress"
                        ? "bg-yellow-100 text-yellow-800"
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
                    className="!bg-[#495057] hover:!bg-[#212529] !w-[60px]"
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
