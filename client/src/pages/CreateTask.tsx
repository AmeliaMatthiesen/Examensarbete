import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";
import { TaskType, TaskStatus } from "../types/task";
import { toast } from "sonner";
import { Task } from "../types/task";

const CreateTask = () => {
  const navigate = useNavigate();

  const [type, setType] = useState<TaskType>("development");
  const [status, setStatus] = useState<TaskStatus>("todo");
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [repeat, setRepeat] = useState<
    "none" | "daily" | "weekly" | "biweekly"
  >("none");

  const [meetingTime, setMeetingTime] = useState("");
  const [participants, setParticipants] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newTask: any = {
      title,
      status,
      type,
      repeat,
    };

    if (type === "meeting") {
      newTask.time = meetingTime;
      newTask.participants = participants;
    }

    if (type === "communication" || type === "planning") {
      newTask.details = details;
    }

    try {
      await axios.post("/api/tasks", newTask);
      toast.success("Task created!");
      navigate("/"); // Tillbaka till dashboard
    } catch (err) {
      console.error("❌ Failed to create task", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Create New Task</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Task Type */}
          <select
            value={type}
            onChange={(e) => setType(e.target.value as TaskType)}
            className="w-full border-b-2 border-gray-300 focus:border-blue-500 outline-none py-2"
          >
            <option value="development">Development</option>
            <option value="meeting">Meeting</option>
            <option value="communication">Communication</option>
            <option value="planning">Planning</option>
          </select>

          {/* Common */}
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full border-b-2 border-gray-300 focus:border-blue-500 outline-none py-2"
          />

          {/* Conditional Fields */}
          {type === "meeting" && (
            <>
              <input
                type="datetime-local"
                value={meetingTime}
                onChange={(e) => setMeetingTime(e.target.value)}
                className="w-full border-b-2 border-gray-300 focus:border-blue-500 outline-none py-2"
              />
              <input
                type="text"
                placeholder="Participants"
                value={participants}
                onChange={(e) => setParticipants(e.target.value)}
                className="w-full border-b-2 border-gray-300 focus:border-blue-500 outline-none py-2"
              />
            </>
          )}

          {(type === "communication" || type === "planning") && (
            <textarea
              placeholder="Details"
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              className="w-full border-b-2 border-gray-300 focus:border-blue-500 outline-none py-2"
            />
          )}

          {/* Status */}
          <select
            value={repeat}
            onChange={(e) => setRepeat(e.target.value as Task["repeat"])}
            className="w-full border p-2 rounded"
          >
            <option value="none">None</option>
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="biweekly">Biweekly</option>
          </select>

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md transition"
          >
            Create
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateTask;
