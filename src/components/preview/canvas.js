const defaultProps = {
  upperText: '',
  lowerText: '',
  img: null,
  nbPerLine: 1,
  nbLines: 1,
}
const pageDimensions = {
  A4: {
    height: 3508,
    width: 2480,
  }
};

// 1cm = 119px
const options = {
  padding: 95, // 0.8cm
  blockPadding: 25,
  maxFontSize: 54,
  minFontSize: 24,
  widthToHeightRatio: 0.8,
  lineHeightRatio: 0.8,
  strokeColor: 'darkgrey',
};

function getPrintingSpace(pageDimensions, padding) {
  return {
    height: pageDimensions.height - (padding*2),
    width: pageDimensions.width - (padding*2),
  }
}

function renderText(canvas, text, textParams) {
  const ctx = canvas.getContext('2d');

  let lines = text.split('\n');
  let words = text.split(' ');

  ctx.textBaseline = 'middle';
  ctx.textAlign = 'center';

  // Handle line break in string
  if (lines.length > 1) {
    let lineHeight = textParams.maxHeight / lines.length;
    ctx.font = `${Math.min(lineHeight * 0.8, options.maxFontSize)}px Roboto`;
    lines.forEach((line, i) => {
      ctx.fillText(line, textParams.x, textParams.y + lineHeight*i + lineHeight/2, textParams.maxWidth);
    });
    return;
  }

  // Handle text displayable on one line
  if (options.maxFontSize > textParams.maxHeight) {
    ctx.font = `${textParams.maxHeight * options.lineHeightRatio}px Roboto`;
  } else {
    ctx.font = `${options.maxFontSize}px Roboto`;
  }
  
  let ratio = textParams.maxWidth / ctx.measureText(text).width;

  if (ratio > 1) {
    ctx.fillText(text, textParams.x, textParams.y + textParams.maxHeight/2, textParams.maxWidth);
    return;
  }
  if (ratio < 1 && options.fontSize * ratio > options.minFontSize) {
    ctx.font = `${options.fontSize * ratio}px Roboto`;
    ctx.fillText(text, textParams.x, textParams.y + textParams.maxHeight/2, textParams.maxWidth);
    return;
  }

  ctx.font = `${options.minFontSize}px Roboto`;
  lines = [];
  while (words.length) {
    let tmp = words[0]; // Capture the current word, in case we need to re-add it to array
    let line = words.shift(); // Start our line with the first word available to us

    // Now we'll continue adding words to our line until we've exceeded our budget
    while ( words.length && ctx.measureText(line).width < textParams.maxWidth) {
      tmp = words[0];
      line = line + " " + words.shift();
    }

    // If the line is too long, remove the last word and replace it in words array.
    // This will happen on all but the last line, as we anticipate exceeding the length to break out of our second while loop
    if (ctx.measureText(line).width > textParams.maxWidth) {
      if(line.lastIndexOf(' ') != -1) {
        line = line.substring(0, line.lastIndexOf(' '));
        words.unshift(tmp);
      } else {
        var part1 = line.substring(0,12) + '-';
        var part2 = line.substring(12);
        //words.push(part1);
        words.push(part2);
        line = part1;
      }
    }
    lines.push(line);
  }

  let lineHeight = textParams.maxHeight / lines.length;
  ctx.font = `${lines.length > 1 ? lineHeight * 0.8 : 54}px Roboto`;
  lines.forEach((line, i) => {
    ctx.fillText(line, textParams.x, textParams.y + lineHeight*i + lineHeight/2, textParams.maxWidth);
  });
}

function getBlockCanvas(size, props) {
  let canvas = document.createElement('canvas');
  canvas.width = size.width;
  canvas.height = size.height;
  let ctx = canvas.getContext('2d');

  let space = {
    width: size.width - (options.blockPadding * 2),
    height: size.height - (options.blockPadding * 2),
  };

  // Border for help
  ctx.setLineDash([15, 25]);
  ctx.strokeStyle = options.strokeColor;
  ctx.strokeRect(0, 0, size.width -1, size.height -1);
  ctx.setLineDash([]);

  // Image
  let img = new Image();
  img.src = props.img;
  let widthToHeightRatio = img.naturalWidth / img.naturalHeight;
  if (widthToHeightRatio === 1) {
    img.width = img.height = Math.min(space.height * options.widthToHeightRatio, space.width);
  } else if (widthToHeightRatio > 1) {
    img.width = Math.min(space.height * options.widthToHeightRatio, space.width);
    img.height = img.width * (1 / widthToHeightRatio);
  } else {
    img.height = Math.min(space.height * options.widthToHeightRatio, space.width);
    img.width = img.height * widthToHeightRatio;
  }
  let imgXPos = options.blockPadding + (space.width - img.width) / 2;
  let imgYPos = options.blockPadding + (space.height - img.height) / 2
  ctx.drawImage(img, imgXPos, imgYPos, img.width, img.height);

  // Text
  renderText(canvas, props.upperText, {
    x: size.width/2,
    y: options.blockPadding,
    maxHeight: (space.height - img.width) / 2,
    maxWidth: space.width,
  });
  renderText(canvas, props.lowerText, {
    x: size.width/2,
    y: img.width + imgYPos,
    maxHeight: (space.height - img.width) / 2,
    maxWidth: space.width,
  });
  
  return canvas;
}

export default function renderPreview (canvas, props) {
  if (!props.img) {
    console.error('CanvasPreview: you need to pass an img');
    return;
  }

  // set canvas size
  canvas.width = pageDimensions['A4'].width;
  canvas.height = pageDimensions['A4'].height;
  let ctx = canvas.getContext('2d');

  // White background
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // get size of a block
  const space = getPrintingSpace(pageDimensions['A4'], options.padding);
  const lineHeight = space.height/props.nbLines;

  const blockSize = {
    height: lineHeight,
    width: space.width/props.nbPerLine,
  };
  
  // Render block here
  let theBlock = getBlockCanvas(blockSize, props);

  for(let line=0; line<props.nbLines; line++) {
    for(let col=0; col<props.nbPerLine; col++) {
      let x = options.padding + blockSize.width * col;
      let y = options.padding + blockSize.height * line;
      ctx.drawImage(theBlock, x, y, blockSize.width, blockSize.height);
    }
  }
}

export function clearCanvas(canvas) {
  let ctx = canvas.getContext('2d');
  // White background
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}