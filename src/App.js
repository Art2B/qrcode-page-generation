import React from 'react';
import styled from 'styled-components';
import { useTranslation, Trans } from 'react-i18next';

import './css/app.css';
import Preview from './components/preview';
import {Wrapper, Section} from './components/layout';
import {
  InputContainer,
  Label,
  FileInput,
  ImagePreview,
  TextArea,
} from './components/input';

const Title = styled.h1`
font-family: Roboto, sans-serif;
`;

export default function App() {
  const [upperText, setUpperText] = React.useState('');
  const [lowerText, setLowerText] = React.useState('');
  const [loadedImg, setLoadedImg] = React.useState(null);
  const [nbPerLine, setNbPerLine] = React.useState(5);
  const [nbLines, setNbLines] = React.useState(5);
  const { t } = useTranslation();

  const handleFile = file => {
    if (!file) return;

    var reader = new FileReader();
    reader.onload = function(readEvent) {
      setLoadedImg(readEvent.target.result);
    };
    reader.readAsDataURL(file);
  }

  return (
    <React.Fragment>
      <header>
        <Title>{t('title')}</Title>
      </header>
      <Wrapper>
        <Section>
          <h2>{t('formTitle')}</h2>
          <form>
            <InputContainer>
              <Label htmlFor="upper-text">{t('upperTextLabel')}</Label>
              <TextArea name="upper-text" value={upperText} onChange={e => setUpperText(e.target.value)}></TextArea>
            </InputContainer>
            <InputContainer>
              <Label htmlFor="qrcode-img">{t('image.label')}</Label>
              <FileInput type="file" name="qrcode-img" accept="image/png, image/jpeg" onChange={e => handleFile(e.target.files[0])} />
              { loadedImg && (
                <React.Fragment>
                  <ImagePreview src={loadedImg} />
                  <button type="button" onClick={() => setLoadedImg(null)}>{t('image.deleteCta')}</button>
                </React.Fragment>
              )}
            </InputContainer>
            <InputContainer>
              <Label htmlFor="lower-text">{t('lowerText.label')}</Label>
              <TextArea name="lower-text" value={lowerText} onChange={e => setLowerText(e.target.value)}></TextArea>
            </InputContainer>
            <InputContainer>
              <Label htmlFor="nb-per-line">
                <Trans i18nKey="nbPerLine.label" nbPerLine={nbPerLine}>
                  Nombre par ligne: {{nbPerLine}}
                </Trans>
              </Label>
              <input type="range" name="nb-per-line" min="1" max="8" step="1" value={nbPerLine} onChange={e => setNbPerLine(e.target.value)} />
            </InputContainer>
            <InputContainer>
              <Label htmlFor="nb-lines">
                <Trans i18nKey="nbLines.label" nbLines={nbLines}>
                  Nombre de lignes: {{nbLines}}
                </Trans>
              </Label>
              <input type="range" name="nb-lines" min="1" max="10" step="1" value={nbLines} onChange={e => setNbLines(e.target.value)} />
            </InputContainer>
          </form>
        </Section>
        <Preview upperText={upperText} lowerText={lowerText} img={loadedImg} nbPerLine={nbPerLine} nbLines={nbLines} />
      </Wrapper>
    </React.Fragment>
  );
};