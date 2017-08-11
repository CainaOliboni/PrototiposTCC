package br.com.tcc.config;

import java.io.Serializable;
import java.util.Collections;
import java.util.HashSet;
import java.util.Set;

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
	
	}
	@OnMessage 
	public String onMessage(String message, Session client) {
		
		System.out.println("MENSAGEM DO CLIENT -> " + message);
		
		return "FALA COMIGO QUE EU SOU SEU AMIGO";
		
	}
	
	@OnClose 
	public void onClose(Session session) {
		
		sessions.remove(session);
	}
	
}
