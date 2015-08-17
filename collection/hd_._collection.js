HD_._Collection = (function() {

    return {

        initCollection : function(collection) {
            collection.getElement =  function(key) {
                return this._elements[ key ];
            };
        }
    };
})();
