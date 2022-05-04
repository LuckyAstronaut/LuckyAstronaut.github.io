$(document).ready(function(){
	$("#submit").click(function(){
		$("#error").remove();
		!(parseFloat($("#num").val()) >= $("#num").attr("min")&&
		  parseFloat($("#num").val()) <= $("#num").attr("max"))?
		  $("#game").append("<p style='color:red' id='error'>Please enter valid numbers!</p>"):
		  simulate();
	});
});

function simulate(){
	$("#result").remove();
	$("#foot").append("<p id='result'></p>");
	let min = parseFloat($("#qual").val()), lw = parseFloat($("#luck").val()), na = parseFloat($("#num").val());
	
	const applicants = [];
	const you = {
		id: 1,
		qual: 100,
		luck: 50
	};
	you.score = Math.floor((you.qual*(100-lw)/100+lw*you.luck/100)*1000+0.5)/1000;
	applicants.push(you);

	for(let i=0; i<na-1; i++){
		const applicant = {
			id: i+2,
			qual: Math.floor(Math.random()*(10001-min*100)+min*100)/100,
			luck: Math.floor(Math.random()*10001)/100
		};
		applicant.score = Math.floor((applicant.qual*(100-lw)/100+lw*applicant.luck/100)*100+0.5)/100;
		applicants.push(applicant);
	}
	
	applicants.sort(function(a,b){return b.luck - a.luck});
	applicants.sort(function(a,b){return b.qual - a.qual});
	applicants.sort(function(a,b){return b.score - a.score});
	
	for(let i=0; i<na; i++){
		let place = (i+1)+"";
		i>=3 ? place+="th" : i==2 ? place="Third" : i==1 ? place="Second" : place="First";
		
		if(applicants[i].id==1){
			$("#result").prepend("Despite having the maximum qualifications, due to your average luck, your overall score was "+you.score+".<br>Here are the rest of the results:<br><br>");
			i>9?
			$("#result").prepend("Sorry, you didn't make the cut. You were only the "+place+" pick! Crazy, right?<br>"):
			$("#result").prepend("Congratulations, you're going to space! You were the "+place+" pick!<br>");
		}
		$("#result").append(place+" Place: Applicant #"+applicants[i].id+", Qualification Score = "+applicants[i].qual+", Luck = "+applicants[i].luck+", Overall Score = "+applicants[i].score+".<br>");
	}
}