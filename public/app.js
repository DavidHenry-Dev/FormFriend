const form = document.querySelector('#upload-form');
const videoInput = document.querySelector('#video');
const submitButton = document.querySelector('#submit-button');
const yourPost = document.querySelector('#viewPost')
const toPost= document.querySelector('#goToPost').addEventListener('click', ()=>{
  yourPost.scrollIntoView({ behavior:"smooth" })
})



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