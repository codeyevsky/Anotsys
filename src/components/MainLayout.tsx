import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { Box, CssBaseline } from "@mui/material";

export function MainLayout() {
  const drawerWidth = 200;

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <CssBaseline />
      <Sidebar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 0,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          backgroundColor: '#222',
          overflowY: 'auto',
          "&::-webkit-scrollbar": {
            width: "12px",
            backgroundColor: "#1e1e1e",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#444",
            borderRadius: "6px",
            border: "2px solid #1e1e1e",
          },
          "&::-webkit-scrollbar-thumb:hover": {
            backgroundColor: "#555",
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: "#1e1e1e",
          },
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}