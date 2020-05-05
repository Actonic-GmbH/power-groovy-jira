package de.actonic.jira.pg.webwork;

import com.atlassian.jira.web.action.ActionViewDataMappings;
import com.atlassian.jira.web.action.JiraWebActionSupport;

import java.util.HashMap;
import java.util.Map;

public class ScriptLauncherPageAction extends JiraWebActionSupport {
    private final Map data = new HashMap();

    public ScriptLauncherPageAction() {
    }

    @Override
    public String doExecute() throws Exception {
        return SUCCESS;
    }

    @ActionViewDataMappings({"input", "success", "error"})
    public Map getData() {
        return data;
    }
}
