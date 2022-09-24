import React from 'react';
import styled from 'styled-components';

import {Section} from './../layout';
import renderPreview, {clearCanvas} from './canvas';

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

const Canvas = styled.canvas`
  width: 100%;
  height: auto;
  border: 2px solid darkgrey;
`;

export default function Preview({
  upperText,
  lowerText,
  img,
  nbPerLine,
  nbLines,
}) {
  const canvasRef = React.useRef(null);

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
    <Section>
      <h2>Prévisualisation</h2>
      { img &&
        <button type="button" onClick={saveAsJPG}>Télécharger</button>
      }
      <Canvas ref={canvasRef} />
    </Section>
  )
}