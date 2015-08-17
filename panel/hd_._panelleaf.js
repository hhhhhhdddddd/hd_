HD_._PanelLeaf = (function() {

    return {

        init : function(panelLeaf, name, className) {
            HD_._Panel.init(panelLeaf, name, className);

            panelLeaf.findVerifyingPanel = function(predicat) {
                // Rien de plus à faire que ce qui est fait dans panel.findPanel()
            };

            panelLeaf.applyPanelTreeStyle = function(domNode) {
                // Rien de plus à faire que ce qui est fait dans panel.findPanel()
            };

            return panelLeaf;
        }
    };

})();
