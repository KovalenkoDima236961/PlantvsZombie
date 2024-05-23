/**
 * Represents a projectile in the game.
 * @class
 */
export class Projectile {
    /**
     * Create a new instance of Projectile.
     * @param {number} x - The x-coordinate of the projectile's position.
     * @param {number} y - The y-coordinate of the projectile's position.
     */
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.width = 10;
      this.height = 10;
      this.power = 20;
      this.speed = 5;
    }
  
    /**
     * Update the projectile's position.
     */
    update() {
      this.x += this.speed;
    }
  
    /**
     * Draw the projectile on the canvas.
     * @param {CanvasRenderingContext2D} ctx - The 2D rendering context of the canvas.
     */
    draw(ctx) {
      ctx.fillStyle = 'black';
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.width, 0, Math.PI * 2);
      ctx.fill();
    }
}