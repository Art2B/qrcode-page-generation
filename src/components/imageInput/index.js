import React from 'react';
import { useTranslation, Trans } from 'react-i18next';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';

export default function ImageInput({onChange}) {
  const [isDragging, setIsDragging] = React.useState(false);
  const { t } = useTranslation();
  const fileInput = React.useRef(null);
  
  const handleFile = file => {
    if (!file) return;

    var reader = new FileReader();
    reader.onload = function(readEvent) {
      onChange(readEvent.target.result);
    };
    reader.readAsDataURL(file);
  }

  const handleClick = () => {
    if (!fileInput.current) return;
    fileInput.current.click(); 
  }

  const handleDrop = e => {
    e.preventDefault();
    if (e.dataTransfer.files.length >= 1) {
      handleFile(e.dataTransfer.files[0]);
      setIsDragging(false);
    } else {
      setIsDragging(true);
    }
  }

  return (
    <Box
      onClick={handleClick}
      sx={{
        border: '2px solid',
        borderRadius: '8px',
        borderColor: isDragging ? '#ffa726' : 'rgb(30, 73, 118)',
      }}
      p={2}
      onDrop={handleDrop}
      onDragOver={handleDrop}
      onDragLeave={() => setIsDragging(false)}
    >
      <Grid container spacing={2}>
        <Grid xs={4}>
          <Box sx={{
            paddingTop: '100%',
            width: '100%',
            backgroundColor: isDragging ? '#ffa726' : 'rgb(30, 73, 118)',
            opacity: 0.7,
            borderRadius: '8px',
          }} />
        </Grid>
        <Grid xs={8}>
          <Box>
            <Typography variant="h6" gutterBottom>{t('image.label')}</Typography>
            <Typography variant="body1">{t('image.description')}</Typography>
          </Box>
        </Grid>
      </Grid>
      <input ref={fileInput} type="file" name="qrcode-img" accept="image/png, image/jpeg" onChange={e => handleFile(e.target.files[0])} hidden />
    </Box>
  );
};

