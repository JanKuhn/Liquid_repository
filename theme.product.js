theme.Product = (function() {
  
    var classes = {
      onSale: 'on-sale',
      disabled: 'disabled',
      isModal: 'is-modal',
      loading: 'loading',
      loaded: 'loaded',
      interactable: 'video-interactable',
      visuallyHide: 'visually-invisible',
      thumbActive: 'thumb--current'
    };
  
    var selectors = {
      variantsJson: '[data-variant-json]',
      currentVariantJson: '[data-current-variant-json]',
  
      imageContainer: '[data-product-images]',
      mainSlider: '[data-product-photos]',
      thumbSlider: '[data-product-thumbs]',
      photo: '[data-product-photo]',
      photoThumbs: '[data-product-thumb]',
      photoThumbItem: '[data-product-thumb-item]',
  
      priceWrapper: '[data-price-wrapper]',
      price: '[data-product-price]',
      comparePrice: '[data-product-price-compare]',
      priceA11y: '[data-price-a11y]',
      comparePriceA11y: '[data-compare-a11y]',
      sku: '[data-sku]',
      sku1: '.data-sku',
      inventory: '[data-product-inventory]',
      incomingInventory: '[data-product-incoming-inventory]',
      unitWrapper: '[data-product-unit-wrapper]',
  
      addToCart: '[data-add-to-cart]',
      addToCartText: '[data-add-to-cart-text]',
  
      originalSelectorId: '[data-product-select]',
      singleOptionSelector: '[data-variant-input]',
      variantColorSwatch: '[data-color-swatch]',
  
      productImageMain: '.product-image-main',
      productVideo: '[data-product-video]',
      videoParent: '.product__video-wrapper',
      currentSlide: '.slick-current',
  
      modalFormHolder: '#ProductFormPlaceholder-',
      formContainer: '.product-single__form'
    };
  
    var youtubeReady;
    var videos = {};
    var youtubePlayers = [];
    var youtubeVideoOptions = {
      height: '480',
      width: '850',
      playerVars :{
        autohide: 0,
        autoplay: 1,
        branding: 0,
        cc_load_policy: 0,
        controls: 0,
        fs: 0,
        iv_load_policy: 3,
        modestbranding: 1,
        playsinline: 1,
        quality: 'hd720',
        rel: 0,
        showinfo: 0,
        wmode: 'opaque'
      },
      events: {
        onReady: onVideoPlayerReady,
        onStateChange: onVideoStateChange
      }
    };
  
    var vimeoReady;
    var vimeoPlayers = [];
    var vimeoVideoOptions = {
      byline: false,
      title: false,
      portrait: false,
      loop: true
    };
  
    function onVideoPlayerReady(evt) {
      var $player = $(evt.target.a);
      var playerId = $player.attr('id');
      youtubePlayers[playerId] = evt.target; // update stored player
      var player = youtubePlayers[playerId];
  
      setParentAsLoading($player);
  
      if (videos[playerId].style === 'muted') {
        youtubePlayers[playerId].mute().playVideo().pauseVideo();
      } else {
        setParentAsLoaded($player);
      }
  
      // If first slide or only photo, start video
      if ($player.closest(selectors.currentSlide).length || $player.data('image-count') === 1) {
        if (videos[playerId].style === 'muted') {
          youtubePlayers[playerId].playVideo();
          initCheckVisibility(playerId);
        }
      }
    }
  
    function initCheckVisibility(playerId) {
      if (!playerId) {
        return;
      }
  
      // Add out of view pausing
      videoVisibilityCheck(playerId);
      $(window).on('scroll.' + playerId, {id: playerId}, $.throttle(150, videoVisibilityCheck));
    }
  
    function videoVisibilityCheck(id) {
      var playerId;
  
      if (!id) {
        return;
      }
  
      if (typeof id === 'string') {
        playerId = id;
      } else {
        // Data comes in as part of the scroll event
        playerId = id.data.id;
      }
  
      if (theme.isElementVisible($('#' + playerId))) {
        if (videos[playerId] && videos[playerId].style === 'unmuted') {
          return;
        }
        playVisibleVideo(playerId);
      } else {
        pauseHiddenVideo(playerId);
      }
    }
  
    function playVisibleVideo(id) {
      if (youtubePlayers[id] && typeof youtubePlayers[id].playVideo === 'function') {
        youtubePlayers[id].playVideo();
      }
    }
  
    function pauseHiddenVideo(id) {
      if (youtubePlayers[id] && typeof youtubePlayers[id].pauseVideo === 'function') {
        youtubePlayers[id].pauseVideo();
      }
    }
  
    function onVideoStateChange(evt) {
      var $player = $(evt.target.a);
      var playerId = $player.attr('id');
      var player = youtubePlayers[playerId];
  
      switch (evt.data) {
        case -1: // unstarted
          // Handle low power state on iOS by checking if
          // video is reset to unplayed after attempting to buffer
          if (videos[playerId].attemptedToPlay) {
            setParentAsLoaded($player);
            setVideoToBeInteractedWith($player);
          }
          break;
        case 0: // ended
          player.playVideo();
          break;
        case 1: // playing
          setParentAsLoaded($player);
          break;
        case 3: // buffering
          videos[playerId].attemptedToPlay = true;
          break;
      }
    }
  
    function setParentAsLoading($el) {
      $el
        .closest(selectors.videoParent)
        .addClass(classes.loading);
    }
  
    function setParentAsLoaded($el) {
      $el
        .closest(selectors.videoParent)
        .removeClass(classes.loading)
        .addClass(classes.loaded);
    }
  
    function setVideoToBeInteractedWith($el) {
      $el
        .closest(selectors.videoParent)
        .addClass(classes.interactable);
    }
  
    function Product(container) {
      var $container = this.$container = $(container);
      var sectionId = this.sectionId = $container.attr('data-section-id');
  
      this.inModal = $container.closest('.screen-layer').length;
      this.$modal;
  
      this.namespace = '.product-' + sectionId;
      this.namespaceImages = '.product-image-' + sectionId;
  
      this.settings = {
        enableHistoryState: $container.data('enable-history-state') || false,
        namespace: '.product-' + sectionId,
        variantType: $container.data('variant-type'),
        inventory: $container.data('inventory') || false,
        inventoryThreshold: $container.data('inventory-threshold') || false,
        incomingInventory: $container.data('incoming-inventory') || false,
        modalInit: false,
        slickMainInitialized: false,
        slickThumbInitialized: false,
        hasImages: true,
        hasVideos: $container.find(selectors.productVideo).length || false,
        hasMultipleImages: false,
        stackedImages: $container.data('images-stacked') || false,
        stackedCurrent: 0,
        stackedImagePositions: [],
        imagesAnimating: false,
        imageSize: '620x'
      };
  
      // Overwrite some settings when loaded in modal
      if (this.inModal) {
        this.settings.enableHistoryState = false;
        this.namespace = '.product-' + sectionId + '-modal';
        this.$modal = $('#ProductScreen-' + sectionId);
      }
  
      this.init();
    }
  
    Product.prototype = $.extend({}, Product.prototype, {
      init: function() {
        this.$mainSlider = $(selectors.mainSlider, this.$container);
        this.$thumbSlider = $(selectors.thumbSlider, this.$container);
        this.$firstProductImage = this.$mainSlider.find('img').first();
        this.$formHolder = $(selectors.modalFormHolder + this.sectionId);
  
        if (!this.$firstProductImage.length) {
          this.settings.hasImages = false;
        }
  
        if (this.inModal) {
          this.$container.addClass(classes.isModal);
          $('body')
            .off('productModalOpen.ProductScreen-' + this.sectionId)
            .off('productModalClose.ProductScreen-' + this.sectionId);
          $('body').on('productModalOpen.ProductScreen-' + this.sectionId, this.openModalProduct.bind(this));
          $('body').on('productModalClose.ProductScreen-' + this.sectionId, this.closeModalProduct.bind(this));
        }
  
        if (!this.inModal) {
          this.stringOverrides();
          this.formSetup();
          this.preImageSetup();
  
          this.checkIfVideos();
          this.imageSetup(true);
        }
      },
  
      formSetup: function() {
        // Determine how to handle variant availability selectors
        if (theme.settings.dynamicVariantsEnable) {
          this.$variantSelectors = $(selectors.formContainer, this.$container).find(selectors.singleOptionSelector);
        }
  
        this.initAjaxProductForm();
        this.initVariants();
      },
  
      preImageSetup: function() {
        this.setImageSizes();
        this.initImageSwitch();
        this.initImageZoom();
      },
  
      imageSetup: function(needStylesheet) {
        if (!this.$thumbSlider.length || $(selectors.photoThumbs, this.$container).length < 2) {
          // Single product image. Init video if it exists
          var $video = $(selectors.productImageMain, this.$container).find(selectors.productVideo);
          if ($video.length) {
            this.initVideo($video);
          }
  
          return;
        }
  
        this.settings.hasMultipleImages = true;
  
        if (needStylesheet) {
          slate.utils.promiseStylesheet().then(function() {
            this.createImageCarousels();
          }.bind(this));
        } else {
          this.createImageCarousels();
        }
      },
  
      initImageZoom: function() {
        var $container = $(selectors.imageContainer, this.$container);
        var imageZoom = new theme.Photoswipe($container, this.sectionId);
      },
  
      stringOverrides: function() {
        theme.productStrings = theme.productStrings || {};
        $.extend(theme.strings, theme.productStrings);
      },
  
      setImageSizes: function() {
        if (!this.settings.hasImages) {
          return;
        }
  
        // Get srcset image src, works on most modern browsers
        // otherwise defaults to settings.imageSize
        var currentImage = this.$firstProductImage[0].currentSrc;
  
        if (currentImage) {
          this.settings.imageSize = theme.Images.imageSize(currentImage);
        }
      },
  
      initVariants: function() {
        var $variantJson = $(selectors.variantsJson, this.$container);
        if (!$variantJson.length) {
          return;
        }
  
        this.variantsObject = JSON.parse($variantJson[0].innerHTML);
  
        var options = {
          $container: this.$container,
          enableHistoryState: this.settings.enableHistoryState,
          singleOptionSelector: selectors.singleOptionSelector,
          originalSelectorId: selectors.originalSelectorId,
          variants: this.variantsObject
        };
  
        if ($(selectors.variantColorSwatch, this.$container).length) {
          $(selectors.variantColorSwatch, this.$container).on('change', function(evt) {
            var $el = $(evt.currentTarget);
            var color = $el.data('color-name');
            var index = $el.data('color-index');
            this.updateColorName(color, index);
          }.bind(this));
        }
  
        this.variants = new slate.Variants(options);
  
        this.$container
          .on('variantChange' + this.namespace, this.updateCartButton.bind(this))
          .on('variantImageChange' + this.namespace, this.updateVariantImage.bind(this))
          .on('variantPriceChange' + this.namespace, this.updatePrice.bind(this))
          .on('variantUnitPriceChange' + this.namespace, this.updateUnitPrice.bind(this));
  
        if ($(selectors.sku, this.$container).length) {
          this.$container.on('variantSKUChange' + this.namespace, this.updateSku.bind(this));
        }
        
        if ($(selectors.sku1, this.$container).length) {
          this.$container.on('variantSKUChange' + this.namespace, this.updateSku.bind(this));
        }

        if (this.settings.inventory || this.settings.incomingInventory) {
          this.$container.on('variantChange' + this.namespace, this.updateInventory.bind(this));
        }
  
        // Update individual variant availability on each selection
        var $currentVariantJson = $(selectors.currentVariantJson, this.$container);
  
        if (theme.settings.dynamicVariantsEnable && $currentVariantJson.length) {
          this.currentVariantObject = JSON.parse($currentVariantJson[0].innerHTML);
  
          this.$variantSelectors.on('change' + this.namespace, this.updateVariantAvailability.bind(this));
  
          // Set default state based on current selected variant
          this.setCurrentVariantAvailability(this.currentVariantObject, true);
        }
      },
  
      // Variant change functions
      updateColorName: function(color, index) {
        // Updates on radio button change, not variant.js
        $('#VariantColorLabel-' + this.sectionId + '-' + index).text(color);
      },
  
      updateCartButton: function(evt) {
        var variant = evt.variant;
  
        if (variant) {
          if (variant.available) {
            // Available, enable the submit button and change text
            $(selectors.addToCart, this.$container).removeClass(classes.disabled).prop('disabled', false);
            $(selectors.addToCartText, this.$container).html(theme.strings.addToCart);
          } else {
            // Sold out, disable the submit button and change text
            $(selectors.addToCart, this.$container).addClass(classes.disabled).prop('disabled', true);
            $(selectors.addToCartText, this.$container).html(theme.strings.soldOut);
          }
        } else {
          // The variant doesn't exist, disable submit button
          $(selectors.addToCart, this.$container).addClass(classes.disabled).prop('disabled', true);
          $(selectors.addToCartText, this.$container).html(theme.strings.unavailable);
        }
      },
  
      updatePrice: function(evt) {
        var variant = evt.variant;
  
        if (variant) {
          // Regular price
          $(selectors.price, this.$container).html(theme.Currency.formatMoney(variant.price, theme.settings.moneyFormat)).show();
  
          // Sale price, if necessary
          if (variant.compare_at_price > variant.price) {
            $(selectors.comparePrice, this.$container).html(theme.Currency.formatMoney(variant.compare_at_price, theme.settings.moneyFormat));
            $(selectors.priceWrapper, this.$container).removeClass('hide');
            $(selectors.price, this.$container).addClass(classes.onSale);
            $(selectors.comparePriceA11y, this.$container).attr('aria-hidden', 'false');
            $(selectors.priceA11y, this.$container).attr('aria-hidden', 'false');
          } else {
            $(selectors.priceWrapper, this.$container).addClass('hide');
            $(selectors.price, this.$container).removeClass(classes.onSale);
            $(selectors.comparePriceA11y, this.$container).attr('aria-hidden', 'true');
            $(selectors.priceA11y, this.$container).attr('aria-hidden', 'true');
          }
  
          if (theme.settings.currenciesEnabled) {
            theme.currencySwitcher.ajaxrefresh();
          }
        }
      },
  
      updateUnitPrice: function(evt) {
        var variant = evt.variant;
  
        if (variant && variant.unit_price) {
          var price = theme.Currency.formatMoney(variant.unit_price, theme.settings.moneyFormat);
          var base = theme.Currency.getBaseUnit(variant);
  
          $(selectors.unitWrapper, this.$container)
            .html(price + '/' + base)
            .removeClass('hide').removeClass(classes.visuallyHide);
        } else {
          $(selectors.unitWrapper, this.$container).addClass(classes.visuallyHide);
        }
      },
  
      updateSku: function(evt) {
        var variant = evt.variant;
        var newSku = '';
  
        if (variant) {
          if (variant.sku) {
            newSku = variant.sku;
          }
  
          $(selectors.sku, this.$container).html(newSku);
          $(selectors.sku1, this.$container).html(newSku);
        }
      },
      
      updateInventory: function(evt) {
        var variant = evt.variant;
  
        // If we don't track variant inventory, hide stock
        if (!variant || !variant.inventory_management) {
          this.toggleInventoryQuantity(false);
          this.toggleIncomingInventory(false);
          return;
        }
  
        if (variant.inventory_management === 'shopify' && window.inventories && window.inventories[this.sectionId]) {
          variantInventoryObject = window.inventories[this.sectionId][variant.id];
          var quantity = variantInventoryObject.quantity;
          var showInventory = true;
          var showIncomingInventory = false;
  
          if (quantity <= 0 || quantity > theme.settings.inventoryThreshold) {
            showInventory = false;
          }
  
          this.toggleInventoryQuantity(showInventory, quantity);
  
          if (!showInventory && variantInventoryObject.incoming) {
            showIncomingInventory = true;
          }
  
          this.toggleIncomingInventory(showIncomingInventory, variant.available, variantInventoryObject.next_incoming_date);
        }
      },
  
      toggleInventoryQuantity: function(show, qty) {
        if (!this.settings.inventory) {
          show = false;
        }
  
        if (show) {
          $(selectors.inventory, this.$container)
            .removeClass('hide')
            .text(theme.strings.stockLabel.replace('[count]', qty));
        } else {
          $(selectors.inventory, this.$container).addClass('hide');
        }
      },
  
      toggleIncomingInventory: function(show, available, date) {
        if (!this.settings.incomingInventory) {
          show = false;
        }
  
        if (show) {
          var string = available ?
                       theme.strings.willNotShipUntil.replace('[date]', date) :
                       theme.strings.willBeInStockAfter.replace('[date]', date);
  
          if (!date) {
            string = theme.strings.waitingForStock;
          }
  
          $(selectors.incomingInventory, this.$container)
            .removeClass('hide')
            .text(string);
        } else {
          $(selectors.incomingInventory, this.$container).addClass('hide');
        }
      },
  
      updateVariantImage: function(evt) {
        var variant = evt.variant;
        var sizedImgUrl = theme.Images.getSizedImageUrl(variant.featured_image.src, this.settings.imageSize);
  
        var $newImage = $('.product__thumb[data-id="' + variant.featured_image.id + '"]');
        var imageIndex = this._slideIndex($newImage.closest('.product__thumb-item'));
  
        // No image, bail
        if (typeof imageIndex === 'undefined') {
          return;
        }
  
        if (!theme.config.bpSmall && this.settings.stackedImages) {
          this.stackedScrollTo(imageIndex);
        } else {
          this.$mainSlider.slick('slickGoTo', imageIndex);
        }
      },
  
      setCurrentVariantAvailability: function(variant) {
        var valuesToEnable = {
          option1: [],
          option2: [],
          option3: []
        };
  
        // Disable all options to start
        this.disableVariantGroup($(selectors.formContainer, this.$container).find('.variant-input-wrap'));
  
        // Combine all available variants
        var availableVariants = this.variantsObject.filter(function(el) {
          if (variant.id === el.id) {
            return false;
          }
  
          // Option 1
          if (variant.option2 === el.option2 && variant.option3 === el.option3) {
            return true;
          }
  
          // Option 2
          if (variant.option1 === el.option1 && variant.option3 === el.option3) {
            return true;
          }
  
          // Option 3
          if (variant.option1 === el.option1 && variant.option2 === el.option2) {
            return true;
          }
        });
  
  
        // IE11 can't handle shortform of {variant} so extra step is needed
        var variantObject = {
          variant: variant
        };
  
        availableVariants = Object.assign({}, variantObject, availableVariants);
  
        // Loop through each available variant to gather variant values
        for (var property in availableVariants) {
          if (availableVariants.hasOwnProperty(property)) {
            var item = availableVariants[property];
            var option1 = item.option1;
            var option2 = item.option2;
            var option3 = item.option3;
  
            if (option1) {
              if (valuesToEnable.option1.indexOf(option1) === -1) {
                valuesToEnable.option1.push(option1);
              }
            }
            if (option2) {
              if (valuesToEnable.option2.indexOf(option2) === -1) {
                valuesToEnable.option2.push(option2);
              }
            }
            if (option3) {
              if (valuesToEnable.option3.indexOf(option3) === -1) {
                valuesToEnable.option3.push(option3);
              }
            }
          }
        }
  
        // Have values to enable, separated by option index
        if (valuesToEnable.option1.length) {
          this.enableVariantOptionByValue(valuesToEnable.option1, 'option1');
        }
        if (valuesToEnable.option2.length) {
          this.enableVariantOptionByValue(valuesToEnable.option2, 'option2');
        }
        if (valuesToEnable.option3.length) {
          this.enableVariantOptionByValue(valuesToEnable.option3, 'option3');
        }
      },
  
      updateVariantAvailability: function(evt, value, index) {
        if (value && index) {
          var newVal = value;
          var optionIndex = index;
        } else {
          var $el = $(evt.currentTarget);
          var newVal = $el.val() ? $el.val() : evt.currentTarget.value;
          var optionIndex = $el.data('index');
        }
  
        var variants = this.variantsObject.filter(function(el) {
          return el[optionIndex] === newVal;
        });
  
        // Disable all buttons/dropdown options that aren't the current index
        $(selectors.formContainer, this.$container).find('.variant-input-wrap').each(function(index, el) {
          var $group = $(el);
          var currentOptionIndex = $group.data('index');
  
          if (currentOptionIndex !== optionIndex) {
            // Disable all options as a starting point
            this.disableVariantGroup($group);
  
            // Loop through legit available options and enable
            for (var i = 0; i < variants.length; i++) {
              this.enableVariantOption($group, variants[i][currentOptionIndex]);
            }
          }
        }.bind(this));
      },
  
      disableVariantGroup: function($group) {
        if (this.settings.variantType === 'dropdown') {
          $group.find('option').prop('disabled', true)
        } else {
          $group.find('input').prop('disabled', true);
          $group.find('label').toggleClass('disabled', true);
        }
      },
  
      enableVariantOptionByValue: function(array, index) {
        var $group = $(selectors.formContainer, this.$container).find('.variant-input-wrap[data-index="'+ index +'"]');
  
        for (var i = 0; i < array.length; i++) {
          this.enableVariantOption($group, array[i]);
        }
      },
  
      enableVariantOption: function($group, value) {
        // Selecting by value so escape it
        value = value.replace(/([ #;&,.+*~\':"!^$[\]()=>|\/@])/g,'\\$1');
  
        if (this.settings.variantType === 'dropdown') {
          $group.find('option[value="'+ value +'"]').prop('disabled', false);
        } else {
          var $buttonGroup = $group.find('.variant-input[data-value="'+ value +'"]');
          $buttonGroup.find('input').prop('disabled', false);
          $buttonGroup.find('label').toggleClass('disabled', false);
        }
      },
  
      // Image/thumbnail toggling
      initImageSwitch: function() {
        if (!$(selectors.photoThumbs, this.$container).length) {
          return;
        }
  
        var self = this;
  
        $(selectors.photoThumbs, this.$container).on('click', function(evt) {
          evt.preventDefault();
          if (!theme.config.bpSmall && this.settings.stackedImages) {
            var index = $(evt.currentTarget).data('index');
            this.stackedScrollTo(index);
          }
        }.bind(this));
      },
  
      checkIfVideos: function() {
        var $productVideos = this.$mainSlider.find(selectors.productVideo);
  
        // Stop if there are 0 videos
        if (!$productVideos.length) {
          return false;
        }
  
        var videoTypes = [];
  
        $productVideos.each(function() {
          var type = $(this).data('video-type');
  
          if (videoTypes.indexOf(type) < 0) {
            videoTypes.push(type);
          }
        });
  
        // Load YouTube API if not already loaded
        if (videoTypes.indexOf('youtube') > -1) {
          if (!theme.config.youTubeReady) {
            window.loadYouTube();
            $('body').on('youTubeReady' + this.namespace, function() {
              this.loadYoutubeVideos($productVideos);
            }.bind(this));
          } else {
            this.loadYoutubeVideos($productVideos);
          }
        }
  
        // Load Vimeo API if not already loaded
        if (videoTypes.indexOf('vimeo') > -1) {
          if (!vimeoReady) {
            window.loadVimeo();
            $('body').on('vimeoReady' + this.namespace, function() {
              this.loadVimeoVideos($productVideos);
            }.bind(this))
          } else {
            this.loadVimeoVideos($productVideos);
          }
        }
  
        // Add mp4 video players
        if (videoTypes.indexOf('mp4') > -1) {
          this.loadMp4Videos($productVideos);
        }
  
        return videoTypes;
      },
  
      loadMp4Videos: function($videos) {
        $videos.each(function() {
          var $el = $(this);
          if ($el.data('video-type') != 'mp4') {
            return;
          }
  
          var id = $el.attr('id');
          var videoId = $el.data('video-id');
  
          videos[this.id] = {
            type: 'mp4',
            divId: id,
            style: $el.data('video-style')
          };
        });
      },
  
      loadVimeoVideos: function($videos) {
        $videos.each(function() {
          var $el = $(this);
          if ($el.data('video-type') != 'vimeo') {
            return;
          }
  
          var id = $el.attr('id');
          var videoId = $el.data('video-id');
  
          videos[this.id] = {
            type: 'vimeo',
            divId: id,
            id: videoId,
            style: $el.data('video-style'),
            width: $el.data('video-width'),
            height: $el.data('video-height')
          };
        });
  
        // Create a new player for each Vimeo video
        for (var key in videos) {
          if (videos[key].type != 'vimeo') {
            continue;
          }
  
          var args = $.extend({}, vimeoVideoOptions, videos[key]);
          vimeoPlayers[key] = new Vimeo.Player(videos[key].divId, args);
        }
  
        vimeoReady = true;
      },
  
      autoplayVimeoVideo: function(id) {
        // Do not autoplay on mobile though
        if (!theme.config.bpSmall) {
          this.requestToPlayVimeoVideo(id);
        } else {
          // Set as loaded on mobile so you can see the image
          var $player = $('#' + id);
          setParentAsLoaded($player);
        }
      },
  
      requestToPlayVimeoVideo: function(id) {
        // The slider may initialize and attempt to play the video before
        // the API is even ready, because it sucks.
  
        var $player = $('#' + id);
        setParentAsLoading($player);
  
        if (!vimeoReady) {
          // Wait for the trigger, then play it
          $('body').on('vimeoReady' + this.namespace, function() {
            this.playVimeoVideo(id);
          }.bind(this))
          return;
        }
  
        this.playVimeoVideo(id);
      },
  
      playVimeoVideo: function(id) {
        vimeoPlayers[id].play();
  
        if (videos[id].style === 'muted') {
          vimeoPlayers[id].setVolume(0);
        }
  
        var $player = $('#' + id);
        setParentAsLoaded($player);
      },
  
      stopVimeoVideo: function(id) {
        if (!theme.config.vimeoReady) {
          return;
        }
  
        if (id) {
          vimeoPlayers[id].pause();
        } else {
          for (key in vimeoPlayers) {
            if (typeof vimeoPlayers[key].pause === 'function') {
              vimeoPlayers[key].pause();
            }
          }
        }
      },
  
      loadYoutubeVideos: function($videos) {
        $videos.each(function() {
          var $el = $(this);
          if ($el.data('video-type') != 'youtube') {
            return;
          }
  
          var id = $el.attr('id');
          var videoId = $el.data('youtube-id');
  
          videos[this.id] = {
            type: 'youtube',
            id: id,
            videoId: videoId,
            style: $el.data('video-style'),
            width: $el.data('video-width'),
            height: $el.data('video-height'),
            attemptedToPlay: false
          };
        });
  
        // Create a player for each YouTube video
        for (var key in videos) {
          if (videos[key].type === 'youtube') {
            if (videos.hasOwnProperty(key)) {
              var args = $.extend({}, youtubeVideoOptions, videos[key]);
  
              if (args.style === 'muted') {
                // default youtubeVideoOptions, no need to change anything
              } else {
                args.playerVars.controls = 1;
                args.playerVars.autoplay = 0;
              }
  
              youtubePlayers[key] = new YT.Player(key, args);
            }
          }
        }
  
        youtubeReady = true;
      },
  
      requestToPlayYoutubeVideo: function(id, forcePlay) {
        if (!theme.config.youTubeReady) {
          return;
        }
  
        var $player = $('#' + id);
        setParentAsLoading($player);
  
        // If video is requested too soon, player might not be ready.
        // Set arbitrary timeout to request it again in a second
        if (typeof youtubePlayers[id].playVideo != 'function') {
          var o = this;
          setTimeout(function() {
            o.playYoutubeVideo(id, forcePlay);
          }, 1000);
          return;
        }
  
        this.playYoutubeVideo(id, forcePlay);
      },
  
      playYoutubeVideo: function (id, forcePlay) {
        var $player = $('#' + id);
        setParentAsLoaded($player);
        if (typeof youtubePlayers[id].playVideo === 'function') {
          youtubePlayers[id].playVideo();
        }
  
        // forcePlay is sent as true from beforeSlideChange so the visibility
        // check isn't fooled by the next slide positioning
        if (!forcePlay) {
          initCheckVisibility(id);
        }
      },
  
      stopYoutubeVideo: function(id) {
        if (!theme.config.youTubeReady) {
          return;
        }
  
        if (id && youtubePlayers[id]) {
          if (typeof youtubePlayers[id].pauseVideo === 'function') {
            youtubePlayers[id].pauseVideo();
          }
          $(window).off('scroll.' + id);
        } else {
          for (key in youtubePlayers) {
            if (typeof youtubePlayers[key].pauseVideo === 'function') {
              youtubePlayers[key].pauseVideo();
              $(window).off('scroll.' + key);
            }
          }
        }
      },
  
      playMp4Video: function(id) {
        var $player = $('#' + id);
        setParentAsLoaded($player);
  
        $player[0].play();
      },
  
      stopMp4Video: function(id) {
        if (id) {
          $('#' + id)[0].pause();
        } else {
          // loop through all mp4 videos to stop them
          for (var key in videos) {
            if (videos[key].type === 'mp4') {
              var player = $('#' + videos[key].divId)[0];
              if (typeof player.pause === 'function') {
                player.pause();
              }
            }
          }
        }
      },
  
      stackedImagesInit: function() {
        $(window).off(this.namespaceImages);
        this.stackedImagePositions();
  
        if (this.inModal) {
          // Slight delay in modal to accommodate loading videos
          setTimeout(function() {
            this.stackedActive(this.settings.stackedCurrent);
          }.bind(this), 1000);
        } else {
          this.stackedActive(this.settings.stackedCurrent);
        }
  
  
        // update image positions on resize
        $(window).on('resize' + this.namespaceImages, $.debounce(200, this.stackedImagePositions.bind(this)));
  
        // scroll listener to mark active thumbnail
        $(window).on('scroll' + this.namespaceImages, $.throttle(200, function() {
          var goal = window.scrollY;
          var closest = this.settings.stackedImagePositions.reduce(function(prev, curr) {
            return (Math.abs(curr - goal) < Math.abs(prev - goal) ? curr : prev);
          });
          var index = this.settings.stackedImagePositions.indexOf(closest)
          if (this.settings.stackedCurrent !== index) {
            this.stackedActive(index);
          }
        }.bind(this)));
      },
  
      stackedImagePositions: function() {
        var positions = [];
        $(selectors.photo, this.$container).each(function() {
          positions.push(Math.round($(this).offset().top));
        });
        this.settings.stackedImagePositions = positions;
      },
  
      stackedScrollTo: function(index) {
        // Scroll to top of large image
        var pos = $(selectors.photo, this.$container).eq(index).offset().top;
        $('html, body').animate({
          scrollTop: pos
        }, 400, 'swing');
      },
  
      stackedActive: function(index) {
        $(selectors.photoThumbItem, this.$container)
          .removeClass(classes.thumbActive)
          .eq(index).addClass(classes.thumbActive);
  
        if (this.settings.hasVideos) {
          this.stopVideo();
  
          var $video = $(selectors.photo, this.$container).eq(index).find(selectors.productVideo);
  
          if ($video.length) {
            this.initVideo($video);
          }
        }
  
        this.settings.stackedCurrent = index;
      },
  
      createImageCarousels: function() {
        // Set starting slide (for both sliders)
        var $activeSlide = this.$mainSlider.find('.starting-slide');
        var startIndex = this._slideIndex($activeSlide);
  
        // Lame way to prevent duplicate event listeners
        this.$mainSlider.off('init');
        this.$mainSlider.off('beforeChange');
        this.$mainSlider.on('init', this.mainSlideInit.bind(this));
        this.$mainSlider.on('beforeChange', this.beforeSlideChange.bind(this));
        this.$thumbSlider.on('init', this.thumbSlideInit.bind(this));
  
        // Default (mobile) slider settings
        this.mainSliderArgs = {
          infinite: true,
          arrows: false,
          dots: true,
          touchThreshold: 10,
          speed: 300,
          adaptiveHeight: true,
          initialSlide: startIndex
        };
  
        this.thumbSliderArgs = {
          initialSlide: startIndex
        };
  
        // Init sliders normally
        var sliderArgs = this.setSliderArgs();
        this.initSliders(sliderArgs);
  
        // Re-init slider when a breakpoint is hit
        $('body').on('matchSmall matchLarge', function() {
          var sliderArgs = this.setSliderArgs();
          this.initSliders(sliderArgs);
        }.bind(this));
  
        // Too many thumbnails can cause the AOS calculations to be off
        // so refresh that when the slider is ready
        if (AOS) {
          AOS.refresh();
        }
      },
  
      initSliders: function(args) {
        this.destroyImageCarousels();
  
        if (!theme.config.bpSmall && this.settings.stackedImages) {
          this.stackedImagesInit();
        } else {
          this.$mainSlider.not('.slick-initialized').slick(args.main);
        }
  
        if (!theme.config.bpSmall && !this.settings.stackedImages) {
          if (this.$thumbSlider.length) {
            this.$thumbSlider.not('.slick-initialized').slick(args.thumbs);
          }
        }
      },
  
      setSliderArgs: function() {
        var args = {};
        var thumbnailsVertical = this.$thumbSlider.data('position') === 'beside' ? true : false;
  
        if (theme.config.bpSmall) {
          args.main = this.mainSliderArgs;
          args.thumbs = this.thumbSliderArgs;
        } else {
          args.main = $.extend({}, this.mainSliderArgs, {
            asNavFor: '#' + this.$thumbSlider.attr('id'),
            adaptiveHeight: thumbnailsVertical ? false : true,
            dots: false,
            infinite: false,
            fade: true
          });
  
          args.thumbs = $.extend({}, this.thumbSliderArgs, {
            asNavFor: '#' + this.$mainSlider.attr('id'),
            slidesToShow: thumbnailsVertical ? 3 : 5,
            slidesToScroll: 1,
            arrows: false,
            dots: false,
            vertical: thumbnailsVertical,
            verticalSwiping: thumbnailsVertical,
            focusOnSelect: true,
            infinite: false,
            customHeightMatching: thumbnailsVertical,
            customSlideAdvancement: true
          });
        }
  
        return args;
      },
  
      destroyImageCarousels: function() {
        if (this.$mainSlider && this.settings.slickMainInitialized) {
          this.$mainSlider.slick('unslick');
          this.settings.slickMainInitialized = false;
        }
  
        if (this.$thumbSlider && this.settings.slickThumbInitialized) {
          this.$thumbSlider.slick('unslick');
          this.settings.slickThumbInitialized = false;
        }
  
        this.settings.slickMainInitialized = false;
        this.settings.slickThumbInitialized = false;
      },
  
      mainSlideInit: function(event, slick) {
        var $currentSlide = slick.$slider.find(selectors.currentSlide);
        var $video = $currentSlide.find(selectors.productVideo);
  
        this.settings.slickMainInitialized = true;
  
        if (!$video.length) {
          return;
        }
  
        this.initVideo($video);
      },
  
      thumbSlideInit: function(event, slick) {
        this.settings.slickThumbInitialized = true;
      },
  
      initVideo: function($video) {
        var videoType = $video.data('video-type');
        var divId = $video.attr('id');
  
        if (videoType === 'mp4' && videos[divId].style === 'muted') {
          this.playMp4Video(divId);
        }
  
        if (videoType === 'youtube') {
          if (youtubeReady && videos[divId].style === 'muted') {
            this.requestToPlayYoutubeVideo(divId);
          }
        }
  
        if (videoType === 'vimeo') {
          if (vimeoReady) {
            this.playOrShowVimeo(divId);
          } else {
            $('body').on('vimeoReady' + this.namespace, function() {
              this.playOrShowVimeo(divId);
            }.bind(this))
          }
        }
  
        // Hacky way to trigger resetting the slider layout in modals
        if (this.inModal) {
          this.resizeSlides();
        }
      },
  
      stopVideo: function(id, type) {
        if (!id) {
          this.stopYoutubeVideo();
          this.stopVimeoVideo();
          this.stopMp4Video();
        }
  
        if (type === 'youtube') {
          this.stopYoutubeVideo(id);
        }
  
        if (type === 'mp4') {
          this.stopMp4Video(id);
        }
  
        if (type === 'vimeo') {
          this.stopVimeoVideo(id);
        }
      },
  
      playOrShowVimeo: function(id) {
        if (videos[id] && videos[id].style === 'muted') {
          this.autoplayVimeoVideo(id);
        } else if (videos[id] && videos[id].style === 'unmuted') {
          setParentAsLoaded($('#' + id));
        }
      },
  
      getVideoType: function($video) {
        return $video.data('video-type');
      },
  
      getVideoId: function($video) {
        return $video.attr('id');
      },
  
      beforeSlideChange: function(event, slick, currentSlide, nextSlide) {
        var $slider = slick.$slider;
        var $currentSlide = $slider.find(selectors.currentSlide);
        var $prevVideo = $currentSlide.find('.product__video');
        var $nextSlide = $slider.find('.slick-slide[data-slick-index="' + nextSlide + '"]');
        var $nextVideo = $nextSlide.find('.product__video');
  
        // Pause any existing slide video
        if (currentSlide !== nextSlide && $prevVideo.length) {
          var prevVideoType = this.getVideoType($prevVideo);
          var prevVideoId = this.getVideoId($prevVideo);
  
          if (prevVideoId) {
            this.stopVideo(prevVideoId, prevVideoType);
          }
        }
  
        // Prep next slide video
        if ($nextVideo.length) {
          var nextVideoType = this.getVideoType($nextVideo);
          var nextVideoId = this.getVideoId($nextVideo);
  
          // Prep Vimeo with a backup in case the API isn't ready
          if (nextVideoId && nextVideoType === 'vimeo') {
            if (vimeoReady) {
              if (videos[nextVideoId] && videos[nextVideoId].style === 'muted') {
                this.autoplayVimeoVideo(nextVideoId);
              }
            } else {
              $('body').on('vimeoReady' + this.namespace, function() {
                if (videos[nextVideoId] && videos[nextVideoId].style === 'muted') {
                  this.autoplayVimeoVideo(nextVideoId);
                }
              }.bind(this))
            }
          }
  
          // Prep YouTube with a backup in case API isn't ready
          if (nextVideoId && nextVideoType === 'youtube') {
            if (youtubeReady) {
              if (videos[nextVideoId] && videos[nextVideoId].style === 'muted') {
                this.requestToPlayYoutubeVideo(nextVideoId, true);
              }
            } else {
              $('body').on('youTubeReady' + this.namespace, function() {
                if (videos[nextVideoId] && videos[nextVideoId].style === 'muted') {
                  this.requestToPlayYoutubeVideo(nextVideoId, true);
                }
              }.bind(this))
            }
          }
  
          // Autoplay muted MP4 videos
          if (nextVideoId && videos[nextVideoId] && videos[nextVideoId].style === 'muted') {
            if (nextVideoType === 'mp4') {
              this.playMp4Video(nextVideoId);
            }
          }
  
          // Set unmuted videos to loaded state
          if (nextVideoId && videos[nextVideoId] && videos[nextVideoId].style != 'muted') {
            setParentAsLoaded($('#' + nextVideoId));
          }
        }
      },
  
      resizeSlides: function() {
        if (!this.settings.hasMultipleImages) {
          return;
        }
  
        // Necessary to make slider visible again
        $(window).trigger('resize.slick');
        setTimeout(function() {
          if (this.$mainSlider && this.settings.slickMainInitialized) {
            this.$mainSlider.slick('setPosition');
          }
          if (this.$thumbSlider && this.settings.slickThumbInitialized) {
            this.$thumbSlider.slick('setPosition');
          }
        }.bind(this), 500); // same timing as modal open transition
      },
  
      _slideIndex: function($el) {
        return $el.data('index');
      },
  
      initAjaxProductForm: function() {
        if (theme.settings.cartType === 'drawer' || theme.settings.cartType === 'sticky') {
          new theme.AjaxProduct($(selectors.formContainer, this.$container));
        }
      },
  
      openModalProduct: function() {
        var initialized = false;
        if (!this.settings.modalInit) {
          var url = this.$formHolder.data('url');
          var template = this.$formHolder.data('template');
  
          // If not template, product uses default product template
          // which has sections. Ajax view is a slimmed down version to
          // load only essentials
          if (!template) {
            url = url + '?view=ajax';
          }
  
          $.get(url, function(data) {
            var $template = $(data);
            var $newForm = $template.find('#AddToCartForm-' + this.sectionId);
            this.replaceModalFormHolder(this.$formHolder, $newForm);
  
            var $sectionDiv = $template.find('#ProductSections-' + this.sectionId);
            if ($sectionDiv.length) {
              this.loadProductSections($sectionDiv);
            }
  
            var $relatedDiv = $template.find('#Recommendations-' + this.sectionId);
            if ($relatedDiv.length) {
              this.loadRelatedProducts($relatedDiv);
            }
  
            var $socialDiv = $template.find('.index-section.instagram-section');
            if ($socialDiv.length) {
              this.loadSocialSection($socialDiv);
            }
  
            if (window.SPR) {
              SPR.initDomEls();SPR.loadBadges();
            }
  
            sections.loadSubSections(this.$modal);
  
            document.dispatchEvent(new CustomEvent('quickview:loaded', {
              detail: {
                productId: this.sectionId
              }
            }));
          }.bind(this));
  
          this.preImageSetup();
          this.loadModalContent();
          this.imageSetup(false);
          this.settings.modalInit = true;
        } else {
          initialized = true;
          if (!theme.config.bpSmall && this.settings.stackedImages) {
            this.stackedActive(0);
          }
        }
  
        document.dispatchEvent(new CustomEvent('quickview:open', {
          detail: {
            initialized: initialized,
            productId: this.sectionId
          }
        }));
  
        this.resizeSlides();
      },
  
      closeModalProduct: function() {
        this.stopVideo();
        $('body').off(this.namespace);
        $(window).off(this.namespace);
      },
  
      replaceModalFormHolder: function($holder, $form) {
        $holder.replaceWith($form);
        this.formSetup();
        if (Shopify.PaymentButton) {
          Shopify.PaymentButton.init();
        }
      },
  
      loadProductSections: function($content) {
        $('#ProductSectionsHolder-' + this.sectionId).replaceWith($content);
      },
  
      loadRelatedProducts: function($content) {
        // Remove any quick view modals as they cause conflicts.
        // These are not output with product.ajax templates,
        // but are in our custom product.sections ones and any custom ones
        // developers create.
        $content.find('.screen-layer--product').remove();
  
        $('#ProductRelatedHolder-' + this.sectionId).replaceWith($content);
      },
  
      loadSocialSection: function($content) {
        $('#SocialSectionHolder-' + this.sectionId).replaceWith($content);
      },
  
      loadModalContent: function() {
        // Load videos if they exist
        var videoTypes = this.checkIfVideos();
  
        // Lazyload mp4 videos similar to images
        if (videoTypes && videoTypes.indexOf('mp4') > -1) {
          this.$modal.find('.product__video[data-video-type="mp4"]').each(function(i, video) {
            var $el = $(video);
            var src = $el.data('video-src');
            var source = document.createElement('source');
            source.setAttribute('src', src);
            $el.append(source);
          }.bind(this));
        }
      },
  
      onUnload: function() {
        this.$container.off(this.namespace);
        $('body').off(this.namespace);
        $(window).off(this.namespace).off(this.namespaceImages);;
        this.destroyImageCarousels();
  
        if (AOS) {
          AOS.refresh();
        }
      }
    });
  
    return Product;
  })();