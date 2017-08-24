package br.com.tcc.config;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class ServletHttp extends HttpServlet {

	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

		System.out.println("ABRIU");
		
		resp.setContentType("text/html");
		resp.sendRedirect("paginas/slideshow.html");

	}
	
	@Override
	public void destroy() {
		
		System.out.println("!ABRIU");
	}
}
