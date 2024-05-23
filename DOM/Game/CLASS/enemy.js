import { bosses, gameElements, bossDead } from "../MVC/controller.js";
import { gameSettings } from "../MVC/controller.js";
import { enemy1, enemy1Dead } from "../MVC/controller.js";
import { enemy2, enemy2Dead } from "../MVC/controller.js";
import { skeletonArcherType, skeletonDeath } from "../MVC/controller.js";
import { arrowImage } from "../MVC/controller.js";
import { movementSound } from "../../setting.js";
/**
 * The Enemy class represents an enemy in the game.
 * @class
 */
export class Enemy {
    /**
     * Create a new instance of Enemy.
     * @constructor
     * @param {number} verticalPosition - The vertical position of the enemy.
     * @param {number} width - The width of the game area.
     */
    constructor(verticalPosition, width) {
      this.x = width;
      this.y = verticalPosition;
      this.width = gameSettings.cellSize - gameSettings.cellGap * 2;
      this.height = gameSettings.cellSize - gameSettings.cellGap * 2;
      this.speed = Math.random() * 0.3 + 0.4;
      this.movement = this.speed;
      this.frameX = 0;
      this.frameY = 0;
      this.minFrame = 0;
      this.maxFrame = 7;
      this.spriteWidth = 96;
      this.spriteHeight = 100;
      this.prevY = this.y; // Add prevY field to store the previous vertical position
      this.movementSound = new Audio('./DOM/Game/Music/zombie-growl-3-6863.mp3');
    }
  
    /**
     * Update the enemy's properties and movement.
     * @method
     */
    update() {
      this.x -= this.movement;
      if (gameSettings.frame % 20 === 0) {
        if (this.frameX < this.maxFrame) {
          this.frameX++;
        } else {
          this.frameX = this.minFrame;
        }
      }
      // Update the value of prevY
      this.prevY = this.y;
      if(movementSound.muted){

      }else {
        this.movementSound.volume = document.getElementById('sound-volume').value;
        this.movementSound.currentTime = 0;
        this.movementSound.play();
      }
    }
  
    /**
     * Draw the enemy on the canvas.
     * @method
     */
    draw() {
      // Implement the drawing logic for the enemy
    }
}
  
/**
 * The NormalZombie class represents a normal zombie enemy in the game.
 * @class
 * @extends Enemy
 */
export class NormalZombie extends Enemy {
    /**
     * Create a new instance of NormalZombie.
     * @constructor
     * @param {number} verticalPosition - The vertical position of the zombie.
     * @param {number} width - The width of the game area.
     */
    constructor(verticalPosition, width) {
      super(verticalPosition, width);
      this.x = width;
      this.enemyType = enemy1;
      this.health = 100;
      this.maxHealth = this.health;
    }
  
    /**
     * Update the zombie's properties and movement.
     * @method
     */
    update() {
      if (this.health <= 30) {
        this.playDeathAnimation();
      }
      super.update();
      // Add any additional update logic specific to NormalZombie
    }
    /**
     * Draw the skeleton archer on the canvas.
     * @method
     */
    playDeathAnimation() {
      this.enemyType = enemy1Dead;
      this.minFrame = 0;
      this.maxFrame = 4
    }
    /**
     * Draw the zombie on the canvas.
     * @method
     * @param {CanvasRenderingContext2D} ctx - The rendering context of the canvas.
     */
    draw(ctx) {
      ctx.fillStyle = 'black';
      ctx.font = '30px Orbitron';
      ctx.fillText(Math.floor(this.health), this.x + 15, this.y + 30);
      ctx.drawImage(
        this.enemyType,
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
/**
 * The JumpingZombie class represents a jumping zombie enemy in the game.
 * @class
 * @extends Enemy
 */
export class JumpingZombie extends Enemy {
    /**
     * Create a new instance of JumpingZombie.
     * @constructor
     * @param {number} verticalPosition - The vertical position of the zombie.
     * @param {number} width - The width of the game area.
     * @param {number} height - The height of the game area.
     */
    constructor(verticalPosition, width, height) {
      super(verticalPosition, width);
      this.canH = height;
      this.x = width;
      this.jumpChance = 1; // Chance to jump to another line
      this.jumpCooldown = 50; // Number of frames between jumps
      this.jumpTimer = 0; // Counter for jumps
      this.enemyType = enemy2;
      this.health = 75;
      this.maxHealth = this.health;
    }
  
    /**
     * Update the zombie's properties and movement.
     * @method
     */
    update() {
      if (this.health <= 30) {
        this.playDeathAnimation();
      }else {
        this.jumpTimer++;
        if (this.jumpTimer >= this.jumpCooldown && Math.random() < this.jumpChance) {
          this.jump();
          this.jumpTimer = 0;
        }
      }
      super.update();
    }
        /**
     * Draw the skeleton archer on the canvas.
     * @method
     */
      playDeathAnimation() {
        this.enemyType = enemy2Dead;
        this.minFrame = 0;
        this.maxFrame = 4
      }
  
    /**
     * Make the zombie jump to another line.
     * @method
     */
    jump() {
      let index = gameElements.enemyPositions.indexOf(this.y);
      let newPosition = this.y + gameSettings.cellSize * (Math.random() < 0.5 ? -1 : 1);
      if (newPosition >= gameSettings.cellSize && newPosition < this.canH && gameElements.enemyPositions.indexOf(newPosition) === -1) {
        gameElements.enemyPositions[index] = newPosition;
        let startY = this.y;
        let endY = newPosition;
        let duration = 40; // Animation duration in frames
        let currentFrame = 0;
        let animate = () => {
          currentFrame++;
          if (currentFrame <= duration) {
            let progress = currentFrame / duration;
            this.y = startY + (endY - startY) * progress;
            requestAnimationFrame(animate);
          }
        };
        requestAnimationFrame(animate);
      }
    }
  
    /**
     * Draw the zombie on the canvas.
     * @method
     * @param {CanvasRenderingContext2D} ctx - The rendering context of the canvas.
     */
    draw(ctx) {
      ctx.fillStyle = 'black';
      ctx.font = '30px Orbitron';
      ctx.fillText(Math.floor(this.health), this.x + 15, this.y + 30);
      ctx.drawImage(
        this.enemyType,
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
  
/**
 * The Arrow class represents an arrow projectile in the game.
 * @class
 */
export class Arrow {
    /**
     * Create a new instance of Arrow.
     * @constructor
     * @param {number} x - The initial x-coordinate of the arrow.
     * @param {number} y - The initial y-coordinate of the arrow.
     * @param {number} direction - The direction of arrow movement (1 - right, -1 - left).
     */
    constructor(x, y, direction) {
      this.x = x;
      this.y = y;
      this.direction = direction;
      this.power = 40; // Arrow power
      this.speed = 5; // Arrow movement speed
      this.width = 10; // Arrow width
      this.height = 10; // Arrow height
      this.image = arrowImage;
    }
  
    /**
     * Update the arrow's position based on its movement direction.
     * @method
     */
    update() {
      this.x += this.speed * this.direction;
    }
  
    /**
     * Draw the arrow on the canvas.
     * @method
     * @param {CanvasRenderingContext2D} ctx - The rendering context of the canvas.
     */
    draw(ctx) {
      ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
}
/**
 * The SkeletonArcher class represents a skeleton archer enemy in the game.
 * @class
 * @extends Enemy
 */
export class SkeletonArcher extends Enemy {
    /**
     * Create a new instance of SkeletonArcher.
     * @constructor
     * @param {number} verticalPosition - The vertical position of the skeleton archer.
     * @param {number} width - The initial x-coordinate of the skeleton archer.
     */
    constructor(verticalPosition, width) {
      super(verticalPosition);
      this.health = 200;
      this.maxHealth = this.health;
      this.width = gameSettings.cellSize - gameSettings.cellGap * 2;
      this.height = gameSettings.cellSize - gameSettings.cellGap * 2;
      this.enemyType = skeletonArcherType;
      this.speed = Math.random() * 0.5 + 0.5;
      this.frameX = 0;
      this.spriteWidth = 128;
      this.spriteHeight = 128;
      this.minFrame = 0;
      this.maxFrame = 7;
      this.shooting = false;
      this.arrowCooldown = 0; // Cooldown for arrow shooting
      this.x = width; // Move the archer to the center of the cell
    }
  
    /**
     * Update the skeleton archer's position and perform shooting logic.
     * @method
     */
    update() {
      if (this.health <= 30) {
        this.playDeathAnimation();
      } else {
        // Check if it's time to shoot a new arrow
        if (this.arrowCooldown <= 0) {
          this.arrowCooldown = Math.random() * 75 + 75;
          this.shooting = true;
        }
    
        if (this.shooting) {
          // Create a new arrow object and add it to the game elements
          const arrow = new Arrow(this.x + 70, this.y + 35, -1);
          gameElements.arrows.push(arrow);
          this.shooting = false;
        }
    
        this.arrowCooldown--; // Decrease the cooldown
      }
      super.update();
      this.prevY = this.y;
    }
    /**
     * Draw the skeleton archer on the canvas.
     * @method
     */
    playDeathAnimation() {
      this.enemyType = skeletonDeath;
      this.minFrame = 0;
      this.maxFrame = 4
    }

    /**
     * Draw the skeleton archer on the canvas.
     * @method
     * @param {CanvasRenderingContext2D} ctx - The rendering context of the canvas.
     */
    draw(ctx) {
      ctx.fillStyle = 'black';
      ctx.font = '30px Orbitron';
      ctx.fillText(Math.floor(this.health), this.x + 15, this.y + 30);
  
      ctx.drawImage(
        this.enemyType,
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
/**
 * Represents a double line enemy in the game.
 * @class
 * @extends Enemy
 */
export class DoubleLineEnemy extends Enemy {
  /**
   * Create a new instance of DoubleLineEnemy.
   * @param {number} verticalPosition - The vertical position of the enemy.
   * @param {number} width - The width of the enemy.
   */
  constructor(verticalPosition, width) {
    super(verticalPosition, width);
    this.x = width;
    this.enemyType = bosses;
    this.width = gameSettings.cellSize - gameSettings.cellGap * 2;
    this.height = gameSettings.cellSize - gameSettings.cellGap * 2;
    this.health = 500;
    this.minFrame = 0;
    this.maxFrame = 6;
    this.maxHealth = this.health;
  }

  /**
   * Update the double line enemy.
   */
  update() {
    if(this.health <= 30){
      this.playDeathAnimation();
    }
    super.update();
  }
  /**
  * Draw the skeleton archer on the canvas.
  * @method
  */
  playDeathAnimation() {
    this.enemyType = bossDead;
    this.minFrame = 0;
    this.maxFrame = 4
  }

  /**
   * Draw the double line enemy on the canvas.
   * @param {CanvasRenderingContext2D} ctx - The 2D rendering context of the canvas.
   */
  draw(ctx) {
    ctx.fillStyle = 'black';
    ctx.font = '30px Orbitron';
    ctx.fillText(Math.floor(this.health), this.x + 15, this.y + 30);
    ctx.drawImage(
      this.enemyType,
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
