//check if there is local storage color option 
let maincolors = localStorage.getItem("color-option");
if (maincolors !== null){
    document.documentElement.style.setProperty("--main--color",localStorage.getItem("color-option"));
    //check for active class 
    //remove active class from all childrens
    document.querySelectorAll(".colors-list li").forEach(element => {
        element.classList.remove("active");

         //add active class on element with data-color === local storage item
        if(element.dataset.color===maincolors){
            //add active class 
            element.classList.add("active");

        }
    });
}
  // random background option
  let backgroundoption = true;

  //var to controle the background interval 
  let backgroundintrval;
  
  //check if there is local storage random background item
  let backgroundlocalitem = localStorage.getItem("background-option");

  //check if random background storage is empty
  if(backgroundlocalitem !==null){
    if(backgroundlocalitem === 'true')
      backgroundoption = true;
    else
      backgroundoption= false;
    
    //remove active class from all spans
    document.querySelectorAll(".random-backgrounds span").forEach(element=>{
      element.classList.remove("active");
    });
    const yesOption = document.querySelector(".random-backgrounds .yes");
    const noOption = document.querySelector(".random-backgrounds .no");

    if (backgroundlocalitem === 'true') {
        if (yesOption) yesOption.classList.add("active");
    } else {
        if (noOption) noOption.classList.add("active");
    }
  }


  // Toggle spin class on gear icon when hovered
  const gearIcon = document.querySelector(".toggle-settings .fa-gear");
  gearIcon.addEventListener("mouseover", function () {
    this.classList.add("fa-spin");
  });
  gearIcon.addEventListener("mouseout", function () {
    this.classList.remove("fa-spin");
  });

  // Toggle spin class and show/hide settings box on gear icon click
  gearIcon.addEventListener("click", function () {
    this.classList.toggle("fa-spin");
    document.querySelector(".settings-box").classList.toggle("open");
  });

  // Switch colors
  const colorsLi = document.querySelectorAll(".colors-list li");

  //loop on all list items
    colorsLi.forEach((li) => {
        li.addEventListener("click", (e) => {

            // Set color on root (e.g., :root in CSS)
            document.documentElement.style.setProperty('--main--color', e.target.dataset.color);
            
            //set color item to local storage
            localStorage.setItem("color-option",e.target.dataset.color)
            
            //remove active class from all childrens
            hundleactive(e);
        });
    });

    // switch background option
    // Switch colors
  const randimbackel = document.querySelectorAll(".random-backgrounds span");
  
  //loop on all spans
    randimbackel.forEach(span => {
      
      // click on avery span
        span.addEventListener("click", (e) => {
            
          //remove active class from all spans
          hundleactive(e);
            
          //add active class on self 
          e.target.classList.add("active");
          if(e.target.dataset.back==="yes"){
            backgroundoption = true;
            randomiseimgs()
            localStorage.setItem("background-option",true);
          }
          else{
            backgroundoption = false;
            clearInterval(backgroundintrval);
            localStorage.setItem("background-option",false);
          }
        });
    });

  // Select landing page element with the class "landing-page"
  let landingPage = document.querySelector(".landing-page");

  // Get array of images
  let imagesArray = ["1.jpg", "2.jpg", "3.jpg", "4.jpg"];


  //funvtion to randomise images 
  function randomiseimgs(){
    if(backgroundoption === true){
      backgroundintrval= setInterval(function () {
        // Get random number
        let randomNumber = Math.floor(Math.random() * imagesArray.length);
    
        // Change background url with the randomly selected image
        landingPage.style.backgroundImage = `url("images/${imagesArray[randomNumber]}")`;
      }, 1000);
    }
  }
  randomiseimgs()

  // select skill selector
let ourSkills = document.querySelector(".skills");

window.addEventListener("scroll", function () {
  // skill offset top
  let skillsOffsetTop = ourSkills.offsetTop;

  // outer height of skills
  let skillsOuterHeight = ourSkills.offsetHeight;

  // window height
  let windowHeight = this.innerHeight;

  // window scroll top
  let windowScrollTop = this.pageYOffset;

  if (windowScrollTop > skillsOffsetTop + skillsOuterHeight - windowHeight) {
    console.log("skills section reached");

    // Select all skill progress spans
    const skillProgressSpans = document.querySelectorAll(".skill-progress span");

    // Loop through each skill progress span
    skillProgressSpans.forEach((span) => {
      // Get the progress percentage from the data attribute
      const progressPercentage = span.dataset.progress;

      // Set the width of the span based on the progress percentage
      span.style.width = progressPercentage;
    });
  }
});
//creat popup with the image
let ourgallery = document.querySelectorAll(".gallery img");

ourgallery.forEach(img =>{

  img.addEventListener("click",(e)=>{
    //creat overly element 
    let overly = document.createElement("div");

    // add class to overly
    overly.className = "popup-overly";

    // appent overly to the body 
    document.body.appendChild(overly);

    //creat the poopup 
    let popupbox = document.createElement("div");

    //add class to the popup box

    popupbox.className= "popup-box";

    //creat the image

    let popupimage = document.createElement("img");

    // set img source
    popupimage.src = img.src;

    // add img to popup box

    popupbox.appendChild(popupimage);

    //append the popup box to the body  
    document.body.appendChild(popupbox);

    if(img.alt !== null){
      //creat heading
      let imgheadings =document.createElement('h2');

      //creat text for heading
      let imgtxt = document.createTextNode(img.alt);

      //append the text to the heading
      imgheadings.appendChild(imgtxt);

      //apend the heading to the popup box
      popupbox.prepend(imgheadings);
    }

    // creat the close span 
    let closebtn = document.createElement("span");

    //creat the close button text
    let closebtntxt = document.createTextNode("X");

    //append the text to close button
    closebtn.appendChild(closebtntxt);

    //add class to close btn 
    closebtn.className="close-button";

    // add close btn to the popup box
    popupbox.appendChild(closebtn);
  });
});

//close the popup
document.addEventListener("click",function(e){

  if(e.target.className=="close-button"){

    //remove the currnet popup
    e.target.parentNode.remove();
    
    //REMOVE OVERLY 
    document.querySelector(".popup-overly").remove();
  }
})

//select all bullets
const allbullets = document.querySelectorAll(".nav-bullets .bullet");
//select all links
const alllinks = document.querySelectorAll(".header-area ul li a");

let gosomewhere=(function(element){
  element.forEach(ele=>{
    ele.addEventListener("click",(e) =>{
      e.preventDefault();
      document.querySelector(e.target.dataset.section).scrollIntoView( {
      behavior: "smooth"
    });
  });
});
})
gosomewhere(allbullets);
gosomewhere(alllinks);


//handle active state 
function hundleactive(ev){
    //remove active class from all spans
    ev.target.parentElement.querySelectorAll(".active").forEach(element => {
      element.classList.remove("active");
  });
  ev.target.classList.add("active");
}

let bulletspan = document.querySelectorAll(".bullets-option span");
let bulletcontainer = document.querySelector(".nav-bullets");
let bulletlocalitem = localStorage.getItem("bullet-option");

if (bulletlocalitem !== null) {
  bulletspan.forEach((span) => {
    span.classList.remove("active");
  });

  if (bulletlocalitem === 'block') { // Removed the extra space after 'block'
    bulletcontainer.style.display = "block";
    document.querySelector(".bullets-option .yes").classList.add("active");
  } else {
    bulletcontainer.style.display = "none";
    document.querySelector(".bullets-option .no").classList.add("active");
  }
}

bulletspan.forEach((span) => {
  span.addEventListener("click", (e) => {
    if (span.dataset.display === "show") {
      bulletcontainer.style.display = "block";
      localStorage.setItem("bullet-option", "block");
    } else {
      bulletcontainer.style.display = "none";
      localStorage.setItem("bullet-option", "none");
    }
    hundleactive(e);
  });
});

//reset button 
document.querySelector(".reset-options").onclick =function(){
  //localStorage.clear(); or
  localStorage.removeItem("bullet-option");
  localStorage.removeItem("color-option");
  localStorage.removeItem("background-option");
  //reload window
  window.location.reload();
}

//toggle menu
let togglebtn = document.querySelector(".toggle-menu");
let tlinks=document.querySelector(".links");

togglebtn.onclick = function(e){
  
  //stop propagation
  e.stopPropagation();
  
  //toggle class "open" on botton
  this.classList.toggle("menu-active");

  //toggle class "open" on links
  tlinks.classList.toggle("open");
};

//click anywhere outside menu and toggle
document.addEventListener("click",(e)=>{
  if(e.target !== togglebtn && e.target!== tlinks ){

    //check if menu is open 
    if(tlinks.classList.contains("open")){
        //toggle class "open" on botton
        togglebtn.classList.toggle("menu-active");

        //toggle class "open" on links
        tlinks.classList.toggle("open");
    }
  }
})
//stop propagation on the manu links
tlinks.onclick = function(e){
  e.stopPropagation();
}