package br.com.tcc.config;

import java.io.Serializable;
import java.util.Collections;
import java.util.HashSet;
import java.util.Set;
import java.util.Timer;
import java.util.TimerTask;

import javax.inject.Named;
import javax.websocket.OnClose;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;

@Named
@ServerEndpoint("/websocket") 
public class WebsocketEndpoint implements Serializable{ 

	private static final Set<Session> sessions = Collections.synchronizedSet(new HashSet<Session>());
	
	@OnOpen 
	public void onOpen(Session session) { 
		
		sessions.add(session);
		
		System.out.println("ID SESSÃO " + session.getId());
		
		System.out.println("ABRIU A SESSÃO COM O SERVER SIDE");
	
	}
	@OnMessage 
	public String onMessage(String message, Session client) {
		
		System.out.println("MENSAGEM DO CLIENT(SLIDE ATUAL) -> " + message);
		
		String[] mensagemSplit = message.split(",");
		
		String numeroSlideString = mensagemSplit[0].substring(11, 12);
		
		Integer numeroSlide = Integer.parseInt(numeroSlideString);
		
		Integer numeroSlideAbertura = null;
		
		if(mensagemSplit[1].equals("prox")){
			
			numeroSlideAbertura = numeroSlide + 1;
		
		}else if(mensagemSplit[1].equals("ant")){
			
			numeroSlideAbertura = numeroSlide - 1;
		}
		
		
		
//		Timer timer = new Timer();
//		
//		 timer.scheduleAtFixedRate(new TimerTask() {
//	            public void run() {
//	               
//	            }
//	        }, 5000, 1000);
		
		return "imagemSlide" + numeroSlideAbertura;
		
	}
	
	@OnClose 
	public void onClose(Session session) {
		
		sessions.remove(session);
		
		System.out.println("FECHOU CONEXÃO COM O CLIENT");
	}
	
}
