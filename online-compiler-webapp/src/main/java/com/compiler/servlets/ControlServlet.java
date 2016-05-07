package com.compiler.servlets;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStreamReader;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.compiler.enums.Language;

public class ControlServlet extends HttpServlet {

	private static final long	serialVersionUID	= 1L;

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public ControlServlet() {
		super();
	}

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doPost(request, response);
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

		boolean isSaveFile = request.getRequestURI().contains("save_file");
		boolean isJavaCompiler = request.getRequestURI().contains("java_compiler");
		if (isSaveFile) {
			saveFile(request, response);
		} else if (isJavaCompiler) {
			initJavaCompiler(request, response);
		}
	}

	private void initJavaCompiler(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
		ClassLoader classLoader = getClass().getClassLoader();
		File defaultJavaFile = new File(classLoader.getResource("default_codes/java.txt").getFile());
		FileInputStream fis = new FileInputStream(defaultJavaFile);
		InputStreamReader input = new InputStreamReader(fis);
		BufferedReader reader = new BufferedReader(input);
		StringBuffer sbuf = new StringBuffer();
		String data;
		while ((data = reader.readLine()) != null) {
			sbuf.append(data);
		}
		reader.close();
		String sessionId = (String) request.getSession(true).getId();
		saveCodeFile(sbuf.toString(), sessionId, Language.JAVA);
		request.getRequestDispatcher("java_compiler/java_compiler.jsp").forward(request, response);
	}

	private void saveFile(HttpServletRequest request, HttpServletResponse response) throws IOException {
		String code = (String) request.getParameter("content");
		String sessionId = (String) request.getSession(true).getId();
		saveCodeFile(code, sessionId, Language.JAVA);

		String jsonRes = "{\"status\":0,\"message\":\"File saved successfully\",\"filename\":\"/home/cg/root/HelloWorld.java\"}";
		response.getWriter().write(jsonRes);
		response.setContentType("text/plain"); // Set content type of the
												// response so that jQuery knows
												// what it can expect.
		response.setCharacterEncoding("UTF-8");
	}

	private void saveCodeFile(String code, String sessionId, Language lan) throws IOException {
		String dirPath = "/Users/prashantthorat/Documents/workspace_uw/compiler-nj/codes/" + lan.getDirName() + "/" + sessionId + "/";
		File file = new File(dirPath);
		if (!file.exists()) {
			if (file.mkdirs()) {
				System.out.println("Directory is created!");
			}
		}
		File codeFile = new File(dirPath + "HelloWorld.java");
		if (codeFile.exists()) {
			codeFile.delete();
		}
		codeFile.createNewFile();
		BufferedWriter output = null;
		try {
			output = new BufferedWriter(new FileWriter(codeFile));
			output.write(code);
		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			if (output != null) {
				output.close();
			}
		}

	}

}
