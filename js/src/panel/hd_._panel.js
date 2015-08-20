HD_._Panel = (function() {

    var _generatedName = 0;

    // todo: plante sur rafraichissement de la racine (mainPanel)
    function _findParentDomNode(panel) {
        return panel._panelDomNode.parentElement;
    }

    return {

        init : function(panel, options) {
            panel._panelDomNode = null;
            panel._parent = null;
            panel._name = options.name ? options.name : "";
            panel._className = options.className;
            panel._style = options.style ? options.style : {};
            panel._title = options.title;

            panel.buildPanelDomNode = function() {
                alert("HD_._Panel -  " + this._className + " has no buildPanelDomNode() method.");
            };

            panel.setPanelParent = function(panelParent) {
                this._parent = panelParent;
            };

            panel.getPanelParent = function() {
                return this._parent;
            };

            // Retourne le panneau racine de l'arbre auquel appartient ce panneau.
            // NB. fonction récursive
            panel.findRootPanel = function() {
                if (this.getPanelParent() === null) {
                    return this;
                }
                else {
                    return this.getPanelParent().findRootPanel();
                }
            };

            panel.buildDomNode = function() {
                var domNode = this.buildPanelDomNode();
                this.applyPanelStyle(domNode);
                return domNode;
            };

            panel.applyPanelStyle = function(domNode) {
                this.applyPanelTreeStyle(domNode);
                if (this._style) {
                    HD_._DomTk.applyStyle(domNode, this._style);
                }
            };

            panel.addPanelStyle = function(styleName, styleValue) {
                this._style[styleName] = styleValue;
            };

            panel.hasPanelStyle = function(styleName) {
                return typeof this._style[styleName] !== "undefined";
            };

            panel.refreshPanel = function() {
                var parent = _findParentDomNode(this);
                parent.removeChild(this._panelDomNode);
                this._panelDomNode = this.buildDomNode();
                parent.appendChild(this._panelDomNode);
            };

            panel.getName = function() {
                return this._name;
            };

            panel.show = function() {
                this._panelDomNode.style.display = "block";
            };

            panel.hide = function() {
                this._panelDomNode.style.display = "none";
            };

            panel.removePanel = function() {
                var parent = _findParentDomNode(this);
                parent.removeChild(this._panelDomNode);
            };

            // Retourne le panneau vérifiant le prédicat passé en argument.
            panel.findPanel = function(predicat) {
                if (predicat(this)) {
                    return this;
                }
                return this.findVerifyingPanel(predicat);
            };
            
            panel.findPanelByName = function(name) {
                return this.findPanel(function(elt) {
                    return name === elt.getName();
                });
            };

            return panel;
        }
    };

})();
