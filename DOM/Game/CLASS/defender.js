import { gameSettings } from "../MVC/controller.js";
import { gameElements } from "../MVC/controller.js";
import { Projectile } from "./projectiles.js";
import { defender1 } from "../MVC/controller.js";
import { defender2 } from "../MVC/controller.js";
import { defender3 } from "../MVC/controller.js";
import { mine } from "../MVC/controller.js";
/**
 * The Defender class represents a defender in the game.
 * @class
 */
class Defender {
    /**
     * Create a new instance of Defender.
     * @constructor
     * @param {number} x - The x-coordinate of the defender's position.
     * @param {number} y - The y-coordinate of the defender's position.
     */
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.width = gameSettings.cellSize - gameSettings.cellGap * 2;
      this.height = gameSettings.cellSize - gameSettings.cellGap * 2;
      this.shooting = false;
      this.shootNow = false;
      this.projectiles = [];
      this.timer = 0;
      this.frameX = 0;
      this.frameY = 0;
      this.spriteWidth = 128;
      this.spriteHeight = 128;
      this.minFrame = 0;
      this.maxFrame = 3;
    }
  
    /**
     * Draw the defender on the canvas.
     * @method
     */
    draw() {
      // Implementation for drawing the defender on the canvas
    }
  
    /**
     * Update the defender's properties and behavior.
     * @method
     */
    update() {
      // Implementation for updating the defender's properties and behavior
    }
}
import { shootingSound } from "../../setting.js";
/**
 * The ShootingDefender class represents a shooting defender in the game.
 * It extends the Defender class.
 * @class
 * @extends Defender
 */
export class ShootingDefender extends Defender {
    /**
     * Create a new instance of ShootingDefender.
     * @constructor
     * @param {number} x - The x-coordinate of the defender's position.
     * @param {number} y - The y-coordinate of the defender's position.
     */
    constructor(x, y) {
      super(x, y);
      this.shootNow = false;
      this.shooting = false;
      this.health = 100;
      this.cost = 125;
      this.shootingSound = new Audio('./DOM/Game/Music/9mm-pistol-shot-6349.mp3'); // Замініть шлях на відповідний звуковий файл
    }
  
    /**
     * Draw the shooting defender on the canvas.
     * @method
     * @param {CanvasRenderingContext2D} ctx - The rendering context of the canvas.
     */
    draw(ctx) {
      ctx.fillStyle = 'gold';
      ctx.font = '30px Orbitron';
      ctx.fillText(Math.floor(this.health), this.x + 15, this.y + 30);
      ctx.drawImage(
        defender1,
        this.frameX * this.spriteWidth,
        0,
        this.spriteWidth,
        this.spriteHeight,
        this.x,
        this.y,
        this.width,
        this.height
      );
    }
  
    /**
     * Update the shooting defender's properties and behavior.
     * @method
     */
    update() {
      if (gameSettings.frame % 20 === 0) {
        if (this.frameX < this.maxFrame) {
          this.frameX++;
        } else {
          this.frameX = this.minFrame;
        }
        if (this.frameX === 3) {
          this.shootNow = true;
        }
      }
      if (this.shooting && this.shootNow) {
        gameElements.projectiles.push(new Projectile(this.x + 70, this.y + 35));
        this.shootNow = false;
        if(shootingSound.muted){

        }else {
          this.shootingSound.volume = document.getElementById('sound-volume').value;
          this.shootingSound.currentTime = 0;
          this.shootingSound.play();
        }
      }
    }
}
/**
 * The MeleeDefender class represents a melee defender in the game.
 * It extends the Defender class.
 * @class
 * @extends Defender
 */
export class MeleeDefender extends Defender {
    /**
     * Create a new instance of MeleeDefender.
     * @constructor
     * @param {number} x - The x-coordinate of the defender's position.
     * @param {number} y - The y-coordinate of the defender's position.
     */
    constructor(x, y) {
      super(x, y);
      this.health = 150;
      this.cost = 75;
      this.minFrame = 0;
      this.maxFrame = 4;
      this.range = 90; // Attack range
      this.damage = 80; // Damage inflicted on enemies during attack
    }
  
    /**
     * Draw the melee defender on the canvas.
     * @method
     * @param {CanvasRenderingContext2D} ctx - The rendering context of the canvas.
     */
    draw(ctx) {
      ctx.fillStyle = 'gold';
      ctx.font = '30px Orbitron';
      ctx.fillText(Math.floor(this.health), this.x + 15, this.y + 30);
      ctx.drawImage(
        defender3,
        this.frameX * this.spriteWidth,
        0,
        this.spriteWidth,
        this.spriteHeight,
        this.x,
        this.y,
        this.width,
        this.height
      );
    }
  
    /**
     * Update the melee defender's properties and behavior.
     * @method
     */
    update() {
      if (gameSettings.frame % 20 === 0) {
        if (this.frameX < this.maxFrame) {
          this.frameX++;
        } else {
          this.frameX = this.minFrame;
        }
      }
      if (this.shooting && this.shootNow) {
        this.shootNow = false;
      }
  
      // Enemy attack if they are within the attack range
      for (let i = 0; i < gameElements.enemies.length; i++) {
        let distance = Math.sqrt(
          (this.x - gameElements.enemies[i].x) ** 2 +
            (this.y - gameElements.enemies[i].y) ** 2
        );
        if (distance <= this.range) {
          // Enemy is within the attack range, so make an attack
          gameElements.enemies[i].health -= this.damage;
          if (gameElements.enemies[i].health <= 0) {
            // Enemy has been destroyed
            gameElements.enemies.splice(i, 1);
          }
        }
      }
    }
}
 /**
 * The NonShootingDefender class represents a non-shooting defender in the game.
 * It extends the Defender class.
 * @class
 * @extends Defender
 */
export class NonShootingDefender extends Defender {
    /**
     * Create a new instance of NonShootingDefender.
     * @constructor
     * @param {number} x - The x-coordinate of the defender's position.
     * @param {number} y - The y-coordinate of the defender's position.
     */
    constructor(x, y) {
      super(x, y);
      this.health = 200;
      this.cost = 50;
    }
  
    /**
     * Draw the non-shooting defender on the canvas.
     * @method
     * @param {CanvasRenderingContext2D} ctx - The rendering context of the canvas.
     */
    draw(ctx) {
      ctx.fillStyle = 'gold';
      ctx.font = '30px Orbitron';
      ctx.fillText(Math.floor(this.health), this.x + 15, this.y + 30);
      ctx.drawImage(
        defender2,
        this.frameX * this.spriteWidth,
        0,
        this.spriteWidth,
        this.spriteHeight,
        this.x,
        this.y,
        this.width,
        this.height
      );
    }
  
    /**
     * Update the non-shooting defender's properties and behavior.
     * @method
     */
    update() {
      // No specific update behavior for non-shooting defender
    }
}
/**
 * The Mine class represents a mine defender in the game.
 * It extends the Defender class.
 * @class
 * @extends Defender
 */
export class Mine extends Defender {
    /**
     * Create a new instance of Mine.
     * @constructor
     * @param {number} x - The x-coordinate of the mine's position.
     * @param {number} y - The y-coordinate of the mine's position.
     */
    constructor(x, y) {
      super(x, y);
      this.defender = mine;
      this.health = 20;
      this.cost = 40;
      this.damage = 125;
      this.exploded = false;
      this.spriteWidth = 200;
      this.spriteHeight = 152;
    }
  
    /**
     * Explode the mine and apply damage to nearby enemies.
     * @method
     */
    explode() {
      // Additional code executed during mine explosion
  
      // Iterate through all enemies
      for (let i = 0; i < gameElements.enemies.length; i++) {
        const enemy = gameElements.enemies[i];
  
        // Check if the enemy is near the mine
        if (
          enemy.x < this.x + this.width &&
          enemy.x + enemy.width > this.x &&
          enemy.y < this.y + this.height &&
          enemy.y + enemy.height > this.y
        ) {
          // Apply damage to the enemy
          enemy.health -= this.damage;
  
          // If the enemy's health is less than or equal to 0, remove it from the enemies list
          // if (enemy.health <= 0) {
          //   gameElements.enemies.splice(i, 1);
          //   i--;
          // }
        }
      }
    }
  
    /**
     * Update the mine's properties and behavior.
     * @method
     */
    update() {
      for (let i = 0; i < gameElements.enemies.length; i++) {
        if (
          gameElements.enemies[i].x < this.x + this.width &&
          gameElements.enemies[i].x + gameElements.enemies[i].width > this.x &&
          gameElements.enemies[i].y < this.y + this.height &&
          gameElements.enemies[i].y + gameElements.enemies[i].height > this.y
        ) {
          //gameElements.enemies[i].health -= this.damage;
          // if (gameElements.enemies[i].health <= 0) {
          //   gameElements.enemies.splice(i, 1);
          //   i--;
          // }
          gameElements.defenders.splice(gameElements.defenders.indexOf(this), 1);
          this.explode(); // Add this line if you need to call additional code for mine explosion
        }
      }
    }
  
    /**
     * Draw the mine on the canvas.
     * @method
     * @param {CanvasRenderingContext2D} ctx - The rendering context of the canvas.
     */
    draw(ctx) {
      ctx.fillStyle = 'gold';
      ctx.font = '30px Orbitron';
      ctx.fillText(Math.floor(this.health), this.x + 15, this.y + 30);
      ctx.drawImage(
        this.defender,
        this.frameX * this.spriteWidth,
        0,
        this.spriteWidth,
        this.spriteHeight,
        this.x,
        this.y,
        this.width,
        this.height
      );
    }
  }
  