$(document).ready(function () {
  $('.toggle').click(function () {
    $('#nav').toggleClass('open');
    $('.container').toggleClass('menu-open');
  });
});

/* slider  */

/* user defined variables */
var timeOnSlide = 3,
  // the time each image will remain static on the screen, measured in seconds
  timeBetweenSlides = 1,
  // the time taken to transition between images, measured in seconds

  // test if the browser supports animation, and if it needs a vendor prefix to do so
  animationstring = 'animation',
  animation = false,
  keyframeprefix = '',
  domPrefixes = 'Webkit Moz O Khtml'.split(' '),
  // array of possible vendor prefixes
  pfx = '',
  slidy = document.getElementById("slidy");
if (slidy.style.animationName !== undefined) {
  animation = true;
}
// browser supports keyframe animation w/o prefixes

if (animation === false) {
  for (var i = 0; i < domPrefixes.length; i++) {
    if (slidy.style[domPrefixes[i] + 'AnimationName'] !== undefined) {
      pfx = domPrefixes[i];
      animationstring = pfx + 'Animation';
      keyframeprefix = '-' + pfx.toLowerCase() + '-';
      animation = true;
      break;
    }
  }
}

if (animation === false) {
  // animate in JavaScript fallback
} else {
  var images = slidy.getElementsByTagName("img"),
    firstImg = images[0],
    // get the first image inside the "slidy" element.
    imgWrap = firstImg.cloneNode(false); // copy it.
  slidy.appendChild(imgWrap); // add the clone to the end of the images
  var imgCount = images.length, // count the number of images in the slide, including the new cloned element
    totalTime = (timeOnSlide + timeBetweenSlides) * (imgCount - 1), // calculate the total length of the animation by multiplying the number of _actual_ images by the amount of time for both static display of each image and motion between them
    slideRatio = (timeOnSlide / totalTime) * 100, // determine the percentage of time an induvidual image is held static during the animation
    moveRatio = (timeBetweenSlides / totalTime) * 100, // determine the percentage of time for an individual movement
    basePercentage = 100 / imgCount, // work out how wide each image should be in the slidy, as a percentage.
    position = 0, // set the initial position of the slidy element
    css = document.createElement("style"); // start marking a new style sheet
  css.type = "text/css";
  css.innerHTML += "#slidy { text-align: left; margin: 0; font-size: 0; position: relative; width: " + (imgCount * 100) + "%;  }\n"; // set the width for the slidy container
  css.innerHTML += "#slidy img { float: left; width: " + basePercentage + "%; }\n";
  css.innerHTML += "@" + keyframeprefix + "keyframes slidy {\n";
  for (i = 0; i < (imgCount - 1); i++) { // 
    position += slideRatio; // make the keyframe the position of the image
    css.innerHTML += position + "% { left: -" + (i * 100) + "%; }\n";
    position += moveRatio; // make the postion for the _next_ slide
    css.innerHTML += position + "% { left: -" + ((i + 1) * 100) + "%; }\n";
  }
  css.innerHTML += "}\n";
  css.innerHTML += "#slidy { left: 0%; " + keyframeprefix + "transform: translate3d(0,0,0); " + keyframeprefix + "animation: " + totalTime + "s slidy infinite; }\n"; // call on the completed keyframe animation sequence
  document.body.appendChild(css); // add the new stylesheet to the end of the document
}

/*  end  slider  */




/*  begin photo gallery  */


function scaleGallery() {
  // This is roughly the max pixels width/height of a square photo
  var widthSetting = 400;

  // Do not edit any of this unless you know what you're doing
  var containerWidth = $(".gallery").width();
  var ratioSumMax = containerWidth / widthSetting;
  var imgs = $(".gallery img");
  var numPhotos = imgs.length,
    ratioSum, ratio, photo, row, rowPadding, i = 0;

  while (i < numPhotos) {
    ratioSum = rowPadding = 0;
    row = new Array();
    while (i < numPhotos && ratioSum < ratioSumMax) {
      photo = $(imgs[i]);
      // reset width to original
      photo.width("");
      ratio = photo.width() / photo.height();
      rowPadding += getHorizontalPadding(photo);
      // if this is going to be first in the row, clear: left
      if (ratioSum == 0) photo.css("clear", "left");
      else photo.css("clear", "none");
      ratioSum += ratio;
      row.push(photo);
      i++;
      // if only 1 image left, squeeze it in
      if (i == numPhotos - 1) ratioSumMax = 999;
    }
    unitWidth = (containerWidth - rowPadding) / ratioSum;

    row.forEach(function (elem) {
      elem.width(unitWidth * elem.width() / elem.height());
    });
  }
}

function getHorizontalPadding(elem) {
  var padding = 0;
  var left = elem.css("padding-left");
  var right = elem.css("padding-right");
  padding += parseInt(left ? left.replace("px", "") : 0);
  padding += parseInt(right ? right.replace("px", "") : 0);
  return padding;
}

$(window).load(scaleGallery);
$(window).resize(scaleGallery);


/*  end photo gallery  */ 