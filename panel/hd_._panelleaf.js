HD_._PanelLeaf = (function() {

    return {

        init : function(panelLeaf, name, className) {
            HD_._Panel.init(panelLeaf, name, className);

            panelLeaf.findVerifyingPanel = function(predicat) {
                if (predicat(this)) {
                    return this;
                }
            };

            return panelLeaf;
        }
    };

})();
