package de.actonic.jira.pg.component;

import com.atlassian.plugin.PluginAccessor;
import com.atlassian.plugin.PluginController;
import com.atlassian.sal.api.ApplicationProperties;
import com.atlassian.sal.api.component.ComponentLocator;
import com.atlassian.sal.api.pluginsettings.PluginSettingsFactory;
import groovy.lang.Binding;
import groovy.lang.GroovyShell;
import groovy.lang.Script;

import java.util.HashMap;

public class GroovyScriptService {
    private final ComponentLocator componentLocator;
    private final PluginSettingsFactory pluginSettingsFactory;
    private final ApplicationProperties applicationProperties;
    private final PluginAccessor pluginAccessor;
    private final PluginController pluginController;

    public GroovyScriptService(ComponentLocator componentLocator, PluginSettingsFactory pluginSettingsFactory,
                               ApplicationProperties applicationProperties, PluginAccessor pluginAccessor,
                               PluginController pluginController) {
        this.componentLocator = componentLocator;
        this.pluginSettingsFactory = pluginSettingsFactory;
        this.applicationProperties = applicationProperties;
        this.pluginAccessor = pluginAccessor;
        this.pluginController = pluginController;
    }

    public String executeScript(String script) {
        GroovyShell groovyShell = getGroovyShell();
        Object result = groovyShell.evaluate(script);

        return String.valueOf(result);
    }

    public String checkScript(String script) {
        GroovyShell groovyShell = getGroovyShell();
        Script result = groovyShell.parse(script);
        return String.valueOf(result);
    }

    private GroovyShell getGroovyShell() {
        Binding binding = new Binding(new HashMap<String, Object>() {{
            put("ComponentAccessor", com.atlassian.jira.component.ComponentAccessor.class);
            put("ComponentLocator", componentLocator);
            put("pluginSettingsFactory", pluginSettingsFactory);
            put("applicationProperties", applicationProperties);
            put("pluginAccessor", pluginAccessor);
            put("pluginController", pluginController);
        }});

        GroovyShell groovyShell = new GroovyShell(getClass().getClassLoader(), binding);

        return groovyShell;
    }
}
