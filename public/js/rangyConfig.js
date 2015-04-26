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
    }
};

function highlight(type) {
    console.log(type);
    highlighter.highlightSelection(type);
}
function removeHighlightFromSelectedText() {
    highlighter.unhighlightSelection();
}