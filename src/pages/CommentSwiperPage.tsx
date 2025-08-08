import { useState, useEffect } from "react";
import { Box, Fade, Typography, Button, styled, Select, MenuItem, FormControl, InputLabel} from "@mui/material";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import ClearIcon from "@mui/icons-material/Clear";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { removeComments, supportedLanguages, commentPatterns } from "../utils/codeUtils";

const MainWrapper = styled(Box)({
  backgroundColor: "#121212",
  color: "#e0e0e0",
  minHeight: "100vh",
  fontFamily: "'Roboto', sans-serif",
});

const MainContent = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: "6px",
  maxWidth: "1200px",
  maxHeight: "680px",
  margin: "30px auto",
  padding: "32px",
  backgroundColor: "#1e1e1e",
  borderRadius: "12px",
  boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
});

const StyledTextarea = styled("textarea")({
  width: "calc(100% - 6px)",
  minHeight: "150px",
  resize: "none",
  padding: "16px",
  boxSizing: "border-box",
  border: "1px solid #333",
  borderRadius: "8px",
  backgroundColor: "#222",
  color: "#fff",
  fontFamily: "'Fira Code', monospace",
  fontSize: "1rem",
  overflowY: "auto",
  "&:focus": {
    outline: "none",
    borderColor: "#00bcd4",
    boxShadow: "0 0 8px rgba(0,188,212,0.6)",
  },
  "&::-webkit-scrollbar": {
    width: "12px",
  },
  "&::-webkit-scrollbar-track": {
    background: "#121212",
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "#444",
    borderRadius: "10px",
    border: "3px solid #222",
    "&:hover": {
      backgroundColor: "#555",
    },
  },
});

const ButtonGroup = styled(Box)({
  display: "flex",
  justifyContent: "flex-end",
  gap: "16px",
});

const ResultCard = styled(Box)({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "200px",
  padding: "16px",
  border: "1px dashed #444",
  borderRadius: "8px",
  backgroundColor: "#222",
  color: "#777",
  textAlign: "center",
  transition: "all 0.3s ease-in-out",
  "&:hover": {
    backgroundColor: "#2a2a2a",
    borderColor: "#00bcd4",
  }
});

const StyledMenuItem = styled(MenuItem)({
  backgroundColor: '#2a2a2a',
  color: '#e0e0e0',
  transition: 'background-color 0.2s ease-in-out',
  '&:hover': {
    backgroundColor: '#00bcd4',
    color: '#121212',
  },
  '&.Mui-selected': {
    backgroundColor: '#0097a7',
    color: '#e0e0e0',
    '&:hover': {
      backgroundColor: '#00bcd4',
    }
  },
});

export function CommentSwiperPage() {
  const [code, setCode] = useState("");
  const [result, setResult] = useState("");
  const [animatedResult, setAnimatedResult] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [timerId, setTimerId] = useState<NodeJS.Timeout | null>(null);

  type Language = keyof typeof commentPatterns;
  const [language, setLanguage] = useState<Language>("javascript");

  useEffect(() => {
    if (result) {
      setIsAnimating(true);
      const lines = result.split('\n');
      let i = 0;

      const newTimerId = setInterval(() => {
        if (i >= lines.length) {
          clearInterval(newTimerId);
          setIsAnimating(false);
          setIsProcessing(false);
          setTimerId(null);
          return;
        }

        setAnimatedResult(lines.slice(0, i + 1).join('\n'));
        i++;
      }, 10);

      setTimerId(newTimerId);

      return () => {
        if (newTimerId) clearInterval(newTimerId);
      };
    }
  }, [result]);

  const handleClearComments = () => {
    if (!code.trim()) return;
    setIsProcessing(true);
    setResult("");
    setAnimatedResult("");
    const cleanedCode = removeComments(code, language);
    setResult(cleanedCode.trim());
    setCode(cleanedCode.trim());
  };

  const handleCancel = () => {
    if (timerId) {
      clearInterval(timerId);
      setTimerId(null);
    }
    setIsProcessing(false);
    setIsAnimating(false);
    setResult("");
    setAnimatedResult("");
    setCode("");
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setCode(text);
    } catch (err) {
      console.error("Failed to read clipboard contents: ", err);
    }
  };

  const handleCopy = async () => {
    if (animatedResult) {
      try {
        await navigator.clipboard.writeText(animatedResult);
      } catch (err) {
        console.error("Failed to copy text: ", err);
      }
    }
  };

  return (
    <MainWrapper>
      <Box sx={{ p: 3, backgroundColor: '#1e1e1e', borderBottom: '1px solid #444', lineHeight: '0.47' }}>
        <Typography variant="h4" component="h1" color="#00bcd4" sx={{ lineHeight: '0.47', fontWeight: 'bold' }}>
          Comment Swiper
        </Typography>
      </Box>
      <MainContent>
        <Typography variant="h4" component="h2" color="#00bcd4" sx={{ lineHeight: '0.47', fontWeight: 'bold', mb: 2 }}>
          Comment Swiper
        </Typography>
        <Typography variant="body1" sx={{ color: "#aaa", mb: 2 }}>
          Easily clean up comments in your code for a professional look.
        </Typography>
        
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel
              id="language-select-label"
              sx={{ color: '#aaa', transition: 'color 0.2s ease-in-out' }}
            >
              Select Language
            </InputLabel>
            <Select
              labelId="language-select-label"
              id="language-select"
              value={language}
              label="Select Language"
              onChange={(e) => {
                setLanguage(e.target.value as Language);
              }}
              sx={{
                color: '#fff',
                transition: 'border-color 0.2s ease-in-out',
                '.MuiOutlinedInput-notchedOutline': { borderColor: '#333' },
                '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#00bcd4' },
                '&.Mui-focused .MuiOutlinedInput-notcheOutline': { borderColor: '#00bcd4' },
                '.MuiSvgIcon-root': { color: '#fff' },
              }}
              MenuProps={{
                TransitionComponent: Fade,
                PaperProps: {
                  sx: {
                    mt: 1,
                    backgroundColor: '#2a2a2a',
                    border: '1px solid #444',
                    borderRadius: '8px',
                    boxShadow: '0 4px 16px rgba(0,0,0,0.4)',
                    
                    transformOrigin: 'top center',
                    transition: 'opacity 0.2s ease-in-out, transform 0.2s ease-in-out',
                    '&.MuiPaper-root.MuiMenu-paper': {
                      transform: 'scale(1)',
                      opacity: 1,
                    },
                    '&.MuiMenu-paper': {
                      transform: 'scale(0.8)',
                      opacity: 0,
                    },
                  }
                },
              }}
            >
              {supportedLanguages.map((lang) => (
                <StyledMenuItem key={lang} value={lang}>
                  {lang.toUpperCase()}
                </StyledMenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <Box>
          <Typography variant="h6" gutterBottom>
            Enter Code to be Cleaned
          </Typography>
          <StyledTextarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Paste your code here..."
          />
        </Box>
        <ButtonGroup>
          <Button
            variant="contained"
            startIcon={<ContentPasteIcon />}
            onClick={handlePaste}
            sx={{
              backgroundColor: "#333",
              "&:hover": { backgroundColor: "#444" },
            }}
          >
            Paste
          </Button>
          {isProcessing ? (
            <Button
              variant="contained"
              color="error"
              startIcon={<ClearIcon />}
              onClick={handleCancel}
              sx={{
                backgroundColor: "#d32f2f",
                "&:hover": { backgroundColor: "#b71c1c" },
              }}
            >
              Cancel
            </Button>
          ) : (
            <Button
              variant="contained"
              color="primary"
              startIcon={<ClearIcon />}
              onClick={handleClearComments}
              disabled={!code.trim() || isProcessing}
              sx={{
                backgroundColor: "#00bcc4",
                "&:hover": { backgroundColor: "#0097a7" },
              }}
            >
              Clean Comments
            </Button>
          )}
        </ButtonGroup>
        <Box>
          <Typography variant="h6" gutterBottom>
            Result
          </Typography>
          {animatedResult ? (
            <>
              <StyledTextarea
                value={animatedResult}
                readOnly
                placeholder="Cleaned code will appear here..."
              />
              <Box sx={{ mt: 1, display: "flex", justifyContent: "flex-end" }}>
                <Button
                  variant="contained"
                  startIcon={<ContentCopyIcon />}
                  onClick={handleCopy}
                  disabled={isAnimating}
                  sx={{
                    backgroundColor: "#333",
                    "&:hover": { backgroundColor: "#444" },
                  }}
                >
                  Copy
                </Button>
              </Box>
            </>
          ) : (
            <ResultCard>
              <Typography variant="body1">
                Your results will appear here.
              </Typography>
            </ResultCard>
          )}
        </Box>
      </MainContent>
    </MainWrapper>
  );
}