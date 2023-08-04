/**
 * @namespace Score
 * @author Feng Haoran
 * @version 2023.8
 * This module provides the scoring system for a Tetris Game.
 */
const Score = {};  //defined an empty object called Score

/**
 * The Score object contains information about the score of the game and the number of lines cleared.
 * @typedef {Object} Score.Score
 * @property {number} score - The score of the game
 * @property {number} lines_cleared - The number of lines cleared
 * @property {boolean} last_clear_was_tetris - Whether the last clear was a Tetris
 * @memberof Score
 */

/**
 * Returns a Score object for a new Tetris Game.
 * @function
 * @memberof Score
 * @returns {Score.Score} The new Score object.
 */
Score.new_score = function () {   //generate a new Score object
    return {  //return the property of the object
        score: 0, 
        lines_cleared: 0,
        last_clear_was_tetris: false,  
    };
};

/**
 * Returns the current level of the game based on the number of lines cleared.
 * Start at level 1, and advance a level every 10 lines cleared.
 * @function
 * @memberof Score
 * @param {Score.Score} score - The Score object
 * @returns {number} The current level
 */
Score.level = function (score) {
    return Math.floor(score.lines_cleared / 10) + 1;  //the level will advance 1 every 10 lines are cleared 
};

Score.cleared_lines = function(lines, score) { //used to update scoring object
    let points;
    switch (lines) {
        case 1:
            points = 100 * Score.level(score);
            break;
        case 2:
            points = 300 * Score.level(score);
            break;
        case 3:
            points = 500 * Score.level(score);
            break;
        case 4:
            points = (score.last_clear_was_tetris ? 1200 : 800) * Score.level(score);
            break;
        default:
            points = 0;
            break;
    }
    return { //return a new object with updated properties
        ...score,
        score: score.score + points,
        lines_cleared: score.lines_cleared + lines,
        last_clear_was_tetris: lines === 4,
    };
};

Score.add_points = function(points, score) {
    return {
        ...score,
        score: score.score + points
    };
};

export default Object.freeze(Score); //freeze
