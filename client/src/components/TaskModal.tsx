import { useState } from "react";
import { Task, TaskStatus } from "../types/task";
import axios from "../api/axios";
import { Pencil } from "lucide-react";
import { toast } from "sonner";

interface Props {
  task: Task;
  onClose: () => void;
  onUpdate: () => void;
}

const TaskModal = ({ task, onClose, onUpdate }: Props) => {
  const [title, setTitle] = useState(task.title);
  const [status, setStatus] = useState<TaskStatus>(task.status);
  const [description, setDescription] = useState(task.description || "");
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    setLoading(true);
    try {
      await axios.put(`/api/tasks/${task._id}`, {
        title,
        status,
        description,
      });
      toast.success("Task updated successfully!");
      onUpdate();
      onClose();
    } catch (err) {
      console.error(" Failed to update task", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md space-y-4 relative">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-700">Task Details</h2>
          <button onClick={() => setEditing(!editing)}>
            <Pencil className="w-5 h-5 text-gray-600 hover:text-gray-800" />
          </button>
        </div>

        {editing ? (
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border p-2 rounded"
          />
        ) : (
          <p className="text-lg font-medium text-gray-800">{title}</p>
        )}

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value as TaskStatus)}
          className="w-full border p-2 rounded"
        >
          <option value="todo">To Do</option>
          <option value="in-progress">In Progress</option>
          <option value="done">Done</option>
        </select>

        {editing ? (
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border p-2 rounded"
          />
        ) : (
          <p className="text-sm text-gray-600 whitespace-pre-wrap">{description}</p>
        )}

        <div className="flex justify-end gap-2 pt-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm bg-gray-200 rounded hover:bg-gray-300"
          >
            Avbryt
          </button>
          <button
            onClick={handleSave}
            disabled={loading}
            className="px-4 py-2 text-sm bg-green-600 text-white rounded hover:bg-green-700"
          >
            {loading ? "Sparar..." : "Klar"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskModal;
