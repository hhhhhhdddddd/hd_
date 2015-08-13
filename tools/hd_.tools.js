HD_.Tools = (function() {

    return {

        pushToChildArray : function(map, key, value) {
            if ( ! map[ key ] ) {
                map[ key ] = [ value ];
            }
            else {
                map[ key ].push( value );
            }
        },

        setPropertyInChild : function(parent, child, key, value) {
            if ( ! parent[ child ] ) {
                parent[ child ] = {};
            }
            parent[ child ][ key ] = value;
        },
    };

})();
