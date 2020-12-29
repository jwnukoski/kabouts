import conn from '../../connection.js';

class TemplateStyles {
  constructor() {
    const tileSize = 64;
    const tiles = `url(${conn.path}/tiles.png)`;
    const yourHere = `url(${conn.path}/character.gif)`;

    const globalTileStyle = {
      width: `${tileSize}px`,
      height: `${tileSize}px`
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
  }
}


export default TemplateStyles;