HD_._Collection = (function() {

    return {

        initCollection : function(collection) {
            collection._size = 0;

            collection.eachElement = function(fun) {
                alert("HD_._Collection: eachElement no implemented");
            };

            collection.clearCollection = function(fun) {
                alert("HD_._Collection: clearCollection no implemented");
            };

            /*
            On profite du fait que les tableaux sont des objets
            dont les clé sont les indices.
            */
            collection.findElement = function(predicat) {
                var size = this.getSize();
                for (var key in this._elements) {
                    var currentElement = this.getElement(key);
                    if (predicat(currentElement)) {
                        return currentElement;
                    }
                }
                return null;
            };

            collection.getElement =  function(key) {
                return this._elements[ key ];
            };

            collection.addElement =  function(key) {
                this._size++;
                return this._addCollectionElement(key);
            };

            collection.getSize =  function(key) {
                return this._size;
            };
        }
    };
})();
