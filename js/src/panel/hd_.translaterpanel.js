/*
Un panneau de traduction standard avec autant de bouton que de langage.
*/
HD_.TranslaterPanel = (function() {

    return {
        create : function(translater, translationHandler) {
            var translaterPanel = HD_.HorizontalPanel.create({name: "translater", type: "table", style: {
                position : "absolute",
                top : "0px",
                right : "0px"
            }});

            translaterPanel._translater = translater;
            translaterPanel._translationHandler = translationHandler;

            translaterPanel._translater.eachElement(function(translation) {
                var translationName = translation.getName();
                var translationButton = HD_.PanelField.create({
                    name: translationName,
                    type: "button",
                    labelBuilder: function() {
                        return translationName;
                    },
                    handler: function saveInputsHandler() {
                        var translationName = translationButton.getName();
                        translaterPanel._translationHandler(translationName);
                    }
                });
                translaterPanel.pushPanelElement(translationButton);
            });

            return translaterPanel;
        },

        // Ajoute à panel un panneau avec les boutons de traduction (autant de boutons que de traductions supportées)
        addTranslaterPanel : function(translater, panel, handler) {
            var translaterPanel = HD_.TranslaterPanel.create(translater, function translationHandler(translationName) {

                function refreshFieldsTexts(panel) {
                    panel.mapPanels(function(pan) {
                        if (pan.refreshFieldTexts) {
                            pan.refreshFieldTexts();
                        }
                    });
                }

                translater.setCurrentTranlsation(translationName);
                refreshFieldsTexts(panel);
            });
            var trDomNode = translaterPanel.buildDomNode();
            panel.getDomNode().appendChild(trDomNode);
        }
    };

})();
