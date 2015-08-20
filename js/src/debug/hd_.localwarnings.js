HD_.LocalWarnings = (function() {

    var _warningTypes = [
        {
            name: 'localhost',
            predicatName : "isLocalHost",
            predicat : function() {
                return location.hostname === this.name;
            }
        },
        {
            name: 'file:',
            predicatName : "isFileProtocol",
            predicat : function() {
                return location.protocol === this.name;
            }
        }
    ];

    function _addWarningsPredicats(object) {
        _warningTypes.forEach(function(warningType) {
            object[warningType.predicatName] = warningType.predicat;
        });
        return object;
    }

    return _addWarningsPredicats({

        createWarningsCollection : function() {
            
            function buildWarningSpan(warning) {

                function buildSpan(warningName) {
                    var warningSpan = document.createElement('span');
                    warningSpan.style.backgroundColor = 'red';
                    warningSpan.style.marginLeft = '10px';
                    warningSpan.innerHTML = warningName;
                    return warningSpan;
                }

                var warningSpan = buildSpan(warning.name);

                setInterval(function blinkWarning() {
                    var span = warningSpan;
                    span.style.visibility = (span.style.visibility === 'visible') ? 'hidden' : 'visible';
                }, 500);

                return warningSpan;
            }

            var localWarnings = HD_.ArrayCollection.create();
            localWarnings._isAtLeastOneWarningTrue = false;

            // Ajoute les warnings et initialise isOneWarningTrue.
            _warningTypes.forEach(function(warningType) {
                localWarnings.addElement(warningType);
                localWarnings._isAtLeastOneWarningTrue = localWarnings._isAtLeastOneWarningTrue || warningType.predicat();
            });

            localWarnings.isAtLeastOneWarningTrue = function() {
                return this._isAtLeastOneWarningTrue;
            };

            localWarnings.buildEachTrueWarningSpan = function(fun) {
                return this.eachElement(function(warning) {
                    if (warning.predicat()) {
                        fun(buildWarningSpan(warning));
                    }
                });
            };

            return localWarnings;
        },

        // Affiche un avertissement clignotant si on travaille en local
        // c'est-à-dire si l'hote est 'localhost' ou si le protocole est 'file:'
        persistentLocalWarnings : function () {

            var localWarnings = this.createWarningsCollection();
            if (! localWarnings.isAtLeastOneWarningTrue()) {
                return;
            }

            var warningsContainer = document.createElement("div");
            warningsContainer.innerHTML = "HD_.Debug: ";
            
            localWarnings.buildEachTrueWarningSpan(function(warningSpan) {
                warningsContainer.appendChild(warningSpan);
            });
            document.body.appendChild(warningsContainer);
        }
    });
})();
