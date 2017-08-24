package br.com.tcc.config;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class ServletHttp extends HttpServlet {
	
	@Override
	public void init() throws ServletException {
		
		System.out.println("ABRIU");
		
	}
	
	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

		System.out.println("NOVA REQUISICÃO");
		
		String param = (String) req.getParameter("ProximoSlide");
		
	    PrintWriter pw = resp.getWriter();
	    
	    pw.println("<html>");
	    pw.println("<head>");
	    pw.println("<title>Primeira Servlet</title>");
	    pw.println("</head>");
	    pw.println("<body>");
		
		if(param != null){
			
			if(param.equals("1")){
				
			    pw.println("<img src='../images/Desert.jpg' alt='Legenda da imagem 1' />");
			
			} else if(param.equals("2")){
				
				pw.println("<img src='../images/Koala.jpg' alt='Legenda da imagem 2' />");
			}
			
		} else{
			
			resp.setContentType("text/html");
			resp.sendRedirect("paginas/slideshow.html");
		}
		
	    pw.println("</body>");
	    pw.println("</html>");

	}
}
