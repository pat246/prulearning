<%@page import="java.io.IOException"%>
<%@page import="java.io.FileWriter"%>
<%@page import="java.io.BufferedWriter"%>
<%@page import="java.io.File"%>
<%
String sessionId = (String)request.getParameter("sessionid");
File file = new File("/Users/prashantthorat/Documents/workspace_uw/compiler-nj/codes/"+sessionId+"/");
if (!file.exists()) {
    if (file.mkdirs()) {
        System.out.println("Directory is created!");
    } 
}
File codeFile = new File("/Users/prashantthorat/Documents/workspace_uw/compiler-nj/codes/"+sessionId +"/"+ "HelloWorld.java");
if (codeFile.exists()) {
	codeFile.delete();
}
codeFile.createNewFile();
String code = (String)request.getParameter("content");
BufferedWriter output = null;
try {
    output = new BufferedWriter(new FileWriter(codeFile));
    output.write(code);
} catch ( IOException e ) {
    e.printStackTrace();
} finally {
  if ( output != null ) {
    output.close();
  }
}
%>