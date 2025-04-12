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
 */ // All of our data is available on the global `window` object.
// Create local variables to work with it in this file.
const { artists, songs } = window; // Destructuring Assignment
// For debugging, display all of our data in the console. You can remove this later.
console.log({
    artists,
    songs
}, "App Data"); // leave here to check it can work correctly
window.onload = function() {
    if (!artists) {
        console.error("No artists found!");
        return;
    }
    const menu = document.querySelector("#menu");
    const selectedArtist = document.querySelector("#selected-artist");
    const cardContainer = document.querySelector("#card-container");
    artists.forEach((artist)=>{
        const button = document.createElement("button");
        let textNode = document.createTextNode(artist.name);
        button.appendChild(textNode);
        button.addEventListener("click", ()=>showArtistInfo(artist));
        menu.appendChild(button);
    });
    showArtistInfo(artists[0]); // default to the first one
    // choose artist and show their details
    function showArtistInfo(artist) {
        // console.log(artist);
        let artistInfoHTML = artist.name + "(";
        let linkInfoHTML = artist.links.map((link)=>{
            return `<a href=${link.url} target="_blank">${link.displayName}</a>`;
        }).join(", "); // map to return a list and join to combine them
        artistInfoHTML += linkInfoHTML + ")";
        selectedArtist.innerHTML = artistInfoHTML;
        // clean card container
        cardContainer.innerHTML = "";
        let filteredSongs = songs.filter((song)=>song.artistId === artist.artistId && !song.explicit);
        if (filteredSongs.length === 0) {
            cardContainer.innerHTML = `<p>No available songs</p>`;
            return;
        }
        filteredSongs.forEach((song)=>{
            cardContainer.appendChild(createSongCard(song));
        });
        function convertLanguageCodes(langCode) {
            let langNames = new Intl.DisplayNames([
                "en"
            ], {
                type: "language"
            });
            return langCode.map((code)=>langNames.of(code)).join(", "); // turn to string and combine
        }
        function formatTime(length) {
            return `${Math.floor(length / 60)}:${length % 60 < 10 ? "0" + length % 60 : length % 60} `;
        }
        // assignment 5: add cards
        function createSongCard(song) {
            // Create a <div> to hold the card
            const card = document.createElement("div");
            // Add the .card class to the <div>
            card.classList.add("card");
            // Create a song image, use the .card-image class
            // Also, the img should be a link
            const songLink = document.createElement("a");
            songLink.href = song.link;
            songLink.target = "_blank";
            const songImg = document.createElement("img");
            songImg.src = song.imageUrl;
            songImg.alt = `Image: ${song.title}`;
            songImg.classList.add("card-image");
            songLink.appendChild(songImg);
            card.appendChild(songLink);
            // Song Title
            const title = document.createElement("h3");
            title.classList.add("card-title");
            title.textContent = song.title;
            card.appendChild(title);
            // === Footer wrapper ===
            const footer = document.createElement("div");
            footer.classList.add("card-footer");
            // --- Left side (year + language) ---
            const footerLeft = document.createElement("div");
            footerLeft.classList.add("card-footer-left");
            const time = document.createElement("time");
            time.textContent = song.year;
            const lang = document.createElement("span");
            lang.classList.add("lang");
            lang.textContent = convertLanguageCodes(song.lang); // song.lang is an array
            footerLeft.appendChild(time);
            footerLeft.appendChild(lang);
            // --- Right side (duration) ---
            const footerRight = document.createElement("div");
            footerRight.classList.add("card-footer-right");
            const duration = document.createElement("span");
            duration.classList.add("duration");
            duration.textContent = formatTime(song.length);
            footerRight.appendChild(duration);
            // combine left and right to footer
            footer.appendChild(footerLeft);
            footer.appendChild(footerRight);
            // put it to card
            card.appendChild(footer);
            // Return the card
            return card;
        }
    }
};

//# sourceMappingURL=assignment-6.8f0c9192.js.map
