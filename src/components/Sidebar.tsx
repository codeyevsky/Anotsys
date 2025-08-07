import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Box, Typography,} from "@mui/material";
import HubIcon from "@mui/icons-material/Hub";
import FormatAlignLeftIcon from "@mui/icons-material/FormatAlignLeft";
import CommentIcon from "@mui/icons-material/Comment";
import ChecklistIcon from "@mui/icons-material/Checklist";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import BugReportIcon from "@mui/icons-material/BugReport";
import VisibilityIcon from "@mui/icons-material/Visibility";
import AnotsysLogo from "../assets/anotsys.png";

const drawerWidth = 200;

interface SidebarItem {
  text: string;
  path: string;
  icon: React.ReactElement;
}

const sidebarItems: SidebarItem[] = [
  {
    text: "AI Notification System",
    path: "/ai-notification-system",
    icon: <HubIcon />,
  },
  {
    text: "Npm Schedule",
    path: "/npm-schedule",
    icon: <AccessAlarmIcon />,
  },
  {
    text: "Formatter",
    path: "/formatter",
    icon: <FormatAlignLeftIcon />,
  },
  {
    text: "Comment Swiper",
    path: "/comment-swiper",
    icon: <CommentIcon />,
  },
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
  { text: "To-Do", path: "/todo", icon: <ChecklistIcon /> },
  { text: "Pomodoro", path: "/pomodoro", icon: <AccessAlarmIcon /> },
];

export function Sidebar() {
  const location = useLocation();
  const textRefs = useRef<Record<string, HTMLElement>>({});
  const [overflowItems, setOverflowItems] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const updatedOverflowItems: Record<string, boolean> = {};
    Object.keys(textRefs.current).forEach(key => {
      const element = textRefs.current[key];
      if (element) {
        updatedOverflowItems[key] = element.scrollWidth > element.clientWidth;
      }
    });
    setOverflowItems(updatedOverflowItems);
  }, [sidebarItems]);

  const renderSidebarItem = (item: SidebarItem) => {
    const refKey = item.text;
    const isOverflowing = overflowItems[refKey];

    return (
      <ListItemButton
        component={Link}
        to={item.path}
        selected={location.pathname === item.path}
        sx={{
          borderRadius: 1,
          margin: "0 8px",
          "&.Mui-selected": {
            backgroundColor: "#333",
          },
          "&:hover": {
            backgroundColor: "#444",
          },
        }}
      >
        <ListItemIcon sx={{ color: "#fff", minWidth: 40 }}>
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
      <Box
        sx={{
          p: 2,
          textAlign: "center",
          borderBottom: "1px solid #444",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 1,
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
      <List>
        {sidebarItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            {renderSidebarItem(item)}
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}