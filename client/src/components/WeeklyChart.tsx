import { useTasks } from "../hooks/useTasks";
import {
  ResponsiveContainer,
  BarChart,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
} from "recharts";
import { Task } from "../types/task";
import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";
import isBetween from "dayjs/plugin/isBetween";
dayjs.extend(isBetween);

dayjs.extend(isoWeek);

const WeeklyChart = () => {
  const { data: tasks, isLoading } = useTasks();

  const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const today = dayjs();
  const isEvenWeek = today.isoWeek() % 2 === 0;
  const startOfSprint = isEvenWeek
    ? today.startOf("isoWeek")
    : today.startOf("isoWeek").subtract(1, "week");

const endOfSprint = startOfSprint.add(13, "day");

const doneThisSprint =
  tasks?.filter(
    (task: Task) =>
      task.status === "done" &&
      dayjs(task.updatedAt).isBetween(startOfSprint, endOfSprint, "day", "[]")
  ) || [];

  
  const dayCount: Record<string, number> = weekDays.reduce((acc, day) => {
    acc[day] = 0;
    return acc;
  }, {} as Record<string, number>);

  doneThisSprint.forEach((task: Task) => {
    const day = dayjs(task.updatedAt).format("ddd");
    const mappedDay =
      day === "Mon"
        ? "Mon"
        : day === "Tue"
        ? "Tue"
        : day === "Wed"
        ? "Wed"
        : day === "Thu"
        ? "Thu"
        : day === "Fri"
        ? "Fri"
        : day === "Sat"
        ? "Sat"
        : "Sun";

    dayCount[mappedDay]++;
  });

  const chartData = weekDays.map((day) => ({
    day,
    done: dayCount[day],
  }));

  return (
    <div className="bg-white p-6 rounded-2xl shadow">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">
        Tasks Done This Sprint
      </h2>

      {isLoading ? (
        <p>Loading chart...</p>
      ) : (
        <ResponsiveContainer width="100%" height={150}>
          <BarChart data={chartData}>
            <XAxis dataKey="day" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="done" fill="#4f46e5" />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default WeeklyChart;
