let box = document.querySelector('.box');
let title = document.getElementById('title');
let description = document.getElementById('description');
let scrollIndicatorFill = document.querySelector('.scroll-indicator-fill');

let images = [
    "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bmF0dXJlfGVufDB8fDB8fHww",
    "https://plus.unsplash.com/premium_photo-1675827055694-010aef2cf08f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8bmF0dXJlfGVufDB8fDB8fHww",
    "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8bmF0dXJlfGVufDB8fDB8fHww",
    "https://images.unsplash.com/photo-1486365227551-f3f90034a57c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YW5pbWFsfGVufDB8fDB8fHww",
    "https://images.unsplash.com/photo-1457140072488-87e5ffde2d77?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGFuaW1hbHxlbnwwfHwwfHx8MA%3D%3D",
    "https://plus.unsplash.com/premium_photo-1663100722417-6e36673fe0ed?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y29kaW5nfGVufDB8fDB8fHww",
    "https://images.unsplash.com/photo-1607706009771-de8808640bcf?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGNvZGluZ3xlbnwwfHwwfHx8MA%3D%3D"
];

// Array of titles and descriptions corresponding to the images
let titles = [
    "Beautiful Nature",
    "City Vibes",
    "Serene Landscape",
    "Mountain Adventure",
    "Golden Hour",
    "Ocean View",
    "Night Sky"
];

let descriptions = [
    "Experience the beauty of nature.",
    "Explore the vibrant city life.",
    "Relax with this serene landscape.",
    "Adventure awaits in the mountains.",
    "Witness the magical golden hour.",
    "Enjoy the tranquility of ocean views.",
    "Gaze at the beauty of the night sky."
];

// Preload images
function preloadImages(imageArray) {
    imageArray.forEach((src) => {
        const img = new Image();
        img.src = src;
    });
}

// Set initial image and title
let currentImageIndex = 0;

function setBackground(index) {
    box.style.backgroundImage = `url(${images[index]})`;
    title.innerText = titles[index];
    description.innerText = descriptions[index];
    changeTextColor(images[index]);
}

// Change text color based on image brightness
function changeTextColor(imageUrl) {
    let img = new Image();
    img.src = imageUrl;
    img.onload = function () {
        let canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        let ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        let data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;

        let r = 0, g = 0, b = 0;
        for (let i = 0; i < data.length; i += 4) {
            r += data[i];
            g += data[i + 1];
            b += data[i + 2];
        }
        let avgColor = (r + g + b) / (data.length / 4);
        box.querySelector('h2').style.color = avgColor < 128 ? '#fff' : '#000';
        box.querySelector('p').style.color = avgColor < 128 ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.8)';
    };
}

window.addEventListener("scroll", () => {
    let scrollPosition = window.scrollY;
    let viewportHeight = window.innerHeight;

    currentImageIndex = Math.floor(scrollPosition / viewportHeight % images.length);

    // Set the new background and text
    setBackground(currentImageIndex);

    // Update scroll indicator
    let scrollPercent = (scrollPosition / (document.body.scrollHeight - viewportHeight)) * 100;
    scrollIndicatorFill.style.width = `${scrollPercent}%`;
});

// Preload images at the start
preloadImages(images);
setBackground(currentImageIndex); // Set the initial background
