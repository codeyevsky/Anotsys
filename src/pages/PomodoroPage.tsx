import { useState, useEffect } from "react";
import { Box, Typography, Button, Stack } from "@mui/material";

const WORK_TIME = 25 * 60; // 25 dakika
const SHORT_BREAK = 5 * 60; // 5 dakika
const LONG_BREAK = 15 * 60; // 15 dakika

export function PomodoroPage() {
  const [timeLeft, setTimeLeft] = useState(WORK_TIME);
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState<'work' | 'short-break' | 'long-break'>("work"); // Hata burada düzeltildi

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      clearInterval(interval!);
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
    // Burada bir bildirim veya ses çalabiliriz
    alert(`${mode === "work" ? "Çalışma" : "Mola"} süresi bitti!`);

    // Otomatik olarak bir sonraki moda geçiş yap
    if (mode === "work") {
      handleModeChange("short-break");
    } else {
      handleModeChange("work");
    }
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const timeDisplay = `${minutes < 10 ? "0" : ""}${minutes}:${
    seconds < 10 ? "0" : ""
  }${seconds}`;

  const getColorByMode = (selectedMode: 'work' | 'short-break' | 'long-break') => {
    switch (selectedMode) {
      case "work":
        return "#ff6b6b";
      case "short-break":
        return "#59c3c3";
      case "long-break":
        return "#f7d794";
      default:
        return "#e0e0e0";
    }
  };

  const modeColor = getColorByMode(mode);

  return (
    <Box
      sx={{
        backgroundColor: "#1c1c1c",
        color: "#e0e0e0",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        fontFamily: "Roboto, sans-serif",
      }}
    >
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
          Pomodoro
        </Typography>
      </Box>

      <Box
        sx={{
          width: "90%",
          maxWidth: "500px",
          backgroundColor: "rgba(30, 30, 30, 0.7)",
          backdropFilter: "blur(10px)",
          borderRadius: "32px",
          p: 6,
          mt: 8,
          mb: 4,
          position: "relative",
          textAlign: "center",
          border: `2px solid ${modeColor}`,
          boxShadow: `0 0 40px ${modeColor}50`,
          transition: "all 0.5s ease-in-out",
        }}
      >
        <Stack
          direction="row"
          spacing={2}
          justifyContent="center"
          sx={{ mb: 4 }}
        >
          <Button
            onClick={() => handleModeChange("work")}
            sx={{
              color: "#e0e0e0",
              backgroundColor: mode === "work" ? modeColor : "transparent",
              "&:hover": {
                backgroundColor: mode === "work" ? modeColor : "rgba(255, 255, 255, 0.1)",
                color: mode === "work" ? "#000" : modeColor,
              },
              borderRadius: "16px",
              fontWeight: "bold",
              textTransform: "none",
              minWidth: "120px",
              transition: "all 0.3s ease",
            }}
          >
            Çalışma
          </Button>
          <Button
            onClick={() => handleModeChange("short-break")}
            sx={{
              color: "#e0e0e0",
              backgroundColor: mode === "short-break" ? modeColor : "transparent",
              "&:hover": {
                backgroundColor: mode === "short-break" ? modeColor : "rgba(255, 255, 255, 0.1)",
                color: mode === "short-break" ? "#000" : modeColor,
              },
              borderRadius: "16px",
              fontWeight: "bold",
              textTransform: "none",
              minWidth: "120px",
              transition: "all 0.3s ease",
            }}
          >
            Kısa Mola
          </Button>
          <Button
            onClick={() => handleModeChange("long-break")}
            sx={{
              color: "#e0e0e0",
              backgroundColor: mode === "long-break" ? modeColor : "transparent",
              "&:hover": {
                backgroundColor: mode === "long-break" ? modeColor : "rgba(255, 255, 255, 0.1)",
                color: mode === "long-break" ? "#000" : modeColor,
              },
              borderRadius: "16px",
              fontWeight: "bold",
              textTransform: "none",
              minWidth: "120px",
              transition: "all 0.3s ease",
            }}
          >
            Uzun Mola
          </Button>
        </Stack>

        <Typography
          variant="h1"
          sx={{
            fontSize: { xs: "5.5rem", md: "8rem" },
            fontWeight: 300,
            color: modeColor,
            letterSpacing: "8px",
            mb: 4,
            fontFamily: "monospace",
            transition: "color 0.5s ease",
            textShadow: `0 0 10px ${modeColor}aa`,
          }}
        >
          {timeDisplay}
        </Typography>

        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          justifyContent="center"
        >
          <Button
            variant="contained"
            onClick={handleStartPause}
            sx={{
              backgroundColor: modeColor,
              "&:hover": {
                backgroundColor: modeColor,
                boxShadow: `0 0 15px ${modeColor}aa`,
              },
              color: "#000",
              fontWeight: "bold",
              fontSize: "1.2rem",
              padding: "12px 24px",
              borderRadius: "16px",
              textTransform: "none",
              minWidth: "150px",
              transition: "all 0.3s ease",
            }}
          >
            {isRunning ? "Duraklat" : "Başlat"}
          </Button>
          <Button
            variant="outlined"
            onClick={handleReset}
            disabled={!isRunning && timeLeft === WORK_TIME}
            sx={{
              borderColor: modeColor,
              color: modeColor,
              "&:hover": {
                borderColor: modeColor,
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                boxShadow: `0 0 15px ${modeColor}aa`,
              },
              fontWeight: "bold",
              fontSize: "1.2rem",
              padding: "12px 24px",
              borderRadius: "16px",
              textTransform: "none",
              minWidth: "150px",
            }}
          >
            Sıfırla
          </Button>
        </Stack>
      </Box>
    </Box>
  );
}