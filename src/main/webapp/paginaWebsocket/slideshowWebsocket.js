var ws;
var valorRetorno;

function abrirConexao() {
	
	if (window.WebSocket) {
		
		ws = new WebSocket("ws://localhost:8080/PrototiposTCC/websocket");
		ws.onopen = function(evt) { onOpen(evt) };
		ws.onclose = function(evt) { onClose(evt) };
		ws.onmessage = function(evt) { onMessage(evt) };
		ws.onerror = function(evt) { onError(evt) };
	    
	    console.log("WEB SOCKET É SUPORTADO NESSE BROWSER");
		
	} else {
		console.log("WEB SOCKET NÃO É SUPORTADO NESSE BROWSER");
	}
	
	document.getElementById("btnConectar").classList.add("hidden");
	
	document.getElementById("btnDesconectar").classList.remove("hidden");
	
	console.log("ABRINDO CONEXÃO COM O SERVIDOR");
	
};


function onOpen(){

//	if(document.getElementById("slideInicial") || document.getElementById("imagemSlide1")){
//		
//		var habilitarProximo = document.getElementById("botaoProximo");
//		habilitarProximo.classList.remove("hidden");
//		
//	} else if(document.getElementById("imagemSlide7")){
//
//		var habilitarAnterior = document.getElementById("botaoAnterior");
//		habilitarAnterior.classList.remove("hidden");
//		
//	} else {
//		
//		var habilitarProximo = document.getElementById("botaoProximo");
//		habilitarProximo.classList.remove("hidden");
//		
//		var habilitarAnterior = document.getElementById("botaoAnterior");
//		habilitarAnterior.classList.remove("hidden");
//		
//	}
	
	console.log("HANDSHAKE FEITO COM SUCESSO")
};

function onMessage (evt) {
	
	valorRetorno = evt.data;
	
//	console.log(evt);

};

function onClose() { 
	
	ws.close();

	document.location.href = "/PrototiposTCC/";
	
//	var desabilitarProximo = document.getElementById("botaoProximo");
//	desabilitarProximo.classList.add("hidden");
//    
//	var desabilitarAnterior = document.getElementById("botaoAnterior");
//	desabilitarAnterior.classList.add("hidden");
	
	console.log("CONEXÃO FECHADA COM SUCESSO"); 
	
};

function enviarMensagem(idSlideCorrente) {
	
	ws.send(idSlideCorrente);
	
};

function setaImagem(){
	
    var settings = {
        primeiraImg: function(){
            elemento = document.getElementById("slideInicial");
            
        	var removerLegenda = document.getElementById("legendaSlide");
            	
        	removerLegenda.classList.add("hidden");
            elemento.classList.add("ativo");
            
        	var desabilitarBotao = document.getElementById("botaoAnterior");
        	desabilitarBotao.classList.add("hidden");
            
//            this.legenda(elemento);
        },

        slide: function(){
            elemento = document.querySelector(".ativo");

            if(elemento.nextElementSibling){
                elemento.nextElementSibling.classList.add("ativo");
                settings.legenda(elemento.nextElementSibling);
                elemento.classList.remove("ativo");
            }else{
                elemento.classList.remove("ativo");
                settings.primeiraImg();
            }

        },

        proximo: function(){
            
        	//clearInterval(intervalo);
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
                settings.legenda(elemento.nextElementSibling);
                elemento.classList.remove("ativo");
            
            }else{
            	
                elemento.classList.remove("ativo");
                settings.primeiraImg();
            }
            //intervalo = setInterval(settings.slide,4000);
        },

        anterior: function(){
            //clearInterval(intervalo);
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
                settings.legenda(elemento.previousElementSibling);
                elemento.classList.remove("ativo");
            }else{
                elemento.classList.remove("ativo");                     
                elemento = document.querySelector("a:last-child");
                elemento.classList.add("ativo");
                this.legenda(elemento);
            }
            //intervalo = setInterval(settings.slide,4000);
        },

        legenda: function(obj){
            var legenda = obj.querySelector("img").getAttribute("alt");
            document.querySelector("figcaption").innerHTML = legenda;
        }

    }
    
    //chama o slide
    settings.primeiraImg();

    //chama a legenda
    settings.legenda(elemento);

    //chama o slide Ã  um determinado tempo
    //var intervalo = setInterval(settings.slide,4000);
    
	document.querySelector(".next").addEventListener("click",settings.proximo,false);
    document.querySelector(".prev").addEventListener("click",settings.anterior,false);
    	
}

window.addEventListener("load",setaImagem,false);