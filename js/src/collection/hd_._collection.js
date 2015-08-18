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
