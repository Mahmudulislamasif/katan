$("#metismenu").metisMenu();
$(document).ready(function () {
  // Function to handle navigation link activation
  function activateLink(hash) {
    $('#metismenu a').removeClass('active'); // Remove active class from all links

    var $targetLink = $('a[href="' + hash + '"]');
    $targetLink.addClass('active'); // Add active class to the link with the matching hash

    // Remove mm-active class from all li elements
    $('#metismenu li').removeClass('mm-active');
    $('.nav-second-level').removeClass('mm-show').css('height', ''); // Remove inline style

    // Check if the link has a parent with the 'has-arrow' class and activate the parent
    var $parent = $targetLink.closest('.has-arrow').children('.menu-item');
    $parent.addClass('active');

    // Activate the parent of the clicked child if it's in a nested menu
    var $nestedParent = $targetLink.closest('.nav-second-level').siblings('.menu-item');
    $nestedParent.addClass('active');

    // Add mm-active class to the corresponding navigation element's parent li
    $targetLink.closest('li').addClass('mm-active');

    // Show the second-level menu if it's not currently displayed
    var $submenu = $targetLink.closest('.nav-second-level');
    if (!$submenu.hasClass('mm-show')) {
      $submenu.addClass('mm-show').css('height', 'auto');
    }

    // Set aria-expanded to true for elements with the 'active' class
    $('.menu-item.active').attr('aria-expanded', 'true');

    // Set aria-expanded to false for non-active elements
    $('.menu-item:not(.active)').attr('aria-expanded', 'false');
  }

  // Function to handle hash change
  function onHashChange() {
    var hash = window.location.hash;
    if (hash !== '') {
      activateLink(hash);
    } else {
      // If no hash is present, activate the first link explicitly
      var firstLink = $('#metismenu a:first-child').attr('href');
      activateLink(firstLink);
    }
  }

  // Function to handle scroll event and activate link accordingly
  function onScroll() {
    var scrollPosition = $(document).scrollTop();

    // Loop through each section and check if it's in the viewport
    $('section').each(function () {
      var currentSection = $(this);
      var sectionTop = currentSection.offset().top;
      var sectionId = currentSection.attr('id');
      if (scrollPosition >= sectionTop - 200) {
        // If the section is in view, activate its corresponding link
        activateLink('#' + sectionId);
      }
    });
  }

  // Activate link on initial load if a hash is present
  onHashChange();

  // Listen for hash change events (e.g., when users click on links with hashes)
  $(window).on('hashchange', onHashChange);

  // Listen for scroll events to activate links based on the section in view
  $(window).on('scroll', onScroll);
});
