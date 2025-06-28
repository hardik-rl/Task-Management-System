"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import AddTask from "@/components/AddTask";
import ApiCalling from "@/shared/api/ApiCalling";
import withAuth from "@/hoc/withAuth";

const EditTaskPage = () => {
  const { id } = useParams();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const res = await ApiCalling.apiCallGet(`/tasks/${id}`);
        const data = res.data;
        setTask(data);
      } catch (err) {
        console.error("Failed to fetch task:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [id]);

  if (loading) return <p className="text-center mt-4">Loading task...</p>;
  if (!task) return <p className="text-center text-red-500">Task not found</p>;

  return (
    <AddTask
      initialData={task}
      submitLabel="Update Task"
    />
  );
}


export default withAuth(EditTaskPage)