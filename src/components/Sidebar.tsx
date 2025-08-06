import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Box, Collapse, Typography,} from "@mui/material";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import HubIcon from "@mui/icons-material/Hub";
import FormatAlignLeftIcon from "@mui/icons-material/FormatAlignLeft";
import CommentIcon from "@mui/icons-material/Comment";
import CodeIcon from "@mui/icons-material/Code";
import ChecklistIcon from "@mui/icons-material/Checklist";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import BugReportIcon from "@mui/icons-material/BugReport";
import VisibilityIcon from "@mui/icons-material/Visibility";
import AnotsysLogo from "../assets/anotsys.png";

const drawerWidth = 200;

interface SubItem {
  text: string;
  path: string;
  icon: React.ReactElement;
}

interface SidebarItem {
  text: string;
  path?: string;
  icon: React.ReactElement;
  isCollapsible?: false;
}

interface CollapsibleSidebarItem {
  text: string;
  path?: string;
  icon: React.ReactElement;
  isCollapsible: true;
  subItems: SubItem[];
}

type SidebarMenuItem = SidebarItem | CollapsibleSidebarItem;

const sidebarItems: SidebarMenuItem[] = [
  {
    text: "AI Not. Sys.",
    icon: <HubIcon />,
    isCollapsible: true,
    subItems: [
      {
        text: "AI Notification System",
        path: "/ai-notification-system",
        icon: <FiberManualRecordIcon fontSize="small" />,
      },
      {
        text: "Npm Schedule",
        path: "/npm-schedule",
        icon: <FiberManualRecordIcon fontSize="small" />,
      },
    ],
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
    text: "Regex",
    icon: <CodeIcon />,
    isCollapsible: true,
    subItems: [
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
    ],
  },
  { text: "To-Do", path: "/todo", icon: <ChecklistIcon /> },
  { text: "Pomodoro", path: "/pomodoro", icon: <AccessAlarmIcon /> },
];

export function Sidebar() {
  const location = useLocation();
  const [open, setOpen] = useState<Record<string, boolean>>({});

  const handleClick = (itemText: string) => {
    setOpen((prevOpen) => ({
      ...prevOpen,
      [itemText]: !prevOpen[itemText],
    }));
  };

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
  }, [sidebarItems, open]); // 'open' durumunu bağımlılık dizisine ekledik

  const renderSidebarItem = (item: SidebarMenuItem, subItem = false) => {
    const refKey = `${item.text}-${subItem ? 'sub' : 'main'}`;
    const isOverflowing = overflowItems[refKey];

    return (
      <ListItemButton
        component={item.path ? Link : 'div'}
        to={item.path ? item.path : undefined}
        selected={location.pathname === item.path}
        onClick={item.isCollapsible ? () => handleClick(item.text) : undefined}
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
        <ListItemIcon sx={{ color: "#fff", minWidth: subItem ? 20 : 40 }}>
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
        {item.isCollapsible && (open[item.text] ? <ExpandLess /> : <ExpandMore />)}
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
          <React.Fragment key={item.text}>
            {item.isCollapsible ? (
              <>
                <ListItem disablePadding>
                  {renderSidebarItem(item)}
                </ListItem>
                <Collapse in={open[item.text]} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {item.subItems.map((subItem) => (
                      <ListItem
                        key={subItem.text}
                        disablePadding
                        sx={{ pl: 4 }}
                      >
                        {renderSidebarItem(subItem, true)}
                      </ListItem>
                    ))}
                  </List>
                </Collapse>
              </>
            ) : (
              <ListItem key={item.text} disablePadding>
                {renderSidebarItem(item)}
              </ListItem>
            )}
          </React.Fragment>
        ))}
      </List>
    </Drawer>
  );
}