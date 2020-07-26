$(function () {
  var nav = $('.header__gnav');
  var navTop = nav.offset().top;
  var navHeight = nav.outerHeight(true);
  var windowHeight = $(window).height();
  // gnavクリック時のスムーススクロール
  $('.header__gnav__link').click(function () {
    var headerHeight = 64;
    var speed = 600;
    var href = $(this).attr("href");
    var target = $(href == "#" || href == "" ? 'html' : href);
    var position = target.offset().top - headerHeight;
    $("html, body").animate({
      scrollTop: position
    }, speed, "swing");
    return false;
  });

  // WINDOWスクロール時のアクション
  $(window).scroll(function () {
    var winTop = $(this).scrollTop();
    var scrollAnimationElement = document.querySelectorAll('.scrollAnimation');
    var skillTrigger = document.querySelectorAll('.skill__content')[0].getBoundingClientRect().top
    var scrollAnimationFunction = function () {
      var delay_element_counter = 0;
      for (var i = 0; i < scrollAnimationElement.length; ++i) {
        var elm = scrollAnimationElement[i];
        var triggerTop = elm.getBoundingClientRect().top;
        var viewHeight = 2.0;
        var delay = 0;
        if (elm.classList.contains('skill__content') == true) {
          triggerTop = skillTrigger;
          delay = delay_element_counter * 75;
          delay_element_counter++;
        }
        if (elm.dataset.trigger != null) {
          viewHeight = parseFloat(elm.dataset.trigger);
        }
        if (winTop > triggerTop + windowHeight * viewHeight) {
          setTimeout(function (index) {
            scrollAnimationElement[index].classList.add('show');
          }.bind(null, i), delay);
        }
      }
    }
    window.addEventListener('load', scrollAnimationFunction);
    window.addEventListener('scroll', scrollAnimationFunction);
  });

  // WORKSモーダル開閉
  var modalWinTop
  $('.works__card__link').each(function () {
    $(this).on('click', function () {
      modalWinTop = $(window).scrollTop();
      var target = $(this).data('target');
      var modal = document.getElementById(target);
      $(modal).fadeIn();
      return false;
    });
  });
  $('.modal__close').on('click', function () {
    $('.modal').fadeOut();
    $('body,html').stop().animate({
      scrollTop: modalWinTop
    }, 100);
    return false;
  });

});