/**
 * The LEVEL2 class represents the settings for level 2 of the game.
 * @class 
*/
export class LEVEL2 {
    /**
     * Create a new instance of LEVEL2.
     */
    constructor() {
      this.enemiesInterval = 200; // The interval at which enemies appear
      this.winningScore = 360; // The score required to win the level
      this.jump = 6; // The jump height of the player
      this.boss = 2; // The number of boss enemies in the level
      this.count = 1; // The initial count of regular enemies
      this.score = 0; // The current score in the level
    }
}