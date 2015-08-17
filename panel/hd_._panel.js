HD_._Panel = (function() {

    var _generatedName = 0;

    // todo: plante sur rafraichissement de la racine (mainPanel)
    function _findParentDomNode(panel) {
        return panel._panelContainer.parentElement;
    }

    return {

        init : function(panel, name, className, style) {
            panel._panelContainer = null;
            panel._name = name ? name : "";
            panel._className = className;
            panel._parent = null;
            panel._style = style;

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

            // todo: remonter l'initialisation de panel._panelContainer ici
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

            panel.refreshPanel = function() {
                var parent = _findParentDomNode(this);
                parent.removeChild(this._panelContainer);
                this._panelContainer = this.buildPanelDomNode();
                parent.appendChild(this._panelContainer);
            };

            panel.getName = function() {
                return this._name;
            };

            panel.show = function() {
                this._panelContainer.style.display = "block";
            };

            panel.hide = function() {
                this._panelContainer.style.display = "none";
            };

            panel.removePanel = function() {
                var parent = _findParentDomNode(this);
                parent.removeChild(this._panelContainer);
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
