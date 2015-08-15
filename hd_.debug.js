HD_.Debug = (function() {

    var _localhostName = 'localhost';
    var _fileProtocolName = 'file:';

    return {
        isLocalHost : function() {
            return location.hostname === _localhostName;
        },

        isFileProtocol : function() {
            return location.protocol === _fileProtocolName;
        },

        // Affiche un avertissement clignotant si on travaille en local
        // c'est-à-dire si l'hote est 'localhost' ou si le protocole est 'file:'
        persistentLocalWarnings : function() {

            function createWarning(name) {

                function buildSpan(warningName, blink) {
                    var warningSpan = document.createElement('span');
                    warningSpan.style.backgroundColor = 'red';
                    warningSpan.style.marginLeft = '10px';
                    warningSpan.innerHTML = warningName;
                    return warningSpan;
                }

                function blinkWarning() {
                    var warningSpan = warning.span;
                    warningSpan.style.visibility=(warningSpan.style.visibility === 'visible') ? 'hidden' : 'visible';
                }

                var warning = Object.create(null);
                warning.span = buildSpan(name);

                if (true) {
                    setInterval(blinkWarning,500);
                }

                return warning;
            }

            var warnings = [];
            if (this.isLocalHost()) {
                warnings.push(createWarning("localhost"));
            }
            if (this.isFileProtocol()) {
                warnings.push(createWarning("file:"));
            }

            var warningsContainer = document.createElement("div");
            warningsContainer.innerHTML = "HD_.Debug: ";
            warnings.forEach(function(warning) {
                warningsContainer.appendChild(warning.span);
            });
            document.body.appendChild(warningsContainer);
        }
    };
})();
