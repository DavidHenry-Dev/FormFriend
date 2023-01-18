const form = document.querySelector('form');
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
  } else if (video.size > 20 * 1024 * 1024) {
    alert('Video is too large. Maximum file size is 20MB');
  } else if (video.type !== 'video/mp4' || video.type !== 'video/quicktime') {
    alert('Invalid file type. Only mp4 videos are allowed');
  } else {
    form.submit();
  }
});