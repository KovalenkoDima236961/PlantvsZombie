import { createGrid } from "./MVC/model.js";
import { animate } from "./MVC/controller.js";
import { Observer } from "./CLASS/observer.js";
import { gameElements } from "./MVC/controller.js";
import { gameSettings } from "./MVC/controller.js";
/**
 * Clear the game elements and reset the game settings.
 * @function
 */
export function clearGameElements() {
    // Reset game settings
    gameSettings.frame = 0;
    gameSettings.gameOver = false;
    gameSettings.chosenDefender = 0;
    gameSettings.numberOfResources = 400;
    gameSettings.bossCount = 0;
    gameSettings.count1234 = 0;
  
    // Clear game elements
    gameElements.gameGrid = [];
    gameElements.defenders = [];
    gameElements.enemies = [];
    gameElements.enemyPositions = [];
    gameElements.projectiles = [];
    gameElements.resources = [];
    gameElements.floatingMessages = [];
    gameElements.arrows = [];
  } 
  /**
   * Stop the game.
   * @function
   */
  export function stopGame() {
    return 0;
    // gameRunning = 0;
  }
  
  /**
   * Restart the game by clearing the game elements and animating the specified level.
   * @function
   * @param {Observer} observer - The observer object.
   * @param {number} numb - The number of the level to restart.
   */
  export function restartGame(observer, numb) {
    // Clear the game state
    clearGameElements();
    const level = observer.removeLevel(numb);
    if(level.boss === 1){
      level.enemiesInterval = 200;
      level.winningScore = 300;
      level.score = 0;
    }else if(level.boss === 2){
      level.enemiesInterval = 225;
      level.winningScore = 360;
      level.score = 0;
    }else {
      level.enemiesInterval = 250;
      level.winningScore = 350;
      level.score = 0;
    }
    createGrid();
    // animateLevel(observer, numb);
    animate(level);
  }
  