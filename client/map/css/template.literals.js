import conn from '../../connection.js';

class TemplateStyles {
  constructor() {
    const tileSize = 64;
    this.tileSize = tileSize;

    const tiles = `url(${conn.path}/tiles.png)`;
    const yourHere = `url(${conn.path}/character.gif)`;

    const globalTileStyle = {
      width: `${tileSize}px`,
      height: `${tileSize}px`
    };

    this.mapBlock = {
      display: 'inline-block',
      width: `${tileSize}px`,
      height: `${tileSize}px`,
      overflow: 'hidden',
      padding: 0,
      margin: 0
    };

    this.itemHereStyle = {
      background: `${tiles} 0 -${tileSize * 2}px`
    };
    Object.assign(this.itemHereStyle, globalTileStyle);

    this.unwalkableStyle = {
      background: `${tiles} 0 -${tileSize}px`
    };
    Object.assign(this.unwalkableStyle, globalTileStyle);

    this.youreHereStyle = {
      background: yourHere
    };
    Object.assign(this.youreHereStyle, globalTileStyle);

    this.walkablePathStyle = {
      background: `${tiles} -${tileSize}px 0`
    };
    Object.assign(this.walkablePathStyle, globalTileStyle);

    this.emptySpaceStyle = {
      background: `${tiles} 0 0`
    };
    Object.assign(this.emptySpaceStyle, globalTileStyle);

    this.stairsStyle = {
      background: `${tiles} -${tileSize}px -${tileSize * 2}px`
    };
    Object.assign(this.stairsStyle, globalTileStyle);

    this.hintStyleHidden = {
      display: 'none',
      position: 'relative',
      width: '0px',
      height: '0px'
    };

    this.hintStyleVisible = {
      backgroundColor: 'rgba(175, 175, 175, 0.9)',
      zIndex: '1000',
      position: 'absolute',
      width: `${tileSize * 3}px`,
      height: `${tileSize}px`,
      overflow: 'hidden',
      padding: '8px',
      borderRadius: '8px',
      textAlign: 'center',
      display: 'block',
      border: '1px solid black',
      fontWeight: 'bold'
    };
  }
}


export default TemplateStyles;