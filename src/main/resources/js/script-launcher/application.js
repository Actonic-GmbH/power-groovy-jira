define("script-launcher/app", ["jquery", "script-launcher/rest", "script-launcher/editor", "util/flag"], function ($, Rest, Editor, flags) {
    var log = console.log;
    var error = console.error;

    //log("pgc/app start");

    function Application() {
        this.init = function () {
            $("#script-run-btn").click(function () {
                log("#script-run-btn");
                executeScript();
            });

            $("#script-check-btn").click(function () {
                log("#script-check-btn");
                checkScript();
            });
        }

        function setResult(data) {
            if (data.result) $("#result-container").text(data.result).fadeIn()
            else $("#result-container").text("empty result").fadeIn()
        }

        function setError(data) {
            if (data.result) $("#error-container").text(data.result).fadeIn()
            else $("#error-container").text("unknown error").fadeIn();
        }

        function onScriptExecutionStart() {
            Editor.disableEditor();
            $("#script-run-btn").attr("aria-disabled", "true");
            $("#script-check-btn").attr("aria-disabled", "true");
            $("#execution-indicator").show();
            $("#result-container").fadeOut().empty();
            $("#error-container").fadeOut().empty();
        }

        function onScriptExecutionEnd() {
            Editor.enableEditor();
            $("#script-run-btn").attr("aria-disabled", "false");
            $("#script-check-btn").attr("aria-disabled", "false");
            $("#execution-indicator").hide();
        }

        function executeScript() {
            onScriptExecutionStart();
            var script = Editor.getScript();
            Rest.executeScript(script,
                function (data) { // success
                    log("Rest.executeScript");
                    log(data);

                    if (data && data.status && data.status == "success") setResult(data);
                    if (data && data.status && data.status == "error") setError(data);

                    onScriptExecutionEnd();
                },
                function (responseText) { // error
                    error(responseText);

                    onScriptExecutionEnd();
                });
        }

        function checkScript() {
            var script = Editor.getScript();
            Rest.checkScript(script,
                function (data) { // success
                    flags.success("Completed", "Syntax is OK");
                },
                function (responseText) { // error
                    error(responseText);
                    flags.error("Syntax error", responseText);
                });
        }
    }

    return new Application();
});
