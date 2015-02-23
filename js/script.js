var data = {
	version: "0.7 (beta)",
	total: 0,
	ressource: 0,
	mystery: 50,
	chance: 5,
	legendary: 0,
	baseInterval: 2500,
	tick: 1000,
	interval: 2500,
	newInterval: 2500, 
	newIntervalNext: 2500, 
	size: 80, //Größe einer Frucht
	fruitValue: 1, //Anzahl für einer Frucht (Multiplikator)
	fruitValueNext: 0, 
	clickValue: 1, //Wert eines Klicks
	tickValue: 0, //Wert eines Ticks
	fps: 0, //fruits per second
	comboStart: 0, //Combo startet bei..
	comboStartNext: 0, 
	combo: 0, //jetzige Combo
	comboMult: 1.25, //Multiplikator für Combos
	fruitAmount: 1, //Anzahl der Früchte auf einem Screen
	frnr: 0, //fruit number: dass der Loop die richtigen Früchte löscht und der Loop sauber starten kann
	muActive: false, //ist derzeit ein Mystery Upgrade aktiv?
};
var loop = 0; // setTimeout Variable


$(document).ready(function()
{
	preloadIMG();
	loadGame();
	pageTitle();
	createShop();
	$("#tick").html(data.tick/1000);
	startInterval();
	changeSeason();
	update();
	updateNormalUpgrades();
	updateMysteryUpgrades();
	updateLegendaryUpgrades();
});
function gain(n){
	data.total += n;
	data.ressource += n;
}
//Warnung, wenn man das Fenster schließt
/*window.onbeforeunload = function (e) {
	return 'Are you sure you want to quit?';
};*/
//Funktion eines Klicks bzw. der passiven Upgrades
function incClick(amount, c)
{
	var value= calcValue(amount, c);
	
	data.clickValue = value;
	
	gain(value);
}
//berechnet den Wert eines Klicks anhand der Anzahl und der jetzigen Combo
function calcValue(amount, combo){
	return amount*data.fruitValue*Math.pow(data.comboMult,combo)+1*data.fps/100;
}

//Bilder in den Verzeichnissen
var spring = new Array("apple.png","greenapple.png");
var summer = new Array("strawberry.png", "peach.png","watermelon.png");
var fall = new Array("cherries.png","grapes.png");
var winter = new Array("tangerine.png","pineapple.png");

function preloadIMG(){
	for(i=0;i<spring.length;i++){ $("#preload").append("<img src='images/spring/"+spring[i]+"' />"); }
	for(i=0;i<summer.length;i++){ $("#preload").append("<img src='images/summer/"+summer[i]+"' />"); }
	for(i=0;i<fall.length;i++){ $("#preload").append("<img src='images/fall/"+fall[i]+"' />"); }
	for(i=0;i<winter.length;i++){ $("#preload").append("<img src='images/winter/"+winter[i]+"' />"); }
}

//erstellt Früchte
function createFruits(amount)
{
	if(data.frnr == 5) data.frnr = 0;
	var string = "";
	for(i=0;i<amount;i++)
	{
		var pre = "";
		if(randomNumber(1,100)<= data.chance){ //data.chance=Chance auf Mysteryfruit
			pre="mystery";
		}
		string = "<img src='images/";
		if(season=="spring") string += season+"/"+pre+spring[randomNumber(0, spring.length-1)];
		if(season=="summer") string += season+"/"+pre+summer[randomNumber(0, summer.length-1)];
		if(season=="fall") string += season+"/"+pre+fall[randomNumber(0, fall.length-1)];
		if(season=="winter") string += season+"/"+pre+winter[randomNumber(0, winter.length-1)];
		
		string+= "' class='fruit clickable fr"+data.frnr;
		if(pre=="mystery"){ string+= " mysteryfruit"; }
		string+= "' style='display: none;'/>";
			
		$("#playground").append(string);
	}
	data.frnr++;
	//fall special
	var thisSize = data.size;
	if(season=="summer") thisSize=120;
	//winter special
	var thisHeight=$("#playground").height();
	var thisWidth=$("#playground").width();
	if(season=="winter"){
		thisHeight*=0.7;
		thisWidth*=0.7;
	}
	
	$("#playground img.fruit").each(function()
	{
		$(this).css("top", randomNumber(0,(thisHeight-thisSize))+"px");
		$(this).css("left", randomNumber(0,(thisWidth-thisSize))+"px");
	});
	$(".fruit").fadeIn(300);
	$('.fruit').mousedown(function(e) {
		e.preventDefault();
	});
	if(isDraggable == true){
		$( ".fruit" ).draggable({ cursor: "move", cursorAt: { top: thisSize*0.5, left: thisSize*0.5 } });
	}
	$(".fruit").width(thisSize);
}

//Frucht-Klick-Event
$(document).on("mousedown", ".fruit", function()
{
	clickEvent($(this),false);
});
function clickEvent(_this, b){ //b=true->mu1aktiv
	incClick(1, data.combo);
	if(_this.hasClass("mysteryfruit") == true){
		data.mystery+=1;
		addText(".mysteryfruits", "+", 1);
	}
	if(b==false){
		_this.fadeOut(50, function(){ _this.remove(); isEmpty(); });
	}
	if(b==true){
		_this.animate({
			top: 0,
			bottom:0,
			right:0,
			left:0,
			margin: "auto"
		},100,function(){ _this.remove(); isEmpty(); });
	}
	if(mysteryjuice[3].oncd==true){
		mysteryjuice[3].left--;
	}
}
//triggert den Bonus für einen Clear
function clearBonus()
{
	data.fruitAmount++;
	hardStop();
	//data.mystery+=data.combo;
	data.combo++;
}
//startet das Intervall
function startInterval(i)
{
	if(canChangeSeason == true) changeSeason();
	var thisInterval = 0;
	if(i!=null) thisInterval = i;
	else  thisInterval = data.interval;
	
	visualLoop("#wrapper", thisInterval);
	$(".fruit.fr"+(data.frnr-1)+"").remove();
	createFruits(data.fruitAmount);
	if(data.newInterval != data.interval){ stopInterval(); }
	else loop = setTimeout(stopInterval, thisInterval);
}
//stoppt das Intervall ohne etwas anderes zusätzlich auszuführen (für den Clear)
function hardStop()
{
	clearTimeout(loop);
	startInterval();
}
//wenn das Intervall durchläuft
function stopInterval()
{
	saveCombo(data.combo);
	//data.mystery+=data.combo*2;
	//if(data.combo != 0) addText(".mysteryfruits", "+", data.combo*2);
	data.combo = data.comboStart;
	data.fruitAmount = data.comboStart+1;
	clearTimeout(loop);
	data.interval = data.newInterval;
	startInterval(data.interval);
}
//generiert eine zufällige Zahl zwischen min und max (für die random Positionen
function randomNumber(min,max)
{
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

//speichert jede Minute einmal automatisch
setInterval(function()
{
	saveGame();
}, 60000);

//animiert einen Balken in Element p von 0 auf 100% in der Zeit i
function visualLoop(p, i)
{
	$(p+" #visLoop .inner").stop();
	$(p+" #visLoop .inner").animate({ width: "0%"}, 0);
	$(p+" #visLoop .inner").animate({ width: "100%"}, i, "linear");
}

//Shop klappt beim Hovern auf
$(document).on("mouseenter","li.upgrade", function(){
	$(this).find(".hiddenBar").stop();
	$(this).find(".hiddenBar").slideDown(150);
});
$(document).on("mouseleave","li.upgrade", function(){
	$(this).find(".hiddenBar").stop();
	$(this).find(".hiddenBar").slideUp(150);
});
function isEmpty(){
	if($("#playground").children(".fruit").length == 0){ clearBonus();}	
}
//updates data
var ups=100; //updates per second
function update()
{	
	var favpath = "images/icons/"+season+".ico";
	if($(".favicon").attr("href") != favpath) $(".favicon").attr("href", favpath);
	data.clickValue = calcValue(1, data.combo);
    checkAch();
	
	updateMysteryUpgrades();
	
	gain(data.fps/ups);
	
    //Daten aktualisieren
    $("#season").html("<img src='images/icons/"+season+".png' height='50' style='vertical-align: top;'/>");
    $(".ressource").html(shorten(data.ressource));
    $(".mysteryfruits").html(shorten(data.mystery));
    $(".legendaryfruits").html(shorten(data.legendary));

    $(".interval").html(data.newInterval / 1000+"s");
    $(".intervalNext").html(data.newIntervalNext / 1000+"s");
    $(".value").html(shorten(data.clickValue));
    $(".fruitValue").html(shorten(data.fruitValue));
    $(".fruitValueNext").html(shorten(data.fruitValueNext));
    $(".fps").html(shorten(data.fps));

    $(".combo").html(data.combo + "x");
    $(".comboStart").html(data.comboStart + "x");
    $(".comboStartNext").html(data.comboStartNext + "x");
	
	setTimeout(update, 1000/ups); 
	//ups=updates per second
}

var deg = 0;
$(document).on("click", "#menu li.submenu", function(){
	if(deg==0){ deg=180 }
	else deg = 0;
	$(this).find("ul.level_2").slideToggle("slow");
	$(this).find(".fa").css("transform", "rotate("+deg+"deg)");
	$(this).toggleClass("active");
});