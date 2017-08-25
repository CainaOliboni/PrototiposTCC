var ws;
var valorRetorno;

function abrirConexao() {
	
	if (window.WebSocket) {
		
		ws = new WebSocket("ws://localhost:8080/PrototiposTCC/websocket");
		ws.onopen = function(evt) { onOpen(evt) };
		ws.onclose = function(evt) { onClose(evt) };
		ws.onmessage = function(evt) { onMessage(evt) };
		ws.onerror = function(evt) { onError(evt) };
	    
	    console.log("WebSocket é suportado nesse browser");
		
	} else {
		console.log("WebSocket não é suportado nesse browser");
	}
	
	console.log("ABRINDO CONEXÃO COM O SERVIDOR");
	
};


function onOpen(){
	
	console.log("HANDSHAKE FEITO COM SUCESSO")
};

function onMessage (evt) {
	
	valorRetorno = evt.data;
	
	console.log(evt);

};

function onClose() { 
	
	ws.close();
	
	console.log("CONEXÃO FECHADA COM SUCESSO"); 
	
};

function enviarMensagem(idSlideCorrente) {
	
	ws.send(idSlideCorrente);
	
};

function setaImagem(){
	
    var settings = {
        primeiraImg: function(){
            elemento = document.getElementById("imagemSlide1");
            elemento.classList.add("ativo");
            this.legenda(elemento);
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
            var idElemento = elemento.id;

            if(elemento.nextElementSibling){
            	
            	enviarMensagem(idElemento + ",prox");
            	var idProximoElemento = valorRetorno;
            	
                document.getElementById(idProximoElemento).classList.add("ativo");
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
            var idElemento = elemento.id;
            
            if(elemento.previousElementSibling){
            	
            	enviarMensagem(idElemento + ",ant");
            	var idAnteriorElemento = valorRetorno;
            	
            	document.getElementById(idAnteriorElemento).classList.add("ativo");
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

    //chama o slide à um determinado tempo
    //var intervalo = setInterval(settings.slide,4000);
    document.querySelector(".next").addEventListener("click",settings.proximo,false);
    document.querySelector(".prev").addEventListener("click",settings.anterior,false);
}

window.addEventListener("load",setaImagem,false);