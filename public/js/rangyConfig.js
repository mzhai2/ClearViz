var serializedHighlights = decodeURIComponent(window.location.search.slice(window.location.search.indexOf("=") + 1));
var highlighter;

var initialDoc;

window.onload = function() {
    rangy.init();

    highlighter = rangy.createHighlighter();

    highlighter.addClassApplier(rangy.createClassApplier("Person", {
        ignoreWhiteSpace: true,
        tagNames: ["span", "a"]
    }));

    highlighter.addClassApplier(rangy.createClassApplier("Location", {
        ignoreWhiteSpace: true,
        tagNames: ["span", "a"]
    }));
    highlighter.addClassApplier(rangy.createClassApplier("Organization", {
        ignoreWhiteSpace: true,
        tagNames: ["span", "a"]
    }));

    if (serializedHighlights) {
        highlighter.deserialize(serializedHighlights);
    }
};

// function send() {

// }

function highlightPerson() {
    highlighter.highlightSelection("Person");
}
function highlightLocation() {
    highlighter.highlightSelection("Location");
}
function highlightOrganization() {
    highlighter.highlightSelection("Organization");
}
function removeHighlightFromSelectedText() {
    highlighter.unhighlightSelection();
}

function highlightScopedSelectedText() {
    highlighter.highlightSelection("highlight", { containerElementId: "summary" });
}

function noteScopedSelectedText() {
    highlighter.highlightSelection("note", { containerElementId: "summary" });
}

function reloadPage(button) {
    button.form.elements["serializedHighlights"].value = highlighter.serialize();
    button.form.submit();
}