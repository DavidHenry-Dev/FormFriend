const yourPost = document.querySelector('#viewPost')
const toPost= document.querySelector('#goToPost').addEventListener('click', ()=>{
  yourPost.scrollIntoView({ behavior:"smooth" })
})
