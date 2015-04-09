Annotator.Plugin.NER = function (element, choices) { 
    return {
        pluginInit: function () {
            var annotator = this.annotator('addPlugin', 'Store', {
                // The endpoint of the store on your server.
                prefix: '/api/ner',

                // Attach the uri of the current page to all annotations to allow search.
                annotationData: {
                // 'uri': 'http://this/document/only'
                },

                // This will perform a "search" action when the plugin loads. Will
                // request the last 20 annotations for the current url.
                // eg. /store/endpoint/search?limit=20&uri=http://this/document/only
                // loadFromSearch: {
                //     'limit': 20,
                //     'uri': 'http://this/document/only'
                // }
            })
            .subscribe("annotationCreated", function (annotation) {
                console.info("The annotation: %o has just been created!", annotation, annotation.quote ,annotation.tags[0]);
                var controllerElement = document.querySelector('section');
                var scope = angular.element(controllerElement).scope();
                scope.$apply(function() {
                    console.log(annotation);
                    console.log(scope);
                    scope.annotate(annotation);
                });
            })
            .subscribe("annotationUpdated", function (annotation) {
                console.info("The annotation: %o has just been updated!", annotation.quote ,annotation.tags[0]);
            })
            .subscribe("annotationDeleted", function (annotation) {
                console.info("The annotation: %o has just been deleted!", annotation.quote ,annotation.tags[0]);
            })
            .subscribe("annotationEditorShown", function(annotation) {
                var availableTags = ["Person", "Place","Organization"];
                annotator.plugins.Tags.input.autocomplete({
                    source: availableTags,
                    minLength: 0
                })
                .trigger("keydown");
            });
        }
    };
};


