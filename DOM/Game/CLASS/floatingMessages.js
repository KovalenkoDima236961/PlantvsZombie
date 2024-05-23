/**
 * Represents a floating message displayed on the canvas.
 * @class
 */
export class floatingMessage {
    /**
     * Create a new instance of FloatingMessage.
     * @param {string} value - The text value of the message.
     * @param {number} x - The x-coordinate of the message.
     * @param {number} y - The y-coordinate of the message.
     * @param {number} size - The font size of the message.
     * @param {string} color - The color of the message.
     */
    constructor(value, x, y, size, color) {
      this.value = value;
      this.x = x;
      this.y = y;
      this.size = size;
      this.lifeSpan = 0;
      this.color = color;
      this.opacity = 1;
    }
  
    /**
     * Update the position, lifespan, and opacity of the floating message.
     */
    update() {
      this.y -= 0.3;
      this.lifeSpan += 1;
      if (this.opacity > 0.01) {
        this.opacity -= 0.01;
      }
    }
  
    /**
     * Draw the floating message on the canvas.
     * @param {CanvasRenderingContext2D} ctx - The 2D rendering context of the canvas.
     */
    draw(ctx) {
      ctx.globalAlpha = this.opacity;
      ctx.fillStyle = this.color;
      ctx.font = this.size + 'px';
      ctx.fillText(this.value, this.x, this.y);
      ctx.globalAlpha = 1;
    }
  }