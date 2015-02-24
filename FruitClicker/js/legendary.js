var seedsTooltip = "";
var seeds = 
[{
	short: "seeds1",
	name: "Mystery Seeds",
	description: "This is just a placeholder! Nothing happens when you buy this.. I swear!",
	total: 0,
	base: 0,
	cost: 0,
	unlocked: true
}];
/*
,{
	short: "lu2",
	name: "Legendary Upgrade 2",
	description: "Yes, a second upgrade with no use! Yaaay!",
	total: 0,
	base: 0,
	cost: 0,
	unlocked: true
}
*/
var types = [];

function purchaseLegendaryUpgrade(index, amount)
{
	if (data.legendary >= seeds[index].cost)
	{
		data.legendary -= seeds[index].cost;
		seeds[index].total += amount;
	}
	updateLegendaryUpgrades();
}
function updateLegendaryUpgrades(){
    for (i = 0; i < seeds.length; i++)
    {
		$("#"+seeds[i].short+" .amount").html("x" + seeds[i].total);
		$("#"+seeds[i].short+" .cost").html(shorten(seeds[i].cost));
    }
}