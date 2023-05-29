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


})()