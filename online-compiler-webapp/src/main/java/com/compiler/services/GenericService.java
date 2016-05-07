package com.compiler.services;

import java.text.SimpleDateFormat;
import java.util.Calendar;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Path("/")
public class GenericService {

	@GET
	@Produces(MediaType.TEXT_PLAIN)
	@Path("get_project_title")
	public Response getProjectTitle(@QueryParam("port") int port) {

		String ouptut = "{ \"projecttitle\" :" + "\"New Project-" + getTodayStr() + "\"}";
		return Response.ok(ouptut).build();
	}

	@GET
	@Produces(MediaType.TEXT_PLAIN)
	@Path("init")
	public Response initWebPage(@QueryParam("port") int port) {

		String DATE_FORMAT = "yyyyMMdd";
		SimpleDateFormat sdf = new SimpleDateFormat(DATE_FORMAT);
		Calendar c1 = Calendar.getInstance(); // today
		String todayStr = sdf.format(c1.getTime());
		String ouptut = "{\"status\":0,\"projecttitle\":\"New Project-"
				+ getTodayStr()
				+ "\",\"mainmode\":\"java\",\"mainfile\":\"HelloWorld.java\",\"languageid\":\"java\",\"sessionid\":\"1461693252-108445\",\"version\":\"JDK 1.7.0\",\"ext\":\"java\",\"execute\":\"java -Xmx128M -Xms16M HelloWorld\",\"compile\":\"javac HelloWorld.java\",\"preview\":\"\",\"command\":\"\",\"port\":41796,\"root\":\"/home/cg/root\",\"message\":\"Initialized successfully\"}";
		return Response.ok(ouptut).build();
	}

	private String getTodayStr() {
		String DATE_FORMAT = "yyyyMMdd";
		SimpleDateFormat sdf = new SimpleDateFormat(DATE_FORMAT);
		Calendar c1 = Calendar.getInstance(); // today
		String todayStr = sdf.format(c1.getTime());
		return todayStr;
	}
}
