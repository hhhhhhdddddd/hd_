HD_.HorizontalPanel = (function() {

    return {

        create : function(elements, name) {
            var hPanel = HD_.PanelComposite.create(elements, name, "hPanel");

            hPanel.buildPanelEmptyTable = function() {
                return HD_.HtmlBuilder.buildEmptyTable(1, this.getNumberOfElements());
            };

            hPanel.setPanelTableCell = function(index, domNode) {
                HD_.HtmlBuilder.setDomTableCell(this._panelContainer,0 , index, domNode);
            };

            return hPanel;
        }
    };

})();
