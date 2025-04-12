/**
 * WEB222 – Assignment 06
 *
 * I declare that this assignment is my own work in accordance with
 * Seneca Academic Policy. No part of this assignment has been
 * copied manually or electronically from any other source
 * (including web sites) or distributed to other students.
 *
 * Please update the following with your information:
 *
 *      Name:       Anderson Yu-Hong Cai
 *      Student ID: 109262246
 *      Date:       2025/4/2
 */ window.onload = function() {
    const addButton = document.getElementById("add-media");
    const mediaContainer = document.getElementById("media-container");
    // create more input for songs
    if (addButton && mediaContainer) // add more songs/videos urls
    addButton.addEventListener("click", ()=>{
        // create .media-block div
        const mediaBlock = document.createElement("div");
        mediaBlock.className = "media-block";
        // create URL for songs/videos
        const urlInput = document.createElement("input");
        urlInput.className = "media-link";
        urlInput.type = "url";
        urlInput.name = "mediaLinks[]";
        urlInput.placeholder = "e.g., https://www.youtube.com/song";
        // create explicit checkbox
        const explicitLabel = document.createElement("label");
        const explicitCheckbox = document.createElement("input");
        explicitCheckbox.className = "explicit-flag";
        explicitCheckbox.type = "checkbox";
        explicitCheckbox.name = "explicitFlags[]";
        explicitLabel.appendChild(explicitCheckbox);
        explicitLabel.appendChild(document.createTextNode(" explicit"));
        // add labels to mediaBlock
        mediaBlock.appendChild(urlInput);
        mediaBlock.appendChild(explicitLabel);
        // add media block to container
        mediaContainer.appendChild(mediaBlock);
    });
    // adjust for submit data
    const form = document.querySelector("#newArtist-form");
    form.addEventListener("submit", function(e) {
        e.preventDefault();
        // deal with social media links
        const socialRaw = document.querySelector("#social-media").value;
        const socialMedia = [];
        const links = socialRaw.split(",").map((s)=>s.trim()).filter((s)=>s.length > 0);
        // check the social media link is valid
        const urlRegex = /^((https?:\/\/)?[\w-]+\.[\w.-]+)/i;
        for(let i = 0; i < links.length; i++){
            const link = links[i];
            if (!urlRegex.test(link)) {
                alert(`Invalid social media link found:\n\nSocial Link #${i + 1}: "${link}"`);
                return;
            }
            socialMedia.push(link);
        }
        // get all songs urls and mark explicit
        const mediaLinks = Array.from(document.querySelectorAll(".media-link")).map((input)=>input.value.trim()).filter((url)=>url.length > 0);
        const explicitCheckboxes = document.querySelectorAll(".explicit-flag");
        const explicitFlags = [];
        explicitCheckboxes.forEach((checkbox)=>{
            explicitFlags.push(checkbox.checked);
        });
        // other input
        const artistName = form.artistName.value;
        const genre = form.genre.value;
        const description = form.description.value;
        const output = {
            artistName,
            genre,
            description,
            mediaLinks,
            explicitFlags,
            socialMedia
        };
        // output turn to JSON string put it to hidden input
        let hidden = form.querySelector("#formattedData");
        hidden.value = JSON.stringify(output);
        form.submit();
    });
};

//# sourceMappingURL=addArtist.69be6610.js.map
