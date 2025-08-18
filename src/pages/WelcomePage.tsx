import { Box, Typography, styled, keyframes } from "@mui/material";

import AnotsysLogo from "../assets/anotsys.png";

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const orbit = keyframes`
  0% { transform: rotate(0deg) translateX(120px) rotate(0deg); }
  100% { transform: rotate(360deg) translateX(120px) rotate(-360deg); }
`;

const orbitLarge = keyframes`
  0% { transform: rotate(0deg) translateX(300px) rotate(0deg); }
  100% { transform: rotate(360deg) translateX(300px) rotate(-360deg); }
`;

const orbitLargeReverse = keyframes`
  0% { transform: rotate(0deg) translateX(300px) rotate(0deg); }
  100% { transform: rotate(-360deg) translateX(300px) rotate(360deg); }
`;

const HomePageWrapper = styled(Box)({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  width: "100%",
  textAlign: "center",
  backgroundColor: "#121212",
  position: "relative",
  overflow: "hidden",
});

const OrbitContainer = styled(Box)({
  position: "relative",
  width: "240px",
  height: "240px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginBottom: "16px",
  // Dairelerin arkaya gitmesi için z-index'i düşürüyoruz
  zIndex: 1, 
});

// Sol üst yörünge için daha büyük ve yoğun bir gradyan
const OrbitContainerLeft = styled(Box)({
  position: "absolute",
  top: "0",
  left: "0",
  transform: "translate(-50%, -50%)",
  width: "600px",
  height: "600px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "radial-gradient(circle at 10% 10%, #1a3a2d 20%, rgba(18, 18, 18, 0) 85%)",
  // Dairelerin arkaya gitmesi için z-index'i düşürüyoruz
  zIndex: 1,
});

// Sağ alt yörünge için daha büyük ve yoğun bir gradyan
const OrbitContainerRight = styled(Box)({
  position: "absolute",
  bottom: "0",
  right: "0",
  transform: "translate(50%, 50%)",
  width: "600px",
  height: "600px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "radial-gradient(circle at 90% 90%, #3e1a4e 20%, rgba(18, 18, 18, 0) 85%)",
  // Dairelerin arkaya gitmesi için z-index'i düşürüyoruz
  zIndex: 1,
});

const LogoWrapper = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "200px",
  height: "200px",
  borderRadius: "50%",
  background: "radial-gradient(circle, #3e1a4e 0%, #1a3a2d 50%, #121212 100%)",
  animation: `${fadeIn} 1.5s ease-in-out`,
  zIndex: 2,
});

const Logo = styled("img")({
  width: "150px",
  height: "150px",
});

const OrbitPath = styled(Box)({
  position: "absolute",
  width: "100%",
  height: "100%",
  borderRadius: "50%",
  border: "1px dashed #333",
  opacity: 0.5,
});

const OrbitingSymbolLarge = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'color' && prop !== 'delay' && prop !== 'opacity' && prop !== 'animationDuration' && prop !== 'animationName',
})<{ color: string; delay: number; opacity: number; animationDuration: number; animationName: any }>(
  ({ color, delay, opacity, animationDuration, animationName }) => ({
    position: "absolute",
    width: "24px",
    height: "24px",
    borderRadius: "50%",
    backgroundColor: color,
    opacity: opacity,
    animation: `${animationName} ${animationDuration}s linear infinite`,
    animationDelay: `${delay}s`,
    boxShadow: `0 0 15px ${color}`,
  })
);

const OrbitingSymbol = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'color' && prop !== 'delay' && prop !== 'opacity' && prop !== 'animationName',
})<{ color: string; delay: number; opacity: number; animationName: any }>(
  ({ color, delay, opacity, animationName }) => ({
    position: "absolute",
    width: "16px",
    height: "16px",
    borderRadius: "50%",
    backgroundColor: color,
    opacity: opacity,
    animation: `${animationName} 8s linear infinite`,
    animationDelay: `${delay}s`,
    boxShadow: `0 0 10px ${color}`,
  })
);


export function WelcomePage() {
  const colors = ["#1a3a2d", "#3e1a4e"];
  const orbitDelayInterval = 8 / 6;

  const largeOrbitDuration = 15;
  const largeOrbitDelayInterval = largeOrbitDuration / 10;
  
  const initialDelay = 0;

  return (
    <HomePageWrapper>
      <OrbitContainerLeft>
        <OrbitPath /> 
        {[...Array(10)].map((_, index) => (
          <OrbitingSymbolLarge
            key={`left-${index}`}
            color={colors[index % colors.length]}
            delay={initialDelay + index * largeOrbitDelayInterval}
            opacity={1} 
            animationDuration={largeOrbitDuration}
            animationName={orbitLarge}
          />
        ))}
      </OrbitContainerLeft>

      <OrbitContainerRight>
        <OrbitPath /> 
        {[...Array(10)].map((_, index) => (
          <OrbitingSymbolLarge
            key={`right-${index}`}
            color={colors[index % colors.length]}
            delay={initialDelay + index * largeOrbitDelayInterval}
            opacity={1} 
            animationDuration={largeOrbitDuration}
            animationName={orbitLargeReverse}
          />
        ))}
      </OrbitContainerRight>

      <OrbitContainer>
        <LogoWrapper>
          <Logo src={AnotsysLogo} alt="Anotsys Logo" />
        </LogoWrapper>
        {[...Array(6)].map((_, index) => (
          <OrbitingSymbol
            key={`center-${index}`}
            color={colors[index % colors.length]}
            delay={initialDelay + index * orbitDelayInterval}
            opacity={1} 
            animationName={orbit}
          />
        ))}
      </OrbitContainer>

      <Box sx={{ zIndex: 2 }}>
        <Typography
          variant="h2"
          component="h1"
          sx={{
            color: "#e0e0e0",
            fontWeight: 700,
            textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
            marginBottom: "8px",
            animation: `${fadeIn} 1.5s ease-in-out 3s backwards`,
          }}
        >
          Anotsys
        </Typography>
        <Typography
          variant="h5"
          sx={{
            color: "#999",
            fontStyle: "italic",
            marginBottom: "32px",
            animation: `${fadeIn} 1.5s ease-in-out 3.2s backwards`,
          }}
        >
          Your AI & Developer Support System
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: "#00bcd4",
            mt: 4,
            animation: `${fadeIn} 3.s ease-in-out 3.4s backwards`,
          }}
        >
          Start by selecting a tool from the left menu.
        </Typography>
      </Box>
    </HomePageWrapper>
  );
}