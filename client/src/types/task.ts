export type TaskType = "development" | "meeting" | "communication" | "planning";
export type TaskStatus = "todo" | "in-progress" | "done";

export interface Task {
  _id: string;
  title: string;
  status: TaskStatus;
  type: TaskType;
  createdAt: string;
  updatedAt: string;
  description?: string;
  repeat?: "none" | "daily" | "weekly" | "biweekly"; 
}


