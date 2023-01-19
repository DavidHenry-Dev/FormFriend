
// Add scrolling down to post by the user on profile page
const submitButton = document.querySelector('#submit-button');
const yourPost = document.querySelector('#viewPost')
const toPost= document.querySelector('#goToPost').addEventListener('click', ()=>{
  yourPost.scrollIntoView({ behavior:"smooth" })
})


// Form video/video size validation
const videoInput = document.querySelector('#video');
const form = document.querySelector('#upload-form');
videoInput.addEventListener('change', e => {
  e.preventDefault();
  const video = videoInput.files[0];
  if (!video) {
    alert('Please select a video');
    return false;
  } else if (video.size > 4 * 1024 * 1024) {
    alert('File is too large. Please crop or try another video');
    form.reset();
    return false;
  }
  return true;
});


// Get the video element
const vidPreview = document.getElementById("vid");

// Create an image element
const img = document.createElement("img");

// Create an object URL for the video
const videoUrl = URL.createObjectURL(vidPreview);

// Set the src of the image element to the object URL
img.src = videoUrl;

// Set the poster attribute of the video element to the image element
vidPreview.setAttribute("poster", img.src);

// When you're done with the object URL, revoke it to release the memory.
vidPreview.onloadeddata = function() {
    URL.revokeObjectURL(videoUrl);
}