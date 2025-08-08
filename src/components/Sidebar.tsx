import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Box, Typography, TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import HubIcon from "@mui/icons-material/Hub";
import FormatAlignLeftIcon from "@mui/icons-material/FormatAlignLeft";
import ChecklistIcon from "@mui/icons-material/Checklist";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import BugReportIcon from "@mui/icons-material/BugReport";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EventNoteIcon from '@mui/icons-material/EventNote';
import TimerIcon from '@mui/icons-material/Timer';
import TagIcon from '@mui/icons-material/Tag';
import SandBoxIcon from "@mui/icons-material/AllInclusive";
import AnotsysLogo from "../assets/anotsys.png";

const drawerWidth = 250;

interface SidebarItem {
  text: string;
  path: string;
  icon: React.ReactElement;
}

interface SidebarCategory {
  title: string;
  items: SidebarItem[];
}

const allSidebarItems: SidebarCategory[] = [
  {
    title: "AI & CODE",
    items: [
      {
        text: "AI Notification System",
        path: "/ai-notification-system",
        icon: <HubIcon />,
      },
      {
        text: "Comment Swiper",
        path: "/comment-swiper",
        icon: <TagIcon />,
      },
    ],
  },
  {
    title: "REGEX",
    items: [
      {
        text: "Regex Library",
        path: "/regex-library",
        icon: <LibraryBooksIcon />,
      },
      {
        text: "Regex Debugger",
        path: "/regex-debugger",
        icon: <BugReportIcon />,
      },
      {
        text: "Regex Visualizer",
        path: "/regex-visualizer",
        icon: <VisibilityIcon />,
      },
      {
        text: "Regex Sandbox",
        path: "/regex-sandbox",
        icon: <SandBoxIcon />,
      },
    ],
  },
  {
    title: "DEVELOPER TOOLS",
    items: [
      { text: "NPM Schedule", path: "/npm-schedule", icon: <EventNoteIcon /> },
      { text: "Formatter", path: "/formatter", icon: <FormatAlignLeftIcon /> },
      { text: "To-Do", path: "/todo", icon: <ChecklistIcon /> },
      { text: "Pomodoro", path: "/pomodoro", icon: <TimerIcon /> },
    ],
  },
];

export function Sidebar() {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const textRefs = useRef<Record<string, HTMLElement>>({});
  const [overflowItems, setOverflowItems] = useState<Record<string, boolean>>({});

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const filteredSidebarItems = allSidebarItems
    .map(category => ({
      ...category,
      items: category.items.filter(item =>
        item.text.toLowerCase().startsWith(searchQuery.toLowerCase())
      ),
    }))
    .filter(category => category.items.length > 0);

  useEffect(() => {
    const updatedOverflowItems: Record<string, boolean> = {};
    allSidebarItems.forEach(category => {
      category.items.forEach(item => {
        const refKey = item.text;
        const element = textRefs.current[refKey];
        if (element) {
          updatedOverflowItems[refKey] = element.scrollWidth > element.clientWidth;
        }
      });
    });
    setOverflowItems(updatedOverflowItems);
  }, [allSidebarItems]);

  const renderSidebarItem = (item: SidebarItem) => {
    const refKey = item.text;
    const isOverflowing = overflowItems[refKey];
    const isSelected = location.pathname.startsWith(item.path);

    return (
      <ListItemButton
        component={Link}
        to={item.path}
        selected={isSelected}
        sx={{
          borderRadius: 1,
          margin: isSelected ? "0 8px 2px 5px" : "0 8px 2px 8px",
          color: isSelected ? "#fff" : "#888",
          minHeight: '36px',
          paddingY: '8px',
          position: "relative",
          "&::before": {
            content: '""',
            position: "absolute",
            left: 0,
            top: "50%",
            width: "3px",
            height: isSelected ? "100%" : "0",
            backgroundColor: "#00bcd4",
            transform: "translateY(-50%)",
            transition: "height 0.3s ease-in-out",
          },
          "&.Mui-selected": {
            backgroundColor: "#333",
          },
          "&:hover": {
            backgroundColor: "#444",
            color: "#fff",
          },
          "&:hover .MuiListItemIcon-root": {
            color: "#fff",
          },
          "&:hover .MuiTypography-root": {
            color: "#fff",
          }
        }}
      >
        <ListItemIcon sx={{ color: isSelected ? "#fff" : "#888", minWidth: 40 }}>
          {item.icon}
        </ListItemIcon>
        <Box
          sx={{
            overflow: "hidden",
            "&:hover .MuiTypography-root": {
              transform: isOverflowing ? `translateX(-${(textRefs.current[refKey]?.scrollWidth - textRefs.current[refKey]?.clientWidth) || 0}px)` : 'translateX(0)',
              transition: isOverflowing ? `transform ${((textRefs.current[refKey]?.scrollWidth || 0) - (textRefs.current[refKey]?.clientWidth || 0)) * 0.015}s linear` : 'none',
            }
          }}>
          <ListItemText
            primaryTypographyProps={{
              ref: (el: HTMLElement | null) => { if (el) textRefs.current[refKey] = el; },
              sx: {
                whiteSpace: "nowrap",
                transform: 'translateX(0)',
                transition: "transform 0.3s ease-in-out",
                color: isSelected ? "#fff" : "#888"
              }
            }}
            primary={item.text}
          />
        </Box>
      </ListItemButton>
    );
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: "border-box",
          backgroundColor: "#1e1e1e",
          color: "#fff",
        },
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <Box
          sx={{
            p: 2,
            textAlign: "center",
            borderBottom: "1px solid #444",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 1,
            position: 'sticky',
            top: 0,
            backgroundColor: '#1e1e1e',
            zIndex: 100,
          }}
        >
          <img
            src={AnotsysLogo}
            alt="Anotsys Logo"
            style={{ width: 30, height: 30 }}
          />
          <Typography variant="h6" sx={{ fontWeight: "bold", color: "#fff" }}>
            Anotsys
          </Typography>
        </Box>

        <Box
          sx={{
            p: 2,
            borderBottom: '1px solid #444',
            position: 'sticky',
            top: '56px',
            backgroundColor: '#1e1e1e',
            zIndex: 100,
          }}
        >
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search..."
            size="small"
            value={searchQuery}
            onChange={handleSearchChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: '#fff' }} />
                </InputAdornment>
              ),
              sx: {
                color: '#fff',
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#444',
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#666',
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#00bcd4',
                },
              },
            }}
          />
        </Box>
        
        <List 
          sx={{ 
            flexGrow: 1, 
            paddingY: 0, 
            overflowY: 'auto',
            // Scrollbar styles for the List component
            "&::-webkit-scrollbar": {
              width: "12px",
            },
            "&::-webkit-scrollbar-track": {
              backgroundColor: "#2d2d2d",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "#555",
              borderRadius: "10px",
              border: "3px solid #1e1e1e",
              "&:hover": {
                backgroundColor: "#888",
              },
            },
          }}
        >
          {filteredSidebarItems.length > 0 ? (
            filteredSidebarItems.map((category) => (
              <React.Fragment key={category.title}>
                <ListItem sx={{ padding: '16px 8px 8px 8px' }}>
                  <Typography variant="overline" sx={{ color: '#888', fontWeight: 'bold' }}>
                    {category.title}
                  </Typography>
                </ListItem>
                {category.items.map((item, index) => (
                  <Box
                    key={item.text}
                    sx={{
                      animation: searchQuery ? `stack-up 0.6s ease-in-out forwards ${index * 0.1}s` : 'none',
                      '@keyframes stack-up': {
                        from: { opacity: 0, transform: 'translateY(20px)' },
                        to: { opacity: 1, transform: 'translateY(0)' },
                      },
                      paddingBottom: '2px',
                    }}
                  >
                    {renderSidebarItem(item)}
                  </Box>
                ))}
              </React.Fragment>
            ))
          ) : (
            <ListItem>
              <Typography variant="body2" sx={{ color: '#888', textAlign: 'center', width: '100%', mt: 2 }}>
                Sonuç bulunamadı.
              </Typography>
            </ListItem>
          )}
        </List>
      </Box>
    </Drawer>
  );
}