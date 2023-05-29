(function() {
  "use strict";
  
  const devModeToggle = document.querySelector("#dotted-menu");
  devModeToggle.checked = false;
  const devModeMenu = document.querySelector(".dev-mode");
  devModeToggle.addEventListener('change', () => {
      if (devModeToggle.checked) {
          devModeMenu.style.height = devModeMenu.scrollHeight+'px';;
        }
        else {
          devModeMenu.style.height = "0px";
      }
  });
  
  const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
  const themeToggle = document.querySelector("#toggle");
  if (prefersDarkScheme.matches) {
    themeToggle.checked = true;
  } else {
    themeToggle.checked = false;
  }
  themeToggle.addEventListener("change", () => {
    if (prefersDarkScheme.matches) {
      document.body.classList.toggle("light-theme");
    } else {
      document.body.classList.toggle("dark-theme");
    }
  });

  const colorList = [...document.querySelector("#color-list").children];
  const rootStyle = document.documentElement.style;
  
  function siblings(elem) {
    const nodes = [...elem.parentNode.children];
    return nodes.filter(node => node !== elem); 
  }

  function pickColor(elem) {
    console.log(elem);
    rootStyle.setProperty("--current-hue", "var(--"+elem.classList[0]+")");
    elem.classList.toggle("active");
    siblings(elem).forEach(node => {
      node.classList.remove("active");
    })
  }
  colorList.forEach(e => e.addEventListener("click", ev => {
    pickColor(e);
  }))

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
          });
      });
  });

  function checkVisible(elm) {
    var rect = elm.getBoundingClientRect();

    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /* or $(window).height() */
        rect.right <= (window.innerWidth || document.documentElement.clientWidth) /* or $(window).width() */
    ) 
  }
  const elements = document.querySelectorAll('.job-title > li');
  let active = 0;
  setInterval(()=>{
    if( ++active >= elements.length) active = 0;
    console.log(elements, active)
    //poor support for options
    if (checkVisible(document.getElementById("profile"))) {
      elements[active].scrollIntoView({
        behavior:'smooth',
        block:'end' //Where to align current item: 'start', 'end' or 'center'
      })
    }
  }, 3000)


})()