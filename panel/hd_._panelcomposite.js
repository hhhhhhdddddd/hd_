HD_._PanelComposite = (function() {

    return {

        create : function(elements, name, className) {
            var panelComposite = Object.create(null);
            HD_._Panel.init(panelComposite, name, className);
            panelComposite._panelElements = [];
                        
            panelComposite.addPanelElement = function(panelElt) {
                panelElt.setPanelParent(this);
                this._panelElements.push(panelElt);
            };

            // Nécessite addPanelElement
            if (elements) {
                elements.forEach(function(elt) {
                    panelComposite.addPanelElement(elt);
                });
            }

            panelComposite.eachPanelElement = function(fun) {
                this._panelElements.forEach(function(panelElt) {
                    fun(panelElt);
                });
            };

            panelComposite.getChildPanel = function(i) {
                return this._panelElements[i];
            };

            panelComposite.clearPanelElements = function() {
                this._panelElements = [];
            };

            panelComposite.buildDomNode = function() {
                var that = this;
                that._panelContainer = that.buildPanelEmptyTable();
                that._panelContainer.setAttribute("name", that._name);
                HD_._DomTk.appendClassName(that._panelContainer, that._className);
                that._panelElements.forEach(function(panelElement, index) {
                    var domNode = panelElement.buildDomNode();
                    domNode.setAttribute("parentPanel", that._name);
                    domNode.setAttribute("index", index);
                    that.setPanelTableCell(index, domNode);
                });
                return that._panelContainer;
            };

            panelComposite.getNumberOfElements = function() {
                return this._panelElements.length;
            };

            panelComposite.buildPanelEmptyTable = function() {
                alert("HD_._PanelComposite - Panel " + this._className + "has no buildPanelEmptyTable() method.");
            };

            panelComposite.setPanelTableCell = function(index, domNode) {
                alert("HD_._PanelComposite - Panel " + this._className + "has no setPanelTableCell() method.");
            };

            return panelComposite;
        }
    };

})();
