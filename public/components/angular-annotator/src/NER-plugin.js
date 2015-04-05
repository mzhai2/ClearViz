Annotator.Plugin.NER = function (element, choices) {
  return {
    pluginInit: function () {
        var annotator = this.annotator
        .subscribe("annotationCreated", function (annotation) {
            console.info("The annotation: %o has just been created!", annotation, annotation.quote ,annotation.tags[0])
        })
        .subscribe("annotationUpdated", function (annotation) {
            console.info("The annotation: %o has just been updated!", annotation.quote ,annotation.tags[0])
        })
        .subscribe("annotationDeleted", function (annotation) {
            console.info("The annotation: %o has just been deleted!", annotation.quote ,annotation.tags[0])
        })
        .subscribe("annotationEditorShown", function(annotation) {
            var availableTags = ["Person", "Place","Organization"];
            annotator.plugins.Tags.input.autocomplete({
                source: availableTags,
                minLength: 0
            }).trigger("keydown");
        })
    }
  }
};


