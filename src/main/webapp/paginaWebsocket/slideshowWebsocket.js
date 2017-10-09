var ws;
var valorRetorno;

function abrirConexao() {
	
	if (window.WebSocket) {
		
		ws = new WebSocket("ws://localhost:8080/PrototiposTCC/websocket");
		ws.onopen = function(evt) { onOpen(evt) };
		ws.onclose = function(evt) { onClose(evt) };
		ws.onmessage = function(evt) { onMessage(evt) };
		ws.onerror = function(evt) { onError(evt) };
	    
	    console.log("O PROTOCOLO WEBSOCKET É SUPORTADO NESSE BROWSER");
		
	} else {

		console.log("O PROTOCOLO WEBSOCKET NÃO É SUPORTADO NESSE BROWSER");
	}
	
	document.getElementById("btnConectar").classList.add("hidden");
	
	document.getElementById("btnDesconectar").classList.remove("hidden");
	
};


function onOpen(){

	console.log("HANDSHAKE FEITO COM SUCESSO");
	
};

function onMessage (evt) {
	
	valorRetorno = evt.data;
	
};

function onClose() { 
	
	ws.close();

	document.location.href = "/PrototiposTCC/";

	console.log("CONEXÃO FECHADA COM SUCESSO"); 
	
};

function enviarMensagem(idSlideCorrente) {
	
	ws.send(idSlideCorrente);
	
};

function setaImagem(){
	
    var settings = {
        primeiraImg: function(){
            elemento = document.getElementById("slideInicial");
            
            elemento.classList.add("ativo");
            
        	var desabilitarBotao = document.getElementById("botaoAnterior");
        	desabilitarBotao.classList.add("hidden");
            
        },

        slide: function(){
            elemento = document.querySelector(".ativo");

            if(elemento.nextElementSibling){
                elemento.nextElementSibling.classList.add("ativo");
                elemento.classList.remove("ativo");
            }else{
                elemento.classList.remove("ativo");
                settings.primeiraImg();
            }

        },

        proximo: function(){
            
            elemento = document.querySelector(".ativo");

            if(elemento.id == "slideInicial"){
            	
            	var desabilitarBotao = document.getElementById("botaoAnterior");
            	
            	desabilitarBotao.classList.add("hidden");
            
            } else {
            	
            	var desabilitarBotao = document.getElementById("botaoAnterior");
            	
            	desabilitarBotao.classList.remove("hidden");
            }
            
            if(elemento.id == "imagemSlide7"){
            	
            	var desabilitarBotao = document.getElementById("botaoProximo");
            	
            	desabilitarBotao.classList.add("hidden");
            
            } else{
            	
            	var desabilitarBotao = document.getElementById("botaoProximo");
            	
            	desabilitarBotao.classList.remove("hidden");
            }
            
            if(elemento.nextElementSibling){
            	
            	enviarMensagem(elemento.nextElementSibling.id + ",prox");
            	
                document.getElementById(elemento.nextElementSibling.id).classList.add("ativo");
                elemento.classList.remove("ativo");
            
            }else{
            	
                elemento.classList.remove("ativo");
                settings.primeiraImg();
            }
        },

        anterior: function(){
            elemento = document.querySelector(".ativo");
            
            if(elemento.id == "imagemSlide2" || elemento.id == "imagemSlide1"){
            	
            	var desabilitarBotao = document.getElementById("botaoAnterior");
            	
            	desabilitarBotao.classList.add("hidden");
            
            } else if(elemento.id == "imagemSlide8"){
            
        		var desabilitarBotao = document.getElementById("botaoProximo");
            	
            	desabilitarBotao.classList.remove("hidden");
            	
            }
            
            else {
            	
            	var desabilitarBotao = document.getElementById("botaoAnterior");
            	
            	desabilitarBotao.classList.remove("hidden");
            
            }
            
            if(elemento.previousElementSibling){
            	
            	enviarMensagem(elemento.previousElementSibling.id + ",ant");
            	
            	document.getElementById(elemento.previousElementSibling.id).classList.add("ativo");
                elemento.classList.remove("ativo");
                
            }else{
            	
                elemento.classList.remove("ativo");                     
                elemento = document.querySelector("a:last-child");
                elemento.classList.add("ativo");
                
            }
            
        },

    }
    
    settings.primeiraImg();

    document.querySelector(".next").addEventListener("click",settings.proximo,false);
    document.querySelector(".prev").addEventListener("click",settings.anterior,false);
    	
}

window.addEventListener("load",setaImagem,false);