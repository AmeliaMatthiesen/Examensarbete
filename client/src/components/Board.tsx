import {
  DndContext,
  closestCenter,
  DragEndEvent,
  useSensor,
  useSensors,
  PointerSensor,
} from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useEffect, useState } from "react";
import { Task, TaskStatus } from "../types/task";
import axios from "../api/axios";
import { toast } from "sonner";
import MultiMoveModal from "./MultiMoveModal";
import TaskModal from "./TaskModal";
import { useDroppable } from "@dnd-kit/core";
import { useRef } from "react";

const statuses: TaskStatus[] = ["todo", "in-progress", "done"];

const DraggableCard = ({ task, onClick }: { task: Task; onClick: () => void }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: task._id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    touchAction: "manipulation",
  };

  const pointerDown = useRef<number | null>(null);

  const handlePointerDown = (e: React.PointerEvent) => {
    pointerDown.current = e.timeStamp;
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    const diff = e.timeStamp - (pointerDown.current ?? 0);
    if (diff < 200) {
      onClick();
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="bg-white p-3 rounded-md shadow cursor-pointer hover:shadow-md select-none"
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
    >
      {/* Dra härifrån */}
      <div {...attributes} {...listeners}>
        <p className="font-medium">{task.title}</p>
        <p className="text-sm text-gray-500">{task.type}</p>
      </div>
    </div>
  );
};



const Board = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [destinationStatus, setDestinationStatus] = useState<TaskStatus | null>(null);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const sensors = useSensors(useSensor(PointerSensor));

  const fetchTasks = async () => {
    try {
      const res = await axios.get("/api/tasks");
      setTasks(res.data);
    } catch (err) {
      console.error(" Failed to fetch tasks", err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleDragEnd = (event: DragEndEvent) => {
    const overId = event.over?.id as TaskStatus | undefined;
    if (!overId || !statuses.includes(overId)) return;
    setDestinationStatus(overId);
    setModalOpen(true);
  };

  const handleMove = async (taskIds: string[]) => {
    try {
      await Promise.all(
        taskIds.map((id) =>
          axios.put(`/api/tasks/${id}`, { status: destinationStatus })
        )
      );

      setTasks((prev) =>
        prev.map((task) =>
          taskIds.includes(task._id)
            ? { ...task, status: destinationStatus! }
            : task
        )
      );

      toast.success("Tasks moved!");
    } catch (err) {
      toast.error("Failed to move tasks");
    }
  };

  const DroppableColumn = ({
    status,
    children,
  }: {
    status: TaskStatus;
    children: React.ReactNode;
  }) => {
    const { setNodeRef } = useDroppable({ id: status });

    return (
      <div
        ref={setNodeRef}
        id={status}
        className="bg-gray-100 rounded-xl p-4 min-h-[200px] scroll-mt-32"
      >
        <h3 className="text-lg font-semibold capitalize mb-2">
          {status.replace("-", " ")}
        </h3>
        {children}
      </div>
    );
  };

  return (
    <>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {statuses.map((status) => (
            <DroppableColumn key={status} status={status}>
              <SortableContext
                items={tasks
                  .filter((t) => t.status === status)
                  .map((t) => t._id)}
                strategy={verticalListSortingStrategy}
              >
                <div className="space-y-2">
                  {tasks
                    .filter((t) => t.status === status)
                    .map((task) => (
                      <DraggableCard
                        key={task._id}
                        task={task}
                        onClick={() => setSelectedTask(task)}
                      />
                    ))}
                </div>
              </SortableContext>
            </DroppableColumn>
          ))}
        </div>
      </DndContext>

      <MultiMoveModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        tasks={tasks.filter((t) => t.status !== destinationStatus)}
        onConfirm={handleMove}
      />

      {selectedTask && (
        <TaskModal
          task={selectedTask}
          onClose={() => setSelectedTask(null)}
          onUpdate={fetchTasks}
        />
      )}
    </>
  );
};

export default Board;
