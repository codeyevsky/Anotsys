import { useState, useMemo } from "react";
import {
  Box,
  Typography,
  TextField,
  styled,
  Divider,
  Tooltip,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Stack,
  Button,
} from "@mui/material";

interface TokenItem {
  type: string;
  value: string;
  description: string;
}

interface VisualizeResult {
  error?: string;
}

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

const Token = styled(Box, {
  shouldForwardProp: (prop) => prop !== "type",
})<{ type: string }>(({ type }) => ({
  display: "inline-block",
  padding: "4px 8px",
  margin: "2px",
  borderRadius: "4px",
  fontWeight: "bold",
  color: "#121212",

  ...(type === 'newline' && {
    display: 'block',
    height: '0',
    margin: '0',
    padding: '0',
    backgroundColor: 'transparent',
    color: 'transparent'
  }),

  backgroundColor:
    {
      literal: "#00bcd4",
      charClass: "#ff9800",
      quantifier: "#4caf50",
      anchor: "#f44336",
      groupStart: "#9c27b0",
      groupEnd: "#9c27b0",
      charSetStart: "#e91e63",
      charSetEnd: "#e91e63",
      charSetLiteral: "#ffc107",
      charSetRange: "#ff5722",
      wildcard: "#03a9f4",
      newline: "transparent",
    }[type] || "#e0e0e0",
}));

const visualizeRegex = (pattern: string): TokenItem[] | VisualizeResult => {
  if (!pattern) {
    return [];
  }

  const tokens: TokenItem[] = [];
  let i = 0;
  let groupCounter = 0;
  let parenStack: string[] = [];

  while (i < pattern.length) {
    const char = pattern[i];

    if (char === "\\") {
      const nextChar = pattern[i + 1];
      if (!nextChar) {
        return { error: "An escape character `\\` is not followed by a character." };
      }
      const charClassMap: { [key: string]: TokenItem } = {
        d: { type: "charClass", value: "\\d", description: "Matches any digit (0-9)." },
        D: { type: "charClass", value: "\\D", description: "Matches any non-digit character." },
        w: { type: "charClass", value: "\\w", description: "Matches any word character (letter, digit, or underscore)." },
        W: { type: "charClass", value: "\\W", description: "Matches any non-word character." },
        s: { type: "charClass", value: "\\s", description: "Matches any whitespace character." },
        S: { type: "charClass", value: "\\S", description: "Matches any non-whitespace character." },
        b: { type: "anchor", value: "\\b", description: "Matches a word boundary." },
        B: { type: "anchor", value: "\\B", description: "Matches a non-word boundary." },
        n: { type: "literal", value: "\\n", description: "Matches a newline character." },
        t: { type: "literal", value: "\\t", description: "Matches a tab character." },
      };
      if (charClassMap[nextChar]) {
        tokens.push(charClassMap[nextChar]);
      } else {
        tokens.push({
          type: "literal",
          value: `\\${nextChar}`,
          description: `Matches the special character literally: ${nextChar}`,
        });
      }
      i += 2;
      continue;
    }

    if (char === "(") {
      if (pattern.substring(i, i + 3) === "(?:") {
        tokens.push({
          type: "groupStart",
          value: "(?:",
          description: "Start of a non-capturing group.",
        });
        parenStack.push("(?:");
        i += 3;
      } else {
        groupCounter++;
        tokens.push({
          type: "groupStart",
          value: "(",
          description: `Start of a capturing group: Group #${groupCounter}`,
        });
        parenStack.push("(");
        i++;
      }
      continue;
    }

    if (char === ")") {
      if (parenStack.length === 0) {
        return { error: "Extra closing parenthesis `)`." };
      }
      parenStack.pop();
      tokens.push({
        type: "groupEnd",
        value: ")",
        description: "End of a capturing group.",
      });
      i++;
      continue;
    }
    
    if (char === "[") {
      tokens.push({
        type: "charSetStart",
        value: "[",
        description: "Start of a character set.",
      });
      i++;
      let inSetIndex = i;
      let setContent = "";
      while (inSetIndex < pattern.length && pattern[inSetIndex] !== "]") {
        if (pattern[inSetIndex] === "\\") {
          if (pattern[inSetIndex + 1]) {
            setContent += `\\${pattern[inSetIndex + 1]}`;
            inSetIndex += 2;
          } else {
            return { error: "Escape character `\\` is incomplete inside an open character set." };
          }
        } else {
          setContent += pattern[inSetIndex];
          inSetIndex++;
        }
      }

      if (pattern[inSetIndex] !== "]") {
        return { error: "An open character set `[` was not closed." };
      }
      
      let contentIndex = 0;
      while (contentIndex < setContent.length) {
          if (setContent[contentIndex + 1] === '-' && setContent[contentIndex + 2]) {
              tokens.push({
                  type: "charSetRange",
                  value: `${setContent[contentIndex]}-${setContent[contentIndex + 2]}`,
                  description: `Character range: ${setContent[contentIndex]} through ${setContent[contentIndex + 2]}.`,
              });
              contentIndex += 3;
          } else {
              tokens.push({
                  type: "charSetLiteral",
                  value: setContent[contentIndex],
                  description: "A literal character within a character set.",
              });
              contentIndex++;
          }
      }

      tokens.push({
        type: "charSetEnd",
        value: "]",
        description: "End of a character set.",
      });
      i = inSetIndex + 1;
      continue;
    }

    if (char === "\n") {
        tokens.push({ type: "newline", value: "\n", description: "A newline character." });
        i++;
        continue;
    }

    if (char === "^") {
      tokens.push({ type: "anchor", value: "^", description: "Matches the beginning of the text." });
    } else if (char === "$") {
      tokens.push({ type: "anchor", value: "$", description: "Matches the end of the text." });
    } else if (char === ".") {
      tokens.push({ type: "wildcard", value: ".", description: "Matches any character except newline." });
    } else if (["*", "+", "?"].includes(char)) {
      tokens.push({
        type: "quantifier",
        value: char,
        description: `Matches the previous character ${char === "*" ? "zero or more times (0+)" : char === "+" ? "one or more times (1+)" : "zero or one time (0-1)"}.`,
      });
    } else {
      tokens.push({ type: "literal", value: char, description: "A literal character." });
    }
    i++;
  }

  if (parenStack.length > 0) {
    return { error: "An open capturing group `(` was not closed." };
  }

  return tokens;
};

const getHighlightedText = (text: string, matches: RegExpMatchArray[]): string => {
  if (matches.length === 0) return text;

  let result = '';
  let lastIndex = 0;

  matches.forEach((match) => {
    const fullMatchStart = match.index || 0;
    const fullMatchEnd = fullMatchStart + match[0].length;

    result += text.substring(lastIndex, fullMatchStart);

    let highlightedMatch = match[0];
    const groupColors = ["#ffc107", "#4caf50", "#03a9f4", "#9c27b0"];
    
    match.slice(1).reverse().forEach((group, relativeGroupIndex) => {
        if (group) {
          const groupIndex = match.slice(1).length - 1 - relativeGroupIndex;
          const startOfGroup = highlightedMatch.indexOf(group);
          if (startOfGroup !== -1) {
              const endOfGroup = startOfGroup + group.length;
              const groupColor = groupColors[groupIndex % groupColors.length];
              const styledGroup = `<span style="background-color: ${groupColor}; color: #121212; font-weight: bold; padding: 2px 0; border-radius: 2px;">${group}</span>`;
              highlightedMatch = highlightedMatch.substring(0, startOfGroup) + styledGroup + highlightedMatch.substring(endOfGroup);
          }
        }
    });

    result += `<span style="background-color: rgba(102, 187, 106, 0.3); padding: 2px 0; border-radius: 2px;">${highlightedMatch}</span>`;
    lastIndex = fullMatchEnd;
  });

  result += text.substring(lastIndex);
  
  return result;
};

export function RegexVisualizerPage() {
  const [regexPattern, setRegexPattern] = useState("");
  const [testText, setTestText] = useState("");
  const [replacementText, setReplacementText] = useState("");
  const [flags, setFlags] = useState({
    g: true,
    i: false,
    m: false,
    s: false, // New: Single line mode (dot matches all)
    u: false, // New: Unicode mode
  });

  const visualizationResult = useMemo(() => visualizeRegex(regexPattern), [
    regexPattern,
  ]);
  const visualization = Array.isArray(visualizationResult) ? visualizationResult : [];
  const visualizationError = !Array.isArray(visualizationResult) ? visualizationResult.error : null;

  const regexFlags = useMemo(() => {
    return Object.entries(flags)
      .filter(([, value]) => value)
      .map(([key]) => key)
      .join("");
  }, [flags]);

  const regex = useMemo(() => {
    if (!regexPattern || !testText) return null;
    try {
      if (visualizationError) return null;
      return new RegExp(regexPattern, regexFlags);
    } catch (e) {
      return null;
    }
  }, [regexPattern, regexFlags, testText, visualizationError]);

  const matches = useMemo(() => {
    if (!regex) return [];
    return [...testText.matchAll(regex)];
  }, [regex, testText]);

  const highlightedText = useMemo(
    () => getHighlightedText(testText, matches),
    [testText, matches]
  );
  
  const replacementResult = useMemo(() => {
    if (!regex || !replacementText) return "";
    try {
      if (!flags.g) {
        return testText.replace(regex, replacementText);
      }
      return testText.split(regex).join(replacementText);
    } catch (e) {
      return "Replacement failed.";
    }
  }, [regex, testText, replacementText, flags.g]);


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
          Regex Visualizer & Tester
        </Typography>
      </Box>
      <VisualizerContent>
        <Typography variant="body1" sx={{ color: "#aaa", mb: 2 }}>
          Enter your regex pattern, flags, and test text to see a visual
          representation and live matches.
        </Typography>

        <Stack direction="column" spacing={2}>
          <StyledTextField
            fullWidth
            label="Regex Pattern"
            variant="outlined"
            value={regexPattern}
            onChange={(e) => setRegexPattern(e.target.value)}
          />
          <FormGroup row>
            <FormControlLabel
              control={
                <Checkbox
                  checked={flags.g}
                  onChange={(e) => setFlags({ ...flags, g: e.target.checked })}
                  sx={{ color: "#00bcd4" }}
                />
              }
              label="Global (g)"
              sx={{ color: "white" }}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={flags.i}
                  onChange={(e) => setFlags({ ...flags, i: e.target.checked })}
                  sx={{ color: "#00bcd4" }}
                />
              }
              label="Case-Insensitive (i)"
              sx={{ color: "white" }}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={flags.m}
                  onChange={(e) => setFlags({ ...flags, m: e.target.checked })}
                  sx={{ color: "#00bcd4" }}
                />
              }
              label="Multi-line (m)"
              sx={{ color: "white" }}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={flags.s}
                  onChange={(e) => setFlags({ ...flags, s: e.target.checked })}
                  sx={{ color: "#00bcd4" }}
                />
              }
              label="Single line (s)"
              sx={{ color: "white" }}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={flags.u}
                  onChange={(e) => setFlags({ ...flags, u: e.target.checked })}
                  sx={{ color: "#00bcd4" }}
                />
              }
              label="Unicode (u)"
              sx={{ color: "white" }}
            />
          </FormGroup>

          <Stack direction="row" spacing={1} sx={{ mt: 2, flexWrap: "wrap" }}>
            <Tooltip title="Matches any digit (0-9)." placement="top" arrow>
              <Button
                variant="contained"
                size="small"
                onClick={() => setRegexPattern(regexPattern + "\\d")}
                sx={{ backgroundColor: "#4caf50", "&:hover": { backgroundColor: "#388e3c" } }}
              >
                \d
              </Button>
            </Tooltip>
            <Tooltip title="Matches any word character (a-z, A-Z, 0-9, _)." placement="top" arrow>
              <Button
                variant="contained"
                size="small"
                onClick={() => setRegexPattern(regexPattern + "\\w")}
                sx={{ backgroundColor: "#4caf50", "&:hover": { backgroundColor: "#388e3c" } }}
              >
                \w
              </Button>
            </Tooltip>
            <Tooltip title="Matches any whitespace character." placement="top" arrow>
              <Button
                variant="contained"
                size="small"
                onClick={() => setRegexPattern(regexPattern + "\\s")}
                sx={{ backgroundColor: "#4caf50", "&:hover": { backgroundColor: "#388e3c" } }}
              >
                \s
              </Button>
            </Tooltip>
            <Tooltip title="Matches the previous character zero or more times." placement="top" arrow>
              <Button
                variant="contained"
                size="small"
                onClick={() => setRegexPattern(regexPattern + "*")}
                sx={{ backgroundColor: "#00bcd4", "&:hover": { backgroundColor: "#008394" } }}
              >
                *
              </Button>
            </Tooltip>
            <Tooltip title="Matches the previous character one or more times." placement="top" arrow>
              <Button
                variant="contained"
                size="small"
                onClick={() => setRegexPattern(regexPattern + "+")}
                sx={{ backgroundColor: "#00bcd4", "&:hover": { backgroundColor: "#008394" } }}
              >
                +
              </Button>
            </Tooltip>
            <Tooltip title="Matches the previous character zero or one time." placement="top" arrow>
              <Button
                variant="contained"
                size="small"
                onClick={() => setRegexPattern(regexPattern + "?")}
                sx={{ backgroundColor: "#00bcd4", "&:hover": { backgroundColor: "#008394" } }}
              >
                ?
              </Button>
            </Tooltip>
          </Stack>
        </Stack>
        <Divider sx={{ my: 2, backgroundColor: "#444" }} />
        <Box>
          <Typography variant="h6" sx={{ color: "#00bcd4" }}>
            Visual Output
          </Typography>
          <Box
            sx={{
              p: 2,
              border: "1px solid #444",
              borderRadius: "4px",
              mt: 1,
              display: "flex",
              flexWrap: "wrap",
              maxHeight: "300px",
              overflowY: "auto",
              "&::-webkit-scrollbar": {
                  width: "8px",
              },
              "&::-webkit-scrollbar-thumb": {
                  backgroundColor: "#555",
                  borderRadius: "4px",
              },
              "&::-webkit-scrollbar-track": {
                  backgroundColor: "transparent",
              },
            }}
          >
            {visualizationError ? (
              <Typography variant="body2" sx={{ color: "#f44336" }}>
                Error: {visualizationError}
              </Typography>
            ) : visualization.length > 0 ? (
              visualization.map((token, index) => (
                <Tooltip
                  title={token.description}
                  placement="top"
                  arrow
                  key={index}
                >
                  <Token type={token.type}>{token.value}</Token>
                </Tooltip>
              ))
            ) : (
              <Typography variant="body2" sx={{ color: "#aaa" }}>
                Please enter a regex pattern to visualize.
              </Typography>
            )}
          </Box>
        </Box>

        <Divider sx={{ my: 2, backgroundColor: "#444" }} />

        <Box>
          <Typography variant="h6" sx={{ color: "#00bcd4" }}>
            Live Tester
          </Typography>
          <StyledTextField
            fullWidth
            multiline
            rows={4}
            label="Test Text"
            variant="outlined"
            value={testText}
            onChange={(e) => setTestText(e.target.value)}
            sx={{ my: 1 }}
          />

          <Box
            sx={{
              p: 2,
              border: "1px solid #444",
              borderRadius: "4px",
              mt: 1,
              backgroundColor: "#1e1e1e",
              wordWrap: "break-word",
              whiteSpace: "pre-wrap",
              maxHeight: "200px",
              overflowY: "auto",
              "&::-webkit-scrollbar": {
                  width: "8px",
              },
              "&::-webkit-scrollbar-thumb": {
                  backgroundColor: "#555",
                  borderRadius: "4px",
              },
              "&::-webkit-scrollbar-track": {
                  backgroundColor: "transparent",
              },
            }}
          >
            <Typography
              component="div"
              variant="body2"
              sx={{
                color: "#e0e0e0",
                wordWrap: "break-word",
                whiteSpace: "pre-wrap",
              }}
              dangerouslySetInnerHTML={{
                __html: highlightedText || "No text to test.",
              }}
            />
          </Box>
          
          <Typography variant="subtitle1" sx={{ color: "#66bb6a", mt: 2 }}>
            Found {matches.length} {matches.length === 1 ? "match" : "matches"}.
          </Typography>

          {matches.length > 0 && (
            <Box
              sx={{
                maxHeight: "200px",
                overflowY: "auto",
                mt: 1,
                p: 2,
                border: "1px solid #444",
                borderRadius: "4px",
                backgroundColor: "#1e1e1e",
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
              {matches.map((match, index) => (
                <Box key={index} sx={{ mb: 1, borderBottom: "1px solid #444" }}>
                  <Typography
                    variant="body2"
                    sx={{ color: "#fff", fontWeight: "bold" }}
                  >
                    Match #{index + 1} at index {match.index}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#aaa" }}>
                    Full Match:{" "}
                    <Box component="span" sx={{ color: "#66bb6a" }}>
                      "{match[0]}"
                    </Box>
                  </Typography>
                  {match.slice(1).map((group, groupIndex) => (
                    <Typography
                      variant="body2"
                      sx={{ color: "#aaa" }}
                      key={groupIndex}
                    >
                      Group #{groupIndex + 1}:{" "}
                      <Box component="span" sx={{ color: "#ffc107" }}>
                        "{group}"
                      </Box>
                    </Typography>
                  ))}
                </Box>
              ))}
            </Box>
          )}
        </Box>
        
        <Divider sx={{ my: 2, backgroundColor: "#444" }} />

        <Box>
            <Typography variant="h6" sx={{ color: "#00bcd4" }}>
                Replacement
            </Typography>
            <StyledTextField
                fullWidth
                label="Replacement Text"
                variant="outlined"
                value={replacementText}
                onChange={(e) => setReplacementText(e.target.value)}
                sx={{ my: 1 }}
            />
            <Typography variant="subtitle1" sx={{ color: "#66bb6a", mt: 2 }}>
              Replacement Result:
            </Typography>
            <Box
                sx={{
                    p: 2,
                    mt: 1,
                    border: "1px solid #444",
                    borderRadius: "4px",
                    backgroundColor: "#1e1e1e",
                    whiteSpace: "pre-wrap",
                    wordWrap: "break-word",
                }}
            >
                <Typography variant="body2" sx={{ color: "#e0e0e0" }}>
                    {replacementResult || "No text to replace."}
                </Typography>
            </Box>
        </Box>
      </VisualizerContent>
    </VisualizerWrapper>
  );
}