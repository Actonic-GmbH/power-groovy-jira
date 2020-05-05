package de.actonic.jira.pg.rest;

import com.google.gson.Gson;
import de.actonic.jira.pg.component.GroovyScriptService;

import javax.ws.rs.FormParam;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Response;
import java.io.PrintWriter;
import java.io.StringWriter;
import java.util.HashMap;
import java.util.Map;

import static javax.ws.rs.core.MediaType.APPLICATION_JSON;

@Path("/script")
@Produces(APPLICATION_JSON)
public class ScriptRest {
    private final GroovyScriptService groovyScriptService;

    public ScriptRest(GroovyScriptService groovyScriptService) {
        this.groovyScriptService = groovyScriptService;
    }

    @POST
    @Path("/")
    public Response addTask(@FormParam("script") String script) {
        try {
            String result = groovyScriptService.executeScript(script);
            Map resultJsonMap = new HashMap();
            resultJsonMap.put("status", "success");
            resultJsonMap.put("result", result);

            return Response.ok(new Gson().toJson(resultJsonMap)).build();
        } catch (Exception e) {
            Map resultJsonMap = new HashMap();
            resultJsonMap.put("status", "error");
            resultJsonMap.put("result", e.getMessage());
            resultJsonMap.put("stacktrace", stackTraceToString(e));

            return Response.ok().entity(new Gson().toJson(resultJsonMap)).build();
        }
    }

    @POST
    @Path("/check")
    public Response checkScript(@FormParam("script") String script) {
        try {
            String result = groovyScriptService.checkScript(script);
            return Response.ok(new Gson().toJson(result)).build();
        } catch (Exception e) {
            return Response.serverError().entity(new Gson().toJson(e.getMessage())).build();
        }
    }

    private String stackTraceToString(Exception e) {
        StringWriter sw = new StringWriter();
        PrintWriter pw = new PrintWriter(sw);
        e.printStackTrace(pw);
        return sw.toString();
    }
}
