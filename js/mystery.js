/* duration/cooldown/(time)left in seconds */
var mysteryjuiceTooltip = "Mystery juice provides mysterious skills for a certain time!<br />If you used a certain power often enough, you unlock new ones!"
var mysteryjuice = 
[{
	short: "mj1",
	name: "Mystery Juice 2",
	description: "You charge up a BIG FRUIT by clicking fruits for <span class='duration'></span>s!<br />You can then collect the BIG FRUIT!",
	total: 0,
	cost: 50,
	base: 50,
	duration: 15,
	dur_mult: 1,
	cd: 120,
	left: 120,
	oncd: false,
	size: 0,
	unlocked: true
},{
	short: "mj2",
	name: "Mystery Juice 1",
	description: "You can just hover over the fruits for <span class='duration'></span>s!",
	total: 0,
	cost: 10,
	base: 10,
	duration: 0,
	dur_mult: 1,
	cd: 60,
	left: 60,
	oncd: false,
	unlocked: true
},{
	short: "mj3",
	name: "Mystery Juice 3",
	description: "You have to drag the fruit and drop them in the basket for <span class='duration'></span>s to gain extra fruits per fruit and a bigger combo bonus!",
	total: 0,
	cost: 0,
	base: 0,
	duration: 30,
	dur_mult: 2,
	cd: 90,
	left: 90,
	oncd: false,
	unlocked: true
},{
	short: "mj4",
	name: "Mystery Juice 4",
	description: "It clicks every fruit on the screen!<br />Its cooldown gets reduced by 1s per fruit pop.",
	total: 0,
	cost: 20,
	base: 20,
	duration: 0,
	dur_mult: 0,
	cd: 300,
	left: 300,
	oncd: false,
	unlocked: true
}];

var isDraggable = false;

function fnc_mu1(dur, cd){
	var size = 0;
	var bigFruitValue = 0;
	$("#playground").append("<img class='bigfruit' src='images/apple.png' style='width: 0;' />");
	
		$(document).off("mousedown", ".fruit");
	$(document).on("mousedown", ".fruit", function()
	{
		clickEvent($(this),true);
		bigFruitValue+=1.5*calcValue(1,data.combo);
		size += 3;
		$(".bigfruit").width(size);
	});
	//when duration is over
	setTimeout(function()
	{	
		resetMystery();
		//reset Event for correct click event
		$(document).off("mousedown", ".fruit");
		$(document).on("mousedown", ".fruit", function(){ clickEvent($(this),false); });
		$(".bigfruit").css("cursor", "pointer");
		$(".bigfruit").on("mousedown", function()
		{
			gain(bigFruitValue);
			addText(".ressource", "+", bigFruitValue);
			$(this).remove();
		});
	}, dur*1000);
}
function fnc_mu2(dur, cd){
	
	$(document).on("mouseenter", ".fruit", function(){ clickEvent($(this),false); });
	//when duration is over
	setTimeout(function()
	{	
		resetMystery();
		$(document).off("mouseenter", ".fruit");
	}, dur*1000);
}
function fnc_mu3(dur, cd){
	
	$(document).off("mousedown", ".fruit");
	var counter = 0;
	$("#playground").append("<img src='images/bag.png' id='basket' style='position: absolute; left: 0; right: 0; top: 0; bottom: 0; z-index: 0; margin: auto;'/>");
	isDraggable = true;
	$( ".fruit" ).draggable({ cursor: "move", cursorAt: { top: 0, left: 0 } });
	$( "#basket" ).droppable({
		accept: ".fruit",
		drop: function(event, ui){
			clickEvent(ui.draggable,false);
			ui.draggable.remove();
			//if($("#playground").children(".fruit").length == 0){ clearBonus();}
			counter++;
		}
	});
	//when duration is over
	setTimeout(function()
	{	
		resetMystery();
		isDraggable = false;
		$("#basket").remove();
		var v = counter*8*data.fruitValue;
		gain(v);
		addText(".ressource", "+",v);
		$(document).on("mousedown", ".fruit", function(){ clickEvent($(this),false);} );
	}, dur*1000);
}
function fnc_mu4(dur, cd){
	
	$(".fruit").trigger("mousedown");
	//when duration is over
	setTimeout(function()
	{	
		resetMystery();
	}, dur*1000);
}
function resetMystery(){
	data.muActive = false;
	$("#playground").removeClass("active");
}
function purchaseMysteryUpgrade(index)
{
	if (data.mystery >= mysteryjuice[index].cost && mysteryjuice[index].oncd == false && data.muActive == false)
	{
		mysteryjuice[index].oncd = true;
		$("#"+mysteryjuice[index].short+" .inactiveBar").animate({width: "100%"}, mysteryjuice[index].duration*1000);
		data.mystery -= mysteryjuice[index].cost;
		mysteryjuice[index].total += 1;
		data.muActive = true;
		$("#playground").addClass("active");
		blockVisLoop("#field", 10, mysteryjuice[index].duration, "#FFD700");
		
		if(mysteryjuice[index].short == "mj1") fnc_mu1(mysteryjuice[index].duration, mysteryjuice[index].cd);
		else if(mysteryjuice[index].short == "mj2") fnc_mu2(mysteryjuice[index].duration, mysteryjuice[index].cd);
		else if(mysteryjuice[index].short == "mj3") fnc_mu3(mysteryjuice[index].duration, mysteryjuice[index].cd);
		else if(mysteryjuice[index].short == "mj4") fnc_mu4(mysteryjuice[index].duration, mysteryjuice[index].cd);
		
		//start the cooldown timer, when the duration is over
		setTimeout(function()
		{ cooldownBar(index); }, mysteryjuice[index].duration*1000);
	}
	//updateMysteryUpgrades();
	
}
function updateMysteryUpgrades(){
    for (i = 0; i < mysteryjuice.length; i++)
    {
		$("#"+mysteryjuice[i].short+" .amount").html("x" + mysteryjuice[i].total);
		$("#"+mysteryjuice[i].short+" .cost").html(shorten(mysteryjuice[i].cost));
		$("#"+mysteryjuice[i].short+" .duration").html(mysteryjuice[i].duration);
		$("#"+mysteryjuice[i].short+" .cooldown").html("(Cooldown: "+mysteryjuice[i].left+"s)");
		//unlock Upgrades
		
		//specials
		mysteryjuice[i].duration = (data.interval*3)/1000*mysteryjuice[i].dur_mult;
    }
}
function cooldownBar(index){
	//$("#"+mysteryjuice[index].short+" .inactiveBar").animate({width: 0}, mysteryjuice[index].left*1000, "linear");
	//cooldown timer
	var muLoop = setInterval(function()
	{
		$("#"+mysteryjuice[index].short+" .inactiveBar").css("width", (100/mysteryjuice[index].cd)*mysteryjuice[index].left+"%");
		if(mysteryjuice[index].left <= mysteryjuice[index].cd && mysteryjuice[index].left >= 0)
		{ 
			mysteryjuice[index].left--; 
		}
		else if(mysteryjuice[index].left <= 0){
			mysteryjuice[index].left = mysteryjuice[index].cd;
			$("#"+mysteryjuice[index].short).removeClass("deactivated");
			mysteryjuice[index].oncd = false;
			clearInterval(muLoop);
		}
	}, 1000);
}
function blockVisLoop(e, size, time, color){
	$(e).append("<div class='bar blockbot' style='position: absolute; bottom: 0; height:"+size+"px; background-color: "+color+"; border-bottom-left-radius: 5px; border-bottom-right-radius: 5px;'></div>");
	$(e).append("<div class='bar blockright' style='position: absolute; right: 0; bottom: 0; width:"+size+"px; background-color: "+color+"; border-bottom-right-radius: 5px; border-top-right-radius: 5px;'></div>");
	$(e).append("<div class='bar blocktop' style='position: absolute; top: 0; right: 0; height:"+size+"px; background-color: "+color+"; border-top-left-radius: 5px; border-top-right-radius: 5px;'></div>");
	$(e).append("<div class='bar blockleft' style='position: absolute; left: 0; top: 0; width:"+size+"px; background-color: "+color+"; border-bottom-left-radius: 5px; border-top-left-radius: 5px;'></div>");
	
	var ges = $(e).width()*2+$(e).height()*2;
	var heighttime = time/(ges/$(e).height());
	var widthtime = time/(ges/$(e).width());
	
	$(e+" .blockbot").animate({width: "100%"}, widthtime*1000, "linear");
	$(e+" .blockright").delay(widthtime*1000).animate({height: "100%"}, heighttime*1000, "linear");
	$(e+" .blocktop").delay((widthtime+heighttime)*1000).animate({width: "100%"}, widthtime*1000, "linear");
	$(e+" .blockleft").delay((2*widthtime+heighttime)*1000).animate({height: "100%"}, heighttime*1000, "linear", function(){ $(e+" .bar").remove(); });
}