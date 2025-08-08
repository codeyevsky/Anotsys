import { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  styled,
  Divider,
  Stack,
  Button,
} from "@mui/material";

// Reuse the styled components from your Visualizer page
const VisualizerWrapper = styled(Box)({
  backgroundColor: "#121212",
  color: "#e0e0e0",
  minHeight: "100vh",
  fontFamily: "'Roboto', sans-serif",
  display: "flex",
  flexDirection: "column",
});

const VisualizerContent = styled(Box)({
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

// Updated styled component with larger height
const DebuggerOutputBox = styled(Box)({
  p: 2,
  border: "1px solid #444",
  borderRadius: "4px",
  mt: 1,
  backgroundColor: "#1e1e1e",
  whiteSpace: "pre-wrap",
  wordWrap: "break-word",
  maxHeight: "600px", // Increased height
  overflowY: "auto",

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

interface DebugStep {
  regexIndex: number;
  textIndex: number;
  regexPart: string;
  textPart: string;
  result: "Match" | "No Match" | "Backtrack";
  description: string;
  matchedText: string;
  textHighlighted: string;
}

const debugRegex = (pattern: string, text: string): DebugStep[] => {
  const steps: DebugStep[] = [];
  let textIndex = 0;
  let regexIndex = 0;
  
  // A more robust regex parser using a regular expression itself
  const regexTokenMatcher = /(\\.|\[.*?\]|\(|\)|\*|\+|\?|\{|\d+(?:,\d*)?\}|\^|\$|.)/g;
  const regexTokens = pattern.match(regexTokenMatcher) || [];

  const addStep = (
    regexPart: string,
    textPart: string,
    result: "Match" | "No Match" | "Backtrack",
    description: string,
    textHighlighted = ""
  ) => {
    steps.push({
      regexIndex,
      textIndex,
      regexPart,
      textPart,
      result,
      description,
      matchedText: text.substring(0, textIndex + textPart.length),
      textHighlighted,
    });
  };

  // The actual debugging logic starts here
  const tryMatch = (rIndex: number, tIndex: number): [boolean, number] => {
    if (rIndex >= regexTokens.length) {
      return [true, tIndex]; // Regex finished, it's a match!
    }
    if (tIndex > text.length) {
      return [false, tIndex]; // Ran out of text, no match.
    }
    
    let regexPart = regexTokens[rIndex];
    let currentText = text.substring(tIndex, text.length);

    // Literal character match
    if (regexPart.length === 1 && regexPart !== '\\' && regexPart !== '[' && regexPart !== '(' && regexPart !== '*' && regexPart !== '+' && regexPart !== '?' && regexPart !== '^' && regexPart !== '$') {
      if (currentText.startsWith(regexPart)) {
        addStep(regexPart, currentText[0], "Match", `Literal match: Found '${currentText[0]}'.`);
        return tryMatch(rIndex + 1, tIndex + 1);
      } else {
        addStep(regexPart, currentText[0] || '', "No Match", `'${currentText[0] || 'End of text'}' does not match literal '${regexPart}'.`);
        return [false, tIndex];
      }
    }
    
    // Character Class (e.g., \d, \w)
    if (regexPart.startsWith('\\') && regexPart.length === 2) {
        const charClass = regexPart[1];
        let matched = false;
        if (charClass === 'd' && /\d/.test(currentText[0])) matched = true;
        else if (charClass === 'w' && /\w/.test(currentText[0])) matched = true;
        else if (charClass === 's' && /\s/.test(currentText[0])) matched = true;
        // You can add more character classes here

        if (matched) {
          addStep(regexPart, currentText[0], "Match", `Character class match: Found a match for '${regexPart}'.`);
          return tryMatch(rIndex + 1, tIndex + 1);
        } else {
          addStep(regexPart, currentText[0] || '', "No Match", `'${currentText[0] || 'End of text'}' does not match character class '${regexPart}'.`);
          return [false, tIndex];
        }
    }
    
    // Quantifiers
    const quantifierMatch = regexPart.match(/^(.+)(\*|\+|\?)$/);
    if (quantifierMatch && rIndex > 0) {
        const previousRegexPart = regexTokens[rIndex - 1];
        const quantifier = quantifierMatch[2];
        
        addStep(regexPart, currentText[0] || '', "Match", `Quantifier '${quantifier}' is applied to '${previousRegexPart}'. Attempting to match as many as possible (greedy).`);
        
        let subMatches = 0;
        let tempTextIndex = tIndex;
        while(tryMatch(rIndex-1, tempTextIndex)[0]) {
            subMatches++;
            tempTextIndex++;
        }

        if (quantifier === '*') {
             // Greedy matching: try to match all, then backtrack
            for (let i = subMatches; i >= 0; i--) {
                const [result, finalTIndex] = tryMatch(rIndex + 1, tIndex + i);
                if (result) {
                    if (i < subMatches) {
                        addStep(regexPart, '', "Backtrack", `'*' quantifier backtracking from ${subMatches} matches to ${i} to allow the rest of the pattern to match.`);
                    }
                    return [true, finalTIndex];
                }
            }
        }
        
        if (quantifier === '+') {
            if (subMatches > 0) {
                // Greedy matching: try to match all, then backtrack
                for (let i = subMatches; i > 0; i--) {
                     const [result, finalTIndex] = tryMatch(rIndex + 1, tIndex + i);
                     if (result) {
                        if (i < subMatches) {
                             addStep(regexPart, '', "Backtrack", `'+' quantifier backtracking from ${subMatches} matches to ${i} to allow the rest of the pattern to match.`);
                        }
                        return [true, finalTIndex];
                     }
                }
            }
            return [false, tIndex];
        }

        // You can add more quantifier logic here, like ? and {n,m}
    }
    
    // Fallback for non-matched parts
    addStep(regexPart, '', "No Match", `No logic found for regex part '${regexPart}'. Skipping.`);
    return tryMatch(rIndex + 1, tIndex);

  };

  const [finalMatchResult, finalTextIndex] = tryMatch(regexIndex, textIndex);
  
  // Final output
  if (finalMatchResult) {
    const matchedSubstring = text.substring(0, finalTextIndex);
    addStep('', '', "Match", `Full match found!`, matchedSubstring);
  } else {
    addStep('', '', "No Match", `No full match found.`);
  }

  return steps;
};

export function RegexDebuggerPage() {
  const [regexPattern, setRegexPattern] = useState("");
  const [testText, setTestText] = useState("");
  const [debugSteps, setDebugSteps] = useState<DebugStep[]>([]);
  const [isDebugging, setIsDebugging] = useState(false);

  const handleDebug = () => {
    setIsDebugging(true);
    setDebugSteps(debugRegex(regexPattern, testText));
    setIsDebugging(false);
  };
  
  const renderTextWithHighlights = (text: string, highlightedText: string) => {
    if (!highlightedText) {
      return (
        <Typography component="span" sx={{ color: "#e0e0e0" }}>
          {text}
        </Typography>
      );
    }
    
    const startIndex = text.indexOf(highlightedText);
    if (startIndex === -1) {
        return (
            <Typography component="span" sx={{ color: "#e0e0e0" }}>
                {text}
            </Typography>
        );
    }
    
    const endIndex = startIndex + highlightedText.length;
    const before = text.substring(0, startIndex);
    const highlight = text.substring(startIndex, endIndex);
    const after = text.substring(endIndex);

    return (
      <Typography component="span">
        <Typography component="span" sx={{ color: "#e0e0e0" }}>
          {before}
        </Typography>
        <Typography component="span" sx={{ backgroundColor: "rgba(102, 187, 106, 0.3)", padding: "2px 0", borderRadius: "2px" }}>
          {highlight}
        </Typography>
        <Typography component="span" sx={{ color: "#e0e0e0" }}>
          {after}
        </Typography>
      </Typography>
    );
  };
  
  return (
    <VisualizerWrapper>
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
          Regex Debugger
        </Typography>
      </Box>
      <VisualizerContent>
        <Typography variant="body1" sx={{ color: "#aaa", mb: 2 }}>
          Enter your regex pattern and test text to see a step-by-step
          breakdown of how the regex engine finds a match.
        </Typography>

        <Stack direction="column" spacing={2}>
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
            rows={4}
            label="Test Text"
            variant="outlined"
            value={testText}
            onChange={(e) => setTestText(e.target.value)}
          />
          <Button
            variant="contained"
            onClick={handleDebug}
            disabled={isDebugging || !regexPattern || !testText}
            sx={{
              backgroundColor: "#4caf50",
              "&:hover": { backgroundColor: "#388e3c" },
              width: "fit-content",
            }}
          >
            Debug
          </Button>
        </Stack>

        <Divider sx={{ my: 2, backgroundColor: "#444" }} />

        <Box>
          <Typography variant="h6" sx={{ color: "#00bcd4" }}>
            Debugger Output
          </Typography>
          <DebuggerOutputBox>
            {debugSteps.length > 0 ? (
              debugSteps.map((step, index) => (
                <Box key={index} sx={{ mb: 2, p: 2, backgroundColor: "#2e2e2e", borderRadius: "4px" }}>
                  <Typography variant="body2" sx={{ color: "#e0e0e0" }}>
                    <Typography component="span" sx={{ color: "#00bcd4", fontWeight: "bold" }}>
                      Step {index + 1}:{" "}
                    </Typography>
                    {step.description}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#fff", mt: 1 }}>
                    <Typography component="span" sx={{ fontWeight: "bold" }}>
                      Regex Part:
                    </Typography> {step.regexPart}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#fff" }}>
                    <Typography component="span" sx={{ fontWeight: "bold" }}>
                      Text Position:
                    </Typography> {step.textPart} (Index {step.textIndex})
                  </Typography>
                  <Typography variant="body2" sx={{ color: step.result === "Match" ? "#66bb6a" : step.result === "Backtrack" ? "#ffc107" : "#f44336", fontWeight: "bold" }}>
                    Result: {step.result}
                  </Typography>
                  <Box sx={{ mt: 1, backgroundColor: "#121212", p: 1, borderRadius: "4px" }}>
                    <Typography variant="body2" component="span" sx={{ color: "#aaa" }}>
                      Text:{" "}
                    </Typography>
                    <Typography component="span" variant="body2">
                      {renderTextWithHighlights(testText, step.matchedText)}
                    </Typography>
                  </Box>
                </Box>
              ))
            ) : (
              <Typography variant="body2" sx={{ color: "#aaa" }}>
                Enter a regex pattern and text, then click "Debug" to see the
                step-by-step analysis.
              </Typography>
            )}
          </DebuggerOutputBox>
        </Box>
      </VisualizerContent>
    </VisualizerWrapper>
  );
}