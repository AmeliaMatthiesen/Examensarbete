import { useTaskStore } from '@/stores/useTaskStore';

const TaskList = () => {
  const tasks = useTaskStore((state) => state.tasks);
  const toggleTask = useTaskStore((state) => state.toggleTask);

  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id}>
          <label>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTask(task.id)}
            />
            {task.title}
          </label>
        </li>
      ))}
    </ul>
  );
};
