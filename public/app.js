
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


let utcTime = new Date(posts[i].createdAt);
let localTime = new Date(utcTime.getTime() + utcTime.getTimezoneOffset() * 60000);

let date = localTime.toLocaleDateString();
let time = localTime.toLocaleTimeString();

export {date, time}