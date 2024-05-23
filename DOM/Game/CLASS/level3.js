/**
 * The LEVEL3 class represents the settings for level 3 of the game.
 * @class
 */
export class LEVEL3 {
    /**
     * Create a new instance of LEVEL3.
     */
    constructor() {
      this.enemiesInterval = 225; // The interval at which enemies appear
      this.winningScore = 400; // The score required to win the level
      this.jump = 8; // The jump height of the player
      this.boss = 3; // The number of boss enemies in the level
      this.count = 2; // The initial count of regular enemies
      this.score = 0; // The current score in the level
    }
}