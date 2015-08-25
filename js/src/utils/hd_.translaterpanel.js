HD_.TranslaterPanel = (function() {

    return {
        create : function(translater, translationHandler) {
            var translaterPanel = HD_.HorizontalPanel.create({name: "translater", type: "table", style: {
                position : "absolute",
                top : "0px",
                right : "0px"
            }});

            translater.eachElement(function(translation) {
                var translationName = translation.getName();
                var translationButton = HD_.PanelField.create({
                    name: translationName,
                    type: "button",
                    labelBuilder: function() {
                        return translationName;
                    },
                    handler: function saveInputsHandler() {
                        var translationName = translationButton.getName();
                        translationHandler(translationName);
                    }
                });
                translaterPanel.pushPanelElement(translationButton);
            });

            return translaterPanel;
        }
    };

})();
