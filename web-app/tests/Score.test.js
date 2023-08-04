import Tetris from "../Tetris.js";
import Score from "../Score.js";
import R from "../ramda.js";


const example_game = Tetris.new_game();
const field_string = `----------
----------
----------
----------
----------
----------
----------
----------
----------
----------
----------
----------
----------
----------
----------
----------
-S--------
SSS-------
SSSZ-IOOJJ
TSZZ-IOOJJ
TTZL-IOOJJ
TLLL-IOOJJ`;
example_game.field = field_string.split("\n").map(
    (s) => s.replace(/-/g, " ").split("")
);

describe("Score", function () {
    it(
        `A new tetris game
        * Starts on level one
        * With no lines cleared
        * With a score of zero`,
        function () {
            const new_game = Tetris.new_game();
            const score = new_game.score;
            if (Score.level(score) !== 1) {
                throw new Error("New games should start on level one");
            }
            if (score.lines_cleared !== 0) {
                throw new Error("New games should have no lines cleared");
            }
            if (score.score !== 0) {
                throw new Error("New games should have a zero score");
            }
        }
    );

    it('The score tracks the lines that get cleared', function () {
        let game = Tetris.new_game();
    
        // Manually set the game field to be filled except for the last column
        game.field = game.field.map(row => row.fill(Tetris.I_tetromino));
        game.field[game.field.length - 1] = game.field[game.field.length - 1].map((cell, index) => index === game.field[0].length - 1 ? Tetris.empty_block : Tetris.I_tetromino);
        
        // Manually set the current tetromino and its position
        game.current_tetromino = Tetris.I_tetromino;
        game.position = [game.field[0].length - 1, game.field.length - 4];
    
        // Record the score before the hard drop
        let oldScore = game.score.score; 
    
        // Hard drop
        game = Tetris.hard_drop(game);
        
        // Calculate the score from cleared lines
        let cleared_lines_count = game.field.filter(line => line.every(block => block === Tetris.empty_block)).length;
        const expectedScore = Score.cleared_lines(cleared_lines_count, game.score);
    
        // Get the actual score increase after the hard drop
        let actualScoreIncrease = game.score.score - oldScore;
        
        if (actualScoreIncrease !== expectedScore.score) {
            throw new Error(`Expected score to be ${expectedScore.score}, but got ${actualScoreIncrease}`);
        }
    });
    
     it('A single line clear scores 100 x level', function () {
        let game = Tetris.new_game();   //generate a new game(no blocks in game field)
        game.score.lines_cleared = 10;  //already cleared 10 lines
        let field_str = `----------
----------
----------
----------
----------
----------
----------
----------
----------
----------
----------
----------
----------
----------
----------
----------
----------
----------
----------
----------
-T------T-
TTT----TTT`;  //set a game field
        game.field = field_str.split("\n").map(  //change to 2d array
            (s) => s.replace(/-/g, " ").split("")
        );
        game.current_tetromino = Tetris.I_tetromino; //define next Tetromino, which is I
        R.range(0, 23).forEach(function () {  //drop for 23 times to touch the bottom
            game = Tetris.next_turn(game); //update the state of the game
        });
        const expectedScore = 100*2; //the correct score we should get (level 2)
        const actualScore = game.score.score; //check the actual score we get
        if (actualScore !== expectedScore) {
            throw new Error(`Expected score to be ${expectedScore}, but got ${actualScore}`);
        }
    });
          

    it('Clearing two lines scores 300 x level', function () {
        let game = Tetris.new_game();   //generate a new game(no blocks in game field)
        game.score.lines_cleared = 10;  //already cleared 10 lines
        let field_str = `----------
----------
----------
----------
----------
----------
----------
----------
----------
----------
----------
----------
----------
----------
----------
----------
----------
----------
----------
----------
OOOO--OOOO
OOOO--OOOO`;  //set a game field
        game.field = field_str.split("\n").map(  //change to 2d array
            (s) => s.replace(/-/g, " ").split("")
        );
        game.current_tetromino = Tetris.O_tetromino; //define next Tetromino, which is O
        R.range(0, 23).forEach(function () {  //drop for 23 times to touch the bottom
            game = Tetris.next_turn(game); //update the state of the game
        });
        const expectedScore = 300*2; //the correct score we should get (level 2)
        const actualScore = game.score.score; //check the actual score we get
        if (actualScore !== expectedScore) {
            throw new Error(`Expected score to be ${expectedScore}, but got ${actualScore}`);
        }
    });
    

    // Assuming you have an implemented method for checking if a Tetris has been performed
    it('Clearing three lines scores 500 x level', function () {
        let game = Tetris.new_game();   //generate a new game(no blocks in game field)
        game.score.lines_cleared = 10;  //already cleared 10 lines
        let field_str = `----------
----------
----------
----------
----------
----------
----------
----------
----------
----------
----------
----------
----------
----------
----------
----------
----------
----------
-T------T-
TTT----TTT
OOOOOOOOOO
OOOOOOOOOO`;  //set a game field
        game.field = field_str.split("\n").map(  //change to 2d array
            (s) => s.replace(/-/g, " ").split("")
        );
        game.current_tetromino = Tetris.I_tetromino; //define next Tetromino, which is I
        R.range(0, 23).forEach(function () {  //drop for 23 times to touch the bottom
            game = Tetris.next_turn(game); //update the state of the game
        });
        const expectedScore = 500*2; //the correct score we should get (level 2)
        const actualScore = game.score.score; //check the actual score we get
        if (actualScore !== expectedScore) {
            throw new Error(`Expected score to be ${expectedScore}, but got ${actualScore}`);
        }
    });
    
    it('A tetris scores 800 x level', function () {
        let game = Tetris.new_game();   //generate a new game(no blocks in game field)
        game.score.lines_cleared = 10;  //already cleared 10 lines
        let field_str = `----------
----------
----------
----------
----------
----------
----------
----------
----------
----------
----------
----------
----------
----------
----------
----------
----------
----------
OOOO--OOOO
OOOO--OOOO
OOOOOOOOOO
OOOOOOOOOO`;  //set a game field
        game.field = field_str.split("\n").map(  //change to 2d array
            (s) => s.replace(/-/g, " ").split("")
        );
        game.current_tetromino = Tetris.O_tetromino; //define next Tetromino, which is O
        R.range(0, 23).forEach(function () {  //drop for 23 times to touch the bottom
            game = Tetris.next_turn(game); //update the state of the game
        });
        const expectedScore = 800*2; //the correct score we should get (level 2)
        const actualScore = game.score.score; //check the actual score we get
        if (actualScore !== expectedScore) {
            throw new Error(`Expected score to be ${expectedScore}, but got ${actualScore}`);
        }
    });


    // Assuming you have a method for checking back-to-back tetrises
    it('Back to back tetrises score 1200 x level', function () {
        let game = Tetris.new_game();   //generate a new game(no blocks in game field)
        game.score.lines_cleared = 10;  //already cleared 10 lines
        let field_str = `----------
----------
----------
----------
----------
----------
----------
----------
----------
----------
----------
----------
--------T-
I-JJJ-ZTT-
IIOOJZZST-
IIOOZZTSS-
IILZZTTSS-
TILZOOTSS-
TTLLOOJJS-
TZJLLLJOO-
ZZJLSSJOO-
ZJJSSIIII-`;  //set a game field
        game.field = field_str.split("\n").map(  //change to 2d array
            (s) => s.replace(/-/g, " ").split("")
        );
        game.current_tetromino = Tetris.I_tetromino; //define next Tetromino, which is I
        game = Tetris.rotate_ccw(game);
        game = Tetris.right(game);
        game = Tetris.right(game);
        game = Tetris.right(game);
        game = Tetris.right(game);
        game = Tetris.right(game);
        R.range(0, 23).forEach(function () {  //drop for 23 times to touch the bottom
            game = Tetris.next_turn(game); //update the state of the game
        });

        game.current_tetromino = Tetris.I_tetromino; //define next Tetromino, which is I
        game = Tetris.rotate_ccw(game);
        game = Tetris.right(game);
        game = Tetris.right(game);
        game = Tetris.right(game);
        game = Tetris.right(game);
        game = Tetris.right(game);
        R.range(0, 23).forEach(function () {  //drop for 23 times to touch the bottom
            game = Tetris.next_turn(game); //update the state of the game
        });
    console.log(game.field.map(row => row.join('')).join('\n'));
        const expectedScore = 1200*2+800*2; //the correct score we should get (level 2)
        const actualScore = game.score.score; //check the actual score we get
        if (actualScore !== expectedScore) {
            throw new Error(`Expected score to be ${expectedScore}, but got ${actualScore}`);
        }
    });

        
    
    it('A soft drop scores 1 point per cell descended', function () {
        let game = example_game;
        game.current_tetromino = Tetris.T_tetromino;
        
        let oldScore = game.score.score;
        // Keep doing soft drop until piece is fully descended
        let newGame = game;
        do {
            let previousPosition = newGame.position.slice();
            newGame = Tetris.soft_drop(newGame);

            if (newGame.position[1] > previousPosition[1]) {
                oldScore += 1;
                if (newGame.score.score !== oldScore) {
                    throw new Error("A soft drop should score 1 point per cell descended");
                }
            }
        } while (!newGame.softDropEnd);  // Continue while the tetromino can still descend
    });

it(
    `A hard drop scores 2 points per cell descended`,
    function () {
        let game = example_game;
        game.current_tetromino = Tetris.T_tetromino;

        let oldScore = game.score.score;

        // Do a hard drop
        let newGame = Tetris.hard_drop(game);

        // Using newGame.dropCount instead of game.dropCount
        let expectedScore = oldScore + 2 * newGame.dropCount;  

        if (newGame.score.score !== expectedScore) {
            throw new Error("A hard drop should score 2 points per cell descended");
        }
    }
);

it(
    `Advancing the turn without manually dropping scores nothing.`,
    function () {
        let game = example_game;
        // Get the old score before advancing the turn.
        const oldScore = game.score.score;
        // Advance the turn.
        game = Tetris.next_turn(game);
        // Now, the score should still be the same as it was before.
        if (game.score.score !== oldScore) {
            throw new Error("Advancing the turn without manually dropping should not affect the score");
        }
    }
);
});