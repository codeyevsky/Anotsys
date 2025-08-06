import { Box, Typography } from "@mui/material";

export function RegexDebuggerPage() {
  return (
    <Box sx={{ backgroundColor: '#222', color: 'white' }}>
      <Box sx={{ p: 3, backgroundColor: '#1e1e1e', borderBottom: '1px solid #444', lineHeight: '0.47' }}>
        <Typography variant="h4" component="h1" color="white" sx={{ lineHeight: '0.47' }}>
          Regex Debugger
        </Typography>
      </Box>
      <Box sx={{ p: 3 }}>
        <Typography variant="body1">
          Regex Debugger sayfası içeriği burada yer alacak.
        </Typography>
      </Box>
    </Box>
  );
}