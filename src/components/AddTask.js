"use client";
import Button from "@/shared/Button";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AddTask({
  initialData,
  submitLabel = "Save Task",
}) {
  const router = useRouter();
  const [form, setForm] = useState(
    initialData || {
      title: "",
      description: "",
      status: "To Do",
      due_date: "",
    }
  );

  const [errors, setErrors] = useState({
    title: "",
    description: "",
    due_date: "",
  });

  const validate = () => {
    const newErrors = {};

    if (!form.title.trim()) newErrors.title = "Title is required";
    if (!form.description.trim()) newErrors.description = "Description is required";
    if (!form.due_date) newErrors.due_date = "Due date is required";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  if (!validate()) return;

  try {
    const isEditMode = !!initialData;

    const res = await fetch(
      `http://localhost:3001/tasks${isEditMode ? `/${initialData.id}` : ""}`,
      {
        method: isEditMode ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      }
    );

    if (!res.ok) throw new Error(`${isEditMode ? "Update" : "Create"} failed`);

    router.push("/tasks");
  } catch (error) {
    console.error("Submit error:", error);
  }
};


  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-md rounded px-6 pt-6 pb-8 w-full"
    >
      <h2 className="text-2xl font-bold mb-6 text-blue-700">Create Task</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Title */}
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Title
          </label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring ${errors.title ? "border-red-500" : "focus:ring-blue-300"
              }`}
            placeholder="Task title"
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title}</p>
          )}
        </div>

        {/* Status */}
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Status
          </label>
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
          >
            <option>To Do</option>
            {/* <option>In Progress</option> */}
            <option>Completed</option>
          </select>
        </div>

        {/* Due Date */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Due Date
          </label>
          <input
            type="date"
            name="due_date"
            value={form.due_date}
            onChange={handleChange}
            className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring ${errors.due_date ? "border-red-500" : "focus:ring-blue-300"
              }`}
          />
          {errors.due_date && (
            <p className="text-red-500 text-sm mt-1">{errors.due_date}</p>
          )}
        </div>

        {/* Description */}
        <div className="md:col-span-3 mb-4">
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Description
          </label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={3}
            className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring ${errors.description ? "border-red-500" : "focus:ring-blue-300"
              }`}
            placeholder="Task details"
          ></textarea>
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">{errors.description}</p>
          )}
        </div>
      </div>
      <div className="max-w-40">
        <Button>{submitLabel}</Button>
      </div>
    </form>
  );
}
