var ws;
var output;

function abrirConexao() {
	
	if (window.WebSocket) {
		
		output = document.getElementById("output");
		
		ws = new WebSocket("ws://echo.websocket.org");
		ws.onopen = function(evt) { onOpen(evt) };
		ws.onclose = function(evt) { onClose(evt) };
		ws.onmessage = function(evt) { onMessage(evt) };
		ws.onerror = function(evt) { onError(evt) };
	    
	    console.log("WebSocket supported in your browser");
		
	} else {
		console.log("WebSocket not supported in your browser");
	}
	
	console.log("onopen");
	
};

function onOpen(){
	
	console.log("ABRIU")
};

function onMessage (evt) {
	
	writeToScreen("<span> MENSAGEM RETORNO: " + evt.data.value + "</span>");
	
	console.log(evt);

};

function enviarMensagem() {
	
	var msg = document.getElementById("msgWebSocket");
	ws.send(msg);
	
};

function onClose() { 
	
	ws.close();
	
	console.log("onclose"); 
	
};
function onError() { console.log("onerror"); };

function writeToScreen(message){
	
  var pre = document.createElement("p");
  pre.innerHTML = message;
  output.appendChild(pre);
};
