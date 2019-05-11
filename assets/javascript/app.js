$(document).ready(function(){//I need jQuery to run!
    var clockRunning = false;
    var time = 10;
    var correctAnswer;
    function count() {

        // DONE: increment time by 1, remember we cant use "this" here.
        time--;
        if (time == 0){
            //display the result, correct answers, incorrect answers, and total questions.
           // hide the questions

        }
      
        // DONE: Get the current time, pass that into the timeConverter function,
        //       and save the result in a variable.
        var converted = timeConverter(time);
        console.log(converted);
      
        // DONE: Use the variable we just created to show the converted time in the "display" div.
        $("#display").text(converted);
      }
      function timeConverter(t) {

        var minutes = Math.floor(t / 60);
        var seconds = t - (minutes * 60);
      
        if (seconds < 10) {
          seconds = "0" + seconds;
        }
      
        if (minutes === 0) {
          minutes = "00";
        }
        else if (minutes < 10) {
          minutes = "0" + minutes;
        }
      
        return minutes + ":" + seconds;
      }
                
	var questions = [
	{
		question:"What color is the background?",
		a:"red",
		b:"purple",
		c:"blue",
		d:"yellow",
		name:"q1",
		correct:"d",
    },

    {
        question:"What color is the background?",
        a:"red",
        b:"purple",
        c:"blue",
        d:"yellow",
        name:"q1",
        correct:"d",
    }

    //create a function to show the answer and question with loop
    
	];
    
    $('.questions').hide()
    $('.my-button').hide()
    $('#display').hide()
    $('#start-button').on('click', function (){
        $('.questions').show()
        $('#start-button').hide()
        $('#display').show()
        start()
    })

    function start() {

        // DONE: Use setInterval to start the count here and set the clock to running.
        if (!clockRunning) {
          intervalId = setInterval(count, 1000);
          clockRunning = true;
        }
      }
      function stop() {
      
        // DONE: Use clearInterval to stop the count here and set the clock to not be running.
        clearInterval(intervalId);
        clockRunning = false;
      }
      
    //text(JSON.stringify(questions[0]));


	var generateQuestion = function(obj){

		//We want to get here:
		// <form>
		// <h2>Question 1:</h2>
		// <div><input type="radio" name="gender" value="male" checked>Answer 1</div> 
		// <input type="radio" name="gender" value="female">Answer 2
		// <input type="radio" name="gender" value="other">Answer 3
		// </form> 

		var form = $("<form>");
		var question = $('<h2>').text(obj.question);
		var aDiv = $('<div>');
		var bDiv = $('<div>');
		var cDiv = $('<div>');
		var dDiv = $('<div>');
		var a = $('<input type="radio">').attr('name', obj.name);
		aDiv.append(a);
		aDiv.append(obj.a);
		var b = $('<input type="radio">').attr('name', obj.name);
		bDiv.append(b);
		bDiv.append(obj.b);
		var c = $('<input type="radio">').attr('name', obj.name);
		cDiv.append(c);
		cDiv.append(obj.c);
		var d = $('<input type="radio">').attr('name', obj.name);
		dDiv.append(d);
		dDiv.append(obj.d);

		if(obj.correct === "a"){
			a.attr('correct', "true");
		}else if(obj.correct === "b"){
			b.attr('correct', "true");
		}else if(obj.correct === "c"){
			c.attr('correct', "true");
		}else if(obj.correct === "d"){
			d.attr('correct', "true");
		}

		form.append(question);
		form.append(aDiv, bDiv, cDiv, dDiv);

		$('.questions').append(form);
	}

	var gradeQuestion = function(obj){
		//check if there are any radios that have been clicked
		//if it has been checked
		//find checked radio, check for correct="true" attr
		console.log("gradeQuestion()", obj);
		var output = 0;
		obj.find('input').each(function(){
		 	if($(this).is(':checked')) {
		 		console.log("FOUND CHECKED");
		  		if($(this).attr('correct') === "true"){
		  			console.log('returning + 1');
		  			output =  1;//you did it!
		  		} else{
		  			console.log('returning - 1');
		  			output= -1;//WRONG
		  		}
		  	}	
		});
		return output;
	}

	var gradePage = function(){
		console.log("gradePage");
		var score = 0;
		$('form').each(function(){
			console.log("adding ",parseInt(gradeQuestion($(this))), " to score");
			score += parseInt(gradeQuestion($(this)));
		})
		console.log(score);
		return score;
	}


	generateQuestion(questions);
	$('.my-button').click(gradePage);


})