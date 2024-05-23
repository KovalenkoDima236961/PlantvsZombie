import { Arrow } from "../CLASS/enemy.js";
import { Cell } from "../CLASS/cell.js";
import { gameElements } from "./controller.js";
import { gameSettings } from "./controller.js";
import { NormalZombie,JumpingZombie, SkeletonArcher, Enemy, DoubleLineEnemy } from "../CLASS/enemy.js";
import { Resource } from "../CLASS/resource.js";
import { enemy1 } from "./controller.js";
import { enemy2 } from "./controller.js";
import { canvas } from "./controller.js";
import { collision } from "./controller.js";
import { floatingMessage } from "../CLASS/floatingMessages.js";
import { Mine } from "../CLASS/defender.js";

/**
* Creates the game grid by populating the gameElements.gameGrid array with Cell objects.
*/
export function createGrid() {
  for (let y = gameSettings.cellSize; y < canvas.height; y += gameSettings.cellSize) {
      for (let x = 0; x < canvas.width; x += gameSettings.cellSize) {
          gameElements.gameGrid.push(new Cell(x, y));
      }
  }
}
/**
 * Updates the projectiles by iterating through the gameElements.projectiles array and calling the update method on each projectile object.
 * Handles collision detection between projectiles and enemies, reducing enemy health and removing projectiles upon collision.
 * Removes projectiles that have reached the right edge of the canvas.
 */
export function updateProjectiles() {
    let i = 0;
    while (i < gameElements.projectiles.length) {
        gameElements.projectiles[i].update();
  
        let j = 0;
        while (j < gameElements.enemies.length) {
            if (gameElements.enemies[j] && gameElements.projectiles[i] && collision(gameElements.projectiles[i], gameElements.enemies[j])) {
                gameElements.enemies[j].health -= gameElements.projectiles[i].power;
                gameElements.projectiles.splice(i, 1);
                i--;
                break;
            }
            j++;
        }
  
        if (gameElements.projectiles[i] && gameElements.projectiles[i].x > canvas.width - gameSettings.cellSize) {
            gameElements.projectiles.splice(i, 1);
            i--;
        }
        i++;
    }
}
/**
 * Updates the shooting behavior of Skeleton Archer enemies.
 * Iterates through the gameElements.enemies array and checks if each enemy is an instance of SkeletonArcher.
 * If it's time for the Skeleton Archer to shoot a new arrow, a new arrow object is created and added to the gameElements.arrows array.
 * The arrowCooldown is then set to a new value.
 * Decreases the arrowCooldown for each Skeleton Archer.
 * Updates the position of each arrow and checks for collisions between arrows and defenders, reducing defender health and removing arrows upon collision.
 */
export function updateSkeletonArcherShooting() {
    for (let i = 0; i < gameElements.enemies.length; i++) {
        if (gameElements.enemies[i] instanceof SkeletonArcher) {
            const skeletonArcher = gameElements.enemies[i];
  
            if (skeletonArcher.arrowCooldown <= 0) {
                const arrow = new Arrow(skeletonArcher.x - 70, skeletonArcher.y + 35, -1);
                gameElements.arrows.push(arrow);
                skeletonArcher.arrowCooldown = Math.random() * 75 + 75;
            }
            skeletonArcher.arrowCooldown--;
  
            for (let j = 0; j < gameElements.arrows.length; j++) {
                const arrow = gameElements.arrows[j];
                if (arrow instanceof Arrow) {
                    arrow.update();
                    for (let k = 0; k < gameElements.defenders.length; k++) {
                        const defender = gameElements.defenders[k];
                        if (collision(arrow, defender)) {
                            defender.health -= arrow.power;
                            gameElements.arrows.splice(j, 1);
                            j--;
                        }
                    }
                }
            }
        }
    }
}

/**
 * Updates the behavior and interactions of defenders.
 * Iterates through the gameElements.defenders array and performs the following actions for each defender:
 * - Updates the defender's position and behavior.
 * - Checks if the defender's y-coordinate matches any enemy positions to determine if the defender should start shooting.
 * - Checks for collisions between defenders and enemies, reducing defender health and enemy movement if a collision occurs.
 * - Handles the attack animation and reduces enemy health if the defender is attacking.
 * - Handles defender destruction and enemy movement if the defender's health reaches zero.
 */
export function handleDefenders() {
    for (let i = 0; i < gameElements.defenders.length; i++) {
        const defender = gameElements.defenders[i];
  
        if (!defender) {
            continue;
        }
  
        defender.update();
  
        if (defender.y && gameElements.enemyPositions.includes(defender.y)) {
            defender.shooting = true;
        } else {
            defender.shooting = false;
        }
  
        for (let j = 0; j < gameElements.enemies.length; j++) {
            const enemy = gameElements.enemies[j];
  
            if (
                defender &&
                enemy &&
                collision(defender, enemy) &&
                Math.abs(enemy.y - defender.y) < gameSettings.cellSize / 2
            ) {
                enemy.movement = 0;
                defender.health -= 0.5;
  
                if (defender.frameX === 4 && !defender.attacking) {
                    defender.attacking = true;
  
                    setTimeout(() => {
                        defender.attacking = false;
                    }, 280);
  
                    if (enemy && enemy.health <= 0) {
                        gameElements.enemies.splice(j, 1);
                        j--;
                    } else {
                        enemy.health -= defender.damage;
                    }
                }
            }
        }
  
        if (defender && defender.health <= 0) {
            if (defender instanceof Mine) {
                defender.explode();
            }
  
            for (let k = 0; k < gameElements.enemies.length; k++) {
                const enemy = gameElements.enemies[k];
  
                if (enemy && enemy.y === defender.y && enemy.health > 0) {
                    enemy.movement = enemy.speed;
                    break;
                }
            }
  
            gameElements.defenders.splice(i, 1);
            i--;
        }
    }
}
/**
 * Updates the selected defender card based on mouse interaction.
 * @param {Object} mouse - The mouse object containing its current state.
 * @param {Object[]} cards - An array of defender card objects.
 */
export function updateDefenderCards(mouse, cards) {
    for (let i = 0; i < cards.length; i++) {
      const card = cards[i];
  
      if (collision(mouse, card) && mouse.clicked) {
        gameSettings.chosenDefender = i + 1;
      }
    }
}
export function updateFloatingMessages() {
    for (const message of gameElements.floatingMessages) {
        message.update();
        if (message.lifeSpan >= 50) {
            const index = gameElements.floatingMessages.indexOf(message);
            gameElements.floatingMessages.splice(index, 1);
        }
    }
}
/**
 * Updates the enemies in the game.
 *
 * @param {object} mainLevel - The main level object containing level settings.
 */
export function updateEnemies(mainLevel) {
    const { enemies, enemyPositions, defenders, floatingMessages } = gameElements;
    const { cellSize, gameOver, cellGap} = gameSettings;
    const allEnemiesDefeated = enemies.length === 0 && enemyPositions.length === 0;
    const defendersOnSameLine = {};
  
    // Iterate over enemies and update them
    for (let i = 0; i < enemies.length; i++){
      const enemy = enemies[i];
      enemy.update();
      if (enemy.x < 0) {
        gameSettings.gameOver = true;
      }
  
      // Check for defenders on the same line
      const defendersOnLine = defenders.filter(defender => Math.abs(defender.y - enemy.y) < cellSize / 2);
      defendersOnLine.forEach(defender => defender.shooting = true);
      defendersOnSameLine[enemy.y] = defendersOnLine;
      
      // Check if any defenders on the same line have been defeated
      const defendersDefeated = defendersOnLine.filter(defender => defender.health <= 0);
      if (defendersDefeated.length > 0) {
        defendersOnLine.forEach(defender => {
          if (defender.health > 0) {
            // Set shooting to true for any defenders that are still alive on the same line
            defender.shooting = true;
          }
        });
      }
      
      if (enemy.health <= 0) {
        const gainedResources = enemy.maxHealth !== 0 ? enemy.maxHealth / 8.5 : 0;
        floatingMessages.push(new floatingMessage('+' + Math.trunc(gainedResources), enemy.x, enemy.y, 30));
        floatingMessages.push(new floatingMessage('+' + Math.trunc(gainedResources), 470, 85, 30));
        gameSettings.numberOfResources += Math.trunc(gainedResources);
        mainLevel.score += Math.trunc(gainedResources);
        const index = enemyPositions.indexOf(enemy.y);
        enemyPositions.splice(index, 1);
        enemies.splice(i, 1);
        i--;
        if (enemy instanceof JumpingZombie) {
          //jumpingZombiesCount--;
        }
      }
    }
  
    // Spawn new enemies
    if (!gameOver && gameSettings.frame % mainLevel.enemiesInterval === 0) {
      if (mainLevel.score < mainLevel.winningScore ) {
        const verticalPosition = Math.floor(Math.random() * 5 + 1) * cellSize + cellGap;
        const enemyType = Math.random() < 0.5 ? enemy1 : enemy2;
  
        if (enemyType === enemy1) {
          enemies.push(new NormalZombie(verticalPosition,canvas.width));
          enemyPositions.push(verticalPosition);
        } else if(enemyType === enemy2) {
          if (gameSettings.count1234 < mainLevel.jump) {
              const position = [2 * cellSize + cellGap, 4 * cellSize + cellGap][Math.floor(Math.random() * 2)];
              enemies.push(new JumpingZombie(position,canvas.width,canvas.height));
              gameSettings.count1234++;
              enemyPositions.push(position);
          }
        }
  
        if (mainLevel.enemiesInterval > 120) {
          mainLevel.enemiesInterval -= 50;
        }
    } else if (mainLevel.score >= mainLevel.winningScore && gameSettings.bossCount < mainLevel.count) {
      if(mainLevel.boss ===  1){
        console.log("BOss");
        const verticalPosition3 = [2 * cellSize + cellGap, 3 * cellSize + cellGap][Math.floor(Math.random() * 2)];
        enemies.push(new DoubleLineEnemy(verticalPosition3,canvas.width));
        enemyPositions.push(verticalPosition3);
      }else if(mainLevel.boss === 2){
        const verticalPosition12 = Math.floor(Math.random() * 5 + 1) * cellSize + cellGap;
        enemies.push(new SkeletonArcher(verticalPosition12,canvas.width));
        enemyPositions.push(verticalPosition12);
      }else if(mainLevel.boss === 3 && gameSettings.bossCount < (mainLevel.count - 1)){
        const verticalPosition3 = [2 * cellSize + cellGap, 3 * cellSize + cellGap][Math.floor(Math.random() * 2)];
        const verticalPosition31 = [2 * cellSize + cellGap, 3 * cellSize + cellGap][Math.floor(Math.random() * 2)];
        enemies.push(new DoubleLineEnemy(verticalPosition3,canvas.width));
        enemyPositions.push(verticalPosition3);
        ///const verticalPosition13 = [1 * cellSize + cellGap, 3 * cellSize + cellGap][Math.floor(Math.random() * 2)];
        enemies.push(new SkeletonArcher(verticalPosition31,canvas.width));
        enemyPositions.push(verticalPosition3);
      }
      gameSettings.bossCount++;
    }
  }

  // Set shooting to false for defenders that are not on the same line as any enemy
  defenders.forEach(defender => {
    if (!defendersOnSameLine[defender.y]) {
      defender.shooting = false;
    }
  });
}
/**
 * Updates the resources in the game.
 *
 * @param {object} mainLevel - The main level object containing level settings.
 */
export function updateResources(mainLevel) {
    const { resources } = gameElements;
    const { frame } = gameSettings;
  
    // Spawn new resources
    if (frame % 500 === 0 && mainLevel.score <= mainLevel.winningScore) {
      resources.push(new Resource(canvas.width));
    }
}

/**
 * Updates the game model.
 * @param {Object} mainLevel - The main level object.
 */
export function model(mainLevel) {
  // Call functions to update different aspects of the game model
  updateProjectiles();
  handleDefenders();
  updateFloatingMessages();
  updateSkeletonArcherShooting();
  updateEnemies(mainLevel);
  updateResources(mainLevel);
}