import { useQuery } from "@tanstack/react-query";
import axios from "../api/axios";
import { Task } from "../types/task"; 

export const useTasks = () => {
  return useQuery<Task[]>({ 
    queryKey: ["tasks"],
    queryFn: async () => {
      const res = await axios.get("/api/tasks");
      return res.data;
    },
  });
};
 