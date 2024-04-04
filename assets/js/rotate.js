// Array of image sources
const imageSources = [
    'assets/img/blog/Me.png',
    'assets/img/blog/me1.png',
    'assets/img/blog/me2.png',
    'assets/img/blog/mi.png'
];

// Get the image element
const profileImage = document.getElementById('profile-image');

// Initial index for the image array
let currentIndex = 0;

// Function to change the image source
function changeImage() {
    profileImage.src = imageSources[currentIndex];
    currentIndex = (currentIndex + 1) % imageSources.length;
}

// Change the image every 5 seconds
setInterval(changeImage, 3000);