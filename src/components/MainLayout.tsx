import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { Box, CssBaseline } from "@mui/material";

export function MainLayout() {
  const drawerWidth = 200;

  return (
    <Box sx={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      <CssBaseline />
      <Sidebar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 0,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          backgroundColor: '#222',
          overflow: 'hidden'
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}