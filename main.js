// move this to a config file
// group of buttons that has like, comment, share, etc. we will add our DL button here.
const buttonGroup = "/html/body/div[2]/div/div/div[2]/div/div/div[1]/div[1]/div[2]/section/main/div/div[1]/div/div[2]/div/div[3]/section[1]/div[1]"

// instagram keeps the first image in an album in a separate list, and the rest of the images after that are kept in a different list.
// note the li[2] and li[3] differences
const coverImage = "/html/body/div[2]/div/div/div[2]/div/div/div[1]/div[1]/div[2]/section/main/div/div[1]/div/div[1]/div/div/div/div/div/div/div[1]/div[2]/div/div/div/ul/li[2]/div/div/div/div/div[1]/img"
const albumImage = "/html/body/div[2]/div/div/div[2]/div/div/div[1]/div[1]/div[2]/section/main/div/div[1]/div/div[1]/div/div/div/div/div/div/div[1]/div[2]/div/div/div/ul/li[3]/div/div/div/div/div[1]/img"

function insertUploadButtonToXpath(xpath, el) {
    const result = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);

    const node = result.singleNodeValue;

    if(node) {
        node.appendChild(el);
    } else {
        console.log("No element found for the XPATH", xpath);
    }
}

// generate the button to download the image
const newElement = document.createElement("div");
newElement.innerHTML = `
    <div id="dl-download-insta-media" class="dl-download-insta-media 
    dl-z-indexing dl-border-top-left-radius dl-border-top-right-radius 
    dl-border-bottom-right-radius dl-border-bottom-left-radius-2" role="button" tabindex="0">
        <span style="font-size:24px" title="Download Media">⬇️</span>
    </div>
`

// generate the image
insertUploadButtonToXpath(buttonGroup, newElement);


// get the full size image and open it in a new tab
document.getElementById("dl-download-insta-media").addEventListener("click", function() {

    // determine if we're going to download the first pic in the album, or all of the rest of them.
    var currentUrl = window.location.href;
    var imagePath = "";

    var urlObject = new URL(currentUrl);

    var imgIndex = urlObject.searchParams.get("img_index");

    console.log(imgIndex);

    if(imgIndex !== null || imgIndex == 1) {
        imagePath = coverImage;
    } else {
        imagePath = albumImage;
    }

    var imgElement = document.evaluate(
        imagePath,
        document,
        null,
        XPathResult.FIRST_ORDERED_NODE_TYPE,
        null
    ).singleNodeValue;

    // Check if the imgElement is found
    if (imgElement) {
        // Get the src attribute of the <img> tag
        var srcAttribute = imgElement.getAttribute("src");
        
        var newLink = document.createElement("a");
        newLink.href = srcAttribute;
        newLink.target = "_blank"
        newLink.rel = "noopener noreferrer";

        document.body.appendChild(newLink);
        newLink.click();
        document.body.removeChild(openLink);
    } else {
        console.log("Image element not found.");
    }
})