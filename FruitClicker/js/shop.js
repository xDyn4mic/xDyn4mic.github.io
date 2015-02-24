var workerTooltip = "They work on one of your other fields and collect fruits for you.<br />They don't expect a lot.. I mean, you pay them with fruits..";
var worker = 
[{//id-0
    short: "w1",
	name: "Your significant other",
	description: "Your beloved one wants to help you, but.. that does not mean you don't have to pay! <br /><span class='perSec'></span> fruits per second",
    total: 0,
    cost: 15,
    base: 15,
	mult: 0.2,
	base_mult: 0.2,
	sub_mult: 1,
	task: "passive"
}, {//id-1
    short: "w2",
	name: "Upgrade 2",
	description: "<span class='perSec'></span> fruits per second",
    total: 0,
    cost: 375,
    base: 375,
	mult: 5,
	base_mult: 5,
	sub_mult: 1,
	task: "passive"
}, {//id-2
    short: "w3",
	name: "Upgrade 3",
	description: "<span class='perSec'></span> fruits per second",
    total: 0,
    cost: 3000,
    base: 3000,
	mult: 50,
	base_mult: 50,
	sub_mult: 1,
	task: "passive"
}, {//id-3
    short: "w4",
	name: "Upgrade 4",
	description: "<span class='perSec'></span> fruits per second",
    total: 0,
    cost: 15000,
    base: 15000,
	mult: 200,
	base_mult: 200,
	sub_mult: 1,
	task: "passive"
}, {//id-4
    short: "w5",
	name: "Upgrade 5",
	description: "<span class='perSec'></span> fruits per second",
    total: 0,
    cost: 35000,
    base: 35000,
	mult: 500,
	base_mult: 500,
	sub_mult: 1,
	task: "passive"
}, {//id-5
    short: "w15",
	name: "Upgrade 6",
	description: "Increases interval.<br/><span class='interval'></span> -> <span class='intervalNext'></span>",
    total: 0,
    cost: 5000,
    base: 5000,
	task: "incInterval"
}, {//id-6
    short: "w16",
	name: "Upgrade 7",
	description: "Increases the value of a click<br/><span class='fruitValue'></span> -> <span class='fruitValueNext'></span>",
    total: 0,
    cost: 100000,
    base: 100000,
	task: "incFruitValue"
}, {//id-7
    short: "w17",
	name: "Upgrade 8",
	description: "Your combo starts with more fruits!<br /><span class='comboStart'></span> -> <span class='comboStartNext'></span>",
    total: 0,
    cost: 60000,
    base: 60000,
	task: "combo"
}/*, {
    short: "w18",
	name: "Upgade 9",
	description: "Does nothing... or does it? <br />Hint: It doesn't!",
    total: 0,
    cost: 1000000,
    base: 1000000,
	task: ""
}*/];

var categories = ["Worker", "Mystery Juice", "Seeds"];

$(document).on("click", ".category", function(){
	$(".category").removeClass("active");
	$(this).addClass("active");
	$("#shop .inner").css("margin-left", -1*$(this).attr("data-mult")*100+"%"); 
});

function createShop()
{
	var before_string = "<div id='categorywrap'>";
	for(i=0;i<categories.length;i++)
	{
		before_string += "<div class='category color_2 hov' data-mult='"+i+"'>"+categories[i]+"</div>";
	}
	before_string += "<div class='delimiter'><div></div><div class='delimiter'><div>";
	$("#shop").prepend(before_string);
	$(".category:first-child").addClass("active");
	
	var string = "";
	
	string += "<ul id='s1' data-default='0'>";
	string+= "<li class='tooltip color_2'>"+workerTooltip+"</li>";
	for(i=0;i<worker.length;i++)
	{
		string += "<li class='upgrade color_2' id='"+worker[i].short+"'>";
		string += "<span class='bold'>"+worker[i].name+"</span> <br /><span class='cost'></span><br />";
		string += worker[i].description+"<span class='amount'></span>";
		string += "<div class='hiddenBar' data-id='"+i+"'>";
		string += "<span class='buy1 color_2 hov' onclick='purchaseNormalUpgrade("+i+", 1);'>+1</span>";
		string += "<span class='buy10 color_2 hov' onclick='purchaseNormalUpgrade("+i+", 10);'>+10</span>";
		string += "<span class='sell color_2 hov' onclick='sell("+i+")'>-1</span></div>";
		string+= "</li>";
	}
	string += "</ul>";
	//-- Mystery Upgrades --//
	string +="<ul id='s2' data-default='1'>";
	for(i=0;i<mysteryjuice.length;i++)
	{
		if(mysteryjuice[i].unlocked == true)
		{
			string += "<li class='upgrade mystery color_2 hov' id='"+mysteryjuice[i].short+"' onclick='purchaseMysteryUpgrade("+i+");'>";
			string += "<div class='inactiveBar'></div>";
			string += "<span class='bold'>"+mysteryjuice[i].name+"</span> <br />(costs: <span class='cost'></span> mystery fruits)<br />";
			string += mysteryjuice[i].description+"<div class='cooldown'></div><span class='amount'></span></li>";
		}
	}
	string += "</ul>";
	//-- Legendary Upgrades --//
	string +="<ul id='s3' data-default='2'>";
	for(i=0;i<seeds.length;i++)
	{
		if(seeds[i].unlocked == true)
		{
			string += "<li class='upgrade legendary color_2 hov' id='"+seeds[i].short+"' onclick='purchaseLegendaryUpgrade("+i+", 1);'>";
			string += "<span class='bold'>"+seeds[i].name+"</span> <br />(costs: <span class='cost'></span> legendary fruits)<br />";
			string += seeds[i].description+"<span class='amount'></span></li>";
			//<div class='hiddenBar'><span class='buy1 '>+1</span><span class='buy10 ' onclick='purchaseLegendaryUpgrade("+i+", 10);'>+10</span><span class='sell ' onclick=''>-1</span></div>";
		}
	}
	string += "</ul><div class='delimiter'></div>";
	
	$("#shop .inner").html(string);
}
function purchaseNormalUpgrade(index, amount)
{
	var costs = 0;
    for (i = 0; i < amount; i++)
    {
        if (data.ressource >= worker[index].cost)
        {
			costs+=worker[index].cost;
            data.ressource -= worker[index].cost;
            worker[index].total += 1;
            calcPrice(index);
        }
    }
	if(costs!=0) addText(".ressource","-",costs);
	updateNormalUpgrades();
}
function updateNormalUpgrades(){
    //Preis aktualisieren
	var passive = 0;
    for (i = 0; i < worker.length; i++)
    {
        calcPrice(i);
		$("#"+worker[i].short+" .amount").html("x" + worker[i].total);
		$("#"+worker[i].short+" .cost").html("(costs: "+shorten(worker[i].cost)+" fruits)");
		//Subupgrades
		worker[i].sub_mult = 1+Math.floor(worker[i].total/25);
		worker[i].mult=worker[i].base_mult*worker[i].sub_mult;
		$("#"+worker[i].short+" .perSec").html(prettify(worker[i].mult));
		
		if(worker[i].task=="passive"){
			passive+=worker[i].total*worker[i].mult;
		}
		//upgrade specific
		upgradeSpecific(i);
		
    }
	data.fps = passive;
}
function sell(index)
{
	var value = valueForX(1,index,worker[index].total)*0.5;
	if (worker[index].total > 0)
	{
		data.ressource += value;
		worker[index].total -= 1;
		
		//upgrade specific
		upgradeSpecific(index);
	}
	if(value!=0) addText(".ressource","+",value);
	updateNormalUpgrades();
}
function upgradeSpecific(index){
			if(worker[index].task == "incInterval"){
				data.newInterval = data.baseInterval+(worker[index].total*250);
				data.newIntervalNext = data.baseInterval+((worker[index].total+1)*250);
			}
			else if(worker[index].task == "incFruitValue"){
				data.fruitValue = Math.pow(1.2,worker[index].total);
				data.fruitValueNext = Math.pow(1.2,worker[index].total+1);
			}
			else if(worker[index].task == "combo"){
				data.comboStart=1*worker[index].total;
				data.comboStartNext=1*(worker[index].total+1);
			}
}

//show price on hover
$(document).on("mouseenter", ".buy1", function(){
	var did = parseInt($(this).parent().attr("data-id"));
	var v = valueForX(1,did,worker[did].total);
	$(this).html("-"+shorten(v));
});
$(document).on("mouseleave", ".buy1", function(){
	$(this).html("+1");
});

$(document).on("mouseenter", ".buy10", function(){
	var did = parseInt($(this).parent().attr("data-id"));
	var v = valueForX(10,did,worker[did].total);

	$(this).html("-"+shorten(v));
});
$(document).on("mouseleave", ".buy10", function(){
	$(this).html("+10");
});
$(document).on("mouseenter", ".sell", function(){
	var did = parseInt($(this).parent().attr("data-id"));
	var v = valueForX(1,did,worker[did].total)*0.5;

	$(this).html("+"+shorten(v));
});
$(document).on("mouseleave", ".sell", function(){
	$(this).html("-1");
});

//Berechnet den Preis für x Upgrades
function valueForX(x, index, start){
	var v = 0;
	for(i=0; i<x; i++)
	{
    	v += Math.floor(worker[index].base * Math.pow(1.15, start+i));
	}
	return v;
}
//Setzt den Preis eines Upgrades
function calcPrice(index)
{
    worker[index].cost = Math.floor(worker[index].base * Math.pow(1.15, worker[index].total));
}
function pageTitle(){
	var slogan = " - It\'s all about the juice, \'bout the juice"
	document.title = shorten(data.ressource)+" fruits"+slogan;
	setTimeout(pageTitle, 1000);
}