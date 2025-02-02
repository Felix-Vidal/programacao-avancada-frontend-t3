htmlIdArray = ["circleA", "circleB", "circleC", "circleD"];
circleInternSizeNumber = [100, 66, 4, 222, 60];



// Iniciando o loader quando o usuario chega no elemento
let dataAreaOffset = $('#data-area').offset();
let stop = 0;

$(window).scroll(function(e){

    let scroll = $(window).scrollTop();

    if(scroll > (dataAreaOffset.top - 500) && stop == 0){
      createCirclesUsingArrays(htmlIdArray, circleInternSizeNumber);

      stop = 1;
    }
});


function createCirclesUsingArrays(htmlIdArray, circleInternSizeNumber) {
    for (let i = 0; i < htmlIdArray.length; i++) {
      activeCircle(
        returnNewProgressBarObj(returnHtmlElementId(htmlIdArray[i]), circleInternSizeNumber[i])
      );
    }
}

function activeCircle(progressBar) {
    progressBar.text.style.fontFamily = '"Raleway", Helvetica, sans-serif';
    progressBar.text.style.fontSize = "2rem";
    progressBar.animate(1.0); // Number from 0.0 to 1.0
  }
  
function returnNewProgressBarObj(circleName, internSize) {
  return new ProgressBar.Circle(circleName, returnCircleObj(internSize));
}

function returnCircleObj(internSize){
    return {
        color: "#aaa",
        // This has to be the same size as the maximum width to
        // prevent clipping
        strokeWidth: 4,
        trailWidth: 1,
        easing: "easeInOut",
        duration: 1400,
        text: {
          autoStyleContainer: true,
        },
        from: { color: "#aaa", width: 1 },
        to: { color: "#333", width: 4 },
        // Set default step function for all animate calls
        step: function (state, circle) {
            circle.path.setAttribute("stroke", state.color);
            circle.path.setAttribute("stroke-width", state.width);
      
            let value = Math.round(circle.value() * internSize);
            if (value === 0) {
              circle.setText("");
            } else {
              circle.setText(value);
            }
          }}   
}    

function returnHtmlElementId(name) {
  return document.getElementById(name);
}

// Filtro do portfólio

$('.filter-btn').on('click', function(){

  let type = $(this).attr('id');
  let boxes = $('.project-box');

  $('.main-btn').removeClass('active');
  $(this).addClass('active');

  if(type == 'dsg-btn'){
      eachBoxes('dsg', boxes);
  } else if(type == 'dev-btn'){
      eachBoxes('dev', boxes);
  } else if(type == 'seo-btn'){
      eachBoxes('seo', boxes);
  } else {
      eachBoxes('all', boxes);
  }

});

function eachBoxes(type, boxes){
  if(type == 'all'){
      $(boxes).fadeIn();
  } else {
      $(boxes).each(function(){
          if(!$(this).hasClass(type)){
              $(this).fadeOut('slow');
          } else {
              $(this).fadeIn();
          }
      });
  }
}

// scroll para seções
let navBtn = $('.nav-item');

let bannerSection = $('#mainSlider');
let aboutSection = $('#about-area');
let servicesSection = $('#services-area');
let teamSection = $('#team-area');
let portfolioSection = $('#portfolio-area');
let contactSection = $('#contact-area');

let scrollTo = '';

$(navBtn).click(function(){
  let btnId = $(this).attr('id');

  if(btnId == 'about-menu'){
      scrollTo = aboutSection;
  }else if(btnId == 'services-menu'){
      scrollTo = servicesSection;
  }else if(btnId == 'team-menu'){
      scrollTo = teamSection;
  }else if(btnId == 'portfolio-menu'){
      scrollTo = portfolioSection;
  }else if(btnId == 'contact-menu'){
      scrollTo= contactSection;
  } else {
      scrollTo = bannerSection;
  }

  $([document.documentElement, document.body]).animate({
      scrollTop: $(scrollTo).offset().top - 70
  }, 1500);

});

// Parallax
// $( "#data-area" ).parallax({imageSrc: 'img/cidadeparallax.png'})
// $( "#apply-content" ).parallax({imageSrc: 'img/pattern.png'})