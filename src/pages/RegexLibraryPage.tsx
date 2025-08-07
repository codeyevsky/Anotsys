import { useState } from "react";
import { Box, Typography, TextField, Card, CardContent, Button, Divider, styled } from "@mui/material";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { regexLibraryData } from "../utils/regexLibraryData";

const LibraryWrapper = styled(Box)({
  backgroundColor: '#121212',
  color: '#e0e0e0',
  minHeight: '100vh',
  fontFamily: "'Roboto', sans-serif",
});

const LibraryContent = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
  maxWidth: '1200px',
  margin: '30px auto',
  padding: '32px',
  backgroundColor: '#1e1e1e',
  borderRadius: '12px',
  boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
  
  maxHeight: '85vh',
  overflowY: 'auto',

  '&::-webkit-scrollbar': {
    width: '12px',
  },
  '&::-webkit-scrollbar-track': {
    background: '#121212',
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: '#444',
    borderRadius: '10px',
    border: '3px solid #1e1e1e',
    '&:hover': {
      backgroundColor: '#555',
    },
  },
});

const StyledCard = styled(Card)({
  backgroundColor: '#2a2a2a',
  color: '#e0e0e0',
  transition: 'transform 0.2s, box-shadow 0.2s',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 8px 24px rgba(0, 188, 212, 0.2)',
  },
});

const CodeBlock = styled(Box)({
  backgroundColor: '#1e1e1e',
  padding: '8px',
  borderRadius: '4px',
  fontFamily: "'Fira Code', monospace",
  fontSize: '0.9rem',
  color: '#00bcd4',
  overflowX: 'auto',
  whiteSpace: 'pre-wrap',
  wordBreak: 'break-all'
});

export function RegexLibraryPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleCopy = (pattern: string) => {
  navigator.clipboard.writeText(pattern);
};

const filteredRegex = regexLibraryData.filter(
  (item) => {
    const searchWords = searchQuery.toLowerCase().split(/\s+/).filter(Boolean); // Split query into words
    if (searchWords.length === 0) return true; // If no query, show all items

    const searchableText = `${item.name} ${item.description} ${item.category}`.toLowerCase();

    // Check if all search words match the start of a word in the item's text
    return searchWords.every(word => {
      const regex = new RegExp(`\\b${word}`, 'i'); // Create a regex for each word with word boundary
      return regex.test(searchableText);
    });
  }
);

  return (
    <LibraryWrapper>
      <Box sx={{ 
          p: 3, 
          backgroundColor: '#1e1e1e', 
          borderBottom: '1px solid #444', 
          lineHeight: '0.47',
          position: 'sticky',
          top: 0,
          zIndex: 10,
          boxShadow: '0 2px 4px rgba(0,0,0,0.5)'
        }}>
        <Typography variant="h4" component="h1" color="#00bcd4" sx={{ lineHeight: '0.47', fontWeight: 'bold' }}>
          Regex Library
        </Typography>
      </Box>
      <LibraryContent>
        <Typography variant="body1" sx={{ color: '#aaa' }}>
          Browse, search, and copy common regex patterns for your projects.
        </Typography>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search patterns or descriptions..."
          size="small"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{
            input: { color: '#fff' },
            '& .MuiOutlinedInput-notchedOutline': { borderColor: '#444' },
            '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#666' },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#00bcd4' },
          }}
        />
        <Divider sx={{ mt: 2, mb: 2, backgroundColor: '#444' }} />

        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
          {filteredRegex.length > 0 ? (
            filteredRegex.map((item) => (
              <Box 
                key={item.id}
                sx={{
                  flexBasis: { xs: '100%', sm: 'calc(50% - 12px)', md: 'calc(33.33% - 16px)' },
                  flexGrow: 1
                }}
              >
                <StyledCard>
                  <CardContent>
                    <Typography variant="h6" component="h3" sx={{ fontWeight: 'bold', mb: 1 }}>
                      {item.name}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#999' }}>
                      {item.description}
                    </Typography>
                    <Divider sx={{ my: 1.5, backgroundColor: '#444' }} />
                    <Typography variant="caption" sx={{ color: '#00bcd4', fontWeight: 'bold' }}>
                      Pattern:
                    </Typography>
                    <CodeBlock sx={{ my: 1, color: '#00bcd4' }}>
                      {item.pattern}
                    </CodeBlock>
                    <Typography variant="caption" sx={{ color: '#00bcd4', fontWeight: 'bold' }}>
                      Example:
                    </Typography>
                    <CodeBlock sx={{ my: 1, color: '#00bcd4' }}>
                      {item.example}
                    </CodeBlock>
                    <Typography variant="caption" sx={{ color: '#999', display: 'block', mt: 1 }}>
                      Category: {item.category}
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                      <Button
                        variant="contained"
                        size="small"
                        startIcon={<ContentCopyIcon />}
                        onClick={() => handleCopy(item.pattern)}
                        sx={{
                          backgroundColor: "#00bcd4",
                          "&:hover": { backgroundColor: "#0097a7" },
                          color: "#1e1e1e",
                        }}
                      >
                        Copy
                      </Button>
                    </Box>
                  </CardContent>
                </StyledCard>
              </Box>
            ))
          ) : (
            <Box sx={{ textAlign: 'center', p: 4, color: '#888', width: '100%' }}>
              <Typography variant="h6">No results found.</Typography>
              <Typography variant="body2">Please try another keyword.</Typography>
            </Box>
          )}
        </Box>
      </LibraryContent>
    </LibraryWrapper>
  );
}
