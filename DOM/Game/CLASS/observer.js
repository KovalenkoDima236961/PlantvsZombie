/**
 * The Observer class is responsible for managing observers in the game.
 * @class
 */
export class Observer {
  /**
   * Create a new instance of Observer.
   */
  constructor() {
    this.observers = [];
  }

  /**
   * Add an observer to the list of observers.
   * @param {Object} observer - The observer object to be added.
   */
  addObserver(observer) {
    this.observers.push(observer);
  }

  /**
   * Remove a specific level observer from the list of observers.
   * @param {number} level - The index of the level observer to be removed.
   * @returns {Object} - The removed level observer.
   */
  removeLevel(level) {
    return this.observers[level];
  }
}