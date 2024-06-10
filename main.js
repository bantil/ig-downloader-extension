console.log("starting!");

const instaxPathSection = "/html/body/div[2]/div/div/div[2]/div/div/div[1]/div[1]/div[2]/section/main/div/div[1]/div/div[2]/div/div[3]/section[1]/div[1]"


function insertUploadButtonToXpath(xpath, text) {
    const result = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);

    const node = result.singleNodeValue;

    if(node) {
        node.textContent = text;
    } else {
        console.log("No element found for the XPATH", xpath);
    }
}

insertUploadButtonToXpath(instaxPathSection, "test");