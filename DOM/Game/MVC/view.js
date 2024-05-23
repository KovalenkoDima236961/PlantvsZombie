import { gameElements } from "./controller.js";
import { gameSettings } from "./controller.js";
import { ctx } from "./controller.js";
import { floatingMessage } from "../CLASS/floatingMessages.js";
import { collision } from "./controller.js";

/**
 * Draws the game grid by iterating through the gameElements.gameGrid array and calling the draw method on each Cell object.
 */
export function handleGameGrid() {
    for (let i = 0; i < gameElements.gameGrid.length; i++) {
        gameElements.gameGrid[i].draw(ctx);
    }
}
/**
* Draws the projectiles by iterating through the gameElements.projectiles array and calling the draw method on each projectile object.
*/
export function drawProjectiles() {
    for (let i = 0; i < gameElements.projectiles.length; i++) {
        gameElements.projectiles[i].draw(ctx);
    }
}
/**
* Draws the arrows by iterating through the gameElements.arrows array and calling the draw method on each arrow object.
*/
export function drawArrows() {
    for (let i = 0; i < gameElements.arrows.length; i++) {
        gameElements.arrows[i].draw(ctx);
    }
}
/**
 * Draws the defenders on the canvas.
 * Iterates through the gameElements.defenders array and calls the draw method for each defender.
 */
export function drawDefenders() {
    for (let i = 0; i < gameElements.defenders.length; i++) {
        const defender = gameElements.defenders[i];
        defender.draw(ctx);
    }
}
/**
 * Draws the defender cards on the canvas.
 * @param {Object[]} cards - An array of defender card objects.
 */
export function drawDefenderCards(cards) {
    ctx.lineWidth = 2;
  
    for (let i = 0; i < cards.length; i++) {
      const card = cards[i];
      const strokeColor = (gameSettings.chosenDefender === i + 1) ? 'gold' : 'black';
  
      ctx.fillStyle = 'rgba(0,0,0,0.2)';
      ctx.fillRect(card.x, card.y, card.width, card.height);
      ctx.drawImage(card.image, 0, 0, 125, 135, card.x + 10, 10, 125/2, 135/2);
      ctx.strokeStyle = strokeColor;
      ctx.strokeRect(card.x, card.y, card.width, card.height);
    }
}
export function drawFloatingMessages() {
    for (const message of gameElements.floatingMessages) {
        message.draw(ctx);
    }
}
export function drawEnemies() {
    const { enemies } = gameElements;
    // Iterate over enemies and draw them
    for (let enemy of enemies) {
      enemy.draw(ctx);
    }
}
/**
 * Draws the resources on the canvas and handles resource collection.
 */
import { mouse } from "./controller.js";
export function drawResources() {
    const { resources, floatingMessages } = gameElements;
  
    for (let i = resources.length - 1; i >= 0; i--) {
      const resource = resources[i];
      resource.draw(ctx);
  
      if (collision(resource, mouse)) {
        gameSettings.numberOfResources += resource.amount;
        floatingMessages.push(new floatingMessage('+' + resource.amount, resource.x, resource.y, 30));
        floatingMessages.push(new floatingMessage('+' + resource.amount, 470, 85, 30));
        resources.splice(i, 1);
      }
    }
}
/**
 * Handles the game status, including displaying score, resources, and game over/win messages.
 *
 * @param {object} mainLevel - The main level object containing level settings.
 */
export function handleGameStatus(mainLevel) {
    const { numberOfResources, gameOver } = gameSettings;
    const { enemies } = gameElements;
  
    // Display score and resource count
    ctx.fillStyle = 'gold';
    ctx.font = '30px Orbitron';
    ctx.fillText('Score: ' + mainLevel.score, 340, 40);
    ctx.fillText('Resources: ' + numberOfResources, 340, 80);
  
    // Display game over or level complete messages
    if (gameOver) {
      ctx.fillStyle = 'black';
      ctx.font = '90px Orbitron';
      ctx.fillText('GAME OVER', 135, 330);
      mainLevel.next = false;
    } else if (enemies.length === 0 && gameSettings.bossCount === mainLevel.count) {
      ctx.fillStyle = 'black';
      ctx.font = '60px Orbitron';
      ctx.fillText('LEVEL COMPLETE', 130, 300);
      ctx.font = '30px Orbitron';
      ctx.fillText('You win with ' + mainLevel.score + ' points!', 134, 340);
      mainLevel.next = true;
    }
}
/**
 * Renders the game view.
 * @param {Object} mainLevel - The main level object.
 */
export function view(mainLevel) {
    // Call functions to handle various aspects of the game view
    handleGameGrid();
    drawProjectiles();
    drawDefenders();
    drawArrows();
    drawFloatingMessages();
    drawEnemies();
    drawResources();
    handleGameStatus(mainLevel);
}