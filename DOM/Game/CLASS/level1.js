/**
 * The LEVEL1 class represents the settings for level 1 of the game.
 * @class
 */
export class LEVEL1 {
    /**
     * Create a new instance of LEVEL1.
     */
    constructor() {
      this.enemiesInterval = 180; // The interval at which enemies appear
      this.winningScore = 300; // The score required to win the level
      this.jump = 4; // The jump height of the player
      this.boss = 1; // The number of boss enemies in the level
      this.count = 1; // The initial count of regular enemies
      this.score = 0; // The current score in the level
    }
}