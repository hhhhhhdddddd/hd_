HD_.HorizontalPanel = (function() {

    return {

        create : function(elements, name, style) {
            var hPanel = HD_._StackPanel.create("horizontal", elements, name, style);
            return hPanel;
        }
    };

})();
