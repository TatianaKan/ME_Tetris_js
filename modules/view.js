import { SIZE_BLOCK, COLUMNS, ROWS } from "../js/main.js";

export class View {
  constructor(container) {
    this.container = container;
    this.preView();
  }

  colors = {
    J: 'LightSalmon',
    I: 'Thistle',
    O: 'DarkOrange',
    L: 'DarkSeaGreen',
    2: 'CadetBlue',
    T: 'DarkKhaki',
    S: 'DimGrey',
  };

  canvas = document.createElement('canvas');

  preView() {
    this.container.textContent = '';
    const preview = document.createElement('div');
    preview.innerHTML = 'Press "ENTER" <br> to START';
    preview.style.cssText = `
    border: 3px solid black;
    font-size: 18px;
    padding: 50px;
    grid-column: 1/3;
    `;

    this.container.append(preview)
  }

  init() {
    this.container.textContent = '';
    this.canvas.style.gridArea = 'game';
    this.canvas.classList.add('game-area')
    this.container.append(this.canvas);
    this.canvas.width = SIZE_BLOCK * COLUMNS;
    this.canvas.height = SIZE_BLOCK * ROWS;
  }

  createBlockScore() {
    const scoreBlock = document.createElement('div');
    scoreBlock.style.cssText = `
    border: 2px solid black;
    font-size: 18px;
    text-align: center;
    grid-area: score;
    `;

    const linesElem = document.createElement('p');
    const scoreElem = document.createElement('p');
    const levelElem = document.createElement('p');
    const recordElem = document.createElement('p');

    scoreBlock.append(linesElem, levelElem, scoreElem, recordElem);
    this.container.append(scoreBlock);

    return (lines, level, score, record) => {
      linesElem.textContent = `lines:  ${lines}`;
      levelElem.textContent = `level: ${level}`;
      scoreElem.textContent = `score: ${score}`;
      recordElem.textContent = `record: ${record}`;
    }
  }

  createBlockNextTetramino() {
    const tetraminoBlock = document.createElement('div');
    tetraminoBlock.style.cssText = `
    width: ${SIZE_BLOCK * 4}px;
    height: ${SIZE_BLOCK * 4}px;
    padding: 10px;
    border: 2px solid black;
    font-size: 18px;
    text-align: center;
    grid-area: next;
    display: flex;
    justify-content: center;

    `;

    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    tetraminoBlock.append(canvas);

    this.container.append(tetraminoBlock);

    return (tetramino) => {
      canvas.width = SIZE_BLOCK * tetramino.length
      canvas.height = SIZE_BLOCK * tetramino.length
      context.clearRect(0, 0, canvas.width, canvas.height);

      for (let y = 0; y < tetramino.length; y++) {
        const line = tetramino[y];

        for (let x = 0; x < line.length; x++) {
          const block = line[x];
          if (block !== 'o') {

            context.fillStyle = this.colors[block];
            context.strokeStyle = 'white';
            context.fillRect(x * SIZE_BLOCK, y * SIZE_BLOCK, SIZE_BLOCK, SIZE_BLOCK);
            context.strokeRect(x * SIZE_BLOCK, y * SIZE_BLOCK, SIZE_BLOCK, SIZE_BLOCK);
          }
        }
      }
    }
  }

  showArea(area) {
    const context = this.canvas.getContext('2d');
    context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for (let y = 0; y < area.length; y++) {
      const line = area[y];

      for (let x = 0; x < line.length; x++) {
        const block = line[x];
        if (block !== 'o') {

          context.fillStyle = this.colors[block];
          context.strokeStyle = 'white';
          context.fillRect(x * SIZE_BLOCK, y * SIZE_BLOCK, SIZE_BLOCK, SIZE_BLOCK);
          context.strokeRect(x * SIZE_BLOCK, y * SIZE_BLOCK, SIZE_BLOCK, SIZE_BLOCK);
        }
      }
    }

  };

}