HD_.VerticalPanel = (function() {

    return {

        create : function(options) {
            var vPanel = HD_._StackPanel.create("vertical", {
                name: options.name,
                style: options.style,
                title: options.title
            });
            return vPanel;
        }
    };

})();
