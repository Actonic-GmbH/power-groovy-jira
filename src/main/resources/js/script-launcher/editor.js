define("script-launcher/editor", ["jquery"], function ($) {
    var log = console.log;
    var error = console.error;

    function Editor() {
        var linkToEditor;
        this.init = function () {
            if (ace) {
                var editor = ace.edit("groovy-script-container");
                editor.getSession().setUseWorker(false);
                editor.setTheme("ace/theme/chrome");
                editor.getSession().setMode("ace/mode/groovy");

                linkToEditor = editor;
            } else {
                error(AJS.I18n.getText("editor.cannot.load"));
            }
        }

        this.getScript = function () {
            if (linkToEditor) {
                return linkToEditor.getValue();
            } else {
                error(AJS.I18n.getText("editor.cannot.load"));
            }
        }

        this.setScript = function (script) {
            if (linkToEditor) {
                linkToEditor.setValue(script);
            } else {
                error(AJS.I18n.getText("editor.cannot.load"));
            }
        }

        this.disableEditor = function () {
            if (linkToEditor) linkToEditor.setReadOnly(true);
        }

        this.enableEditor = function () {
            if (linkToEditor) linkToEditor.setReadOnly(false);
        }
    }

    return new Editor();
});
