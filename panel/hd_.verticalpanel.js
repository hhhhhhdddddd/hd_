HD_.VerticalPanel = (function() {

    return {

        create : function(elements, name) {
            var vPanel = HD_.PanelComposite.create(elements, name, "vPanel");

            vPanel.buildPanelEmptyTable = function() {
                return HD_.HtmlBuilder.buildEmptyTable(this.getNumberOfElements(), 1);
            };

            vPanel.setPanelTableCell = function(index, domNode) {
                HD_.HtmlBuilder.setDomTableCell(this._panelContainer,index, 0, domNode);
            };

            return vPanel;
        }
    };

})();
