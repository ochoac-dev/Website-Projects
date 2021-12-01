/*
GAME FUNCTION: 
- Player must guess a number betweena min and a max
- Player gets a certain amount of guesses
-Notify player of guesses remaining
-Notify the player of the correct answer if loose
- Let player choose to play again
*/

// Game Values

let min = 1, 
    max = 10,
    winningNum = getRandomNum(min, max),
    guessesLeft = 3;


// UI Elements
const game = document.querySelector('#game'),
      minNum = document.querySelector('.min-num'),
      maxNum = document.querySelector('.max-num'),
      guessBtn = document.querySelector('#guess-btn'),
      guessInput = document.querySelector('#guess-input'),
      message = document.querySelector('.message');

// Assigned UI min and max

minNum.textContent = min;
maxNum.textContent = max;

    //Play again event listener
    game.addEventListener('mousedown' , function(e){
        if(e.target.className === 'play-again'){
            window.location.reload();
        }
    })

// Listen for guess

guessBtn.addEventListener('click' , function(){
    let guess =  parseInt(guessInput.value);

    //Validate
    if( isNaN(guess)  || guess < min || guess > max){

        setMessage(`Please enter a number between ${min} and ${max}` , 'red');

    }

    //Check if won
    if(guess === winningNum){
        //Gamve Over - won


        gameOver(true, `${winningNum} is correct, YOU WIN!` )

        // // Disable Input
        // guessInput.disabled = true;
        // // Change borger color
        // guessInput.style.borderColor = 'green';
        // // Set message
        // setMessage(`${winningNum} is correct, YOU WIN!` , 'green');


    }else {

        // Wrong Number
        guessesLeft -= 1;

        if(guessesLeft === 0){
            //Game Over - lost

            gameOver(false, `Game Over, you lost. The correct number was ${winningNum}`)

        // // Disable Input
        // guessInput.disabled = true;
        // // Change borger color
        // guessInput.style.borderColor = 'red';
        // // Set message
        // setMessage(`Game Over, you lost. The correct number was ${winningNum}` , 'red');

        }else {
            //Game continues - answer wrong 

             // Change borger color
            guessInput.style.borderColor = 'red';

            //Clear input
            guessInput.value = '';

            // Tell user its the wrong number
            setMessage(`${guess} is not correct, ${guessesLeft} guesses left`)
        }


    }

});

    //Game Over
    function gameOver(won, msg){

        let color;
        won === true ? color = 'green' : color = 'red';



            // Disable Input
            guessInput.disabled = true;
            // Change borger color
            guessInput.style.borderColor = color;
            // Set Text Color
            message.style.color = color;
            // Set message
            setMessage(msg);



            //Play Again?
            guessBtn.value = 'Play Again';
            guessBtn.className += 'play-again';


    }

    //Get Winning Number

        function getRandomNum(min, max){
           return Math.floor(Math.random()*(max - min +1)+min)
        }
     
    // Set Message
    function setMessage(msg, color ){
        message.style.color = color;
      //  guessInput.style.borderColor = color;
        message.textContent = msg;
    };