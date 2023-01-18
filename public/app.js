const form = document.querySelector('#upload-form');
const videoInput = document.querySelector('#video');
const submitButton = document.querySelector('#submit-button');
const yourPost = document.querySelector('#viewPost')
const toPost= document.querySelector('#goToPost').addEventListener('click', ()=>{
  yourPost.scrollIntoView({ behavior:"smooth" })
})



submitButton.addEventListener('click', e => {
  e.preventDefault();
  const video = videoInput.files[0];
  if (!video) {
    alert('Please select a video');
  } else if (video.size > 5 * 1024 * 1024) {
    alert('Video is too large. Maximum file size is 5MB');
  } else {
    form.submit();
  }
});