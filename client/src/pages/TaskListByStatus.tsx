import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "../api/axios";
import { Task, TaskStatus } from "../types/task";

const TaskListByStatus = () => {
  const { status } = useParams();
  const navigate = useNavigate();
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await axios.get(`/api/tasks?status=${status}`);
        setTasks(res.data);
      } catch (err) {
        console.error("❌ Failed to fetch tasks", err);
      }
    };

    fetchTasks();
  }, [status]);

  const handleEdit = (id: string) => {
    navigate(`/tasks/edit/${id}`);
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">
        Tasks – {status?.replace("-", " ").toUpperCase()}
      </h1>

      {tasks.length === 0 ? (
        <p className="text-gray-500">No tasks found.</p>
      ) : (
        <ul className="space-y-3">
          {tasks.map((task) => (
            <li
              key={task._id}
              className="bg-white p-4 rounded-md shadow flex justify-between items-center"
            >
              <div>
                <p className="font-medium">{task.title}</p>
                <p className="text-sm text-gray-500">{task.type}</p>
              </div>
              <button
                onClick={() => handleEdit(task._id)}
                className="text-blue-500 hover:underline text-sm"
              >
                Edit
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskListByStatus;
