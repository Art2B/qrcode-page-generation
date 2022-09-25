import React from 'react';
import { useTranslation, Trans } from 'react-i18next';

import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Unstable_Grid2';
import Box from '@mui/material/Box';

import Preview from './components/preview';
import ImageInput from './components/imageInput';

export default function App() {
  const [upperText, setUpperText] = React.useState('');
  const [lowerText, setLowerText] = React.useState('');
  const [loadedImg, setLoadedImg] = React.useState(null);
  const [nbPerLine, setNbPerLine] = React.useState(5);
  const [nbLines, setNbLines] = React.useState(5);
  const { t } = useTranslation();

  return (
    <Box px={4}>
      <header>
        <Typography variant="h2" component="h1" gutterBottom>{t('title')}</Typography>
      </header>
      <Grid container spacing={2}>
        <Grid xs={6}>
          <Typography variant="h4" component="h2" gutterBottom>{t('formTitle')}</Typography>
          <form>
            <Box mt={1} mb={2} >
              <TextField
                id="upper-text"
                label={t('upperText.label')}
                multiline
                fullWidth
                value={upperText}
                onChange={e => setUpperText(e.target.value)}
              />
              {/* <label htmlFor="upper-text">{t('upperTextlabel')}</label>
              <textarea name="upper-text" value={upperText} onChange={e => setUpperText(e.target.value)}></textarea> */}
            </Box>
            <Box mt={1} mb={3}>
              {!loadedImg && <ImageInput onChange={setLoadedImg} />}
              { loadedImg && (
                <React.Fragment>
                  <Box
                    sx={{
                      width: 200,
                      height: 'auto',
                    }}
                    mt={1}
                  >
                    <img className="preview-img" src={loadedImg} />
                  </Box>
                  <Box mt={1}>
                    <Button mt={1} variant="contained" color="error" onClick={() => setLoadedImg(null)}>{t('image.deleteCta')}</Button>
                  </Box>
                </React.Fragment>
              )}
            </Box>
            <Box mt={1} mb={2}>
              <TextField
                id="lower-text"
                label={t('lowerText.label')}
                multiline
                fullWidth
                value={lowerText}
                onChange={e => setLowerText(e.target.value)}
              />
            </Box>
            <Grid xs={12} md={8}>
              <Typography variant="body1">
                <Trans i18nKey="nbPerLine.label" nbPerLine={nbPerLine}>
                  Nombre par ligne: {{nbPerLine}}
                </Trans>
              </Typography>
              <Slider
                value={nbPerLine}
                name="nb-per-line"
                onChange={e => setNbPerLine(e.target.value)}
                marks
                step={1}
                min={1}
                max={10}
                valueLabelDisplay="auto"
              />
            </Grid>
            <Grid xs={12} md={8}>
              <Typography variant="body1">
                <Trans i18nKey="nbLines.label" nbLines={nbLines}>
                  Nombre de lignes: {{nbLines}}
                </Trans>
              </Typography>
              <Slider
                value={nbLines}
                name="nb-lines"
                onChange={e => setNbLines(e.target.value)}
                marks
                step={1}
                min={1}
                max={10}
                valueLabelDisplay="auto"
              />
            </Grid>
          </form>
        </Grid>
        <Preview upperText={upperText} lowerText={lowerText} img={loadedImg} nbPerLine={nbPerLine} nbLines={nbLines} />
      </Grid>
    </Box>
  );
};