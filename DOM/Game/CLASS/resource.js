import { amounts } from "../MVC/controller.js";
import { gameSettings } from "../MVC/controller.js";
/**
 * Represents a resource in the game.
 */
export class Resource {
    /**
     * Create a new instance of Resource.
     * @param {number} width - The width of the game area.
     */
    constructor(width) {
      this.x = Math.random() * (width - gameSettings.cellSize);
      this.y = (Math.floor(Math.random() * 5) + 1) * gameSettings.cellSize + 25;
      this.width = gameSettings.cellSize * 0.6;
      this.height = gameSettings.cellSize * 0.6;
      this.amount = amounts[Math.floor(Math.random() * amounts.length)];
    }
  
    /**
     * Draw the resource on the canvas.
     * @param {CanvasRenderingContext2D} ctx - The 2D rendering context of the canvas.
     */
    draw(ctx) {
      const img = new Image();
      img.src = './DOM/Game/PHOTO/ddac1d182495ae94.png';
      ctx.drawImage(img, this.x, this.y, this.width, this.height);
      ctx.fillStyle = 'black';
      ctx.font = '20px Orbitron';
      ctx.fillText(this.amount, this.x + 15, this.y + 25);
    }
}
  