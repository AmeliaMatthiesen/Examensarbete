import { useState } from "react";
import { Task } from "../types/task";
import { toast } from "sonner";

interface Props {
  tasks: Task[];
  open: boolean;
  onClose: () => void;
  onConfirm: (taskIds: string[]) => void;
}

export default function MultiMoveModal({ tasks, open, onClose, onConfirm }: Props) {
  const [selected, setSelected] = useState<string[]>([]);

  const toggle = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleConfirm = () => {
    onConfirm(selected);
    toast.success("Tasks moved to new status");
    onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md space-y-4">
        <h2 className="text-lg font-semibold">Select tasks to move</h2>
        <div className="max-h-60 overflow-y-auto space-y-2">
          {tasks.map((task) => (
            <label key={task._id} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={selected.includes(task._id)}
                onChange={() => toggle(task._id)}
              />
              {task.title}
            </label>
          ))}
        </div>
        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 bg-gray-200 rounded">Cancel</button>
          <button onClick={handleConfirm} className="px-4 py-2 bg-indigo-600 text-white rounded">
            Move Selected
          </button>
        </div>
      </div>
    </div>
  );
}
