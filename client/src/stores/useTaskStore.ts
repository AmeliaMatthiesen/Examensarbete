import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

type Task = {
  id: string;
  title: string;
  completed: boolean;
};

type TaskState = {
  tasks: Task[];
  addTask: (task: Task) => void;
  toggleTask: (id: string) => void;
};

export const useTaskStore = create<TaskState>()(
    devtools((set) => ({
      tasks: [],
      addTask: (task) =>
        set((state) => ({
          tasks: [...state.tasks, task],
        })),
      toggleTask: (id) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id ? { ...task, completed: !task.completed } : task
          ),
        })),
    }), { name: 'TaskStore' })
  );