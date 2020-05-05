define("script-launcher/rest", ["jquery"], function ($) {

    function Rest() {
        this.executeScript = function (script, successCallback, errorCallback) {
            $.ajax({
                type: "POST",
                cache: false,
                url: AJS.contextPath() + "/rest/power-groovy/1.0/script",
                data: {
                    script: script
                },
                beforeSend: function (request) {
                    request.setRequestHeader("X-Atlassian-Token", "nocheck");
                },
                success: function (data) {
                    if (typeof successCallback == "function") successCallback(data);
                },
                error: function (error) {
                    if (typeof errorCallback == "function") errorCallback(error.responseText);
                }
            });
        }
        this.checkScript = function (script, successCallback, errorCallback) {
            $.ajax({
                type: "POST",
                cache: false,
                url: AJS.contextPath() + "/rest/power-groovy/1.0/script/check",
                data: {
                    script: script
                },
                beforeSend: function (request) {
                    request.setRequestHeader("X-Atlassian-Token", "nocheck");
                },
                success: function (data) {
                    if (successCallback) successCallback(data);
                },
                error: function (error) {
                    if (errorCallback) errorCallback(error.responseText);
                }
            });
        }
    }

    return new Rest();
});