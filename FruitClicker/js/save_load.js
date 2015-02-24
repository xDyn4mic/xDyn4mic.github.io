function saveGame(){
	localStorage.setItem("data",JSON.stringify(data));
	for(i=0;i<worker.length;i++){
		localStorage.setItem("worker"+i,JSON.stringify(worker[i]));
	}
	for(i=0;i<mysteryjuice.length;i++){
		localStorage.setItem("mysteryjuice"+i,JSON.stringify(mysteryjuice[i]));
	}
	for(i=0;i<seeds.length;i++){
		localStorage.setItem("seeds"+i,JSON.stringify(seeds[i]));
	}
	//misc
	localStorage.setItem("achievements",JSON.stringify(achievements));
	for(i=0;i<achievements.length;i++){
		localStorage.setItem("achievements"+i,JSON.stringify(achievements[i]));
	}
	var miscSave = {
		season: season,
		seasonCounter: seasonCounter
	}
	localStorage.setItem("misc",JSON.stringify(miscSave));
	
	writeBoxInfo("Game saved",0);
}
function loadGame(){
	
	var dataSave = JSON.parse(localStorage.getItem("data"));
	if(dataSave != null){ data = dataSave; }
	
	resetMystery();
	//für die Objekte in Arrays
	for(i=0;i<worker.length;i++){
		var s = JSON.parse(localStorage.getItem("worker"+i));
		if(s != null) worker[i] = s;
	}
	for(i=0;i<mysteryjuice.length;i++){
		var s = JSON.parse(localStorage.getItem("mysteryjuice"+i));
		if(s != null) mysteryjuice[i] = s;
		
		if(mysteryjuice[i].oncd == true){
			cooldownBar(i);
		}
	}
	for(i=0;i<seeds.length;i++){
		var s = JSON.parse(localStorage.getItem("seeds"+i));
		if(s != null) seeds[i] = s;
	}
	//misc
	for(i=0;i<achievements.length;i++){
		var s = JSON.parse(localStorage.getItem("achievements"+i));
		if(s != null) achievements[i] = s;
	}
	var miscSave = JSON.parse(localStorage.getItem("misc"));
	if(miscSave != null){
		if (typeof miscSave.season != "undefined") season = miscSave.season;
		if (typeof miscSave.seasonCounter != "undefined") seasonCounter = miscSave.seasonCounter;
	}
	writeBoxInfo("Game loaded",0);
	
}
function deleteSave(){
	localStorage.clear();
	writeBoxInfo("Save file deleted!",0);
}