let nav = document.querySelector("header .container nav");
let menuIcon = document.querySelector("header .container nav .navIcon");
menuIcon.onclick = () => {
  nav.classList.toggle("active");
};
// ------------------------------------
let navMenuItems = Array.from(
  document.querySelectorAll("header .container nav .navList li")
);
navMenuItems.forEach((item) => {
  item.onclick = () => {
    navMenuItems.forEach((i) => {
      i.classList.remove("active");
    });
    item.classList.add("active");
  };
});
// ------------------------------------
// ----------------skills part of code--------------------
let skillsMenuItem = Array.from(
  document.querySelectorAll(".skills .container .thumbnail button")
);
let skillsBoxes = Array.from(
  document.querySelectorAll(".skills .container .content .box ")
);
skillsMenuItem.forEach((skillCat)=>{
skillCat.onclick=()=>{
    removeActiveFromSkills();
    skillCat.classList.add("active");
    let cat=skillCat.getAttribute("data-cat")
    skillsBoxes.forEach((skillBox)=>{
        if(cat=="all"){
            skillBox.classList.add("active");
        }else if(skillBox.dataset.type==cat){
            skillBox.classList.add("active");
        }
    })
}
})
let removeActiveFromSkills=()=>{
    skillsMenuItem.forEach((skillCat)=>{
        skillCat.classList.remove('active');
    })
    skillsBoxes.forEach((skillBox)=>{
        skillBox.classList.remove("active");
    })
}
let progressspans=Array.from(document.querySelectorAll(".skills .container .content .box .BackSide .progress span"));
progressspans.forEach((spans)=>{
  spans.style.width=`${spans.dataset.target}`;
  spans.innerHTML=spans.dataset.target;
})
// contact 
let textAreaInput=document.querySelector(".contact .content form .message textarea");
let charCounter=document.querySelector(".contact .content form .message .Charlimit");
let charProgressBar=document.querySelector(".contact .content form .message .CharProgress");
let inputMaxLength=textAreaInput.getAttribute('maxlength');
let submitBtn=document.querySelector('.contact .submitBtn')
charCounter.innerHTML=inputMaxLength;
textAreaInput.addEventListener('input',()=>{
    let CurrentInputLength=textAreaInput.value.length;
    charCounter.innerHTML=inputMaxLength-CurrentInputLength;
    charProgressBar.style.width=`${(CurrentInputLength/inputMaxLength)*100}%`;
    if(charCounter.innerHTML==0){
        charCounter.classList.add('zero');
        charProgressBar.style.backgroundColor='red';
        submitBtn.setAttribute('title',"you have reached the limit :(");
    }
    else{
        charCounter.classList.remove('zero');
        charProgressBar.style.backgroundColor='var(--';
        submitBtn.style.cursor="pointer";
        submitBtn.setAttribute('title',"");
    }
})

