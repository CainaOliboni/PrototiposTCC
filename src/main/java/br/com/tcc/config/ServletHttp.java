package br.com.tcc.config;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class ServletHttp extends HttpServlet {

	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {

		PrintWriter pw = resp.getWriter();

		pw.println("<html>");
		pw.println("<head>");
		pw.println("<title>SERVLET HTTP</title>");
		pw.println("</head>");
		pw.println("<body>");
		pw.println("<h1>GG WP!</h1>");

		String parametro = req.getParameter("Parametro1");

		if (parametro != null) {

			if (parametro.equals("1")) {

				pw.println("<img src='img/Koala.jpg'/>");
			}

			else if (parametro.equals("2")) {

				pw.println("<img src='img/Lighthouse.jpg'/>");
			}

		}

		pw.println("</body>");
		pw.println("</html>");

	}

	// protected void service(HttpServletRequest request,
	// HttpServletResponse response) throws ServletException, IOException {
	//
	// System.out.println("salve Jhooow 2");
	//
	// PrintWriter pw = response.getWriter();
	//
	// pw.println("<html>");
	// pw.println("<head>");
	// pw.println("<title>SERVLET HTTP</title>");
	// pw.println("</head>");
	// pw.println("<body>");
	// pw.println("<h1>GG WP!</h1>");
	// // pw.println("<img src='img/Koala.jpg'/>");
	// pw.println("</body>");
	// pw.println("</html>");
	// }

}
