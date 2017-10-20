function slidePosteriorHttp() {
	
	document.location.href = "/PrototiposTCC/prototipoHttp?SlidePosterior=" + 1;
	
	console.log("NOVA REQUISIÇÃO AO SERVIDOR");

}

function slideAnteriorHttp() {

	document.location.href = "/PrototiposTCC/prototipoHttp?SlideAnterior=" + 1;

	console.log("NOVA REQUISIÇÃO AO SERVIDOR");
}

function slideHttp() {
	
	document.location.href = "/PrototiposTCC/prototipoHttp";

}

function slideWs() {
	
	document.location.href = "/PrototiposTCC/paginaWebsocket/paginaWebsocket.html";

}