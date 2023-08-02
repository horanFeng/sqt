/**
 * @namespace Score
 * @author A. Freddie Page
 * @version 2022.23
 * This module provides the scoring system for a Tetris Game.
 */
const Score = {};

/**
 * The score object contains information about the score of the game and the number of lines cleared.
 * @typedef {Object} Score
 * @property {number} score - The score of the game
 * @property {number} lines_cleared - The number of lines cleared
 * @memberof Score
 */

/**
 * Returns a score object for a new Tetris Game.
 * @function
 * @memberof Score
 * @returns {Score.Score} The new score object.
 */
Score.new_score = function () {
    return {
        score: 0,
        lines_cleared: 0,
        last_clear_was_tetris: false,  // add this line
    };
};


/**
 * Returns the current level of the game based on the number of lines cleared.
 * You start at level 1, and advance a level every 10 lines cleared.
 * @function
 * @memberof Score
 * @param {Score.Score} score - The score object
 * @returns {number} The current level
 */
Score.level = function (score) {
    return Math.floor(score.lines_cleared / 10) + 1;
};


Score.cleared_lines = function(lines, score) {
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
    return {
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



export default Object.freeze(Score);
