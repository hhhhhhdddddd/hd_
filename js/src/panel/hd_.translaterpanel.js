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

            translaterPanel.addTranslaterPanel = function(parentDomNode) {
                var translationsPanel = HD_.TranslaterPanel.create(this._translater, this._translationHandler);
                var trDomNode = translationsPanel.buildDomNode();
                parentDomNode.appendChild(trDomNode);
            };

            return translaterPanel;
        },

        addTranslaterPanel : function(translater, panel, handler) {
            var translaterPanel = HD_.TranslaterPanel.create(translater, function translationHandler(translationName) {

                function refreshFieldTexts(panel) {
                    panel.mapPanels(function(pan) {
                        if (pan.refreshFieldTexts) {
                            pan.refreshFieldTexts();
                        }
                    });
                }

                translater.setCurrentTranlsation(translationName);
                refreshFieldTexts(panel);
            });
            var trDomNode = translaterPanel.buildDomNode();
            panel.getDomNode().appendChild(trDomNode);
        }
    };

})();
