"use client";
import withAuth from "@/hoc/withAuth";
import ApiCalling from "@/shared/api/ApiCalling";
import Button from "@/shared/Button";
import FormControl from "@/shared/FormControl";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

const AddTask = ({
  initialData,
  submitLabel = "Save Task",
}) => {
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

      const res = `/tasks${isEditMode ? `/${initialData.id}` : ""}`;

      if (isEditMode) {
        await ApiCalling.apiCallPut(res, form);
      } else {
        await ApiCalling.apiCallPost(res, form);
      }

      // if (!res.ok) throw new Error(`${isEditMode ? "Update" : "Create"} failed`);

      router.push("/tasks");
      toast.success(`Task ${isEditMode ? "Update" : "Created"} Successfully!`);
    } catch (error) {
      console.error("Submit error:", error);
      toast.error("Error", error)
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-md rounded px-6 pt-6 pb-8 w-full"
    >
      <h2 className="text-2xl font-bold mb-6 text-blue-700">{!!initialData ? "Edit" : "Create"} Task</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 space-x-2">
        <FormControl label="Title"
          name="title"
          value={form.title}
          placeholder="Task title"
          error={errors.title}
          onChange={handleChange} />

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
            <option>In Progress</option>
            <option>Completed</option>
          </select>
        </div>

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
      <div className="justify-end flex gap-2 items-center">
        <Button type="submit" className="!w-[120px]">{submitLabel}</Button>
        <Button type="button" className="!w-[120px] !bg-red-600" onClick={() => router.push("/tasks")}>Cancel</Button>
      </div>
    </form>
  );
}

export default withAuth(AddTask)