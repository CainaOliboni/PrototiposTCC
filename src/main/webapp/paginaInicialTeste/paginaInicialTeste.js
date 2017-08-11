var ws;
var output;

function init()
{
  output = document.getElementById("output");
  testWebSocket();
}

if (window.WebSocket) {
	ws = new WebSocket("ws://echo.websocket.org");
	ws.onopen = function(evt) { onOpen(evt) };
	ws.onclose = function(evt) { onClose(evt) };
	ws.onmessage = function(evt) { onMessage(evt) };
	ws.onerror = function(evt) { onError(evt) };
	
	
	
	ws.onmessage = function (e) {
		// e.data contains received string.
		console.log("echo from server : " + e.data);
	};
	
	ws.onclose = function () { console.log("onclose"); };
	ws.onerror = function () { console.log("onerror"); };
} else {
	console.log("WebSocket not supported in your browser");
}

if (ws.readyState === 1) ws.send("OI SERVER");

function onopen = function () {
	console.log("onopen");
};


