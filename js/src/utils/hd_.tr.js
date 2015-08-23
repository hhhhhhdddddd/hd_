HD_.Translater = (function() {

    return {
        create : function() {
            var translater = Object.create(null);
            translater._localTranslations = null;
            translater._translationsKeys = null;

            translater.setLocalTr = function(localTranslations) {
                this._localTranslations = localTranslations;
            };

            translater.setTrKeys = function(translationsKeys) {
                this._translationsKeys = translationsKeys;
            };

            translater.getTrKey = function(translationsKeys) {
                return this._translationsKeys[translationsKeys];
            };

            translater.translate = function(textData) {

                /*
                Retourne une chaine de caractères où les variables de la forme %x 
                (avec x un entier allant de 1 à 9) sont remplacées par les valeurs
                des arguments correspondant. Le premier argument étant là chaine originale,
                on a :
                %1 est remplacée par la valeur du deuxième argument (arguments[1])
                %2 est remplacée par la valeur du troisième argument (arguments[2]), etc.
                */
                function replaceArgs(string) {
                    var stringVarRegExp = /(%.)/;
                    var matchData;
                    var currentReplacement;
                    var i = 1; // pour pointer sur le premier argument optionnel, arguments[1]
                    var translatedString = string;
                    while ( ( matchData = stringVarRegExp.exec(translatedString )) !== null ) {
                        currentReplacement = translatedString.replace( matchData[0], arguments[ i ]  );
                        translatedString =  currentReplacement;
                        i++;
                    }

                    return translatedString;
                }

                var fullTranslation = null;
                if (Array.isArray(textData)) {
                    var trKey = textData[0];
                    var trArgs = [];
                    for (var j = 1; j < textData.length; j++) {
                        trArgs.push(textData[j]);
                    }
                    fullTranslation = replaceArgs(translater._localTranslations[trKey], trArgs);
                }
                else {
                    fullTranslation = translater._localTranslations[textData];
                }

                return fullTranslation;
            };

            return translater;
        }
    };

})();
