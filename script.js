// Function to handle actions when the page is loaded
window.onload = function () {
    // Get the div element where the video player and video list will be displayed
    const videoPlayer = document.getElementById('videoPlayer');
    const videoList = document.getElementById('videoList');

    // Retrieve existing video URLs from local storage or initialize an empty array
    const storedVideos = JSON.parse(localStorage.getItem('videos')) || [];

    // Display the list of videos
    displayVideoList(storedVideos, videoList);

    // Check if there are videos to display
    if (storedVideos.length > 0) {
        // Display the first video in the player
        const firstVideoURL = storedVideos[0];
        videoPlayer.innerHTML = `
            <video width="100%" controls>
                <source src="${firstVideoURL}" type="video/mp4">
                Your browser does not support the video tag.
            </video>
        `;
    }
};

// Define a function called uploadVideo
function uploadVideo() {
    // Get the input element for the video file
    const fileInput = document.getElementById('videoFile');

    // Get the div element where the video player and video list will be displayed
    const videoPlayer = document.getElementById('videoPlayer');
    const videoList = document.getElementById('videoList');

    // Retrieve the first (and only) file from the input element
    const file = fileInput.files[0];

    // Check if a file is selected
    if (file) {
        // Create a URL for the selected video file
        const videoURL = URL.createObjectURL(file);

        // Retrieve existing video URLs from local storage or initialize an empty array
        const storedVideos = JSON.parse(localStorage.getItem('videos')) || [];

        // Add the new video URL to the array
        storedVideos.push(videoURL);

        // Store the updated array in local storage
        localStorage.setItem('videos', JSON.stringify(storedVideos));

        // Display the video player with the selected video
        videoPlayer.innerHTML = `
            <video width="100%" controls>
                <source src="${videoURL}" type="video/mp4">
                Your browser does not support the video tag.
            </video>
        `;

        // Display the list of videos
        displayVideoList(storedVideos, videoList);
    } else {
        // Display an alert if no file is selected
        alert('Please choose a video file.');
    }
}

// Function to display the list of videos
function displayVideoList(videos, videoListContainer) {
    // Clear the existing list
    videoListContainer.innerHTML = '';

    // Create a list item for each video in the array
    videos.forEach((videoURL, index) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <span>Video ${index + 1}</span>
            <video width="100%" controls>
                <source src="${videoURL}" type="video/mp4">
                Your browser does not support the video tag.
            </video>
            <button onclick="deleteVideo(${index})">Delete</button>
        `;
        videoListContainer.appendChild(listItem);
    });
}

// Function to delete a video from the list and local storage
function deleteVideo(index) {
    // Retrieve existing video URLs from local storage or initialize an empty array
    const storedVideos = JSON.parse(localStorage.getItem('videos')) || [];

    // Remove the video at the specified index
    storedVideos.splice(index, 1);

    // Store the updated array in local storage
    localStorage.setItem('videos', JSON.stringify(storedVideos));

    // Update the displayed list of videos
    const videoList = document.getElementById('videoList');
    displayVideoList(storedVideos, videoList);
}
