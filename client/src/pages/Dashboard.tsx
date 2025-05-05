import SummaryCard from "../components/SummaryCard";
import { useTasks } from "../hooks/useTasks";
import { Task } from "../types/task"; 

const Dashboard = () => {
    const { data: tasks, isLoading, isError } = useTasks();
  
    if (isLoading) return <p>Loading tasks...</p>;
    if (isError || !tasks) return <p>Failed to load tasks.</p>; 
  

    const todoCount = tasks.filter((task: Task) => task.status === "todo").length;
    const inProgressCount = tasks.filter((task: Task) => task.status === "in-progress").length;
    const doneCount = tasks.filter((task: Task) => task.status === "done").length;
  

  return (
    <main className="min-h-screen p-6 bg-gray-100 flex flex-col gap-8">
      {/* Header */}
      <section>
        <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-sm text-gray-500">Stay on track and get things done 🚀</p>
      </section>

      {/* Top Row – 4 Summary Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <SummaryCard title="To Do" count={todoCount} icon="📝" />
        <SummaryCard title="In Progress" count={inProgressCount} icon="🚧" />
        <SummaryCard title="Done" count={doneCount} icon="✅" />
        <SummaryCard title="This Week" count={doneCount} icon="📊" />
      </section>

      {/* Bottom – Calendar or Weekly Overview */}
      <section className="bg-white rounded-2xl p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Weekly Overview</h2>
        <div className="h-64 flex items-center justify-center text-gray-400">
          📅 Calendar or chart coming soon...
        </div>
      </section>
    </main>
  );
};

export default Dashboard;
