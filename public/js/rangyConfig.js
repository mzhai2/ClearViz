var serializedHighlights = decodeURIComponent(window.location.search.slice(window.location.search.indexOf("=") + 1));
var highlighter;
var initialDoc;

window.onload = function() {
    rangy.init();

    highlighter = rangy.createHighlighter();

    for (var tag in tags)
    {
        highlighter.addClassApplier(rangy.createClassApplier(tags[tag], {
            ignoreWhiteSpace: true,
            tagNames: ["span", "a"]
        }));
        console.log(tags[tag]);
    }

    if (serializedHighlights) {
        highlighter.deserialize(serializedHighlights);
    }
};

function highlight(type) {
    highlighter.highlightSelection(type);
}
function removeHighlightFromSelectedText() {
    highlighter.unhighlightSelection();
}