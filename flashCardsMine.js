var inquirer = require ('inquirer');
var fs = require ('fs');
var basicQuestions= require("./test.js");
var flashCardsArray = [];
 var askQuestionCounter = 0;
 var flashScore = 0;

// made a constructer for flashcards
function BasicFlashCards(front, back){
    this.front = front;
    this.back = back;
}

function fillInTheBlank(front, back){
  
        var missingWord = front.replace(back,"____")
        console.log(missingWord)
        return {
            front: missingWord,
            back: back
        }
            
}







    //______________________________________________________WHERE IM WORKING_____________________________________________________________
   
    
//gathers questions together.
var askQuestions = function() {
    console.log("questions input")
    //make a counter each time askQuestions is called add 1 to it     
       
     
   inquirer
        .prompt([
         {
            name:"firstQuestion",
            message: JSON.stringify(basicQuestions[askQuestionCounter].front)
        }]).then(function(answer){
            if (answer.firstQuestion === basicQuestions[askQuestionCounter].back)
                {
                console.log("z")
                flashScore ++
                console.log("You have " +flashScore +" correct so far!")
                
                askQuestionCounter++
                
                checkforNxtQuestion();
                        
                
            }
            else 
            {
                console.log("NOPE")
                console.log(basicQuestions[askQuestionCounter].front + basicQuestions[askQuestionCounter].back)
                askQuestionCounter++
                checkforNxtQuestion();
            }
        })      
    
}



var nextQuestion = function() {
        inquirer
        .prompt([
         {
            type: "confirm",
            name:"next",
            message: "Would you like to review your flashcards?"
        }]).then(function(answer){
            if(answer.next === true)
                {
                checkforNxtQuestion();
            }
            else{
                console.log(flashScore)
                typeofFlashcard();

            }
        })}


var checkforNxtQuestion = function () {
    if (basicQuestions.length === askQuestionCounter)
        {
        console.log("You need to add more questions then!")
        }
    else
        { askQuestions();
        }
}












// User picks which type of flash card they'd like to create. FIRST STEP
    var newFlashCard = function()
        {
        inquirer
        .prompt([
         {
            type: "confirm",
            name:"newFlash",
            message: "Would you like to make a new flashcard?"
        }]).then(function(answer){
            if(answer.newFlash === true)
                {
                typeofFlashcard();
            }
            else{
                askQuestions();
            }
        })}

    var typeofFlashcard = function() // SECOND STEP
        {
        inquirer
        .prompt([
        {
            name:"name",
            message: "What kind of flash card would you like to make?",
            type:'list',
            choices: ['Basic', 'Missing Word']
        }])
        .then(function(answer)
        {
        console.log(answer)
        var questionArray =[]

           if (answer.name == 'Basic'){
               console.log('Baaaaassssiiiicccc')
               basicFlashCard();
           }
            else { 
                console.log('the other one')
                fillBlank();
           }
            
        })
        }







// Basic Flash card function BASIC 1st STEP
        var basicFlashCard = function() {
        inquirer
        .prompt([
        {
            name:"question",
            message: "Type in your question! EX(Who is Kevin's Favorite Student)"
        },
        {
            name:"response",
            message: "Type in the answer"//-----------------------------------------------------
        }]).then(function(answer){
        var newBasicFlash  = new BasicFlashCards(answer.question, answer.response);
        
        var temp = {front:newBasicFlash.front, back:newBasicFlash.back}
        basicQuestions.push(temp);
        
        // console.log(newBasicFlash);
        console.log(basicQuestions)

        var stuff = { cards:basicQuestions }
                stuff = JSON.stringify(stuff)
                console.log(stuff)

                fs.writeFile('test.js', stuff, function (err) {
  if (err) throw err;
  console.log('It\'s saved!');
                    nextQuestion();
});
//____________________________________________________________________________ where ask again needs to go

        // console.log(flashCardsArray)
            
            // fs.appendFile('basicFlash.json',"," + JSON.stringify(newBasicFlash), function (err) {
            //     if (err) throw err;
            //     console.log('Saved!');
            //     var cardsJson = fs.readFile('basicFlash.json', 'utf8', function(err, data) {
            //     if (err) throw err;
            //     console.log(data);
            //     });
            
            // console.log(cardsJson)
                
            });
        
        //_____________________________________________________________________________

        }
// )};
// fill in the blank function
        var fillBlank = function(){
        inquirer
        .prompt([
        {
            name:"question",
            message: "Type in your question with the words you want removed in []s"
        },
        {
            name:"response",
            message: "Type in the answer"
        }]).then(function(answer){ 
            console.log("hi")
            newArray.push(answer.name)
            var newFillBlank  = fillInTheBlank(answer.question, answer.response);
            
            var temp = {front:newFillBlank.front, back:newFillBlank.back}
        basicQuestions.push(temp);

        console.log(basicQuestions)
        newFlashCard();
        
         })};    
        newFlashCard();

       var newArray = []
       


















       ////////////////////////////////// Corey's Sandbox



         function game(questions){
             for(var i = 0; i < basicQuestions.length; i++){
                 console.log(questions[i].front);
             }
         }

// game(basicQuestions);