(function() {
  
  var $ = jQuery;

  if (navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1) {
    $('.c-progress-bar .c-progress-bar-line svg').addClass('c-safari-only');
  }

  Drupal.behaviors.vbo_fix = {
    attach: function (context, settings) {

      $('.vbo-views-form .c-checkbox', context).on('click', function () {
        $(this).find('input:not(.vbo-table-select-all)').click();
      });
    }
  };

  Drupal.behaviors.theme_styles = {
    attach: function (context, settings) {
      $('.c-settings .c-color', context).on('click', function () {

        $('#nd_style_theme').remove();
        var val = $(this).attr('data-color');
        $('body').append('<link href="' + Drupal.settings.base_path + Drupal.settings.theme_path + '/assets/base/css/themes/' + val + '.css" rel="stylesheet" id="nd_style_theme" type="text/css">');

        $('.c-settings .c-color').removeClass('c-active');
        $(this).addClass('c-active');
      });

    }
  };

  Drupal.behaviors.js_styles = {
    attach: function (context, settings) {
      $('.c-content-isotope-overlay-content .flag, .c-content-isotope-overlay-content .commerce-add-to-cart button', context).removeAttr('class').attr('class', 'c-content-isotope-overlay-btn btn c-btn-white c-btn-uppercase c-btn-bold c-btn-border-1x c-btn-square');
      $('.c-content-product-2 .form-submit', context).removeAttr('class').attr('class', 'btn btn-lg c-btn-white c-btn-uppercase c-btn-square c-font-grey-3 c-font-white-hover c-bg-red-2-hover c-btn-product');
    }
  };

  Drupal.behaviors.cart_delete= {
    attach: function (context, settings) {
      $('.c-cart-remove > a, .c-cart-menu-close .c-theme-link', context).click(function() {
        $(this).parent().find('input').click();
      });
    }
  };

  Drupal.behaviors.dropdown_menu_expand = {
    attach: function (context, settings) {
      $('.c-sidebar-menu > li.c-dropdown:first', context).addClass('c-open');
    }
  };

  Drupal.behaviors.write_review = {
    attach: function (context, settings) {
      $('.c-product-write-review', context).click(function() {
        $('#bootstrap-fieldgroup-nav-item--reviews-3').click();
      });
    }
  };


  Drupal.behaviors.webform_submit_button = {
    attach: function (context, settings) {
      $('.webform-client-form .input-group-btn .btn', context).click(function() {
        $(this).closest('form').submit();
        return false;
      });
    }
  };

  Drupal.behaviors.split_submit_button = {
    attach: function (context, settings) {
      $('.form-split-button .btn', context).click(function() {
        $(this).parent().find('form').submit();
        return false;
      });
    }
  };

  Drupal.behaviors.products_filter_show = {
    attach: function (context, settings) {
      $('.auto-click', context).find('li:first a').click();
    }
  };

  Drupal.behaviors.product_filter = {
    attach: function (context, settings) {

      if($('input[name="field_stock_amount_value"]').val() > 0) {
        $('#checkbox-sidebar-3-2', context).attr('checked', 'checked');
      }

      $('#checkbox-sidebar-3-2', context).click(function() {
        $('input[name="field_stock_amount_value"]').val($(this).attr('checked') != undefined ? 1 : 0);
        $('input[name="field_stock_amount_value"]').closest('form').submit();
      });

      $('input[name="from_textfield"]', context).val($('input[name="commerce_price_amount[min]"]').val());
      $('input[name="to_textfield"]', context).val($('input[name="commerce_price_amount[max]"]').val());

      var min = $('input[name="commerce_price_amount[min]"]').val();
      var max = $('input[name="commerce_price_amount[max]"]').val();
      min = min ? min : 0;
      max = max ? max : 500;

      $('.range-text').text(min/20 + ' - ' + max * 4);
      $('.nd-price-slider').attr('data-slider-value', '[' + min + ',' + max + ']').attr('data-slider-min', min / 20).attr('data-slider-max', max * 4);

      $('.nd-price-slider').slider();

      $('input[name="from_textfield"]', context).change(function() {
        $('input[name="commerce_price_amount[min]"]').val($(this).val());
        $('input[name="commerce_price_amount[min]"]').closest('form').submit();
      });

      $('input[name="to_textfield"]', context).change(function() {
        $('input[name="commerce_price_amount[max]"]').val($(this).val());
        $('input[name="commerce_price_amount[max]"]').closest('form').submit();
      });

      $('.filter-range-wrapper', context).click(function() {
        var range = $(this).find('.nd-price-slider').val().split(',');
        $('input[name="commerce_price_amount[min]"]').val(range[0]);
        $('input[name="commerce_price_amount[max]"]').val(range[1]);
        $('input[name="commerce_price_amount[max]"]').closest('form').submit();
      });

      var stars = $('input[name="field_rating_rating"]').val();
      $('.filter-rating-wraper input[data-stars=' + stars + ']').attr('checked', 'checked');

      $('.filter-rating-wraper input').change(function() {
        $('.filter-rating-wraper input:checked').click();
        var stars = $(this).attr('checked') == undefined ? '' : $(this).data('stars');
        $('input[name="field_rating_rating"]').val(stars);
        $('input[name="field_rating_rating"]').closest('form').submit();
      });
    }
  };


  // ISOTOPE GRID

  var IsotopeGrid = function() {

    var _init = function() {
      // BEGIN: ISOTOPE GALLERY 1 INIT
      // init isotope gallery
      var $grid1 = $('.c-content-isotope-grid.c-opt-1').imagesLoaded( function() {
        // init Isotope after all images have loaded
        $grid1.isotope({
          // options...
          itemSelector: '.c-content-isotope-item',
                  layoutMode: 'packery',
                  fitWidth: true,
                  percentPosition: true,
        });
      });
      // END: ISOTOPE GALLERY 1

      // BEGIN: ISOTOPE GALLERY 2 INIT
      // init isotope gallery
      var $grid2 = $('.c-content-isotope-grid.c-opt-2').imagesLoaded( function() {
        // init Isotope after all images have loaded
        $grid2.isotope({
          // options...
          itemSelector: '.c-content-isotope-item',
                  layoutMode: 'packery',
                  fitWidth: true,
                  percentPosition: true,
        });
      });
      // END: ISOTOPE GALLERY 2

      // BEGIN: ISOTOPE GALLERY 3 INIT
      // init isotope gallery
      var $grid3 = $('.c-content-isotope-grid.c-opt-3').imagesLoaded( function() {
        // init Isotope after all images have loaded
        $grid3.isotope({
          // options...
          itemSelector: '.c-content-isotope-item',
                  layoutMode: 'packery',
                  fitWidth: true,
                  percentPosition: true,
        });
      });
      // END: ISOTOPE GALLERY 3
    }

      return {
          //main function to initiate the module
          init: function() {

              _init();

          }

      };
  }();


  // ISOTOPE GALLERY

  var IsotopeGallery = function() {

    var _init = function() {
      // BEGIN: ISOTOPE GALLERY 1 INIT
      // init ilightbox
      $('.c-ilightbox-image-1').iLightBox();

      // init isotope gallery
      var $grid1 = $('.c-content-isotope-gallery.c-opt-1').imagesLoaded( function() {
        // init Isotope after all images have loaded
        $grid1.isotope({
          // options...
          itemSelector: '.c-content-isotope-item',
                  layoutMode: 'packery',
                  fitWidth: true,
                  percentPosition: true,
        });
      });
      // END: ISOTOPE GALLERY 1

      // BEGIN: ISOTOPE GALLERY 2 INIT
      // init ilightbox
      $('.c-ilightbox-image-2').iLightBox({ skin: 'light'});

      // init isotope gallery
      var $grid2 = $('.c-content-isotope-gallery.c-opt-2').imagesLoaded( function() {
        // init Isotope after all images have loaded
        $grid2.isotope({
          // options...
          itemSelector: '.c-content-isotope-item',
                  layoutMode: 'packery',
                  fitWidth: true,
                  percentPosition: true,
        });
      });
      // END: ISOTOPE GALLERY 2

      // BEGIN: ISOTOPE GALLERY 3 INIT
      // init ilightbox
      $('.c-ilightbox-image-3').iLightBox();

      // init isotope gallery
      var $grid3 = $('.c-content-isotope-gallery.c-opt-3').imagesLoaded( function() {
        // init Isotope after all images have loaded
        $grid3.isotope({
          // options...
          itemSelector: '.c-content-isotope-item',
                  layoutMode: 'packery',
                  fitWidth: true,
                  percentPosition: true,
        });
      });
      // END: ISOTOPE GALLERY 3

      // BEGIN: ISOTOPE GALLERY 4 INIT
      // init ilightbox
      $('.c-ilightbox-image-4').iLightBox();

      // init isotope gallery
      var $grid4 = $('.c-content-isotope-gallery.c-opt-4').imagesLoaded( function() {
        // init Isotope after all images have loaded
        $grid4.isotope({
          // options...
          itemSelector: '.c-content-isotope-item',
                  layoutMode: 'packery',
                  fitWidth: true,
                  percentPosition: true,
        });
      });
      // Filter buttons
      $('.c-content-isotope-filter-1').on( 'click', 'button', function() {
        var filterValue = $(this).attr('data-filter');
        $grid4.isotope({ filter: filterValue });
        $('.c-content-isotope-filter-1 .c-isotope-filter-btn').removeClass('c-active');
        $(this).addClass('c-active');

        // scroll to top of element on click
        $('html, body').stop();
      });
      // END: ISOTOPE GALLERY 4

      // BEGIN: ISOTOPE GALLERY 5 INIT
      // init ilightbox
      $('.c-ilightbox-image-5').iLightBox();

      // init isotope gallery
      var $grid5 = $('.c-content-isotope-gallery.c-opt-5').imagesLoaded( function() {
        // init Isotope after all images have loaded
        $grid5.isotope({
          // options...
          itemSelector: '.c-content-isotope-item',
                  layoutMode: 'packery',
                  fitWidth: true,
                  percentPosition: true,
        });
      });
      // Filter buttons
      $('.c-content-isotope-filter-2').on( 'click', 'button', function() {
        var filterValue = $(this).attr('data-filter');
        $grid5.isotope({ filter: filterValue });
        $('.c-content-isotope-filter-2 .c-isotope-filter-btn').removeClass('c-active');
        $(this).addClass('c-active');

        // scroll to top of element on click
        $('html, body').stop();
      });
      // END: ISOTOPE GALLERY 5
      
    }

      return {
          //main function to initiate the module
          init: function() {

              _init();

          }

      };
  }();

  $(document).ready(function() {

    $('.isotope-gallery-action a').click(function() {
      var column = $(this).attr('href').substr(1);
      $this = $(this);
      $.post(Drupal.settings.basePath + 'ajax/jango/save_variable', {
        'variable' : 'jango_isotope_gallery',
        'variable_key' : $(this).parents('.isotope-gallery-action').attr('data-id'),
        'value' : column},
        function() {
          if(column == 2) {
            $this.closest('.c-content-isotope-item').addClass('c-item-size-double');
          }
          else {
            $this.closest('.c-content-isotope-item').removeClass('c-item-size-double'); 
          }
          $('.c-content-isotope-gallery').isotope();
        }
      );
      return false;
    });

    $('.isotope-portfolio-action a').click(function() {
      var column = $(this).attr('href').substr(1);
      $this = $(this);
      $.post(Drupal.settings.basePath + 'ajax/jango/save_variable', {
        'variable' : 'jango_isotope_gallery',
        'variable_key' : $(this).parents('.isotope-portfolio-action').attr('data-id'),
        'value' : column},
        function() {
          location.reload();
        }
      );
      return false;
    });

    IsotopeGrid.init();
    IsotopeGallery.init();
    App.init(); // init core

    revealAnimate.init();
    new WOW().init();

    // IF Menu not fixed
    if($(window).width() > 990) {
      $('.c-header-not-fixed .c-layout-header').each(function() {
        $(this).parent().height($(this).height());
      });
    }

    // Portfolio
    $('#grid-container-extended:not(.processed)').addClass('processed').each(function() {
      var columns = $(this).data('columns');
      // init cubeportfolio
      $(this).cubeportfolio({
          filters: '#filters-container',
          layoutMode: 'grid',
          defaultFilter: '*',
          animationType: 'rotateRoom',
          gapHorizontal: 35,
          gapVertical: 25,
          gridAdjustment: 'responsive',
          mediaQueries: [{
              width: 1100,
              cols: columns
          }, {
              width: 800,
              cols: columns
          }, {
              width: 500,
              cols: 2
          }, {
              width: 320,
              cols: 1
          }],
          caption: 'zoom',
          displayType: 'lazyLoading',
          displayTypeSpeed: 100,

          // lightbox
          lightboxDelegate: '.cbp-lightbox',
          lightboxGallery: true,
          lightboxTitleSrc: 'data-title',
          lightboxCounter: '<div class="cbp-popup-lightbox-counter">{{current}} of {{total}}</div>',

          // singlePage popup
          singlePageDelegate: '.cbp-singlePage',
          singlePageDeeplinking: true,
          singlePageStickyNavigation: true,
          singlePageCounter: '<div class="cbp-popup-singlePage-counter">{{current}} of {{total}}</div>',
          singlePageCallback: function(url, element) {
              // to update singlePage content use the following method: this.updateSinglePage(yourContent)
              var t = this;

              $.ajax({
                      url: url,
                      type: 'GET',
                      dataType: 'html',
                      timeout: 5000
                  })
                  .done(function(result) {
                      t.updateSinglePage($(result).find('#block-system-main').html());
                  })
                  .fail(function() {
                      t.updateSinglePage("Error! Please refresh the page!");
                  });
          },
      });
    });

    $('#grid-container-4col:not(.processed)').addClass('processed').each(function() {
      var columns = $(this).data('columns');
      // init cubeportfolio
      $(this).cubeportfolio({
          filters: '#filters-container',
          loadMore: '#loadMore-container',
          loadMoreAction: 'click',
          layoutMode: 'grid',
          defaultFilter: '*',
          animationType: 'quicksand',
          gapHorizontal: 35,
          gapVertical: 30,
          gridAdjustment: 'responsive',
          mediaQueries: [{
              width: 1100,
              cols: columns
          }, {
              width: 800,
              cols: columns
          }, {
              width: 500,
              cols: 2
          }, {
              width: 320,
              cols: 1
          }],
          caption: 'overlayBottomReveal',
          displayType: 'sequentially',
          displayTypeSpeed: 80,

          // lightbox
          lightboxDelegate: '.cbp-lightbox',
          lightboxGallery: true,
          lightboxTitleSrc: 'data-title',
          lightboxCounter: '<div class="cbp-popup-lightbox-counter">{{current}} of {{total}}</div>',

          // singlePage popup
          singlePageDelegate: '.cbp-singlePage',
          singlePageDeeplinking: true,
          singlePageStickyNavigation: true,
          singlePageCounter: '<div class="cbp-popup-singlePage-counter">{{current}} of {{total}}</div>',
          singlePageCallback: function(url, element) {
              // to update singlePage content use the following method: this.updateSinglePage(yourContent)
              var t = this;

              $.ajax({
                      url: url,
                      type: 'GET',
                      dataType: 'html',
                      timeout: 5000
                  })
                  .done(function(result) {
                      t.updateSinglePage($(result).find('.node-nd-project').closest('.block').html());
                  })
                  .fail(function() {
                      t.updateSinglePage("Error! Please refresh the page!");
                  });
          },
      });
    });    

    $('#grid-container:not(.processed)').addClass('processed').each(function() {
      var columns = $(this).data('columns');
      // init cubeportfolio
      $(this).addClass('processed').cubeportfolio({
          filters: '#filters-container',
          layoutMode: 'grid',
          defaultFilter: '*',
          animationType: 'quicksand',
          gapHorizontal: 35,
          gapVertical: 25,
          gridAdjustment: 'responsive',
          mediaQueries: [{
              width: 1100,
              cols: columns
          }, {
              width: 800,
              cols: 3
          }, {
              width: 500,
              cols: 2
          }, {
              width: 320,
              cols: 1
          }],
          caption: 'zoom',
          displayType: 'lazyLoading',
          displayTypeSpeed: 100,

          // lightbox
          lightboxDelegate: '.cbp-lightbox',
          lightboxGallery: true,
          lightboxTitleSrc: 'data-title',
          lightboxCounter: '<div class="cbp-popup-lightbox-counter">{{current}} of {{total}}</div>',

          // singlePage popup
          singlePageDelegate: '.cbp-singlePage',
          singlePageDeeplinking: true,
          singlePageStickyNavigation: true,
          singlePageCounter: '<div class="cbp-popup-singlePage-counter">{{current}} of {{total}}</div>',
          singlePageCallback: function(url, element) {
              // to update singlePage content use the following method: this.updateSinglePage(yourContent)
              var t = this;

              $.ajax({
                      url: url,
                      type: 'GET',
                      dataType: 'html',
                      timeout: 5000
                  })
                  .done(function(result) {
                      t.updateSinglePage($(result).find('.node-nd-project').closest('.block').html());
                  })
                  .fail(function() {
                      t.updateSinglePage("Error! Please refresh the page!");
                  });
          },
      });
    });


    $('#grid-container-fullwidth:not(.processed)').addClass('processed').each(function() {
      var columns = $(this).data('columns');
      // init cubeportfolio
      $(this).cubeportfolio({
          filters: '#filters-container',
          loadMore: '#loadMore-container',
          loadMoreAction: 'auto',
          layoutMode: 'grid',
          defaultFilter: '*',
          animationType: 'fadeOutTop',
          gapHorizontal: 0,
          gapVertical: 0,
          gridAdjustment: 'responsive',
          mediaQueries: [{
              width: 1600,
              cols: columns
          }, {
              width: 1200,
              cols: columns
          }, {
              width: 800,
              cols: 3
          }, {
              width: 500,
              cols: 2
          }, {
              width: 320,
              cols: 1
          }],
          caption: 'zoom',
          displayType: 'lazyLoading',
          displayTypeSpeed: 100,

          // lightbox
          lightboxDelegate: '.cbp-lightbox',
          lightboxGallery: true,
          lightboxTitleSrc: 'data-title',
          lightboxCounter: '<div class="cbp-popup-lightbox-counter">{{current}} of {{total}}</div>',
      });

    });
    

    $('#grid-container-ligthbox:not(.processed)').addClass('processed').each(function() {
      var columns = $(this).data('columns');
      $(this).cubeportfolio({
          filters: '#filters-container',
          loadMore: '#loadMore-container',
          loadMoreAction: 'click',
          layoutMode: 'grid',
          mediaQueries: [{
              width: 1100,
              cols: columns
          }, {
              width: 800,
              cols: columns
          }, {
              width: 500,
              cols: 2
          }, {
              width: 320,
              cols: 1
          }],
          defaultFilter: '*',
          animationType: 'rotateSides',
          gapHorizontal: 10,
          gapVertical: 10,
          gridAdjustment: 'responsive',
          caption: 'overlayBottomPush',
          displayType: 'sequentially',
          displayTypeSpeed: 100,

          // lightbox
          lightboxDelegate: '.cbp-lightbox',
          lightboxGallery: true,
          lightboxTitleSrc: 'data-title',
          lightboxCounter: '<div class="cbp-popup-lightbox-counter">{{current}} of {{total}}</div>',

          // singlePageInline
          singlePageInlineDelegate: '.cbp-singlePageInline',
          singlePageInlinePosition: 'below',
          singlePageInlineInFocus: true,
          singlePageInlineCallback: function(url, element) {
              // to update singlePageInline content use the following method: this.updateSinglePageInline(yourContent)
              var t = this;

              $.ajax({
                      url: url,
                      type: 'GET',
                      dataType: 'html',
                      cache: false,
                      timeout: 5000
                  })
                  .done(function(result) {

                      //t.updateSinglePageInline(result);
                      t.updateSinglePageInline($(result).find('.node-nd-project').closest('.block').html());
                  })
                  .fail(function() {
                      t.updateSinglePageInline("Error! Please refresh the page!");
                  });
          },
      });
    });
  
  });


}());