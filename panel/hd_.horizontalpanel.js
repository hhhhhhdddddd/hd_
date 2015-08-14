HD_.HorizontalPanel = (function() {

    return {

        create : function(elements, name) {
            var hPanel = HD_._PanelComposite.create(elements, name, "hPanel");

            hPanel.buildPanelEmptyTable = function() {
                return HD_._DomTk.buildEmptyTable(1, this.getNumberOfElements());
            };

            hPanel.setPanelTableCell = function(index, domNode) {
                HD_._DomTk.setDomTableCell(this._panelContainer,0 , index, domNode);
            };

            return hPanel;
        }
    };

})();
