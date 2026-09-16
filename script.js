// Get the video and canvas elements
const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Initialize the webcam stream
navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => {
        video.srcObject = stream;
        video.play();
    })
    .catch(err => {
        console.error("Error accessing webcam: ", err);
    });

// Draw the video feed to the canvas continuously
function drawFrame() {
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    requestAnimationFrame(drawFrame); // Keep updating the frame
}

drawFrame();

// Function to overlay the selected dress onto the canvas
function addDress(dressImage) {
    const img = new Image();
    img.src = dressImage;
    img.onload = () => {
        // Adjust the size and position of the dress
        const x = 150;  // Example position (you can tweak this)
        const y = 100;  // Example position (you can tweak this)
        const width = 320; // Size of the dress image
        const height = 400; // Size of the dress image
        ctx.drawImage(img, x, y, width, height);
    };
}

// Add event listeners to dress buttons
const dressButtons = document.querySelectorAll('.dress-button');
dressButtons.forEach(button => {
    button.addEventListener('click', () => {
        const dressImage = button.getAttribute('data-dress');
        addDress(dressImage);
    });
});