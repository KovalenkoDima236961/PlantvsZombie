import { floatingMessage } from "../CLASS/floatingMessages.js";
/**
 * The game canvas element.
 * @type {HTMLCanvasElement}
 */
const canvas = document.getElementById('canvas1');

/**
 * The 2D rendering context of the canvas.
 * @type {CanvasRenderingContext2D}
 */
const ctx = canvas.getContext('2d');
export {ctx};

// Set the width and height of the canvas
canvas.width = 900;
canvas.height = 600;
export {canvas}

/**
 * The game settings.
 * @type {Object}
 * @property {number} cellSize - The size of each cell in the game grid.
 * @property {number} cellGap - The gap between cells.
 * @property {number} numberOfResources - The initial number of resources available in the game.
 * @property {number} frame - The current frame count of the game.
 * @property {boolean} gameOver - Indicates whether the game is over or not.
 * @property {number} chosenDefender - The index of the currently chosen defender.
 * @property {number} bossCount - The number of boss enemies in the game.
 * @property {number} count1234 - A custom count variable.
 */
export const gameSettings = {
    cellSize: 100,
    cellGap: 3,
    numberOfResources: 400,
    frame: 0,
    gameOver: false,
    chosenDefender: 1,
    bossCount: 0,
    count1234: 0,
};

/**
 * The game elements.
 * @type {Object}
 * @property {Array} gameGrid - An array representing the game grid and holding Cell objects.
 * @property {Array} defenders - An array holding the defender objects.
 * @property {Array} enemies - An array holding the enemy objects.
 * @property {Array} enemyPositions - An array holding the enemy positions.
 * @property {Array} projectiles - An array holding the projectile objects.
 * @property {Array} resources - An array holding the resource objects.
 * @property {Array} floatingMessages - An array holding the floating message objects.
 * @property {Array} arrows - An array holding the arrow objects.
 */
export const gameElements = {
    gameGrid: [],
    defenders: [],
    enemies: [],
    enemyPositions: [],
    projectiles: [],
    resources: [],
    floatingMessages: [],
    arrows: [],
};

/**
 * The image for defender 1.
 * @type {HTMLImageElement}
 * @name defender1
 */
const defender1 = new Image();
defender1.src = "./DOM/Game/PHOTO/Shot_1.png";
//'./PHOTO/Shot_1.png';
export { defender1 };


/**
 * The image for defender2.
 * @type {HTMLImageElement}
 * @name defender2
 */
const defender2 = new Image();
defender2.src = './DOM/Game/PHOTO/shitovuk.png';

/**
 * The image for defender3.
 * @type {HTMLImageElement}
 * @name defender3
 */
const defender3 = new Image();
defender3.src = './DOM/Game/PHOTO/Attack_2.png';

export { defender2, defender3 };



// Define and export other defender images (defender2, defender3, etc.) in a similar way

/**
 * The image for the mine.
 * @type {HTMLImageElement}
 * @name mine
 */
const mine = new Image();
mine.src = './DOM/Game/PHOTO/mines_PNG20.png';
export { mine };

// Define and export other enemy images (enemy1, enemy2, etc.) in a similar way

/**
 * The image for enemy1.
 * @type {HTMLImageElement}
 * @name enemy1
 */
const enemy1 = new Image();
enemy1.src = './DOM/Game/PHOTO/Run.png';
const enemy1Dead= new Image();
enemy1Dead.src = './DOM/Game/PHOTO/DeadNormal.png';

/**
 * The image for enemy2.
 * @type {HTMLImageElement}
 * @name enemy2
 */
const enemy2 = new Image();
enemy2.src = './DOM/Game/PHOTO/Walk.png';
const enemy2Dead = new Image();
enemy2Dead.src = './DOM/Game/PHOTO/DeadJump.png';

export { enemy1, enemy2, enemy2Dead, enemy1Dead };



/**
 * The image for the bosses.
 * @type {HTMLImageElement}
 */
const bosses = new Image();
bosses.src = './DOM/Game/PHOTO/Boss.png';
const bossDead = new Image();
bossDead.src = './DOM/Game/PHOTO/DeadBoss.png';
export { bosses, bossDead };

/**
 * The image for the skeleton archer type.
 * @type {HTMLImageElement}
 */
const skeletonArcherType = new Image();
skeletonArcherType.src = './DOM/Game/PHOTO/Skelet.png';
const skeletonDeath = new Image();
skeletonDeath.src = './DOM/Game/PHOTO/DeadSkelet.png';
export { skeletonArcherType, skeletonDeath };

/**
 * The image for the arrow.
 * @type {HTMLImageElement}
 */
const arrowImage = new Image();
arrowImage.src = './DOM/Game/PHOTO/arrow.png';
export { arrowImage };

/**
 * Mouse object to track mouse position and click state.
 * @property {number} x - The x-coordinate of the mouse.
 * @property {number} y - The y-coordinate of the mouse.
 * @property {number} width - The width of the mouse.
 * @property {number} height - The height of the mouse.
 * @property {boolean} clicked - Indicates whether the mouse is clicked or not.
 */
export const mouse = {
  x: 10,
  y: 10,
  width: 0.1,
  height: 0.1,
  clicked: false
};

/**
* Event listener for mouse down event.
* Sets the `clicked` property of the `mouse` object to `true`.
*/
canvas.addEventListener('mousedown', function() {
  mouse.clicked = true;
});

/**
* Event listener for mouse up event.
* Sets the `clicked` property of the `mouse` object to `false`.
*/
canvas.addEventListener('mouseup', function() {
  mouse.clicked = false;
});

/**
* Calculates the canvas position relative to the viewport.
*/
let canvasPosition = canvas.getBoundingClientRect();

/**
* Event listener for mouse move event.
* Updates the `x` and `y` properties of the `mouse` object based on the mouse position relative to the canvas.
* @param {MouseEvent} e - The mouse move event object.
*/
canvas.addEventListener('mousemove', function(e) {
  mouse.x = e.x - canvasPosition.left;
  mouse.y = e.y - canvasPosition.top;
});

/**
* Event listener for mouse leave event.
* Resets the `x` and `y` properties of the `mouse` object to `undefined`.
*/
canvas.addEventListener('mouseleave', function() {
  mouse.y = undefined;
  mouse.y = undefined;
});

/**
 * The controls bar object representing the game board.
 * @property {number} width - The width of the controls bar, taken from the canvas width.
 * @property {number} height - The height of the controls bar, based on the gameSettings cellSize.
 */
export const controlsBar = {
  width: canvas.width,
  height: gameSettings.cellSize,
};
/**
 * Represents the coordinates and dimensions of the defender card 1.
 */
export const card1 = {
  x: 10,
  y: 10,
  width: 70,
  height: 85
};
/**
* Represents the coordinates and dimensions of the defender card 2.
*/
export const card2 = {
  x: 90,
  y: 10,
  width: 70,
  height: 85
};

/**
* Represents the coordinates and dimensions of the defender card 3.
*/
export const card3 = {
  x: 170,
  y: 10,
  width: 70,
  height: 85
};

/**
* Represents the coordinates and dimensions of the defender card 4.
*/
export const card4 = {
  x: 250,
  y: 10,
  width: 75,
  height: 85
};
import { drawDefenderCards } from "./view.js";
import { updateDefenderCards } from "./model.js";
/**
 * Allows the player to choose a defender by interacting with the defender cards.
 */
function chooseDefender() {
  const cards = [
    {x: card1.x, y: card1.y, width: card1.width, height: card1.height, image: defender1},
    {x: card2.x, y: card2.y, width: card2.width, height: card2.height, image: defender2},
    {x: card3.x, y: card3.y, width: card3.width, height: card3.height, image: defender3},
    {x: card4.x, y: card4.y, width: card4.width, height: card4.height, image: mine}
  ];
  /**
   * Draws the defender cards on the canvas.
   * @param {Object[]} cards - An array of defender card objects.
   */
  drawDefenderCards(cards);

  /**
   * Updates the selected defender card based on mouse interaction.
   * @param {Object} mouse - The mouse object containing its current state.
   * @param {Object[]} cards - An array of defender card objects.
   */
  updateDefenderCards(mouse, cards);
}
const amounts = [30, 40, 50];
export  { amounts };
// utilities
import { ShootingDefender } from "../CLASS/defender.js";
import { NonShootingDefender } from "../CLASS/defender.js";
import { MeleeDefender } from "../CLASS/defender.js";
import { Mine } from "../CLASS/defender.js";
/**
 * Gets the cost of the currently chosen defender.
 *
 * @returns {number} - The cost of the chosen defender.
 */
const getDefenderCost = () => {
  if (gameSettings.chosenDefender === 1) {
    return new ShootingDefender().cost;
  } else if (gameSettings.chosenDefender === 2) {
    return new NonShootingDefender().cost;
  } else if (gameSettings.chosenDefender === 3) {
    return new MeleeDefender().cost;
  } else if (gameSettings.chosenDefender === 4) {
    return new Mine().cost;
  }
};
/**
 * Creates a new defender based on the currently chosen defender.
 *
 * @param {number} gridPositionX - The x-coordinate of the grid position for the defender.
 * @param {number} gridPositionY - The y-coordinate of the grid position for the defender.
 * @returns {object} - The newly created defender object.
 */
const createDefender = (gridPositionX, gridPositionY) => {
  if (gameSettings.chosenDefender === 1) {
    return new ShootingDefender(gridPositionX, gridPositionY);
  } else if (gameSettings.chosenDefender === 2) {
    return new NonShootingDefender(gridPositionX, gridPositionY);
  } else if (gameSettings.chosenDefender === 3) {
    return new MeleeDefender(gridPositionX, gridPositionY);
  } else if (gameSettings.chosenDefender === 4) {
    return new Mine(gridPositionX, gridPositionY);
  }
};

/**
 * Event listener for the canvas click event.
 * Handles the placement of defenders on the grid based on the clicked position.
 */
canvas.addEventListener('click', function () {
  const gridPositionX = mouse.x - (mouse.x % gameSettings.cellSize) + gameSettings.cellGap;
  const gridPositionY = mouse.y - (mouse.y % gameSettings.cellSize) + gameSettings.cellGap;
  
  // Check if the clicked cell contains an enemy
  for (let i = 0; i < gameElements.enemies.length; i++) {
    if (gameElements.enemies[i].x === gridPositionX && gameElements.enemies[i].y === gridPositionY) {
      return;
    }
  }
  
  // Check if the clicked cell already contains a defender
  for (let i = 0; i < gameElements.defenders.length; i++) {
    if (gameElements.defenders[i].x === gridPositionX && gameElements.defenders[i].y === gridPositionY) {
      return;
    }
  }
  
  // Check if the clicked cell is in the top row (avoid placing defenders in the UI area)
  if (gridPositionY < gameSettings.cellSize) return;
  
  const defenderCost = getDefenderCost();
  
  // Check if the player has enough resources to place the defender
  if (gameSettings.numberOfResources >= defenderCost) {
    gameElements.defenders.push(createDefender(gridPositionX, gridPositionY, ctx));
    gameSettings.numberOfResources -= defenderCost;
  } else {
    gameElements.floatingMessages.push(new floatingMessage('need more resources', mouse.x, mouse.y, 25));
  }
});
import { gameRunning } from "../../DOM.js";
let backgroundImage = new Image();
/**
 * Sets the background image and updates the score display based on the current level.
 * @param {Object} mainLevel - The main level object.
 */
function back(mainLevel) {
  // Set the background image and update the score display based on the current level
  if (mainLevel.boss === 1) {
    backgroundImage.src = './DOM/Game/PHOTO/backfreee_space2.png';
    let scoreLevel1 = document.getElementById('first-level');
    scoreLevel1.innerHTML = mainLevel.score;
  } else if (mainLevel.boss === 2) {
    backgroundImage.src = './DOM/Game/PHOTO/game_background_3.1.png';
    let scoreLevel2 = document.getElementById('2-level');
    scoreLevel2.innerHTML = mainLevel.score;
  } else if (mainLevel.boss === 3) {
    backgroundImage.src = './DOM/Game/PHOTO/back3.png';
    let scoreLevel3 = document.getElementById('3-level');
    scoreLevel3.innerHTML = mainLevel.score;
  }
}


/**
 * Clears the canvas, draws a background image, and fills a blue rectangle.
 */
function clear() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
  ctx.fillStyle = 'blue';
  ctx.fillRect(0, 0, controlsBar.width, controlsBar.height);
}
import { model } from "./model.js";
import { view } from "./view.js";
/**
 * The main animation loop that updates and renders the game.
 * @param {object} mainLevel - The current level object containing level-specific information.
 */
export function animate(mainLevel) {
  back(mainLevel);
  // Clear the canvas and draw the background
  clear();
  // Update models
  model(mainLevel);
  // Draw the game elements
  view(mainLevel);
  chooseDefender();
  // Increment the frame count
  gameSettings.frame++;
  if (gameSettings.gameOver || !gameRunning) {
    // The game is over or not running, clear the canvas and return
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    return;
  }

  if (!gameSettings.gameOver) {
    // Continue the animation loop by recursively calling animate
    requestAnimationFrame(() => animate(mainLevel));
  }
}






//animate(observer,numb);
/**
 * Checks for collision between two objects based on their positions and dimensions.
 * @param {object} first - The first object to check for collision.
 * @param {object} second - The second object to check for collision.
 * @returns {boolean} - True if a collision is detected, false otherwise.
 */
export function collision(first, second) {
  if (
    !(
      first.x > second.x + second.width ||
      first.x + first.width < second.x ||
      first.y > second.y + second.height ||
      first.y + first.height < second.y
    )
  ) {
    return true;
  }
  return false;
}

/**
 * Event listener for the 'resize' event.
 * Updates the canvas position when the window is resized.
 */
window.addEventListener('resize', function () {
  canvasPosition = canvas.getBoundingClientRect();
});