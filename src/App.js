import React from 'react';
import styled from 'styled-components';

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
        <Title>Generation de page</Title>
      </header>
      <Wrapper>
        <Section>
          <h2>Informations du QRcode</h2>
          <form>
            <InputContainer>
              <Label htmlFor="upper-text">Texte en haut du QRcode</Label>
              <TextArea name="upper-text" value={upperText} onChange={e => setUpperText(e.target.value)}></TextArea>
            </InputContainer>
            <InputContainer>
              <Label htmlFor="qrcode-img">Image du QRcode</Label>
              <FileInput type="file" name="qrcode-img" accept="image/png, image/jpeg" onChange={e => handleFile(e.target.files[0])} />
              { loadedImg && (
                <React.Fragment>
                  <ImagePreview src={loadedImg} />
                  <button type="button" onClick={() => setLoadedImg(null)}>Supprimer</button>
                </React.Fragment>
              )}
            </InputContainer>
            <InputContainer>
              <Label htmlFor="lower-text">Text en bas du QRcode</Label>
              <TextArea name="lower-text" value={lowerText} onChange={e => setLowerText(e.target.value)}></TextArea>
            </InputContainer>
            <InputContainer>
              <Label htmlFor="nb-per-line">Nombre par ligne: {nbPerLine}</Label>
              <input type="range" name="nb-per-line" min="1" max="8" step="1" value={nbPerLine} onChange={e => setNbPerLine(e.target.value)} />
            </InputContainer>
            <InputContainer>
              <Label htmlFor="nb-lines">Nombre de lignes: {nbLines}</Label>
              <input type="range" name="nb-lines" min="1" max="10" step="1" value={nbLines} onChange={e => setNbLines(e.target.value)} />
            </InputContainer>
          </form>
        </Section>
        <Preview upperText={upperText} lowerText={lowerText} img={loadedImg} nbPerLine={nbPerLine} nbLines={nbLines} />
      </Wrapper>
    </React.Fragment>
  );
};