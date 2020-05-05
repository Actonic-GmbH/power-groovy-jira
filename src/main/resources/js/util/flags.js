define("util/flag", ["jquery"], function ($) {
    function Flags() {
        var _this = this;
        this.success = function (title, body) {
            _this.show(title, body, "success");
        }
        this.error = function (title, body) {
            _this.show(title, body, "error");
        }
        this.info = function (title, body) {
            _this.show(title, body, "info");
        }
        this.show = function (title, body, type) {
            var ajsVersion = parseFloat(AJS.version.substr(0, 3));

            if (!type) type = "info";
            if (ajsVersion < 5.9) {
                require(["aui/flag"], function (flag) {
                    flag({
                        type: type,
                        title: title,
                        body: body,
                        close: "auto"
                    });
                });
            } else {
                AJS.flag({
                    type: type,
                    title: title,
                    body: body,
                    close: "auto"
                });
            }
        }
    }

    return new Flags();
});