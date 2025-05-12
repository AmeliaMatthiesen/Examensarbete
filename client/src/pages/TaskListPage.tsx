import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTasks } from "../hooks/useTasks";
import { Task } from "../types/task";
import TaskModal from "../components/TaskModal";

const TaskListPage = () => {
  const { status } = useParams();
  const navigate = useNavigate();
  const { data: tasks, isLoading, isError } = useTasks();
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  if (!status) return <p>Invalid status.</p>;
  if (isLoading) return <p>Loading tasks...</p>;
  if (isError || !tasks) return <p>Failed to load tasks.</p>;

  const filteredTasks = status === "this-week"
    ? tasks.filter((task: Task) => {
        const created = new Date(task.createdAt);
        const now = new Date();
        const weekAgo = new Date();
        weekAgo.setDate(now.getDate() - 7);
        return created >= weekAgo;
      })
    : tasks.filter((task: Task) => task.status === status);

  const refetchTasks = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 capitalize">
          Tasks – {status.replace("-", " ")}
        </h1>
        <button
          onClick={() => navigate(-1)}
          className="text-sm bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
        >
          Tillbaka
        </button>
      </div>

      <p className="text-sm text-gray-600 mb-4">
        Klicka på en task för att visa detaljer, uppdatera status eller lägga till mer information.
      </p>

      {filteredTasks.length === 0 ? (
        <p className="text-gray-500">No tasks found.</p>
      ) : (
        <ul className="space-y-4">
          {filteredTasks.map((task) => (
            <li
              key={task._id}
              onClick={() => setSelectedTask(task)}
              className="bg-white p-4 rounded-lg shadow-md cursor-pointer hover:bg-gray-50"
            >
              <h2 className="text-lg font-semibold">{task.title}</h2>
              <p className="text-sm text-gray-500">Status: {task.status}</p>
              <p className="text-sm text-gray-400">
                Created: {new Date(task.createdAt).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      )}

      {selectedTask && (
        <TaskModal
          task={selectedTask}
          onClose={() => setSelectedTask(null)}
          onUpdate={refetchTasks}
        />
      )}
    </div>
  );
};

export default TaskListPage;
