import React from 'react';
import { useTranslation } from 'react-i18next';

import renderPreview, {clearCanvas} from './canvas';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Unstable_Grid2';
import Box from '@mui/material/Box';

function debounce(func, ms) {
  let timeout;
  return function() {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, arguments), ms);
  };
}

function toBlob(canvas, type = "image/png", quality = 1) {
  return new Promise((resolve) => {
    canvas.toBlob(resolve, type, quality);
  });
}

// Function to download data to a file
function download(file, filename) {
  if (window.navigator.msSaveOrOpenBlob) // IE10+
      window.navigator.msSaveOrOpenBlob(file, filename);
  else { // Others
      var a = document.createElement("a"),
              url = URL.createObjectURL(file);
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      setTimeout(function() {
          document.body.removeChild(a);
          window.URL.revokeObjectURL(url);  
      }, 0); 
  }
}

// const Canvas = styled.canvas`
//   width: 100%;
//   height: auto;
//   border: 2px solid darkgrey;
// `;

export default function Preview({
  upperText,
  lowerText,
  img,
  nbPerLine,
  nbLines,
}) {
  const canvasRef = React.useRef(null);
  const { t } = useTranslation();

  React.useEffect(debounce(() => {
    if (canvasRef?.current) {
      renderPreview(canvasRef.current, {
        upperText, lowerText, img, nbPerLine, nbLines
      });
    }
  }, 500), [upperText, lowerText, img, nbPerLine, nbLines]);

  React.useEffect(() => {
    if (!img && canvasRef?.current) {
      clearCanvas(canvasRef.current);
    }
  }, [img]);

  const saveAsJPG = async () => {
    if (!canvasRef?.current) return;
    const blob = await toBlob(canvasRef.current, "image/jpeg");
    download(blob, `qrcode_print_${Date.now()}`, 'image/jpeg');
  }

  return (
    <Grid xs={6}>
      <Typography variant="h4" component="h2" gutterBottom>{t('preview')}</Typography>
      { img &&
        <Button variant="contained" onClick={saveAsJPG}>{t('downloadCta')}</Button>
      }
      <Box mt={2}>
        <canvas className='preview-canvas' ref={canvasRef} />
      </Box>
    </Grid>
  )
}