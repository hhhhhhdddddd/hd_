HD_._OneDirectionPanel = (function() {

    return {

        create : function(direction, elements, name) {
            var oneDirPanel = HD_._PanelComposite.create(elements, name, direction + 'Panel');

            if (direction === "horizontal") {
                oneDirPanel.getNumberOfRows = function(index) {
                    return 1;
                };
                oneDirPanel.getNumberOfColumns = function(index) {
                    return this.getNumberOfElements();
                };
                oneDirPanel.getRowIndex = function(index) {
                    return 0;
                };
                oneDirPanel.getColumnIndex = function(index) {
                    return index;
                };
            }
            else if (direction === "vertical") {
                oneDirPanel.getNumberOfRows = function(index) {
                    return this.getNumberOfElements();
                };
                oneDirPanel.getNumberOfColumns = function(index) {
                    return 1;
                };
                oneDirPanel.getRowIndex = function(index) {
                    return index;
                };
                oneDirPanel.getColumnIndex = function(index) {
                    return 0;
                };
            }
            else {
                alert("HD_._OneDirectionPanel.create: direction '" + direction + "' not defined");
            }

            oneDirPanel.buildPanelEmptyTable = function() {
                return HD_._DomTk.buildEmptyTable(this.getNumberOfRows(), this.getNumberOfColumns());
            };

            oneDirPanel.setPanelTableCell = function(index, domNode) {
                HD_._DomTk.setDomTableCell(this._panelContainer,this.getRowIndex(index) , this.getColumnIndex(index), domNode);
            };

            return oneDirPanel;
        }
    };

})();
