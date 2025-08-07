import { Box, Typography, Button, TextareaAutosize, styled } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ReplayIcon from '@mui/icons-material/Replay';
import { useLocation, useNavigate } from 'react-router-dom';

const StyledTextarea = styled(TextareaAutosize)({
  width: 'calc(100% - 6px)',
  height: '400px',
  resize: 'none',
  padding: '12px',
  boxSizing: 'border-box',
  border: '1px solid #444',
  backgroundColor: '#333',
  color: 'white',
  fontFamily: 'monospace',
  fontSize: '1rem',
  overflow: 'auto',
  '&:focus': {
    outline: 'none',
    borderColor: '#00bcd4',
  },
});

export function CommentSwiperResultPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const result = location.state?.result || '';

  const handleCopyCode = () => {
    navigator.clipboard.writeText(result);
    alert('Kod kopyalandı!');
  };

  const handleGoBack = () => {
    navigate('/comment-swiper');
  };

  return (
    <Box sx={{ backgroundColor: '#222', color: 'white', height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ p: 3, backgroundColor: '#1e1e1e', borderBottom: '1px solid #444', lineHeight: '0.47' }}>
        <Typography variant="h4" component="div" color="white" sx={{ lineHeight: '0.47' }}>
          Comment Swiper Sonuç
        </Typography>
        <Typography variant="body2" component="div" sx={{ color: '#aaa' }}>
          Yorumları temizlenmiş kodunuz.
        </Typography>
      </Box>
      <Box sx={{ p: 3, flexGrow: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
        <StyledTextarea
          value={result}
          readOnly
        />
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
          <Button
            variant="contained"
            startIcon={<ContentCopyIcon />}
            onClick={handleCopyCode}
            disabled={!result}
            sx={{
              backgroundColor: '#00bcd4',
              '&:hover': {
                backgroundColor: '#0097a7',
              },
            }}
          >
            Kodu Kopyala
          </Button>
          <Button
            variant="contained"
            startIcon={<ReplayIcon />}
            onClick={handleGoBack}
            sx={{
              backgroundColor: '#444',
              '&:hover': {
                backgroundColor: '#555',
              },
            }}
          >
            Tekrar
          </Button>
        </Box>
      </Box>
    </Box>
  );
}