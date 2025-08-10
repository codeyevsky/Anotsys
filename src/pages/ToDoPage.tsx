import { useState } from "react";
import { Box, Typography, styled } from "@mui/material";
import {
  DndContext,
  closestCenter,
  useSensor,
  useSensors,
  PointerSensor,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

// Her bir görevin türünü tanımlıyoruz
interface Task {
  id: string;
  content: string;
}

// Her bir sütunun türünü tanımlıyoruz
interface Column {
  id: "todo" | "inprogress" | "done" | "cancelled";
  title: string;
  tasks: Task[];
}

const ToDoPageWrapper = styled(Box)({
  backgroundColor: "#121212",
  color: "#e0e0e0",
  minHeight: "100vh",
  fontFamily: "'Roboto', sans-serif",
  display: "flex",
  flexDirection: "column",
  padding: "32px",
});

const ColumnsContainer = styled(Box)({
  display: "flex",
  gap: "24px",
  flexGrow: 1,
  overflowX: "auto",
  paddingTop: "24px",
});

const ColumnBox = styled(Box)({
  backgroundColor: "#1e1e1e",
  padding: "16px",
  borderRadius: "12px",
  boxShadow: "0 4px 16px rgba(0,0,0,0.3)",
  minWidth: "280px",
  flexShrink: 0,
  minHeight: "500px",
  "& h2": {
    textAlign: "center",
    borderBottom: "2px solid #333",
    paddingBottom: "12px",
    marginBottom: "16px",
    color: "#00bcd4",
  },
});

const TaskItem = styled(Box)({
  backgroundColor: "#2a2a2a",
  color: "#e0e0e0",
  padding: "12px",
  borderRadius: "8px",
  marginBottom: "12px",
  cursor: "grab",
  transition: "box-shadow 0.2s ease-in-out, transform 0.2s ease-in-out",
  "&:hover": {
    boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
    transform: "translateY(-2px)",
  },
  "&:active": {
    cursor: "grabbing",
  },
});

const SortableTaskItem = ({ task }: { task: Task }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <TaskItem ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {task.content}
    </TaskItem>
  );
};

export function ToDoPage() {
  const [columns, setColumns] = useState<Column[]>([
    {
      id: "todo",
      title: "Yapılacaklar",
      tasks: [
        { id: "task-1", content: "Proje planlaması yap" },
        { id: "task-2", content: "React bileşenlerini yaz" },
        { id: "task-3", content: "API entegrasyonu tamamla" },
      ],
    },
    {
      id: "inprogress",
      title: "Yapılıyor",
      tasks: [],
    },
    {
      id: "done",
      title: "Yapıldı",
      tasks: [],
    },
    {
      id: "cancelled",
      title: "İptal Edildi",
      tasks: [],
    },
  ]);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

  const findColumnId = (id: string | number) => {
    const column = columns.find(
      (col) => col.id === id || col.tasks.some((task) => task.id === id)
    );
    return column ? column.id : null;
  };

  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeColumnId = findColumnId(active.id);
    const overColumnId = findColumnId(over.id);

    if (!activeColumnId || !overColumnId) return;

    // Aynı sütun içinde sıralama
    if (activeColumnId === overColumnId) {
      setColumns((prevColumns) =>
        prevColumns.map((column) => {
          if (column.id === activeColumnId) {
            const oldIndex = column.tasks.findIndex(
              (task) => task.id === active.id
            );
            const newIndex = column.tasks.findIndex(
              (task) => task.id === over.id
            );
            // arrayMove'in döndürdüğü array zaten Task[] tipindedir.
            const newTasks = arrayMove(column.tasks, oldIndex, newIndex);
            return { ...column, tasks: newTasks };
          }
          return column;
        })
      );
    } else {
      // Sütunlar arası taşıma
      setColumns((prevColumns) => {
        let activeTask: Task | undefined;
        let newActiveTasks: Task[] = [];
        let newOverTasks: Task[] = [];

        // Kaynak sütundan görevi bul ve kaldır
        const newColumns = prevColumns.map((column) => {
          if (column.id === activeColumnId) {
            activeTask = column.tasks.find(
              (task) => task.id === active.id
            );
            newActiveTasks = column.tasks.filter(
              (task) => task.id !== active.id
            );
            return { ...column, tasks: newActiveTasks };
          }
          return column;
        });

        // Eğer görev bulunamazsa (activeTask undefined ise) işlem yapma
        if (!activeTask) return newColumns;

        // Hedef sütuna görevi ekle
        return newColumns.map((column) => {
          if (column.id === overColumnId) {
            // over.id bir görev id'si ise, doğru pozisyonu bul
            const overIndex = column.tasks.findIndex(
              (task) => task.id === over.id
            );
            
            // Eğer overIndex bulunamazsa, görevi en sona ekle (boş sütun durumu)
            if (overIndex >= 0) {
              newOverTasks = [
                ...column.tasks.slice(0, overIndex),
                activeTask!, // "!" ile activeTask'in null/undefined olmayacağını garanti ediyoruz.
                ...column.tasks.slice(overIndex),
              ];
            } else {
              newOverTasks = [...column.tasks, activeTask!];
            }

            return { ...column, tasks: newOverTasks };
          }
          return column;
        });
      });
    }
  };

  return (
    <ToDoPageWrapper>
      <Box
        sx={{
          p: 3,
          backgroundColor: "#1e1e1e",
          borderBottom: "1px solid #444",
          lineHeight: "0.47",
          position: "sticky",
          top: 0,
          zIndex: 10,
          boxShadow: "0 2px 4px rgba(0,0,0,0.5)",
        }}
      >
        <Typography
          variant="h4"
          component="h1"
          color="#00bcd4"
          sx={{ lineHeight: "0.47", fontWeight: "bold" }}
        >
          To-Do Listesi
        </Typography>
      </Box>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={onDragEnd}
      >
        <ColumnsContainer>
          {columns.map((column) => (
            <ColumnBox key={column.id} id={column.id}>
              <Typography variant="h5" component="h2">
                {column.title}
              </Typography>
              <SortableContext
                items={column.tasks.map((task) => task.id)}
                strategy={verticalListSortingStrategy}
              >
                {column.tasks.length > 0 ? (
                  column.tasks.map((task) => (
                    <SortableTaskItem key={task.id} task={task} />
                  ))
                ) : (
                  <Typography
                    id={column.id}
                    variant="body2"
                    color="#666"
                    textAlign="center"
                    mt={3}
                  >
                    Henüz görev yok.
                  </Typography>
                )}
              </SortableContext>
            </ColumnBox>
          ))}
        </ColumnsContainer>
      </DndContext>
    </ToDoPageWrapper>
  );
}