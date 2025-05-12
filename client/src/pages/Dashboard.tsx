import { useTasks } from "../hooks/useTasks";
import { Task } from "../types/task";
import SummaryCard from "../components/SummaryCard";
import WeeklyChart from "../components/WeeklyChart";
import CalendarView from "../components/CalendarView";
import { useAuthStore } from "../stores/authStore";
import { gapi } from "gapi-script";
import { useNavigate, Link } from "react-router-dom";
import Board from "../components/Board";

const Dashboard = () => {
  const { data: tasks, isLoading, isError } = useTasks();
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    const auth2 = gapi.auth2?.getAuthInstance();
    if (auth2) {
      auth2.signOut().then(() => console.log("🧼 Google logged out"));
    }
  };

  if (isLoading) return <p>Loading tasks...</p>;
  if (isError || !tasks) return <p>Failed to load tasks.</p>;

  const todoCount = tasks.filter((task: Task) => task.status === "todo").length;
  const inProgressCount = tasks.filter(
    (task: Task) => task.status === "in-progress"
  ).length;
  const doneCount = tasks.filter((task: Task) => task.status === "done").length;

  return (
    <main className="min-h-screen p-6 bg-gray-100 flex flex-col gap-8">
      {/* Header */}
      <section className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
          <p className="text-sm text-gray-500">
            Stay on track and get things done 🚀
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => navigate("/create-task")}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
          >
            Create Task
          </button>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
          >
            Logga ut
          </button>
        </div>
      </section>

      {/* Summary Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <a href="#todo" className="hover:opacity-80 transition">
          <SummaryCard title="To Do" count={todoCount} icon="📝" />
        </a>
        <a href="#in-progress" className="hover:opacity-80 transition">
          <SummaryCard title="In Progress" count={inProgressCount} icon="🚧" />
        </a>
        <a href="#done" className="hover:opacity-80 transition">
          <SummaryCard title="Done" count={doneCount} icon="✅" />
        </a>
        <a href="#done" className="hover:opacity-80 transition">
          <SummaryCard title="This Sprint" count={doneCount} icon="📊" />
        </a>
      </section>

      {/* Task Board */}
      <section className="bg-white rounded-2xl p-4 shadow-sm space-y-4">
        <h2 className="text-lg font-semibold text-gray-700">Task Board</h2>
        <Board />
      </section>

      {/* Weekly Overview */}
      <section className="bg-white rounded-2xl p-4 shadow-sm space-y-4">
        <h2 className="text-lg font-semibold text-gray-700">Weekly Overview</h2>
        <WeeklyChart />
        <CalendarView />
      </section>
    </main>
  );
};

export default Dashboard;
