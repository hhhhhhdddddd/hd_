HD_.MapCollection = (function() {

    return {

        create : function() {
            var collection = Object.create(null);
            collection._elements = {};

            HD_._Collection.initCollection(collection);

            collection.addElement = function(key, element) {
                this._elements[ key ] = element;
            };

            collection.eachElement = function(fun) {
                for (var propName in this._elements) {
                    fun(this._elements[ propName ]);
                }
            };

            return collection;
        }
    };
})();
