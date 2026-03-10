import { Box, Typography, LinearProgress } from '@mui/material';

export const StatBar = ({ label, value, color }) => (
  <Box sx={{ mb: 1.5 }}>
    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
      <Typography variant="caption" sx={{ fontWeight: 'bold', color: '#666' }}>{label}</Typography>
      <Typography variant="caption" sx={{ fontWeight: 'bold' }}>{value} / 250</Typography>
    </Box>
    <LinearProgress 
      variant="determinate" 
      value={(value / 250) * 100} 
      sx={{ 
        height: 8, borderRadius: 5, bgcolor: '#eee',
        '& .MuiLinearProgress-bar': { bgcolor: color }
      }}
    />
  </Box>
);