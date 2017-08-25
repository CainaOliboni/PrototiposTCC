package br.com.tcc.config;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class ServletHttp extends HttpServlet {
	
	private Integer numeroSlide = 0;
	
	@Override
	public void init() throws ServletException {

		System.out.println("ABRIU A CONEXÃO");

	}

	@Override
	public void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

		System.out.println("NOVA REQUISICÃO");

		String slidePosterior = (String) req.getParameter("SlidePosterior");

		String slideAnterior = (String) req.getParameter("SlideAnterior");

		PrintWriter pw = resp.getWriter();

		pw.println("<html>");
		pw.println("<head>");
		pw.println("<title>Primeira Servlet</title>");
		pw.println("<script>");

		pw.println("function slidePosteriorHttp() { ");
		pw.println("document.location.href = '/PrototiposTCC/prototipoHttp?SlidePosterior=' + 1;");
		pw.println("}");

		pw.println("function slideAnteriorHttp() { ");
		pw.println("document.location.href = '/PrototiposTCC/prototipoHttp?SlideAnterior=' + 1;");
		pw.println("}");

		pw.println("</script>");
		pw.println("</head>");
		pw.println("<body>");

		if ((slidePosterior != null && slideAnterior == null) || (slidePosterior == null && slideAnterior != null)) {

			if (slidePosterior != null) {
				
				if(numeroSlide >= 2){
					
					numeroSlide += 1;
					
					pw.println("<img src='images/img"+numeroSlide+".jpg' alt='Legenda da imagem '" + numeroSlide + "/>");
					
					pw.println("<button id='slideAnteriorHttp' onClick='slideAnteriorHttp()'>Anterior</button>");
					
				} else {
					
					numeroSlide += 1;
					
					pw.println("<img src='images/img"+numeroSlide+".jpg' alt='Legenda da imagem '" + numeroSlide + "/>");
					
					pw.println("<button id='slideAnteriorHttp' onClick='slideAnteriorHttp()'>Anterior</button>");

					pw.println("<button id='slidePosteriorHttp' onClick='slidePosteriorHttp()'>Próximo</button>");
				}

			} else if (slideAnterior != null) {
				
				if(numeroSlide <= 1){
					
					numeroSlide -= 1;
					
					pw.println("<img src='images/slide1.jpg' alt='Legenda da imagem '" + numeroSlide +"/>");
					
					pw.println("<button id='slidePosteriorHttp' onClick='slidePosteriorHttp()'>Próximo</button>");
					
				} else {
					
					numeroSlide -= 1;
					
					pw.println("<img src='images/img"+numeroSlide+".jpg' alt='Legenda da imagem '" + numeroSlide +"/>");

					pw.println("<button id='slideAnteriorHttp' onClick='slideAnteriorHttp()'>Anterior</button>");

					pw.println("<button id='slidePosteriorHttp' onClick='slidePosteriorHttp()'>Próximo</button>");
				}
				
			}

		} else {

			pw.println("<img src='images/Koala.jpg' alt='Legenda da imagem '" + numeroSlide +"/>");

			pw.println("<button id='slidePosteriorHttp' onClick='slidePosteriorHttp()'>Próximo</button>");

		}

		pw.println("</body>");
		pw.println("</html>");

	}
}
