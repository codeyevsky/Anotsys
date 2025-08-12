import { useState, useEffect } from "react";
import { Box, Typography, Button, Stack, Container, useTheme, Alert } from "@mui/material";
import { motion } from "framer-motion";

// Time constants
const WORK_TIME = 25 * 60;
const SHORT_BREAK = 5 * 60;
const LONG_BREAK = 15 * 60;

const bellSound = typeof window !== 'undefined' ? new Audio('/bell.mp3') : undefined;

export function PomodoroPage() {
  const theme = useTheme();
  const [timeLeft, setTimeLeft] = useState(WORK_TIME);
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState<'work' | 'short-break' | 'long-break'>("work");
  const [completedWorkSessions, setCompletedWorkSessions] = useState(0);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0 && isRunning) {
      if (interval) clearInterval(interval);
      handleTimerEnd();
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, timeLeft]);

  const handleStartPause = () => {
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setIsRunning(false);
    setMode("work");
    setTimeLeft(WORK_TIME);
    setCompletedWorkSessions(0);
  };

  const handleModeChange = (newMode: 'work' | 'short-break' | 'long-break') => {
    setIsRunning(false);
    setMode(newMode);
    switch (newMode) {
      case "work":
        setTimeLeft(WORK_TIME);
        break;
      case "short-break":
        setTimeLeft(SHORT_BREAK);
        break;
      case "long-break":
        setTimeLeft(LONG_BREAK);
        break;
      default:
        break;
    }
  };

  const handleTimerEnd = () => {
    if (bellSound) {
      bellSound.play();
    }
    setShowNotification(true);

    if (mode === "work") {
      setCompletedWorkSessions(prev => prev + 1);
      if ((completedWorkSessions + 1) % 4 === 0) {
        handleModeChange("long-break");
      } else {
        handleModeChange("short-break");
      }
    } else {
      handleModeChange("work");
    }

    setTimeout(() => {
      setShowNotification(false);
    }, 3000);
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const timeDisplay = `${minutes < 10 ? "0" : ""}${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;

  const getColorByMode = (selectedMode: 'work' | 'short-break' | 'long-break') => {
    switch (selectedMode) {
      case "work":
        return "#D32F2F";
      case "short-break":
        return "#1976D2";
      case "long-break":
        return "#FBC02D";
      default:
        return theme.palette.grey[500];
    }
  };

  const modeColor = getColorByMode(mode);

  const getModeTitle = () => {
    switch (mode) {
      case "work":
        return "Work Time";
      case "short-break":
        return "Short Break";
      case "long-break":
        return "Long Break";
      default:
        return "Pomodoro";
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: "#121212",
        color: "#ffffff",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        fontFamily: "Roboto, sans-serif",
      }}
    >
      {/* Header */}
      <Box
        sx={{
          p: 3,
          backgroundColor: "#1e1e1e",
          borderBottom: "1px solid #444",
          width: "100%",
          textAlign: "left"
        }}
      >
        <Typography
          variant="h4"
          component="h1"
          color="#00bcd4"
          sx={{ lineHeight: "0.47", fontWeight: "bold" }}
        >
          Pomodoro Timer
        </Typography>
      </Box>

      {/* Main Content (Timer, Buttons, etc.) */}
      <Container maxWidth="sm" sx={{ p: 4, flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        {/* Timer Box */}
        <Box
          sx={{
            backgroundColor: "rgba(25, 25, 25, 0.9)",
            borderRadius: "24px",
            p: 4,
            textAlign: "center",
            border: `3px solid ${modeColor}`,
            transition: "all 0.5s ease-in-out",
            boxShadow: `0 0 30px ${modeColor}50`,
          }}
        >
          {/* Mode Title */}
          <Typography
            variant="h5"
            sx={{
              fontWeight: "bold",
              color: modeColor,
              mb: 3,
              transition: "color 0.5s ease",
            }}
          >
            {getModeTitle()}
          </Typography>

          {/* Time Display */}
          <motion.div
            key={mode}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
          >
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: "5rem", md: "7rem" },
                fontWeight: 300,
                color: modeColor,
                letterSpacing: "4px",
                mb: 4,
                fontFamily: "monospace",
                textShadow: `0 0 15px ${modeColor}aa`,
                transition: "color 0.5s ease",
              }}
            >
              {timeDisplay}
            </Typography>
          </motion.div>

          {/* Control Buttons */}
          <Stack
            direction="row"
            spacing={2}
            justifyContent="center"
            sx={{ mb: 3 }}
          >
            <Button
              variant="contained"
              onClick={handleStartPause}
              sx={{
                backgroundColor: modeColor,
                "&:hover": { backgroundColor: modeColor, boxShadow: `0 0 20px ${modeColor}aa` },
                color: theme.palette.getContrastText(modeColor),
                fontWeight: "bold",
                fontSize: "1rem",
                padding: "10px 24px",
                borderRadius: "20px",
                textTransform: "none",
                minWidth: "140px",
              }}
            >
              {isRunning ? "Pause" : "Start"}
            </Button>
            <Button
              variant="outlined"
              onClick={handleReset}
              disabled={!isRunning && timeLeft === WORK_TIME && completedWorkSessions === 0}
              sx={{
                borderColor: modeColor,
                color: modeColor,
                "&:hover": { borderColor: modeColor, backgroundColor: `${modeColor}1a` },
                fontWeight: "bold",
                fontSize: "1rem",
                padding: "10px 24px",
                borderRadius: "20px",
                textTransform: "none",
                minWidth: "140px",
              }}
            >
              Reset
            </Button>
          </Stack>
        </Box>

        {/* Mode Selection Buttons */}
        <Stack
          direction="row"
          spacing={2}
          justifyContent="center"
          sx={{ mt: 4 }}
        >
          <Button
            variant={mode === "work" ? "contained" : "outlined"}
            onClick={() => handleModeChange("work")}
            sx={{
              ...modeButtonStyle,
              backgroundColor: mode === "work" ? getColorByMode("work") : "transparent",
              color: mode === "work" ? "#000" : getColorByMode("work"),
              borderColor: getColorByMode("work"),
            }}
          >
            Work
          </Button>
          <Button
            variant={mode === "short-break" ? "contained" : "outlined"}
            onClick={() => handleModeChange("short-break")}
            sx={{
              ...modeButtonStyle,
              backgroundColor: mode === "short-break" ? getColorByMode("short-break") : "transparent",
              color: mode === "short-break" ? "#000" : getColorByMode("short-break"),
              borderColor: getColorByMode("short-break"),
            }}
          >
            Short Break
          </Button>
          <Button
            variant={mode === "long-break" ? "contained" : "outlined"}
            onClick={() => handleModeChange("long-break")}
            sx={{
              ...modeButtonStyle,
              backgroundColor: mode === "long-break" ? getColorByMode("long-break") : "transparent",
              color: mode === "long-break" ? "#000" : getColorByMode("long-break"),
              borderColor: getColorByMode("long-break"),
            }}
          >
            Long Break
          </Button>
        </Stack>

        {/* Info showing completed sessions */}
        <Box textAlign="center" mt={4}>
          <Typography variant="body1" sx={{ color: "#9e9e9e" }}>
            Completed Sessions:{" "}
            <Typography component="span" fontWeight="bold" color={getColorByMode("work")}>
              {completedWorkSessions}
            </Typography>
          </Typography>
        </Box>

        {/* Notification to show when the timer ends */}
        {showNotification && (
          <Alert
            severity="info"
            sx={{
              position: 'fixed',
              bottom: 20,
              left: '50%',
              transform: 'translateX(-50%)',
              width: '90%',
              maxWidth: 400,
              borderRadius: 2,
              boxShadow: 3
            }}
          >
            {mode === "work" ? "Break time has started!" : "Work time has started!"}
          </Alert>
        )}
      </Container>
    </Box>
  );
}

const modeButtonStyle = {
  textTransform: "none",
  fontWeight: "bold",
  borderRadius: "16px",
  padding: "8px 16px",
  transition: "all 0.3s ease",
};