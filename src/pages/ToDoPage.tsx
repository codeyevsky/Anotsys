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
  Modal,
  Fade,
} from "@mui/material";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from '@mui/icons-material/Add';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import DragHandleIcon from '@mui/icons-material/DragHandle';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import { nanoid } from "nanoid";

type Priority = "low" | "medium" | "high";

interface Task {
  id: string;
  content: string;
  priority: Priority;
  comment?: string;
}

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

const PriorityLabel = styled(Box)<{ priority: Priority }>(({ priority }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: '4px 8px',
  borderRadius: '4px',
  fontSize: '0.75rem',
  fontWeight: 'bold',
  color: '#ffffff',
  backgroundColor:
    priority === "high"
      ? "#f44336"
      : priority === "medium"
      ? "#ff9800"
      : "#4caf50",
  "& .MuiSvgIcon-root": {
    fontSize: '0.85rem',
    marginRight: '4px',
    color: '#ffffff',
  },
  width: '80px',
  justifyContent: 'flex-start',
}));

const ToDoPageWrapper = styled(Box)({
  backgroundColor: "#121212",
  color: "#e0e0e0",
  minHeight: "100vh",
  fontFamily: "'Roboto', sans-serif",
  display: "flex",
  flexDirection: "column",
  "&::-webkit-scrollbar": {
    width: "12px",
  },
  "&::-webkit-scrollbar-track": {
    backgroundColor: "#121212",
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "#444",
    borderRadius: "10px",
    border: "3px solid #121212",
  },
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
  "&::-webkit-scrollbar": {
    height: "12px",
  },
  "&::-webkit-scrollbar-track": {
    backgroundColor: "#1e1e1e",
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "#444",
    borderRadius: "10px",
    border: "3px solid #1e1e1e",
  },
});

const ColumnBox = styled(Box)({
  backgroundColor: "#1e1e1e",
  padding: "16px",
  borderRadius: "12px",
  boxShadow: "0 4px 16px rgba(0,0,0,0.3)",
  minWidth: "280px",
  maxWidth: "280px",
  flexShrink: 0,
  minHeight: "500px",
  display: "flex",
  flexDirection: "column",
  "@media (max-width: 600px)": {
    width: "90%",
  },
});

const TaskItem = styled(Box)({
  backgroundColor: "#2a2a2a",
  color: "#e0e0e0",
  borderRadius: "8px",
  marginBottom: "12px",
  transition: "box-shadow 0.2s ease-in-out",
  display: "flex",
  alignItems: "flex-start",
  justifyContent: 'space-between',
  cursor: "pointer",
  position: 'relative',
  paddingRight: '40px',
  "&:hover": {
    boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
  },
  maxHeight: '100px',
  overflow: 'hidden',
  width: '100%',
});

const MoreIconWrapper = styled(Box)({
    position: 'absolute',
    top: '8px',
    right: '8px',
    zIndex: 2,
    color: '#e0e0e0',
});

const getPriorityValue = (priority: Priority) => {
  switch (priority) {
    case "high":
      return 3;
    case "medium":
      return 2;
    case "low":
      return 1;
    default:
      return 0;
  }
};

const sortTasksByPriority = (tasks: Task[]) => {
  return [...tasks].sort((a, b) => getPriorityValue(b.priority) - getPriorityValue(a.priority));
};

export function ToDoPage() {
  const [columns, setColumns] = useState<Column[]>([
    {
      id: "todo",
      title: "To Do",
      tasks: sortTasksByPriority([
        { id: nanoid(), content: "This is a very very long task content that should be truncated", priority: "high" },
        { id: nanoid(), content: "This is the second task", priority: "medium" },
      ]),
    },
    {
      id: "inprogress",
      title: "In Progress",
      tasks: [],
    },
    {
      id: "done",
      title: "Done",
      tasks: [],
    },
    {
      id: "cancelled",
      title: "Cancelled",
      tasks: [],
    },
  ]);

  const [newTaskContent, setNewTaskContent] = useState("");
  const [newTaskPriority, setNewTaskPriority] = useState<Priority>("medium");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [selectedTaskColumnId, setSelectedTaskColumnId] = useState<
    string | null
  >(null);

  const [popoverAnchorEl, setPopoverAnchorEl] = useState<null | HTMLElement>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedColumnForNewTask, setSelectedColumnForNewTask] = useState<string>('todo');

  const [codeContent, setCodeContent] = useState("");
  const [parsedTasks, setParsedTasks] = useState<{ content: string; code: string; }[]>([]);

  // Koddan TODO yorumlarını ve ilgili kod bloklarını ayıklayan fonksiyon
  const handleParseCode = (code: string) => {
    const lines = code.split('\n');
    const tasks = [];
    let currentCodeBlock = '';

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const todoMatch = line.match(/(\/\/|#|\/\*|\*|\s?\*)\s*(Todo|To-do|To-do:|Todo:)(.*)/i);
      
      if (todoMatch) {
        const todoContent = todoMatch[3].trim();
        
        // Önceki satırlardan başlayarak ilgili kod bloğunu bulma
        let codeBlock = '';
        let braceCount = 0;
        let startLine = i - 1;
        let isCodeFound = false;
        
        // TODO satırından başlayarak parantezleri kontrol et
        for (let j = i; j < lines.length; j++) {
            const currentLine = lines[j];
            codeBlock += currentLine + '\n';
            if (currentLine.includes('{')) {
                braceCount++;
                isCodeFound = true;
            }
            if (currentLine.includes('}')) {
                braceCount--;
            }
            if (isCodeFound && braceCount === 0) {
                break;
            }
        }

        // Eğer {} bloğu bulunamazsa, sadece TODO satırını veya önceki birkaç satırı al
        if (!isCodeFound) {
            codeBlock = '';
            let k = i;
            while (k >= 0 && lines[k].trim() !== '') {
                codeBlock = lines[k] + '\n' + codeBlock;
                k--;
                if (i - k > 5) break; // Çok uzun olmasını önlemek için
            }
            codeBlock += lines[i].trim();
        }

        tasks.push({ content: todoContent, code: codeBlock.trim() });
        currentCodeBlock = '';
      }
    }
    setParsedTasks(tasks);
  };

  const handleAddAllParsedTasks = () => {
    if (parsedTasks.length === 0) return;

    setColumns((prevColumns) =>
      prevColumns.map((column) => {
        if (column.id === 'todo') {
          const newTasks = parsedTasks.map(parsedTask => ({
            id: nanoid(),
            content: parsedTask.content,
            priority: "medium" as Priority,
            comment: parsedTask.code,
          }));
          const updatedTasks = sortTasksByPriority([...column.tasks, ...newTasks]);
          return {
            ...column,
            tasks: updatedTasks,
          };
        }
        return column;
      })
    );
    // Modal'ı kapat ve state'leri temizle
    setModalOpen(false);
    setCodeContent("");
    setParsedTasks([]);
  };

  const handleAddTask = () => {
    if (!newTaskContent.trim()) {
      return;
    }

    const newTask = {
      id: nanoid(),
      content: newTaskContent,
      priority: newTaskPriority,
    };

    setColumns((prevColumns) =>
      prevColumns.map((column) => {
        if (column.id === selectedColumnForNewTask) {
          const newTasks = sortTasksByPriority([...column.tasks, newTask]);
          return {
            ...column,
            tasks: newTasks,
          };
        }
        return column;
      })
    );
    setNewTaskContent("");
    setNewTaskPriority("medium");
    setModalOpen(false);
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
      prevColumns.map((column) => {
        const newTasks = sortTasksByPriority(
          column.tasks.map((task) =>
            task.id === taskId ? { ...task, ...updatedTaskData } : task
          )
        );
        return {
          ...column,
          tasks: newTasks,
        };
      })
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
      const newDestinationTasks = sortTasksByPriority([...destinationColumn.tasks, selectedTask]);

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

  const getPriorityLabel = (priority: Priority) => {
    switch (priority) {
      case "low":
        return (
          <PriorityLabel priority="low">
            <KeyboardDoubleArrowDownIcon /> Low
          </PriorityLabel>
        );
      case "medium":
        return (
          <PriorityLabel priority="medium">
            <DragHandleIcon /> Medium
          </PriorityLabel>
        );
      case "high":
        return (
          <PriorityLabel priority="high">
            <KeyboardDoubleArrowUpIcon /> High
          </PriorityLabel>
        );
      default:
        return null;
    }
  };

  const handleOpenModal = (columnId: string) => {
    setSelectedColumnForNewTask(columnId);
    setNewTaskContent('');
    setNewTaskPriority('medium');
    setParsedTasks([]);
    setCodeContent('');
    setModalOpen(true);
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
          zIndex: 100,
          boxShadow: "0 2px 4px rgba(0,0,0,0.5)",
        }}
      >
        <Typography
          variant="h4"
          component="h1"
          color="#00bcd4"
          sx={{ lineHeight: "0.47", fontWeight: "bold" }}
        >
          To Do
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
        <ColumnsContainer>
          {columns.map((column) => (
            <ColumnBox key={column.id}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: "2px solid #333", paddingBottom: "12px", marginBottom: "16px" }}>
                <Typography variant="h5" component="h2" sx={{ m: 0, p: 0, borderBottom: 'none' }}>
                  {column.title.charAt(0).toUpperCase() + column.title.slice(1)}
                </Typography>
                <IconButton sx={{ color: '#00bcd4' }} onClick={() => handleOpenModal(column.id)}>
                  <AddIcon />
                </IconButton>
              </Box>
              <Box
                sx={{
                  flexGrow: 1,
                  maxHeight: '400px',
                  overflowY: 'auto',
                  paddingRight: '12px',
                  '&::-webkit-scrollbar': {
                    width: '8px',
                  },
                  '&::-webkit-scrollbar-thumb': {
                    backgroundColor: '#444',
                    borderRadius: '4px',
                  },
                  '&::-webkit-scrollbar-track': {
                    backgroundColor: '#1e1e1e',
                  },
                }}
              >
                {column.tasks.length > 0 ? (
                  sortTasksByPriority(column.tasks).map((task) => (
                    <TaskItem
                      key={task.id}
                      onClick={() => openDrawer(task, column.id)}
                    >
                      <PriorityIndicator priority={task.priority} />
                      <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, p: "12px" }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                          <Typography
                            variant="body1"
                            sx={{
                              flexGrow: 1,
                              minWidth: 0,
                              overflow: "hidden",
                              display: "-webkit-box",
                              WebkitLineClamp: 3,
                              WebkitBoxOrient: "vertical",
                              wordBreak: "break-word",
                              pr: 2
                            }}
                          >
                            {task.content}
                          </Typography>
                        </Box>
                        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'flex-start' }}>
                          {getPriorityLabel(task.priority)}
                        </Box>
                      </Box>
                      <MoreIconWrapper onClick={(e) => handleOpenPopover(e, task, column.id)}>
                        <MoreHorizIcon />
                      </MoreIconWrapper>
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
                    No tasks yet.
                  </Typography>
                )}
              </Box>
            </ColumnBox>
          ))}
        </ColumnsContainer>
      </Box>

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
            Move to
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
            <Typography variant="h6">Edit Task</Typography>
            <IconButton onClick={closeDrawer} sx={{ color: "#e0e0e0" }}>
              <CloseIcon />
            </IconButton>
          </Box>
          {selectedTask && (
            <>
              <TextField
                label="Task Content"
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
                onChange={(e) => {
                  if (e.target.value.length <= 50) {
                    handleTaskUpdate(selectedTask.id, { content: e.target.value });
                  }
                }}
                inputProps={{ maxLength: 50 }}
              />
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel
                  sx={{ color: "#e0e0e0", "&.Mui-focused": { color: "#00bcd4" } }}
                >
                  Priority
                </InputLabel>
                <Select
                  value={selectedTask.priority}
                  label="Priority"
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
                  <MenuItem value="low">Low</MenuItem>
                  <MenuItem value="medium">Medium</MenuItem>
                  <MenuItem value="high">High</MenuItem>
                </Select>
              </FormControl>
              <TextField
                label="Comment"
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

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        closeAfterTransition
      >
        <Fade in={modalOpen} timeout={300}>
          <Box sx={{
            width: { xs: '90%', md: 700 },
            maxHeight: '90vh',
            overflowY: 'auto',
            p: 4,
            backgroundColor: '#1a1a1a',
            color: '#e0e0e0',
            borderRadius: '12px',
            boxShadow: '0 8px 25px rgba(0,0,0,0.5)',
            display: 'flex',
            flexDirection: 'column',
            gap: 3,
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            border: '1px solid #333',
            "&::-webkit-scrollbar": {
              width: "12px",
            },
            "&::-webkit-scrollbar-track": {
              backgroundColor: "#1a1a1a",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "#444",
              borderRadius: "10px",
              border: "3px solid #1a1a1a",
            },
          }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h5" component="h2" sx={{ color: '#00bcd4' }}>
                Add New Task
              </Typography>
              <IconButton onClick={() => setModalOpen(false)} sx={{ color: '#e0e0e0' }}>
                <CloseIcon />
              </IconButton>
            </Box>

            <Box>
              <Typography variant="body1" sx={{ mb: 1, color: '#aaa' }}>
                Paste your code here to automatically find **Todo** and **To-do** comments.
              </Typography>
              <TextField
                label="Code Snippet"
                variant="outlined"
                fullWidth
                multiline
                rows={6}
                value={codeContent}
                onChange={(e) => {
                  setCodeContent(e.target.value);
                  handleParseCode(e.target.value);
                }}
                sx={{
                  "& .MuiInputBase-input": {
                    color: "#fff",
                    fontFamily: 'monospace',
                    "&::-webkit-scrollbar": {
                      width: "8px",
                    },
                    "&::-webkit-scrollbar-track": {
                      backgroundColor: "#2a2a2a",
                    },
                    "&::-webkit-scrollbar-thumb": {
                      backgroundColor: "#666",
                      borderRadius: "4px",
                    },
                  },
                  "& .MuiOutlinedInput-notchedOutline": { borderColor: "#444" },
                  "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#666" },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "#00bcd4" },
                  "& .MuiInputLabel-root": { color: "#e0e0e0" },
                  "& .MuiInputLabel-root.Mui-focused": { color: "#00bcd4" },
                }}
              />
            </Box>

            {parsedTasks.length > 0 && (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Typography variant="h6" sx={{ color: '#00bcd4' }}>
                  Found Tasks ({parsedTasks.length})
                </Typography>
                <Button
                  variant="contained"
                  onClick={handleAddAllParsedTasks}
                  startIcon={<AddIcon />}
                  sx={{
                    backgroundColor: "#00bcd4",
                    "&:hover": { backgroundColor: "#0097a7" },
                    color: "#1e1e1e",
                    fontWeight: 'bold',
                  }}
                >
                  Add All Tasks
                </Button>
                <Box sx={{ borderBottom: '1px dashed #444', my: 1 }} />
              </Box>
            )}

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Typography variant="h6" sx={{ color: '#00bcd4' }}>
                Create Task Manually
              </Typography>
              <TextField
                label="Task Content"
                variant="outlined"
                fullWidth
                multiline
                rows={2}
                value={newTaskContent}
                onChange={(e) => setNewTaskContent(e.target.value)}
                sx={{
                  "& .MuiInputBase-input": { color: "#fff" },
                  "& .MuiOutlinedInput-notchedOutline": { borderColor: "#444" },
                  "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#666" },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "#00bcd4" },
                  "& .MuiInputLabel-root": { color: "#e0e0e0" },
                  "& .MuiInputLabel-root.Mui-focused": { color: "#00bcd4" },
                }}
              />
              <FormControl fullWidth>
                <InputLabel sx={{ color: "#e0e0e0" }}>Priority</InputLabel>
                <Select
                  value={newTaskPriority}
                  label="Priority"
                  onChange={(e) => setNewTaskPriority(e.target.value as Priority)}
                  sx={{
                    color: "#fff",
                    "& .MuiOutlinedInput-notchedOutline": { borderColor: "#444" },
                    "& .MuiSelect-icon": { color: "#fff" },
                  }}
                >
                  <MenuItem value="low">Low</MenuItem>
                  <MenuItem value="medium">Medium</MenuItem>
                  <MenuItem value="high">High</MenuItem>
                </Select>
              </FormControl>
              <Button
                variant="contained"
                onClick={handleAddTask}
                disabled={!newTaskContent.trim()}
                startIcon={<AddIcon />}
                sx={{
                  backgroundColor: "#00bcd4",
                  "&:hover": { backgroundColor: "#0097a7" },
                  color: "#1e1e1e",
                  fontWeight: 'bold',
                }}
              >
                Add Task
              </Button>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </ToDoPageWrapper>
  );
}