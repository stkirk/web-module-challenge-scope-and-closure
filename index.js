// ⭐️ Example Challenge START ⭐️

/**Example Task : processFirstItem()
 * This example shows how you might go about solving the rest of the tasks
 *
 * Use the higher order function processFirstItem below to do the following:
 *  1. Receive an array of strings in a parameter
 *  2. Receive a callback function that takes a string as its argument in a parameter
 *  3. Return the result of invoking the callback function and passing in the FIRST
 *     element in the array as the argument
 *
 * The following code is demonstrating a way of completing this task
 * It returns the string `foofoo`
 */

function processFirstItem(stringList, callback) {
  return callback(stringList[0]); //returns an invoked function with the first word in the array from parameter 1 passed in
}
console.log(
  processFirstItem(["foo", "bar"], function (str) {
    return str + str; //runs the higher order function which starts with the passed in callback, the callback looks outside for str, it sees that the higher order function has passed that in with a value of stringlist[0], stringlist is the first parameter in the higher order function and its index 0 value is 'foo'. foo then takes the place of str in the callback which then returns 'foo' + 'foo'
  })
);

// ⭐️ Example Challenge END ⭐️

///// M V P ///////

/*Task 1: counterMaker()
  
  Study the code for counter1 and counter2, then answer the questions below.
  
  1. What is the difference between counter1 and counter2?

    - counter1 nests a function within a function and its purpose is to return the inner function. Also, the variable, count, being updated by the child function is locally scoped to counterMaker itself and not globally availible. counter2 is a solo function that when invoked just updates the value of the global variable count.

  2. Which of the two uses a closure? How can you tell?

    - counter2 uses a closure, it looks outside of its scope for the value of count
    - counter1 also uses a closure when the child function reaches into its parent function's scope for the value of count.

  3. In what scenario would the counter1 code be preferable? In what scenario would 
     counter2 be better?  

     -counter1 would be preferrable where the value of count should only be updated within the scope of counter1. counter 2 would be better is the value of count needed to be accessed by functions other than counter2.
*/

// counter1 code
function counterMaker() {
  let count = 0;
  return function counter() {
    return count++;
  };
}

const counter1 = counterMaker(); //why does invoking counter1() return a number when invoking counterMaker() just returns the child function itself?

// counter2 code
let count = 0;

function counter2() {
  return count++;
}

/* ⚾️⚾️⚾️ Task 2: inning() ⚾️⚾️⚾️
Use the inning function below to do the following:
  1. Return a random whole number of points between 0 and 2 scored by one team in an inning
  
  For example: invoking inning() should return a numerical score value of 0, 1, or 2
  
NOTE: This will be a callback function for the tasks below
*/

function inning() {
  return Math.floor(Math.random() * 3);
}
console.log(inning());

/* ⚾️⚾️⚾️ Task 3: finalScore() ⚾️⚾️⚾️
Use the finalScore function below to do the following:
  1. Receive the callback function `inning` that was created in Task 2 
  2. Receive a number of innings to be played
  3. After each inning, update the score of the home and away teams
  4. After the last inning, return an object containing the final (total) score of the innings played
  
  For example: invoking finalScore(inning, 9) might return this object:
{
  "Home": 11,
  "Away": 5
}
*/

function finalScore(callback, num) {
  let homeScore = 0;
  let awayScore = 0;
  for (let i = 0; i < num; i++) {
    homeScore = homeScore + callback();
    awayScore = awayScore + callback();
  }
  return {
    Home: homeScore,
    Away: awayScore,
  };
}

console.log(finalScore(inning, 9));

/* ⚾️⚾️⚾️ Task 4: getInningScore() ⚾️⚾️⚾️
Use the getInningScore() function below to do the following:
  1. Receive a callback function - you will pass in the inning function from task 2 as your argument 
  2. Return an object with a score for home and a score for away that populates from invoking the inning callback function */

function getInningScore(inningCB) {
  return {
    Home: inningCB(),
    Away: inningCB(),
  };
}
console.log(getInningScore(inning));

/* ⚾️⚾️⚾️ Task 5: scoreboard() ⚾️⚾️⚾️
Use the scoreboard function below to do the following:
  1. Receive the callback function `getInningScore` from Task 4
  2. Receive the callback function `inning` from Task 2
  3. Receive a number of innings to be played
  4. Return an array where each of it's index values equals a string stating the
  Home and Away team's scores for each inning.  Not the cummulative score.
  5. If there's a tie at the end of the innings, add this message containing the score to the end of the array:  "This game will require extra innings: Away 12 - Home 12"  (see tie example below)
     If there isn't a tie, add this message to the end of the array: "Final Score: Away 13 - Home 11"  (see no tie example below)
  
  NO TIE example: invoking scoreboard(getInningScore,inning, 9) might return 
  an array of strings like this:
[
  "Inning 1: Away 1 - Home 2", 
  "Inning 2: Away 2 - Home 1",
  "Inning 3: Away 0 - Home 2", 
  "Inning 4: Away 2 - Home 2", 
  "Inning 5: Away 2 - Home 0", 
  "Inning 6: Away 1 - Home 1", 
  "Inning 7: Away 0 - Home 2", 
  "Inning 8: Away 2 - Home 2",
  "Inning 9: Away 1 - Home 0", 
  "Final Score: Away 11 - Home 12"  
]

  TIE example: invoking scoreboard(getInningScore,inning, 9) might return 
  an array of strings like this:
[
  "Inning 1: Away 1 - Home 1", 
  "Inning 2: Away 2 - Home 2",
  "Inning 3: Away 1 - Home 0", 
  "Inning 4: Away 1 - Home 2", 
  "Inning 5: Away 0 - Home 0", 
  "Inning 6: Away 2 - Home 1", 
  "Inning 7: Away 0 - Home 2", 
  "Inning 8: Away 2 - Home 1",
  "Inning 9: Away 1 - Home 1", 
  "This game will require extra innings: Away 10 - Home 10"
]  
  */

function scoreboard(inningScoreCB, inningCB, num) {
  const boxScore = [];
  let homeScore = 0; //counter for total home team score
  let awayScore = 0; //counter for total away team score
  for (let i = 0; i < num; i++) {
    const currentScore = inningScoreCB(inningCB); //each time loop runs the functions passed in generate a random object containing the home and away scores for one inning called currentScore
    homeScore = homeScore + currentScore.Home; //each loop adds the current score from that inning
    awayScore = awayScore + currentScore.Away; //to the total home and away score counters outside of the loop, the scores for that loop's inning are currentScore.Home and currentScore.Away
    boxScore.push(
      `Inning ${i + 1}: Away ${currentScore.Away} - Home ${currentScore.Home}`
    ); //Away and Home currentscores are pushed in a string to the boxScore array num times
  }
  if (homeScore === awayScore) {
    boxScore.push(
      `This game will require extra innings: Away ${awayScore} - Home ${homeScore}`
    );
  } else {
    boxScore.push(`Final Score: Away ${awayScore} - Home ${homeScore}`);
  } //outside the loop, one more push is made to boxScore depending on if the game is tied or not, we use the homeScore and awayScore counters from outside the loop to add all the looped innings and give us a final total
  return boxScore;
}
console.log(scoreboard(getInningScore, inning, 9));

/* 🛑🛑🛑🛑🛑 Please do not modify anything below this line 🛑🛑🛑🛑🛑 */
function foo() {
  //console.log('its working');
  return "bar";
}
export default {
  foo,
  processFirstItem,
  counter1,
  counter2,
  inning,
  finalScore,
  getInningScore,
  scoreboard,
};
