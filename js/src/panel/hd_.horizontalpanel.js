HD_.HorizontalPanel = (function() {

    return {

        create : function(options) {
            var hPanel = HD_._StackPanel.create("horizontal", {name: options.name, style: options.style});
            return hPanel;
        }
    };

})();
