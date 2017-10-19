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
		
		pw.println("<link href='/PrototiposTCC/css/slideshow.css' rel='stylesheet' type='text/css' />");

		pw.println("<script type='text/javascript' src='/PrototiposTCC/js/slideshow.js'></script>");
		
		pw.println("</head>");
		pw.println("<body>");
		pw.println("<figure>");
		
		//Verifica se foi enviado os parametros, caso contrário, mostra a página inicial dos slides
		if ((slidePosterior != null && slideAnterior == null) || (slidePosterior == null && slideAnterior != null)) {

			//Verifica se foi enviado o parâmetro para o slide posterior
			if (slidePosterior != null) {
				
				//Se for o primeiro slide a ser chamado após o slide de apresentação, deve apresentar o primeiro slide sem o botão 'anterior'
				if(numeroSlide == 0){
					
					numeroSlide += 1;
					
					pw.println("<img src='images/slide"+numeroSlide+".png'/>");
					pw.println("<span class='trs next' onClick='slidePosteriorHttp()'></span>");
					
				} 
				
				//Se o slide que fez a requisição for penúltimo slide, não deve aparecer o botão 'próximo' no momento que mostrar o último slide
				else if(numeroSlide >= 7){
					
					numeroSlide += 1;
					
					pw.println("<img src='images/slide"+numeroSlide+".png'/>");
					pw.println("<span class='trs prev' onClick='slideAnteriorHttp()'></span>");
					
				} 

				//Se o slide requisitado não for o ultimo slide da lista, carregar os botões normalmente
				else {
					
					numeroSlide += 1;
					
					pw.println("<img src='images/slide"+numeroSlide+".png'/>");
					pw.println("<span class='trs next' onClick='slidePosteriorHttp()'></span>");
					pw.println("<span class='trs prev' onClick='slideAnteriorHttp()'></span>");
				}

			}
			
			//Verifica se foi enviado o parâmetro para o slide anterior
			else if (slideAnterior != null) {
				
				//Se o slide que fez a requisição for segundo slide, não deve aparecer o botão 'anterior' no momento que mostrar o primeiro slide
				if(numeroSlide <= 2){
					
					numeroSlide -= 1;
					
					pw.println("<img src='images/slide"+numeroSlide+".png'/>");
					pw.println("<span class='trs next' onClick='slidePosteriorHttp()'></span>");
					
				} 
				
				//Se o slide requisitado não for o primeiro slide da lista, carregar os botões normalmente
				else {
					
					numeroSlide -= 1;
					
					pw.println("<img src='images/slide"+numeroSlide+".png'/>");
					pw.println("<span class='trs next' onClick='slidePosteriorHttp()'></span>");
					pw.println("<span class='trs prev' onClick='slideAnteriorHttp()'></span>");
				}
				
			}
			
			pw.println("<div id='slider'>");
			
			pw.println("</div>");

		} else {

			numeroSlide = 0;
			
			pw.println("<img src='images/slideInicial.png'/>");
			pw.println("<span class='trs next' onClick='slidePosteriorHttp()'></span>");
			
			
			pw.println("<div id='slider'>");
			
			pw.println("</div>");

		}

		pw.println("</figure>");
		pw.println("</body>");
		pw.println("</html>");

	}
}
