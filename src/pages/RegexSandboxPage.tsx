import { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  styled,
  Button,
  Divider,
} from "@mui/material";

const SandboxWrapper = styled(Box)({
  backgroundColor: "#121212",
  color: "#e0e0e0",
  minHeight: "100vh",
  fontFamily: "'Roboto', sans-serif",
  display: "flex",
  flexDirection: "column",
});

const SandboxContent = styled(Box)({
  display: "flex",
  flexDirection: "column",
  flexGrow: 1,
  gap: "16px",
  maxWidth: "1200px",
  minWidth: "1200px",
  margin: "30px auto",
  padding: "32px",
  backgroundColor: "#1e1e1e",
  borderRadius: "12px",
  boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
  overflowY: "auto",
  maxHeight: "84vh",

  "&::-webkit-scrollbar": {
    width: "12px",
    backgroundColor: "transparent",
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "#333",
    borderRadius: "6px",
    border: "2px solid #1e1e1e",
  },
  "&::-webkit-scrollbar-thumb:hover": {
    backgroundColor: "#555",
  },
  "&::-webkit-scrollbar-track": {
    backgroundColor: "#1e1e1e",
  },
});

const StyledTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#444",
    },
    "&:hover fieldset": {
      borderColor: "#666",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#00bcd4",
    },
    "& .MuiInputBase-input": {
      color: "#e0e0e0",
    },
  },
  "& .MuiInputLabel-root": {
    color: "#aaa",
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: "#00bcd4",
  },
  "& textarea": {
    "&::-webkit-scrollbar": {
      width: "12px",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "#333",
      borderRadius: "6px",
      border: "2px solid #1e1e1e",
    },
    "&::-webkit-scrollbar-thumb:hover": {
      backgroundColor: "#555",
    },
    "&::-webkit-scrollbar-track": {
      backgroundColor: "#1e1e1e",
    },
  },
});

export function RegexSandboxPage() {
  const [regexPattern, setRegexPattern] = useState("");
  const [testText, setTestText] = useState("");
  const [matchResults, setMatchResults] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  // Yeni state'i buraya ekledik
  const [highlightedText, setHighlightedText] = useState(""); 

  const handleTest = () => {
    // Önceki sonuçları ve hataları temizle
    setMatchResults([]);
    setError(null);
    setHighlightedText(""); // Yeni: Her testten önce vurgulanan metni temizle

    if (!regexPattern || !testText) {
      setError("Please enter both a Regex pattern and test text.");
      return;
    }

    try {
      const regex = new RegExp(regexPattern, "g");
      const matches = [...testText.matchAll(regex)];
      setMatchResults(matches.map(m => m[0]));

      // Metni vurgulama işlemini handleTest içinde yap
      const newHighlightedText = testText.replace(
        regex,
        (match) => `<span style="background-color: #4caf50; border-radius: 2px;">${match}</span>`
      );
      setHighlightedText(newHighlightedText); // Yeni: Vurgulanan metni state'e kaydet
    } catch (e: any) {
      setError(`Invalid Regex: ${e.message}`);
    }
  };

  // highlightedText'i artık render sırasında değil, state'ten alıyoruz
  // const highlightedText = testText.replace( ... ) satırını sildik

  return (
    <SandboxWrapper>
      <Box
        sx={{
          p: 3,
          backgroundColor: "#1e1e1e",
          borderBottom: "1px solid #444",
          lineHeight: "0.47",
          position: "sticky",
          top: 0,
          zIndex: 10,
          boxShadow: "0 2px 4px rgba(0,0,0,0.5)",
        }}
      >
        <Typography
          variant="h4"
          component="h1"
          color="#00bcd4"
          sx={{ lineHeight: "0.47", fontWeight: "bold" }}
        >
          Regex Sandbox
        </Typography>
      </Box>
      <SandboxContent>
        <Typography variant="body1" sx={{ color: "#aaa", mb: 2 }}>
          An isolated testing environment where you can test on large datasets.
        </Typography>

        <StyledTextField
          fullWidth
          label="Regex Pattern"
          variant="outlined"
          value={regexPattern}
          onChange={(e) => setRegexPattern(e.target.value)}
        />
        <StyledTextField
          fullWidth
          multiline
          rows={10}
          label="Test Text"
          variant="outlined"
          value={testText}
          onChange={(e) => setTestText(e.target.value)}
        />
        <Button
          variant="contained"
          onClick={handleTest}
          disabled={!regexPattern || !testText}
          sx={{
            backgroundColor: "#4caf50",
            "&:hover": { backgroundColor: "#388e3c" },
            width: "fit-content",
          }}
        >
          Test
        </Button>

        <Divider sx={{ my: 2, backgroundColor: "#444" }} />

        <Box>
          <Typography variant="h6" sx={{ color: "#00bcd4" }}>
            Results
          </Typography>
          {error && (
            <Typography variant="body2" sx={{ color: "red", mt: 1 }}>
              {error}
            </Typography>
          )}
          {matchResults.length > 0 && (
            <Typography variant="subtitle1" sx={{ color: "#66bb6a", mt: 2 }}>
              {matchResults.length} matches found.
            </Typography>
          )}
          <Box
            sx={{
              p: 2,
              border: "1px solid #444",
              borderRadius: "4px",
              mt: 1,
              backgroundColor: "#1e1e1e",
              wordWrap: "break-word",
              whiteSpace: "pre-wrap",
              maxHeight: "300px",
              overflowY: "auto",
              "&::-webkit-scrollbar": {
                width: "12px",
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "#333",
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
            <Typography
              component="div"
              variant="body2"
              sx={{ color: "#e0e0e0" }}
              dangerouslySetInnerHTML={{ __html: highlightedText }}
            />
          </Box>
        </Box>
      </SandboxContent>
    </SandboxWrapper>
  );
}