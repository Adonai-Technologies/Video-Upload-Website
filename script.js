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
    // Create a list item for the last added video in the array
    const lastIndex = videos.length - 1;
    const listItem = document.createElement('li');
    listItem.innerHTML = `
        <span>Video ${lastIndex + 1}</span>
        <video width="100%" controls>
            <source src="${videos[lastIndex]}" type="video/mp4">
            Your browser does not support the video tag.
        </video>
    `;

    // Append the new list item to the existing list
    videoListContainer.appendChild(listItem);
}
