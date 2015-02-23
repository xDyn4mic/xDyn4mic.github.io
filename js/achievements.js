var maxCombo = 0;

//Variablen für Achievements
var achievements = [{
	//20x combo
	name: "a1",
	unlocked: false,
	text: "You achieved Fruit Rage!\nGet a 20x combo or more!"
},{
	//total 1M
	name: "a2",
	unlocked: false,
	text: "You achieved Fruit Maniac!\nCollect more than 1 Million fruits in total!"
}];
function saveCombo(c)
{
	if(c>maxCombo) maxCombo = c;
}

function checkAch()
{
	if(maxCombo >= 20 && achievements[0].unlocked == false){ 
		achievements[0].unlocked = true;
		alert(achievements[0].text); 
	}
	if(data.total >= Math.pow(10, 6) && achievements[1].unlocked == false){ 
		achievements[1].unlocked = true;
		alert(achievements[1].text); 
	}
}

function getAch(n)
{
	
}