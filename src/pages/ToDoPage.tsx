import { useState } from "react";
import {
  Box,
  Typography,
  styled,
  TextField,
  Button,
  Drawer,
  IconButton,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Popover,
} from "@mui/material";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import CloseIcon from "@mui/icons-material/Close";

// DEĞİŞİKLİK BURADA: Yeni ikonları içe aktarıyoruz
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import DragHandleIcon from '@mui/icons-material/DragHandle';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';

import { nanoid } from "nanoid";

// Her bir görevin türünü tanımlıyoruz
type Priority = "low" | "medium" | "high";

interface Task {
  id: string;
  content: string;
  priority: Priority;
  comment?: string;
}

// Her bir sütunun türünü tanımlıyoruz
interface Column {
  id: "todo" | "inprogress" | "done" | "cancelled";
  title: string;
  tasks: Task[];
}

const PriorityIndicator = styled(Box)<{ priority: Priority }>(({ priority }) => ({
  width: "8px",
  height: "100%",
  borderRadius: "8px 0 0 8px",
  backgroundColor:
    priority === "high"
      ? "#f44336"
      : priority === "medium"
      ? "#ff9800"
      : "#4caf50",
}));

// DEĞİŞİKLİK BURADA: PriorityLabel bileşenini güncelliyoruz
const PriorityLabel = styled(Box)<{ priority: Priority }>(({ priority }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: '4px 8px',
  borderRadius: '4px',
  fontSize: '0.75rem',
  fontWeight: 'bold',
  color: '#ffffff', // Tüm yazılar beyaz olacak
  backgroundColor:
    priority === "high"
      ? "#f44336" // Kırmızı arka plan
      : priority === "medium"
      ? "#ff9800" // Sarı arka plan
      : "#4caf50", // Yeşil arka plan
  "& .MuiSvgIcon-root": {
    fontSize: '0.85rem',
    marginRight: '4px',
    color: '#ffffff', // Tüm ikonlar beyaz olacak
  }
}));

const ToDoPageWrapper = styled(Box)({
  backgroundColor: "#121212",
  color: "#e0e0e0",
  minHeight: "100vh",
  fontFamily: "'Roboto', sans-serif",
  display: "flex",
  flexDirection: "column",
});

const ColumnsContainer = styled(Box)({
  display: "flex",
  gap: "24px",
  flexGrow: 1,
  overflowX: "auto",
  padding: "0 32px 24px",
  width: "100%",
  justifyContent: "center",
  "@media (max-width: 600px)": {
    flexDirection: "column",
    alignItems: "center",
  },
});

const ColumnBox = styled(Box)({
  backgroundColor: "#1e1e1e",
  padding: "16px",
  borderRadius: "12px",
  boxShadow: "0 4px 16px rgba(0,0,0,0.3)",
  minWidth: "280px",
  flexShrink: 0,
  minHeight: "500px",
  display: "flex",
  flexDirection: "column",
  "@media (max-width: 600px)": {
    width: "90%",
  },
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
  borderRadius: "8px",
  marginBottom: "12px",
  transition: "box-shadow 0.2s ease-in-out",
  display: "flex",
  alignItems: "center",
  justifyContent: 'space-between',
  cursor: "pointer",
  "&:hover": {
    boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
  },
});

export function ToDoPage() {
  const [columns, setColumns] = useState<Column[]>([
    {
      id: "todo",
      title: "Yapılacaklar",
      tasks: [
        { id: nanoid(), content: "İlk görev", priority: "high" },
        { id: nanoid(), content: "İkinci görev", priority: "medium" },
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

  const [newTaskContent, setNewTaskContent] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [selectedTaskColumnId, setSelectedTaskColumnId] = useState<
    string | null
  >(null);

  const [popoverAnchorEl, setPopoverAnchorEl] = useState<null | HTMLElement>(null);

  const handleAddTask = () => {
    if (!newTaskContent.trim()) {
      return;
    }

    const newTask = {
      id: nanoid(),
      content: newTaskContent,
      priority: "medium" as Priority,
    };

    setColumns((prevColumns) =>
      prevColumns.map((column) => {
        if (column.id === "todo") {
          return {
            ...column,
            tasks: [...column.tasks, newTask],
          };
        }
        return column;
      })
    );
    setNewTaskContent("");
  };

  const openDrawer = (task: Task, columnId: string) => {
    setSelectedTask(task);
    setSelectedTaskColumnId(columnId);
    setDrawerOpen(true);
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
    setSelectedTask(null);
    setSelectedTaskColumnId(null);
  };

  const handleTaskUpdate = (
    taskId: string,
    updatedTaskData: Partial<Task>
  ) => {
    setColumns((prevColumns) =>
      prevColumns.map((column) => ({
        ...column,
        tasks: column.tasks.map((task) =>
          task.id === taskId ? { ...task, ...updatedTaskData } : task
        ),
      }))
    );
    if (selectedTask) {
      setSelectedTask((prev) => ({
        ...prev!,
        ...updatedTaskData,
      }));
    }
  };

  const handleOpenPopover = (event: React.MouseEvent<HTMLElement>, task: Task, columnId: string) => {
    event.stopPropagation();
    setPopoverAnchorEl(event.currentTarget);
    setSelectedTask(task);
    setSelectedTaskColumnId(columnId);
  };

  const handleClosePopover = () => {
    setPopoverAnchorEl(null);
    setSelectedTask(null);
    setSelectedTaskColumnId(null);
  };

  const handleMoveTask = (destinationColumnId: string) => {
    if (!selectedTask || !selectedTaskColumnId) return;

    setColumns((prevColumns) => {
      const sourceColumn = prevColumns.find((col) => col.id === selectedTaskColumnId);
      const destinationColumn = prevColumns.find((col) => col.id === destinationColumnId);

      if (!sourceColumn || !destinationColumn) return prevColumns;

      const newSourceTasks = sourceColumn.tasks.filter((task) => task.id !== selectedTask.id);
      const newDestinationTasks = [...destinationColumn.tasks, selectedTask];

      return prevColumns.map((column) => {
        if (column.id === selectedTaskColumnId) {
          return { ...column, tasks: newSourceTasks };
        }
        if (column.id === destinationColumnId) {
          return { ...column, tasks: newDestinationTasks };
        }
        return column;
      });
    });
    handleClosePopover();
  };

  // DEĞİŞİKLİK BURADA: Öncelik etiketlerini ve ikonlarını güncelliyoruz
  const getPriorityLabel = (priority: Priority) => {
    switch (priority) {
      case "low":
        return (
          <PriorityLabel priority="low">
            <KeyboardDoubleArrowDownIcon /> Düşük
          </PriorityLabel>
        );
      case "medium":
        return (
          <PriorityLabel priority="medium">
            <DragHandleIcon /> Orta
          </PriorityLabel>
        );
      case "high":
        return (
          <PriorityLabel priority="high">
            <KeyboardDoubleArrowUpIcon /> Yüksek
          </PriorityLabel>
        );
      default:
        return null;
    }
  };

  const isPopoverOpen = Boolean(popoverAnchorEl);
  const popoverId = isPopoverOpen ? 'popover-menu' : undefined;

  return (
    <ToDoPageWrapper>
      <Box
        sx={{
          p: 3,
          backgroundColor: "#1e1e1e",
          borderBottom: "1px solid #444",
          lineHeight: "0.47",
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
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

      <Box
        sx={{
          paddingTop: "100px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            gap: "16px",
            mb: 3,
            maxWidth: "1200px",
            padding: "0 32px",
            width: "100%",
          }}
        >
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Yeni görev ekle..."
            value={newTaskContent}
            onChange={(e) => setNewTaskContent(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleAddTask();
              }
            }}
            sx={{
              input: { color: "#fff" },
              "& .MuiOutlinedInput-notchedOutline": { borderColor: "#444" },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "#666",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "#00bcd4",
              },
            }}
          />
          <Button
            variant="contained"
            onClick={handleAddTask}
            disabled={!newTaskContent.trim()}
            sx={{
              backgroundColor: "#00bcd4",
              "&:hover": { backgroundColor: "#0097a7" },
              color: "#1e1e1e",
              textTransform: "none",
              minWidth: "120px",
              fontWeight: "bold",
            }}
          >
            Ekle
          </Button>
        </Box>

        <ColumnsContainer>
          {columns.map((column) => (
            <ColumnBox key={column.id}>
              <Typography variant="h5" component="h2">
                {column.title}
              </Typography>
              {column.tasks.length > 0 ? (
                column.tasks.map((task) => (
                  <TaskItem
                    key={task.id}
                    onClick={() => openDrawer(task, column.id)}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
                      <PriorityIndicator priority={task.priority} />
                      <Box sx={{ p: "12px", display: 'flex', flexDirection: 'column' }}>
                        <Typography variant="body1" sx={{mb: '8px'}}>{task.content}</Typography>
                        {getPriorityLabel(task.priority)}
                      </Box>
                    </Box>
                    <IconButton
                      onClick={(e) => handleOpenPopover(e, task, column.id)}
                      sx={{ color: "#e0e0e0" }}
                    >
                      <MoreHorizIcon />
                    </IconButton>
                  </TaskItem>
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
            </ColumnBox>
          ))}
        </ColumnsContainer>
      </Box>

      {/* Görev Taşıma Popover Menüsü */}
      <Popover
        id={popoverId}
        open={isPopoverOpen}
        anchorEl={popoverAnchorEl}
        onClose={handleClosePopover}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        TransitionProps={{ timeout: 300 }}
        PaperProps={{
          sx: {
            backgroundColor: '#2a2a2a',
            color: '#e0e0e0',
            borderRadius: '8px',
            boxShadow: '0 4px 16px rgba(0,0,0,0.5)',
            mt: '8px',
          },
        }}
      >
        <Box sx={{ p: 1 }}>
          <Typography variant="caption" sx={{ color: '#aaa', display: 'block', mb: 1 }}>
            Taşı
          </Typography>
          {columns.map((col) => (
            selectedTaskColumnId !== col.id && (
              <MenuItem
                key={col.id}
                onClick={() => handleMoveTask(col.id)}
                sx={{
                  color: '#e0e0e0',
                  '&:hover': {
                    backgroundColor: '#444',
                  },
                }}
              >
                {col.title}
              </MenuItem>
            )
          ))}
        </Box>
      </Popover>

      {/* Görev Detayları Paneli */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={closeDrawer}
        PaperProps={{
          sx: {
            width: "300px",
            backgroundColor: "#1e1e1e",
            color: "#e0e0e0",
          },
        }}
      >
        <Box
          sx={{
            p: 3,
            height: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Typography variant="h6">Görevi Düzenle</Typography>
            <IconButton onClick={closeDrawer} sx={{ color: "#e0e0e0" }}>
              <CloseIcon />
            </IconButton>
          </Box>
          {selectedTask && (
            <>
              <TextField
                label="Görev İçeriği"
                variant="outlined"
                fullWidth
                multiline
                rows={4}
                sx={{
                  mb: 2,
                  "& .MuiInputBase-input": { color: "#fff" },
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#444",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#666",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#00bcd4",
                  },
                  "& .MuiInputLabel-root": { color: "#e0e0e0" },
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: "#00bcd4",
                  },
                }}
                value={selectedTask.content}
                onChange={(e) =>
                  handleTaskUpdate(selectedTask.id, {
                    content: e.target.value,
                  })
                }
              />
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel
                  sx={{ color: "#e0e0e0", "&.Mui-focused": { color: "#00bcd4" } }}
                >
                  Önem Sırası
                </InputLabel>
                <Select
                  value={selectedTask.priority}
                  label="Önem Sırası"
                  onChange={(e) =>
                    handleTaskUpdate(selectedTask.id, {
                      priority: e.target.value as Priority,
                    })
                  }
                  sx={{
                    color: "#fff",
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#444",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#666",
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#00bcd4",
                    },
                    "& .MuiSelect-icon": { color: "#fff" },
                  }}
                >
                  <MenuItem value="low">Düşük</MenuItem>
                  <MenuItem value="medium">Orta</MenuItem>
                  <MenuItem value="high">Yüksek</MenuItem>
                </Select>
              </FormControl>
              <TextField
                label="Yorum"
                variant="outlined"
                fullWidth
                multiline
                rows={4}
                sx={{
                  mb: 2,
                  "& .MuiInputBase-input": { color: "#fff" },
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#444",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#666",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#00bcd4",
                  },
                  "& .MuiInputLabel-root": { color: "#e0e0e0" },
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: "#00bcd4",
                  },
                }}
                value={selectedTask.comment || ""}
                onChange={(e) =>
                  handleTaskUpdate(selectedTask.id, {
                    comment: e.target.value,
                  })
                }
              />
            </>
          )}
        </Box>
      </Drawer>
    </ToDoPageWrapper>
  );
}