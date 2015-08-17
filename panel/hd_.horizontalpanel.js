HD_.HorizontalPanel = (function() {

    return {

        create : function(elements, name, style) {
            var hPanel = HD_._PanelStack.create("horizontal", elements, name, style);
            return hPanel;
        }
    };

})();
