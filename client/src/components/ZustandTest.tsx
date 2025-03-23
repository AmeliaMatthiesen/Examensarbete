import { useTaskStore } from '../stores/useTaskStore';

const ZustandTest = () => {
  const tasks = useTaskStore((state) => state.tasks);
  const addTask = useTaskStore((state) => state.addTask);
  const toggleTask = useTaskStore((state) => state.toggleTask);

  return (
    <div className="p-4 border rounded-md max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-2">Zustand Test</h2>

      <button
        onClick={() =>
          addTask({
            id: crypto.randomUUID(),
            title: 'New task',
            completed: false,
          })
        }
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
      >
        Add Task
      </button>

      <ul className="space-y-2">
        {tasks.map((task) => (
          <li key={task.id} className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTask(task.id)}
            />
            <span className={task.completed ? 'line-through text-gray-500' : ''}>
              {task.title}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ZustandTest;
