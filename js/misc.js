function shorten(n)
{
	//if(n>=Math.pow(10,3) && n<Math.pow(10, 6)){ return prettify(n/Math.pow(10, 3)).toFixed(1)+"k "; }
	if(n>=Math.pow(10,6) && n<Math.pow(10, 9)){ return prettify(n/Math.pow(10, 6))+" M "; }
	if(n>=Math.pow(10,9) && n<Math.pow(10, 12)){ return prettify(n/Math.pow(10, 9))+" B "; }
	if(n>=Math.pow(10,12) && n<Math.pow(10, 15)){ return prettify(n/Math.pow(10, 12))+" T "; }
	if(n>=Math.pow(10,15) && n<Math.pow(10, 18)){ return prettify(n/Math.pow(10, 15))+" Quad "; }
	if(n>=Math.pow(10,18) && n<Math.pow(10, 21)){ return prettify(n/Math.pow(10, 18))+" Quint "; }
	if(n>=Math.pow(10,21) && n<Math.pow(10, 24)){ return prettify(n/Math.pow(10, 18))+" Sext "; }
	if(n>=Math.pow(10,24) && n<Math.pow(10, 27)){ return prettify(n/Math.pow(10, 18))+" Sept "; }
	if(n>=Math.pow(10,27) && n<Math.pow(10, 30)){ return prettify(n/Math.pow(10, 18))+" Oct "; }
	if(n>=Math.pow(10,30) && n<Math.pow(10, 33)){ return prettify(n/Math.pow(10, 18))+" N "; }
	if(n>=Math.pow(10,33) && n<Math.pow(10, 36)){ return prettify(n/Math.pow(10, 18))+" Dec "; }
	
	return prettify(n);
}
function prettify(input){
    var output = Math.round(input * 1000000)/1000000;
	return (output.toFixed(2)).toString();
}

function displayInstructions()
{
	var string = "<h1>How To Play FruitClicker</h1>";
	string+="<div>Legend:</div>";
	string+="<ul><li>FPC = fruits per click</li>";
	string+="<li>FPS = fruits per second</li>";
	string+="<li>fruit amount = fruits per screen</li>";
	string+="</ul>";
	string+= "<ul>";
	string+= "<li>Different fruits appear in the field. If you click all fruits in the field in the given interval time (visually seen at the bottom of the field) your fpc and the fruit amount is increasing. As long as you click all fruits before time runs out, your combo grows as well as your fpc and the fruit amount.<br />If your combo breaks you gain mystery fruits based on your combo.</li>";
	string+= "<li>There are 3 types of upgrades: normal, mystery and legendary upgrades. <br />Normal upgrades increase any of the values which you can see in the info box. Every 25 upgrades you have bought, the power of the upgrade increases.<br/>Mystery upgrades can only be bought with mystery fruits.<br />They are the \"special abilities\" of FruitClicker. You can use them to gain an ability, but then you have a cooldown.<br />Legendary upgrades are only obtainable with legendary fruits. That said: they are not implemented yet. You can look forward to them!</li>";
	string+= "<li>I already added a season system. The season changes every 5 minutes.<br /> I have some ideas what I want to to with them: different seasons give certain passive (percentage?) bonuses. I had the idea to integrate a buyable season changer to let the player choose the season which fits the chosen playstyle (active clicking or idling), but for now it is <span class='bold'>only visual (not implemented yet)</span>.</li>";
	string+= "<li>Note: this games balance is not done yet. These are just random numbers I implemented to see if it's working!<br /> That's why the save games will be deleted with the next update!!<br />If you have suggestions, feedback or bugs, please let me know! I really appreciate it!</li>";
	string+= "</ul>";
	writeToOverlay(string);
}
var versions = [{
	number: 0.6,
	text: "Next update",
	changes: ["I did stuff","And other stuff too"]
},{
	number: 0.5,
	text: "This is the launch of FruitClicker, but it's still far from finished. For future updates, you will be able to read the changelogs here.<br /> You can see basic functions that I added so far under <span class='link' onclick='closeOverlay(); displayInstructions();'>\"How To\"</span><br />If you want to know what is still in progress, go to <span class='link' onclick='closeOverlay(); displayToDo();'>\"To Do\"</span><br />Note: this games balance is not done yet. These are just random numbers I implemented to see if it's working!<br /> That's why the save games will be deleted with the next update!!",
	changes: []
}];
function displayChangelog()
{
	var string = "";
	for(i=0;i<versions.length;i++){
		string+="<h2 style='margin:0;padding-top:16px; border-top: 1px solid #FFF;'>version "+versions[i].number+"</h2>";
		string+="<p>"+versions[i].text+"</p>";
		if(versions[i].changes.length > 0)
		{
			string+="<ul>";
			for(j=0;j<versions[i].changes.length;j++){
				string+="<li>"+versions[i].changes[j]+"</li>";
			}
			string+="</ul>"
		}
	}
	writeToOverlay("<h1>Changelog</h1>"+string);
}
function displayToDo()
{
	var string = "";
	writeToOverlay("<h1>This is my To-Do-List:</div>"+string);
}

function displayStats()
{
	var string ="";
    string += '<table>';
	string += '<tr><td>fruits:</td><td class="ressource"></td></tr>';
    string += '<tr><td>mystery fruits:</td><td class="mysteryfruits"></td></tr>';
    string += '<tr><td>legendary fruits:</td><td class="legendaryfruits"></td></tr>';
    string += '<tr><td>interval: </td><td class="interval"></td></tr>';
    string += '<tr><td>fruits per click</td><td class="value"></td></tr>';
    string += '<tr><td>fruits per second</td><td class="fps"></td></tr>';
    string += '<tr><td>combo: </td><td class="combo"></td></tr>';
    string += '</table>';
	writeToOverlay("<h1>Stats</h1>"+string);
}

function displayAchievements()
{
	writeToOverlay("<span>Achievements Hype!</span>");
}

function createOverlay()
{
	if($("#overlay").length == 0)
	{
		$("#wrapper").append("<div id='overlay' class='color_3'><div class='wrap'></div></div>");
		$("#wrapper").append("<div id='overlayBG'></div>");
	}
	else $("#overlay, #overlayBG").remove();
	
	$("#overlay").width(1000);
}

function writeToOverlay(d)
{
	createOverlay();
	$("#overlay .wrap").append(d);
}

function closeOverlay(){
	$("#overlay, #overlayBG").remove();
}

$(document).on("click", "#overlayBG", function(){ closeOverlay(); });

function writeBoxInfo(s,d)
{
	if(d==0) d=2000;
	$("#boxInfo").fadeIn("slow");
	$("#boxInfo").text(s);
	setTimeout(function(){$("#boxInfo").fadeOut("slow");}, d, function(){$("#boxInfo").empty();});
}

function addText(e, z, v){
	$(".addition").remove();
	$(e).after("<span class='addition' style='display: none;'>    "+z+shorten(v)+"</span>");
	$(".addition").fadeIn(300);
	$(".addition").delay(1500).fadeOut(300, function(){ $(this).remove(); });
}