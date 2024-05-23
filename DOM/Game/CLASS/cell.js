import { gameSettings } from "../MVC/controller.js";
/**
 * Represents a cell in the game grid.
 * @class
 */
export class Cell {
    /**
     * Create a new instance of Cell.
     * @param {number} x - The x-coordinate of the cell.
     * @param {number} y - The y-coordinate of the cell.
     */
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.width = gameSettings.cellSize;
      this.height = gameSettings.cellSize;
    }
  
    /**
     * Draw the cell on the canvas.
     * @param {CanvasRenderingContext2D} ctx - The 2D rendering context of the canvas.
     */
    draw(ctx) {
      ctx.strokeStyle = 'black';
      ctx.strokeRect(this.x, this.y, this.width, this.height);
    }
}