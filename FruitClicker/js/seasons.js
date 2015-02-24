var seasons = new Array("spring", "summer", "fall", "winter");
var season = seasons[0];
var seasonCounter = 0;
var canChangeSeason = false;
//Jahreszeit wechseln alle 5 Minuten
setInterval(function()
{
	seasonCounter++;
	
	if(seasonCounter == 300) //<- bestimme die Sekunden der aktiven Jahreszeit
	{
		switch(season)
		{
			case seasons[0]:
				season = seasons[1];
				break;
			case seasons[1]:
				season = seasons[2];
				break;
			case seasons[2]:
				season = seasons[3];
				break;
			case seasons[3]:
				season = seasons[0];
				break;
		}
		seasonCounter = 0;
		canChangeSeason = true;
	}
}, 1000);
//löscht die Klasse der Jahreszeit und setzt die jetzige Jahreszeit
function changeSeason()
{
	$("body").removeClass();
	$("body").addClass(season);
	//season specifics
}