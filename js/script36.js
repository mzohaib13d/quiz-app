let index = 0;
let attempt = 0;
let score = 0;
let wrong = 0;

let questions = quiz.sort(function (){
   return 0.5 - Math.random();
});

let totalQuestion = questions.length;
let percent = 0;
$(function() {
   /* timer code starts from here */
   let totalTime = 150; // 150 seconds for timer
   let min = 0;
   let sec = 0;
   let counter = 0;

   let timer = setInterval(function() {
      counter++;
      min = Math.floor((totalTime - counter) / 60); // calculating minutes
      sec = totalTime - min * 60 - counter;

      $(".timerBox span").text(min + ":" + sec);
      if (counter == totalTime) {
         alert("Time's Up. Press OK to show the result");
         result();
         clearInterval(timer);
      }
   }, 1000); // timer set for 1 sec interval

   /* timer code ends here */

   printQuestion(index);
});

/* Function to print question starts here */
function printQuestion(i) {
   $(".questionBox").text(questions[i].question);
   $(".optionBox span").eq(0).text(questions[i].option[0]);
   $(".optionBox span").eq(1).text(questions[i].option[1]);
   $(".optionBox span").eq(2).text(questions[i].option[2]);
   $(".optionBox span").eq(3).text(questions[i].option[3]);
}
// Function to print question ends here 

// Function to check question starts 

function checkAnswer(option) {
   attempt++;
   let optionClicked = $(option).data("opt");
   console.log(questions[index]);   
 
   if (optionClicked == questions[index].answer) {
     $(option).addClass("right");
     score++;
   } else {
     $(option).addClass("wrong");
     wrong++;
   }
   $(".scoreBox span").text(score);
   $(".optionBox span").attr("onclick", "");
 }
// Function to check question ends 


// Function for the Next Question starts
function showNext(){
   if(index >= (questions.length-1)){
      showResult(0);
      return;
   } 
   index++;
   $(".optionBox span").removeClass();
   $(".optionBox span").attr("onclick","checkAnswer(this)");
   printQuestion(index);
}
// Function for the Next Question ends

// Function for the Result starts

function showResult(j){
   if(
      j == 1 &&
      index < questions.length - 1 &&
      !confirm(
         "Quiz hasn't been finished yet. Press OK to skip & get Final Result."
      )
   ) {
      return;
   }
   result();
 
}
// Function for the Result ends

// Result function start
function result() {
   var percent = (score/totalQuestion)*100;
   // console.log(percent  );
   $("#questionScreen").hide();
   $("#resultScreen").show();
 
   $("#totalQuestion").text(totalQuestion);
   $("#attemptQuestion").text(attempt);
   $("#correctQuestion").text(score); // Corrected ID here
   $("#wrongQuestion").text(wrong);   // worong ID here
   $("#Percentage").text(percent + "%");   // Percentage ID here
 }
//Result function end