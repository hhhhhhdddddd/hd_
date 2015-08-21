HD_.LocalWarnings = (function() {

    var _warnings = [
        _createWarning({
            name: 'localhost',
            predicatName : "isLocalHost",
            condition : location.hostname
        }),
        _createWarning({
            name: 'file:',
            predicatName : "isFileProtocol",
            condition : location.protocol
        })
    ];

    function _createWarning(warningData) {
        var warning = Object.create(warningData);
        warning._name = warningData.name;
        warning._predicatName = warningData.predicatName;

        warning.warningPredicat = function() {
            return warningData.condition === this._name;
        };

        warning.getWarningPredicatName = function() {
            return this._predicatName;
        };

        warning.getWarningName = function() {
            return this._name;
        };

        warning.buildWarningSpan = function() {

            function buildSpan(warningName) {
                var warningSpan = document.createElement('span');
                warningSpan.style.backgroundColor = 'red';
                warningSpan.style.marginLeft = '10px';
                warningSpan.innerHTML = warningName;
                return warningSpan;
            }

            var warningSpan = buildSpan(this._name);

            setInterval(function blinkWarning() {
                var span = warningSpan;
                span.style.visibility = (span.style.visibility === 'visible') ? 'hidden' : 'visible';
            }, 500);

            return warningSpan;
        };

        return warning;
    }

    function _createWarningsCollection() {
        var localWarnings = HD_.ArrayCollection.create();
        localWarnings._isAtLeastOneWarningTrue = false;

        // Ajoute les warnings et initialise isOneWarningTrue.
        _warnings.forEach(function(warning) {
            localWarnings.addElement(warning);
            localWarnings._isAtLeastOneWarningTrue = localWarnings._isAtLeastOneWarningTrue || warning.warningPredicat();
        });

        localWarnings.isAtLeastOneWarningTrue = function() {
            return this._isAtLeastOneWarningTrue;
        };

        localWarnings.eachTrueWarning = function(fun) {
            return this.eachElement(function(warning) {
                if (warning.warningPredicat()) {
                    fun(warning);
                }
            });
        };

        return localWarnings;
    }

    var _warningsCollection = _createWarningsCollection();

    function _addWarningsPredicats(object) {
        _warningsCollection.eachElement(function(warning) {
            object[warning.getWarningPredicatName()] = function() {
                return warning.warningPredicat.call(warning);
            };
        });
        return object;
    }

    return _addWarningsPredicats({

        // Affiche un avertissement clignotant si on travaille en local
        // c'est-à-dire si l'hote est 'localhost' ou si le protocole est 'file:'
        persistentLocalWarnings : function () {

            if (! _warningsCollection.isAtLeastOneWarningTrue()) {
                return;
            }

            var warningsContainer = document.createElement("div");
            warningsContainer.innerHTML = "HD_.Debug: ";
            
            _warningsCollection.eachTrueWarning(function(warning) {
                warningsContainer.appendChild(warning.buildWarningSpan());
            });
            document.body.appendChild(warningsContainer);
        }
    });
})();
