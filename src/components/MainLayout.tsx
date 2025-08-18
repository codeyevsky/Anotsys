import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { Box, CssBaseline } from "@mui/material";

export function MainLayout() {

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <CssBaseline />
      <Sidebar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 0,
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
      <Box
        sx={{
          position: 'fixed',
          height: '100%',
          backgroundColor: 'black', // Boşluğu siyaha boya
          zIndex: -1, // Diğer içeriklerin arkasında kalmasını sağla
        }}
      />
    </Box>
  );
}