const body = document.body;
const nav = document.querySelector('nav');
const toggleMenu = document.querySelector('.hamburger');
const container = document.querySelector('.container');
const navLinks = document.querySelectorAll('.nav__list li a');

//-----------------------preloader---------------------------

// Wait for the svg animted logo to load
const animatedLogo = document.getElementById('animatedLogo');
animatedLogo.addEventListener('load', () => {
  animatedLogo.style.display = 'block';
});

window.addEventListener('load', function () {
  var preloader = document.getElementById('preloader');
  this.setTimeout(() => {
    preloader.style.display = 'none';
    body.style.overflow = 'visible';
  }, 2000);
});

toggleMenu.addEventListener('click', () => {
  nav.classList.toggle('active');

  if (nav.classList.contains('active')) {
    body.style.overflow = 'hidden';
    container.style.filter = 'blur(2px)';
  } else {
    body.style.overflow = 'auto';
    container.style.filter = 'none';
  }
});
// close nav when a navlink is clicked
navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    nav.classList.remove('active');
    body.style.overflow = 'auto';
    container.style.filter = 'none';
  });
});

//--------------------------------Sticky navbar---------------------------------

let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  if (currentScroll <= 0) {
    body.classList.remove('scroll-up');
  }
  if (currentScroll > lastScroll && !body.classList.contains('scroll-down')) {
    body.classList.remove('scroll-up');
    body.classList.add('scroll-down');
  }
  if (currentScroll < lastScroll && body.classList.contains('scroll-down')) {
    body.classList.add('scroll-up');
    body.classList.remove('scroll-down');
  }
  lastScroll = currentScroll;

  // Scroll-back-top button display position
  const goTop = document.querySelector('.go-top');
  if (currentScroll >= 700) {
    goTop.style.transform = 'translateY(0)';
  } else {
    goTop.style.transform = 'translateY(10rem)';
  }
});

//---------------------logo animation-----------------------

//header entrance animation

const anim = anime.timeline({
  loop: false,
  direction: 'alternate',
});

let durationTime = 500;

anim.add({
  targets: '#animatedLogo path',
  strokeDashoffset: [anime.setDashoffset, 0],
  easing: 'easeInOutQuart',
  duration: 1000,
});

anim
  .add({
    targets: '#animatedLogo #letter',
    duration: 1000,
    opacity: 1,
    easing: 'easeInOutQuart',
  })
  .add(
    {
      targets: 'nav',
      translateY: [-25, 0],
      opacity: [0, 1],
      easing: 'linear',
      duration: durationTime,
    },
    '-=500',
  )
  .add(
    {
      targets: '.nav__list li',
      translateY: [-25, 0],
      opacity: [0, 1],
      duration: durationTime,
      easing: 'linear',
      delay: (el, i) => {
        return 300 + 100 * i;
      },
    },
    '-=250',
  )
  .add(
    {
      targets: '.header__text-content > *',
      translateY: [50, 0],
      opacity: [0, 1],
      easing: 'linear',
      duration: durationTime,
      delay: (el, i) => {
        return 300 + 100 * i;
      },
    },
    '-=150',
  )
  .add(
    {
      targets: '.header__avatar',
      opacity: [0, 1],
      easing: 'linear',
      duration: durationTime,
    },
    '-=100',
  )
  .add(
    {
      targets: '.media-links',
      translateY: [50, 0],
      opacity: [0, 1],
      duration: durationTime,
      easing: 'linear',
      delay: (el, i) => {
        return 300 + 100 * i;
      },
    },
    '-=500',
  )
  .add(
    {
      targets: '.gmail',
      translateY: [20, 0],
      opacity: [0, 1],
      duration: durationTime,
      easing: 'linear',
    },
    '-=500',
  )
  .add({
    targets: '.scroll',
    opacity: [0, 1],
    easing: 'linear',
    duration: durationTime,
    delay: (el, i) => {
      return 300 + 100 * i;
    },
  });

//Toggle Theme
const setTheme = () => {
  const currentTheme = localStorage.getItem('theme');

  // Default to light theme
  if (!currentTheme) {
    localStorage.setItem('theme', 'light');
    document.documentElement.dataset.theme = 'light';
    return;
  }

  document.documentElement.dataset.theme = currentTheme;
};

// Set theme on page load
setTheme();

const transition = () => {
  document.documentElement.classList.add('transition');

  setTimeout(() => {
    document.documentElement.classList.remove('transition');
  }, 1000);
};

// Handle theme toggle
const themeToggleBtn = document.querySelector('.js-toggle-theme');

themeToggleBtn.addEventListener('click', () => {
  const { theme } = document.documentElement.dataset;
  const themeTo = theme === 'light' ? 'dark' : 'light';
  const themeLabel = `Activate ${theme} mode`;

  document.documentElement.dataset.theme = themeTo;
  localStorage.setItem('theme', themeTo);

  themeToggleBtn.setAttribute('aria-label', themeLabel);
  themeToggleBtn.setAttribute('title', themeLabel);

  transition();
});
// show div when scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      anime({
        targets: entry.target,
        opacity: '1',
        duration: 1000,
        easing: 'easeInOutQuad',
      });

      observer.unobserve(entry.target);
    }
  });
});

const items = document.querySelectorAll('.translateUp');

items.forEach((item) => {
  observer.observe(item);
});

//------------------control eye with mouse---------------------

const eyes = document.querySelectorAll('.eye');
const anchor = document.querySelector('.header__avatar-img');

window.addEventListener('mousemove', (e) => {
  const mouseX = e.clientX;
  const mouseY = e.clientY;
  const rekt = anchor.getBoundingClientRect();
  const anchorX = rekt.left + rekt.width / 2;
  const anchorY = rekt.top + rekt.height / 2;
  const angleDeg = angle(mouseX, mouseY, anchorX, anchorY);
  eyes.forEach((eye) => {
    eye.style.transform = `rotate(${angleDeg - 45}deg)`;
  });
});

function angle(cx, cy, ex, ey) {
  const dx = ex - cx;
  const dy = ey - cy;
  const rad = Math.atan2(dy, dx);
  const deg = (rad * 180) / Math.PI;
  return deg;
}

// reset the eye position if user is inactive for 1 seconds

let userInactivityTimer;

document.addEventListener('mousemove', resetTimer);
document.addEventListener('keydown', resetTimer);

// Function to reset the user inactivity timer
function resetTimer() {
  clearTimeout(userInactivityTimer);
  userInactivityTimer = setTimeout(handleUserInactive, 1000);
}

function handleUserInactive() {
  eyes.forEach((eye) => {
    eye.classList.add('inactive-eye');
  });
}

function handleUserActive() {
  eyes.forEach((eye) => {
    eye.classList.remove('inactive-eye');
  });
}

document.addEventListener('mousemove', handleUserActive);
document.addEventListener('keydown', handleUserActive);

//work animation

jQuery(document).ready(function ($) {
  var timelines = $('.cd-horizontal-timeline'),
    eventsMinDistance = 60;

  timelines.length > 0 && initTimeline(timelines);

  function initTimeline(timelines) {
    timelines.each(function () {
      var timeline = $(this),
        timelineComponents = {};
      //cache timeline components
      timelineComponents['timelineWrapper'] = timeline.find('.events-wrapper');
      timelineComponents['eventsWrapper'] = timelineComponents['timelineWrapper'].children('.events');
      timelineComponents['fillingLine'] = timelineComponents['eventsWrapper'].children('.filling-line');
      timelineComponents['timelineEvents'] = timelineComponents['eventsWrapper'].find('a');
      timelineComponents['timelineDates'] = parseDate(timelineComponents['timelineEvents']);
      timelineComponents['eventsMinLapse'] = minLapse(timelineComponents['timelineDates']);
      timelineComponents['timelineNavigation'] = timeline.find('.cd-timeline-navigation');
      timelineComponents['eventsContent'] = timeline.children('.events-content');

      //assign a left postion to the single events along the timeline
      setDatePosition(timelineComponents, eventsMinDistance);
      //assign a width to the timeline
      var timelineTotWidth = setTimelineWidth(timelineComponents, eventsMinDistance);
      //the timeline has been initialize - show it
      timeline.addClass('loaded');

      //detect click on the next arrow
      timelineComponents['timelineNavigation'].on('click', '.next', function (event) {
        event.preventDefault();
        updateSlide(timelineComponents, timelineTotWidth, 'next');
      });
      //detect click on the prev arrow
      timelineComponents['timelineNavigation'].on('click', '.prev', function (event) {
        event.preventDefault();
        updateSlide(timelineComponents, timelineTotWidth, 'prev');
      });
      //detect click on the a single event - show new event content
      timelineComponents['eventsWrapper'].on('click', 'a', function (event) {
        event.preventDefault();
        timelineComponents['timelineEvents'].removeClass('selected');
        $(this).addClass('selected');
        updateOlderEvents($(this));
        updateFilling($(this), timelineComponents['fillingLine'], timelineTotWidth);
        updateVisibleContent($(this), timelineComponents['eventsContent']);
      });

      //on swipe, show next/prev event content
      timelineComponents['eventsContent'].on('swipeleft', function () {
        var mq = checkMQ();
        mq == 'mobile' && showNewContent(timelineComponents, timelineTotWidth, 'next');
      });
      timelineComponents['eventsContent'].on('swiperight', function () {
        var mq = checkMQ();
        mq == 'mobile' && showNewContent(timelineComponents, timelineTotWidth, 'prev');
      });

      //keyboard navigation
      $(document).keyup(function (event) {
        if (event.which == '37' && elementInViewport(timeline.get(0))) {
          showNewContent(timelineComponents, timelineTotWidth, 'prev');
        } else if (event.which == '39' && elementInViewport(timeline.get(0))) {
          showNewContent(timelineComponents, timelineTotWidth, 'next');
        }
      });
    });
  }

  function updateSlide(timelineComponents, timelineTotWidth, string) {
    //retrieve translateX value of timelineComponents['eventsWrapper']
    var translateValue = getTranslateValue(timelineComponents['eventsWrapper']),
      wrapperWidth = Number(timelineComponents['timelineWrapper'].css('width').replace('px', ''));
    //translate the timeline to the left('next')/right('prev')
    string == 'next'
      ? translateTimeline(
          timelineComponents,
          translateValue - wrapperWidth + eventsMinDistance,
          wrapperWidth - timelineTotWidth,
        )
      : translateTimeline(timelineComponents, translateValue + wrapperWidth - eventsMinDistance);
  }

  function showNewContent(timelineComponents, timelineTotWidth, string) {
    //go from one event to the next/previous one
    var visibleContent = timelineComponents['eventsContent'].find('.selected'),
      newContent = string == 'next' ? visibleContent.next() : visibleContent.prev();

    if (newContent.length > 0) {
      //if there's a next/prev event - show it
      var selectedDate = timelineComponents['eventsWrapper'].find('.selected'),
        newEvent =
          string == 'next'
            ? selectedDate.parent('li').next('li').children('a')
            : selectedDate.parent('li').prev('li').children('a');

      updateFilling(newEvent, timelineComponents['fillingLine'], timelineTotWidth);
      updateVisibleContent(newEvent, timelineComponents['eventsContent']);
      newEvent.addClass('selected');
      selectedDate.removeClass('selected');
      updateOlderEvents(newEvent);
      updateTimelinePosition(string, newEvent, timelineComponents, timelineTotWidth);
    }
  }

  function updateTimelinePosition(string, event, timelineComponents, timelineTotWidth) {
    //translate timeline to the left/right according to the position of the selected event
    var eventStyle = window.getComputedStyle(event.get(0), null),
      eventLeft = Number(eventStyle.getPropertyValue('left').replace('px', '')),
      timelineWidth = Number(timelineComponents['timelineWrapper'].css('width').replace('px', '')),
      timelineTotWidth = Number(timelineComponents['eventsWrapper'].css('width').replace('px', ''));
    var timelineTranslate = getTranslateValue(timelineComponents['eventsWrapper']);

    if (
      (string == 'next' && eventLeft > timelineWidth - timelineTranslate) ||
      (string == 'prev' && eventLeft < -timelineTranslate)
    ) {
      translateTimeline(timelineComponents, -eventLeft + timelineWidth / 2, timelineWidth - timelineTotWidth);
    }
  }

  function translateTimeline(timelineComponents, value, totWidth) {
    var eventsWrapper = timelineComponents['eventsWrapper'].get(0);
    value = value > 0 ? 0 : value; //only negative translate value
    value = !(typeof totWidth === 'undefined') && value < totWidth ? totWidth : value; //do not translate more than timeline width
    setTransformValue(eventsWrapper, 'translateX', value + 'px');
    //update navigation arrows visibility
    value == 0
      ? timelineComponents['timelineNavigation'].find('.prev').addClass('inactive')
      : timelineComponents['timelineNavigation'].find('.prev').removeClass('inactive');
    value == totWidth
      ? timelineComponents['timelineNavigation'].find('.next').addClass('inactive')
      : timelineComponents['timelineNavigation'].find('.next').removeClass('inactive');
  }

  function updateFilling(selectedEvent, filling, totWidth) {
    //change .filling-line length according to the selected event
    var eventStyle = window.getComputedStyle(selectedEvent.get(0), null),
      eventLeft = eventStyle.getPropertyValue('left'),
      eventWidth = eventStyle.getPropertyValue('width');
    eventLeft = Number(eventLeft.replace('px', '')) + Number(eventWidth.replace('px', '')) / 2;
    var scaleValue = eventLeft / totWidth;
    setTransformValue(filling.get(0), 'scaleX', scaleValue);
  }

  function setDatePosition(timelineComponents, min) {
    for (i = 0; i < timelineComponents['timelineDates'].length; i++) {
      var distance = daydiff(timelineComponents['timelineDates'][0], timelineComponents['timelineDates'][i]),
        distanceNorm = Math.round(distance / timelineComponents['eventsMinLapse']) + 2;
      timelineComponents['timelineEvents'].eq(i).css('left', distanceNorm * min + 'px');
    }
  }

  function setTimelineWidth(timelineComponents, width) {
    var timeSpan = daydiff(
        timelineComponents['timelineDates'][0],
        timelineComponents['timelineDates'][timelineComponents['timelineDates'].length - 1],
      ),
      timeSpanNorm = timeSpan / timelineComponents['eventsMinLapse'],
      timeSpanNorm = Math.round(timeSpanNorm) + 4,
      totalWidth = timeSpanNorm * width;
    timelineComponents['eventsWrapper'].css('width', totalWidth + 'px');
    updateFilling(timelineComponents['timelineEvents'].eq(0), timelineComponents['fillingLine'], totalWidth);

    return totalWidth;
  }

  function updateVisibleContent(event, eventsContent) {
    var eventDate = event.data('date'),
      visibleContent = eventsContent.find('.selected'),
      selectedContent = eventsContent.find('[data-date="' + eventDate + '"]'),
      selectedContentHeight = selectedContent.height();

    if (selectedContent.index() > visibleContent.index()) {
      var classEnetering = 'selected enter-right',
        classLeaving = 'leave-left';
    } else {
      var classEnetering = 'selected enter-left',
        classLeaving = 'leave-right';
    }

    selectedContent.attr('class', classEnetering);
    visibleContent
      .attr('class', classLeaving)
      .one('webkitAnimationEnd oanimationend msAnimationEnd animationend', function () {
        visibleContent.removeClass('leave-right leave-left');
        selectedContent.removeClass('enter-left enter-right');
      });
    eventsContent.css('height', selectedContentHeight + 'px');
  }

  function updateOlderEvents(event) {
    event
      .parent('li')
      .prevAll('li')
      .children('a')
      .addClass('older-event')
      .end()
      .end()
      .nextAll('li')
      .children('a')
      .removeClass('older-event');
  }

  function getTranslateValue(timeline) {
    var timelineStyle = window.getComputedStyle(timeline.get(0), null),
      timelineTranslate =
        timelineStyle.getPropertyValue('-webkit-transform') ||
        timelineStyle.getPropertyValue('-moz-transform') ||
        timelineStyle.getPropertyValue('-ms-transform') ||
        timelineStyle.getPropertyValue('-o-transform') ||
        timelineStyle.getPropertyValue('transform');

    if (timelineTranslate.indexOf('(') >= 0) {
      var timelineTranslate = timelineTranslate.split('(')[1];
      timelineTranslate = timelineTranslate.split(')')[0];
      timelineTranslate = timelineTranslate.split(',');
      var translateValue = timelineTranslate[4];
    } else {
      var translateValue = 0;
    }

    return Number(translateValue);
  }

  function setTransformValue(element, property, value) {
    element.style['-webkit-transform'] = property + '(' + value + ')';
    element.style['-moz-transform'] = property + '(' + value + ')';
    element.style['-ms-transform'] = property + '(' + value + ')';
    element.style['-o-transform'] = property + '(' + value + ')';
    element.style['transform'] = property + '(' + value + ')';
  }

  function parseDate(events) {
    var dateArrays = [];
    events.each(function () {
      var dateComp = $(this).data('date').split('/'),
        newDate = new Date(dateComp[2], dateComp[1] - 1, dateComp[0]);
      dateArrays.push(newDate);
    });
    return dateArrays;
  }

  function parseDate2(events) {
    var dateArrays = [];
    events.each(function () {
      var singleDate = $(this),
        dateComp = singleDate.data('date').split('T');
      if (dateComp.length > 1) {
        //both DD/MM/YEAR and time are provided
        var dayComp = dateComp[0].split('/'),
          timeComp = dateComp[1].split(':');
      } else if (dateComp[0].indexOf(':') >= 0) {
        //only time is provide
        var dayComp = ['2000', '0', '0'],
          timeComp = dateComp[0].split(':');
      } else {
        //only DD/MM/YEAR
        var dayComp = dateComp[0].split('/'),
          timeComp = ['0', '0'];
      }
      var newDate = new Date(dayComp[2], dayComp[1] - 1, dayComp[0], timeComp[0], timeComp[1]);
      dateArrays.push(newDate);
    });
    return dateArrays;
  }

  function daydiff(first, second) {
    return Math.round(second - first);
  }

  function minLapse(dates) {
    //determine the minimum distance among events
    var dateDistances = [];
    for (i = 1; i < dates.length; i++) {
      var distance = daydiff(dates[i - 1], dates[i]);
      dateDistances.push(distance);
    }
    return Math.min.apply(null, dateDistances);
  }

  /*
		How to tell if a DOM element is visible in the current viewport?
		http://stackoverflow.com/questions/123999/how-to-tell-if-a-dom-element-is-visible-in-the-current-viewport
	*/
  function elementInViewport(el) {
    var top = el.offsetTop;
    var left = el.offsetLeft;
    var width = el.offsetWidth;
    var height = el.offsetHeight;

    while (el.offsetParent) {
      el = el.offsetParent;
      top += el.offsetTop;
      left += el.offsetLeft;
    }

    return (
      top < window.pageYOffset + window.innerHeight &&
      left < window.pageXOffset + window.innerWidth &&
      top + height > window.pageYOffset &&
      left + width > window.pageXOffset
    );
  }

  function checkMQ() {
    //check if mobile or desktop device
    return window
      .getComputedStyle(document.querySelector('.cd-horizontal-timeline'), '::before')
      .getPropertyValue('content')
      .replace(/'/g, '')
      .replace(/"/g, '');
  }
});
