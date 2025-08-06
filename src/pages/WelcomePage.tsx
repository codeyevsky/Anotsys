import { Box, Typography } from "@mui/material";

export function WelcomePage() {
  return (
    <Box
      sx={{
        backgroundColor: '#222',
        color: 'white',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Typography variant="h2" component="h1">
        Hoşgeldiniz
      </Typography>
    </Box>
  );
}