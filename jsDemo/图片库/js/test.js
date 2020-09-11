function showPic(whichPic) {
    var source = whichPic.getAttribute("href");
    var placeholder = document.getElementById("placeholder");
    placeholder.setAttribute("src", source);

    var text = whichPic.getAttribute("title");
    var description = document.getElementById("description");
    description.firstChild.nodeValue = text;
}

function openNewWindows() {
    window.open("popup", "width=320, height=480");
}

// function countChildNodes() {
//     var countNum = document.getElementsByTagName("body")[0].childNodes.length;
//     console.log(document.getElementsByTagName("body")[0].childNodes);
//     alert(countNum);
// }
// window.onload = countChildNodes;