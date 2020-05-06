# Power Groovy for Jira
The app for Atlassian Jira Server. Run Groovy scripts, automate routine tasks, change issues in bulk, get access to Jira API without add-ons creation
Check out our apps on marketplace https://marketplace.atlassian.com/vendors/1214306/actonic-gmbh

# Start up Jira with the app installed
You can use the atlas-run command to run the Jira application and install the app.

Change to the 'power-groovy-jira' directory and enter the following command: 

``` 
atlas-run
```

This is going to use the information in the plugin description to download Jira and all of the other plugins it needs, then start Jira with your plugin installed. The first time you do this, it might take several minutes to complete.  

Once Jira has started, you'll see something like this in the Command Prompt window:

```
[INFO] [talledLocalContainer] May 05, 2020 5:51:33 PM org.apache.catalina.startup.Catalina start
[INFO] [talledLocalContainer] INFO: Server startup in 234207 ms
[INFO] [talledLocalContainer] Tomcat 8.x started on port [2990]
[INFO] jira started successfully in 332s at http://DESKTOP-ACTONIC01:2990/jira
[INFO] Type Ctrl-D to shutdown gracefully
[INFO] Type Ctrl-C to exit
```

Open a browser window and navigate to localhost:2990/jira.  To login, use the credentials:

```
Username	admin
Password	admin
```

A Welcome dialog will appear and you'll be asked to configure some basic Jira settings.

Type gg, and then type `Power Groovy`. From the list that appears, select `Script Launcher Power Groovy`. 
(Alternatively you can click on the cog icon at the top of the screen to open the administration dialog, and then select Manage apps and finally when the Atlassian Marketplace Administration page opens, select Script Launcher from left-side menu). 

# Contact us
Support portal - https://actonic.atlassian.net/servicedesk/customer/portal/8

