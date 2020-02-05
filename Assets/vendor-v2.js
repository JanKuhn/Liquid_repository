@charset "UTF-8";

/*
  Streamline, by Archetype Themes
  http://archetypethemes.co
*/

.clearfix { &
    : after {
        content: '';
        display: table;
        clear: both;
    }
}

@mixin clearfix() { &
    ::after {
        content: '';
        display: table;
        clear: both;
    }
}

/*================ Media Query Mixin ================*/

@mixin media - query($media - query) {
    @each $breakpoint in $grid - breakpoints {
        $name: nth($breakpoint, 1);
        $declaration: nth($breakpoint, 2);

        @if $media - query == $name and $declaration {
            @media only screen and# { $declaration } {
                @content;
            }
        }
    }
}

/*================ Responsive Show/Hide Helper ================*/

@mixin responsive - display - helper($grid - breakpoint - type: '') {
    .# { $grid - breakpoint - type }
    show {
        display: block!important;
    }

    .# { $grid - breakpoint - type }
    hide {
        display: none!important;
    }
}

/*================ Responsive Text Alignment Helper ================*/

@mixin responsive - text - align - helper($grid - breakpoint - type: '') {
    .# { $grid - breakpoint - type }
    text - left {
        text - align: left!important;
    }

    .# { $grid - breakpoint - type }
    text - right {
        text - align: right!important;
    }

    .# { $grid - breakpoint - type }
    text - center {
        text - align: center!important;
    }
}

/*================ Animation related mixins ================*/

@mixin keyframes($name) {
    @keyframes# { $name } {
        @content;
    }
}

@function cart - animation - iteration($i: 1, $base: 0.1 s) {
    $additional: 0.06 * $i;
    @if $i == 1 {
        $additional: 0;
    }
    @return $base + $additional;
}

/*================ Functions ================*/

@function em($target, $context: $type_base_size) {
    @if $target == 0 {
        @return 0;
    }
    @return $target / $context + 0e m;
}

@function color - control($color, $opacity) {
    @if(lightness($color) > 40) {
        @return rgba(0, 0, 0, $opacity);
    }
    @else {
        @return rgba(255, 255, 255, $opacity);
    }
}

@function adaptive - color($color, $percentage) {
    @if(lightness($color) > 40) {
        @return darken($color, $percentage);
    }
    @else {
        @return lighten($color, $percentage);
    }
}

// Font mixins. Mobile fonts are ~85% the size of desktop

@mixin smallFontSize {
    font - size: ($type_base_size - 2) * 0.85;
    @include media - query($medium - up) {
        font - size: $type_base_size - 2;
    }
}

@mixin smallestFontSize {
    font - size: ($type_base_size - 5) * 0.85;
    @include media - query($medium - up) {
        font - size: $type_base_size - 5;
    }
}

@mixin largeFontSize {
    font - size: ($type_base_size * 1.22) * 0.85;

    @include media - query($medium - up) {
        font - size: $type_base_size * 1.22;
    }
}

@mixin largestFontSize {
    font - size: ($type_base_size * 1.45) * 0.85;

    @include media - query($medium - up) {
        font - size: $type_base_size * 1.45;
    }
}

// Header tags defined in critical CSS. Also defined here for

// use in other elements

@mixin headerFontStack {
    font - family: $type_header_stack;
    font - weight: $type_header_weight;
    font - style: $type_header_style;
    letter - spacing: $type_header_spacing;
    line - height: $type_header_line_height;
    @if($type_header_capitalize) {
        text - transform: uppercase;
    }
}

@mixin header - size($percent, $context: $type_header_base_size) {
    font - size: floor($context * $percent) * 0.85;
    @include media - query($medium - up) {
        font - size: floor($context * $percent);
    }
}

@mixin buttonFontStack {
    @if($button_type_style == 'caps') {
        letter - spacing: 0.2e m;
        text - transform: uppercase;
        font - size: $type_base_size - 2;
    }
}

@mixin visuallyHidden {
    clip: rect(0 0 0 0);
    clip: rect(0, 0, 0, 0);
    overflow: hidden;
    position: absolute;
    height: 1 px;
    width: 1 px;
}

/*================ Animations and keyframes ================*/

@include keyframes(spin) {
    0 % {
        transform: rotate(0 deg);
    }

    100 % {
        transform: rotate(360 deg);
    }
}

@include keyframes(fadeIn) {
    0 % , 35 % {
        opacity: 0;
    }
    100 % {
        opacity: 1;
    }
}

@include keyframes(heroContentIn) {
    0 % , 35 % {
        opacity: 0;
        transform: translateY(8 px);
    }
    60 % {
        opacity: 1;
    }
    100 % {
        transform: translateY(0);
    }
}

@include keyframes(remove) {
    0 % {
        transform: translateX(0);
        max - height: 250 px;
        opacity: 1;
    }

    33 % {
        transform: translateX(50 % );
        max - height: 250 px;
        opacity: 0;
    }

    100 % {
        transform: translateX(50 % );
        max - height: 0;
        opacity: 0;
    }
}

/*================ Overlay ================*/

@mixin overlay($z - index: null) {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;

    @if($z - index) {
        z - index: $z - index;
    }
}

@mixin heroScrim() {
    background - color: $colorImageOverlay;
    opacity: $colorImageOverlayOpacity;
}

@mixin heroRadial() {
    @include overlay;
    background: radial - gradient(rgba(0, 0, 0, $colorImageOverlayTextShadow) 0 % , rgba(0, 0, 0, 0) 60 % );
    margin: -100 px - 200 px - 100 px - 200 px;
    pointer - events: none;
}

// General size variables

$gutter: 40 px;

$page - width: 1300 px;

$borderWidth: 2 px;

$page - width - gutter - small: 30 px;

$page - width - gutter - large: $gutter;

$grid - gutter: 40 px;

$grid - gutter - small: 30 px;

$iosSafeZoneModifier: 1.18;

// multiply with ios safe-area-inset-bottom (34px)

$iosSafeZoneBottom: calc(20 px + #{ $iosSafeZoneModifier } * env(safe - area - inset - bottom));

/*============================================================================
  Grid Breakpoints and Class Names
    - Do not change breakpoint variable names
    - Medium breakpoint is also set in theme.js.liquid and inline
    throughout some templates. Be weary of changing unless you know what you're doing.
==============================================================================*/

$grid - medium: 769 px;

$grid - large: 960 px;

$grid - widescreen: 1550 px;

$small: 'small';

$medium - up: 'medium-up';

$widescreen: 'widescreen';

$grid - breakpoint - has - widths: ($small, $medium - up, $widescreen);

$grid - breakpoint - has - utility: ($small, $medium - up, $widescreen);

$grid - breakpoint - has - push: ($medium - up);

// The `$grid-breakpoints` list is used to build our media queries.

// You can use these in the media-query mixin.

$grid - breakpoints: (
    $small '(max-width: #{$grid-medium - 1})',
    $medium - up '(min-width: #{$grid-medium})',
    $widescreen '(min-width: #{$grid-widescreen})'
);

/*================ Color variables ================*/

// Button colors

$colorBtnPrimary: {
    { settings.color_button |
            default: '#000' } };

$colorBtnPrimaryText: {
    { settings.color_button_text |
            default: '#fff' } };

$colorBtnPrimaryBgTransition: background 0.15 s ease;

$colorBtnPrimaryActive: lighten($colorBtnPrimary, 20 % );

$colorCartDot: {
    { settings.color_cart_dot |
            default: '#ff4f33' } };

$colorCartDotText: {
    { settings.color_cart_dot_text |
            default: '#fff' } };

// Text link colors

$colorLink: {
    { settings.color_body_text |
            default: '#1c1d1d' } };

// Text colors

$colorTextBody: {
    { settings.color_body_text |
            default: '#1c1d1d' } };

// Backgrounds

$colorBody: {
    { settings.color_body_bg |
            default: '#fff' } };

$colorInputBg: {
    { settings.color_body_bg |
            default: '#1c1d1d' } };

// Alt sections

$colorAlt: {
    { settings.color_alt_bg |
            default: '#f4f4f4' } };

$colorAltText: {
    { settings.color_alt_text |
            default: '#000' } };

// Border colors

$colorBorder: $colorTextBody;

// Nav and dropdown link background

$colorNav: {
    { settings.color_body_bg |
            default: '#fff' } };

$colorNavText: {
    { settings.color_body_text |
            default: '#000' } };

$colorAnnouncement: {
    { settings.color_announcement |
            default: '#1c1d1d' } };

$colorAnnouncementText: {
    { settings.color_announcement_text |
            default: '#fff' } };

$colorStickyNavLinks: #fff;

// Footer newsletter section

$colorNewsletter: {
    { settings.color_newsletter |
            default: '#1c1d1d' } };

$colorNewsletterText: {
    { settings.color_newsletter_text |
            default: '#fff' } };

// Hero text color

$colorHeroText: {
    { settings.color_image_text |
            default: '#fff' } };

// Helper colors

$disabledGrey: #f6f6f6;

$disabledBorder: darken($disabledGrey, 25 % );

$errorRed: #d02e2e;

$errorRedBg: #fff6f6;

$successGreen: #56ad6a;



$successGreenBg: # ecfef0;

// Content spacing

$contentTopMargin: 70 px;

$contentTopMarginSmall: 40 px;

// Section header & collection image

$sectionHeaderBottom: 60 px;

$sectionHeaderBottomSmall: 40 px;

// Slideshow colors

$slideshow - text - light: #fff;

$slideshow - text - dark: #000;



// Modal



$colorModalBg: $colorBody;



$colorModalOverlay: $colorTextBody;



// Image overlays



$colorSmallImageBg: {{ settings.color_small_image_bg | default: '# eee ' }};

$colorLargeImageBg: {
    { settings.color_large_image_bg |
            default: '#1c1d1d' } };

$colorImageOverlay: {
    { settings.color_image_overlay |
            default: '#000' } };

$colorImageOverlayOpacity: {
    { settings.color_image_overlay_opacity | divided_by: 100.0 } };

$colorImageOverlayTextShadow: {
    { settings.color_image_overlay_text_shadow | divided_by: 100.0 } };

// Icon sizes

$desktopMenuIconSize: 30 px;

$desktopMenuChevronSize: 10 px;

$colorSwatchCollectionSize: 19 px;

$colorSwatchCollectionSizeLarge: 20 px;

$siteNavItemPadding: 15 px;

$siteNavIconPadding: 12 px;

// Products in scrolling sections

$scrollingProductSmallMobile: 63 % ;

$scrollingProductSmallDesktop: 27 % ;

$scrollingProductMediumMobile: 53 % ;

$scrollingProductMediumDesktop: 21 % ;

$scrollingProductLargeMobile: 37 % ;

$scrollingProductLargeDesktop: 17 % ;

// Product images

$product_image_scatter: {
    { settings.product_image_scatter |
            default: false } };

// Z-index

$zindexStickyHeader: 20;

$zindexNavDropdowns: 5;

$zindexModalClose: 5;

$zindexDrawer: 30;

$zindexDrawerOverlay: 26;

$zindexModal: 25;

$zindexStickyCart: 20;

$zindexThumbMenuButton: 20;

$zindexThumbMenu: 18;

$zindexShopifyChatBubble: 17;

$zindexSkipToContent: 10000;

$zindexAnnouncement: 24;

$zindexOverlayHeader: 6;

/*================ Sticky cart and menu sizing ================*/

$thumbButtonHeight: 68 px;

$thumbMenuDesktopWidth: 350 px;

$thumbMenuDesktopWidthStickyActive: 500 px;

$thumbGutter: 40 px;

$thumbBottomPosition: $thumbButtonHeight + $thumbGutter;

$thumbBottomPositionSmall: $thumbButtonHeight + ($thumbGutter / 2);

/*================ Typography ================*/

// Font-face header styles

$type_header_family: {
    { settings.type_header_font_family.family } };

$type_header_fallback: {
    { settings.type_header_font_family.fallback_families } };

$type_header_stack: #{ "'" + $type_header_family + "', " + $type_header_fallback };

$type_header_weight: {
    { settings.type_header_font_family.weight } };

$type_header_style: {
    { settings.type_header_font_family.style } };

$type_header_capitalize: {
    { settings.type_header_capitalize |
            default: false } };

// Non font-face header styles

$type_header_line_height: {
    { settings.type_header_line_height |
            default: 1.4 } };

$type_header_base_size: {
    { settings.type_header_base_size |
            default: 32 } }
px;

$type_header_spacing: {
    { settings.type_header_spacing |
            default: "25" | divided_by: 1000.00 } }
em;

// Non font-face base styles

$type_base_line_height: {
    { settings.type_base_line_height |
            default: 1.4 } };

$type_base_size: {
    { settings.type_base_size |
            default: 16 } }
px;

// Other font styles

$type_product_capitalize: {
    { settings.type_product_capitalize |
            default: false } };

$icon_weight: 5 px;

// 2-7px

$icon_linecaps: miter;

// miter/round

/*================ Button styles ================*/

$button_type_style: {
    { settings.button_type_style |
            default: 'caps' } };

$buttonStyle: {
    { settings.button_style |
            default: 'square' } };

/*================ Animations ================*/

$animate_page_transitions: {
    { settings.animate_page_transitions } };

$animate_images: {
    { settings.animate_images } };

$animate_underlines: true;

$animate_underlines_duration: 0.3 s;

// $animate_images_style options

// fade-in (default)

// paint-across

$animate_images_style: fade - in ;

// $animate_page_transition_style options

// page-fade

// page-logo (default)

// page-slow-fade

// page-slide-reveal-across

// page-slide-reveal-down

$animate_page_transition_style: page - logo;

/*================ Drawers/sticky cart ================*/

$drawerOpenSpeed: 0.25 s;

$drawerCloseSpeed: 0.2 s;

$drawerCartWidth: 500 px;

// small-up width

$drawerHeaderHeight: 60 px;

$drawerHeaderHeightLarge: 80 px;

$drawerCartFooterHeight: 130 px;

// default, overwritten by JS

$fixedHeightLimit: 400 px;

$colorDrawers: {
    { settings.color_drawer_background |
            default: '#1c1d1d' } };

$colorDrawerText: {
    { settings.color_drawer_text |
            default: '#fff' } };

/*================ Misc sizing vars ================*/

$indexSectionMarginSmall: 60 px;

$indexSectionMarginLarge: 120 px;

/*================ Buttons ================*/

$btnPrimaryPadding: 10 px 25 px;

$btnPrimaryPaddingCaps: 14 px 22 px;

$btnPrimaryPaddingSmall: 8 px 23 px;

$btnPrimaryPaddingSmallCaps: 11 px 20 px;

$btnSmallPadding: 8 px 12 px;

$btnSmallPaddingSmall: 6 px 11 px;

$btnMinHeightWhenQuickCheckout: 50 px;

$input - radius: 0;

$button - radius: 0;

@if($buttonStyle == 'round-slight') {
    $button - radius: 3 px;
}

@if($buttonStyle == 'round') {
    $button - radius: 35 px;
}

/*================ Global | Normalize ================*/

*
, input,: before,: after {
    box - sizing: border - box;
}

html, body {
    padding: 0;
    margin: 0;
}

article, aside, details, figcaption, figure, footer, header, hgroup, main, nav, section, summary {
    display: block;
}

audio, canvas, progress, video {
    display: inline - block;
    vertical - align: baseline;
}

input[type = "number"]::-webkit - inner - spin - button,
    input[type = "number"]::-webkit - outer - spin - button {
        height: auto;
    }

input[type = "search"]::-webkit - search - cancel - button,
    input[type = "search"]::-webkit - search - decoration {
        -webkit - appearance: none;
    }

// Loading animations

@keyframes placeholder - shimmer {
    0 % {
        background - position: -150 % 0;
    }
    100 % {
        background - position: 150 % 0;
    }
}

@keyframes loading {
    0 % { width: 0 px; }
    60 % { width: 100 px;margin - left: -50 px; }
    100 % { margin - left: 50 px;width: 0 px; }
}

@keyframes preloading {
    0 % { width: 0 px;opacity: 0; }
    60 % { width: 100 px;margin - left: -50 px;opacity: 1; }
    100 % { margin - left: 50 px;width: 0 px;opacity: 1; }
}

@keyframes progressBar {
    0 % { width: 0 % ; }
    95 % { width: 100 % ;opacity: 1; }
    100 % { width: 100 % ;opacity: 0; }
}

// Page transitions

@if($animate_page_transitions) {
    @keyframes page - fade {
        0 % {
            opacity: 0;
        }
        100 % {
            opacity: 1;
        }
    }

    @keyframes page - slide - reveal - across {
        0 % {
            transform: translateX(0);
        }
        100 % {
            transform: translateX(100 vw);
        }
    }

    @keyframes page - slide - reveal - down {
        0 % {
            transform: translateY(0);
        }
        100 % {
            transform: translateY(110 vh);
        }
    }
}

// General transitions

@keyframes fade - in {
    from {
        opacity: 0.2;
        transform: scale(0.98, 0.98);
    }
    to {
        opacity: 1;
        transform: scale(1, 1);
    }
}

@keyframes fade - in -bg {
    0 % {
        opacity: 0.2;
        transform: scale(1.06, 1.06);
    }
    50 % {
        opacity: 1;
    }
    100 % {
        opacity: 1;
        transform: scale(1, 1);
    }
}

@keyframes fade - out {
    from {
        opacity: 1;
    }
    to {
        opacity: 0;
    }
}

@keyframes partial - fade - in {
    from { opacity: 0; }
    to { opacity: 0.4; }
}

@keyframes partial - fade - out {
    from { opacity: 0.4; }
    to { opacity: 0; }
}

@keyframes pulse - fade {
    0 % {
        opacity: 0;
    }
    50 % {
        opacity: 1;
    }
    100 % {
        opacity: 0;
    }
}

@keyframes rise - up {
    from {
        opacity: 0;
        transform: translateY(20 px);
    }
    to {
        opacity: 1;
        transform: translateY(0 % );
    }
}

@keyframes cart - rise - up {
    from {
        transform: translateY(120 % );
    }
    to {
        transform: translateY(0 % );
    }
}

@keyframes paint - across {
    from {
        opacity: 1; -
        webkit - clip - path: polygon(0 % 0 % , 0 % 0 % , 0 % 100 % , 0 % 100 % );
        clip - path: polygon(0 % 0 % , 0 % 0 % , 0 % 100 % , 0 % 100 % );
    }
    to {
        opacity: 1; -
        webkit - clip - path: polygon(0 % 0 % , 100 % 0 % , 100 % 100 % , 0 % 100 % );
        clip - path: polygon(0 % 0 % , 100 % 0 % , 100 % 100 % , 0 % 100 % );
    }
}

// Hero animations

@keyframes hero - animate {
    0 % {
        opacity: 0;
        transform: scale(1);
    }
    10 % {
        opacity: 1;
    }
    100 % {
        opacity: 1;
        transform: scale(1.1);
    }
}

@keyframes hero - animate - small {
    0 % {
        opacity: 0;
        transform: scale(1);
    }
    10 % {
        opacity: 1;
    }
    100 % {
        opacity: 1;
        transform: scale(1.2);
    }
}

@keyframes hero - animate - out {
    0 % {
        opacity: 1;
        transform: scale(1.1);
    }
    100 % {
        opacity: 0;
        transform: scale(1.1);
    }
}

@keyframes hero - animate - out - small {
    0 % {
        opacity: 1;
        transform: scale(1.2);
    }
    100 % {
        opacity: 0;
        transform: scale(1.2);
    }
}

// Marquee scrolling text

@keyframes marquee - left {
    0 % {
        transform: translateX(-1 % );
    }
    100 % {
        transform: translateX(-51 % );
    }
}

@keyframes marquee - right {
    0 % {
        transform: translateX(-51 % );
    }
    100 % {
        transform: translateX(-1 % );
    }
}

// Ajax product loading

@keyframes grid - product__loading {
    0 % { opacity: 0; }
    60 % { opacity: 0.2; }
    100 % { opacity: 0; }
}

.grid {
    @include clearfix();
    list - style: none;
    margin: 0;
    padding: 0;
    margin - left: -$grid - gutter;

    @include media - query($small) {
        margin - left: -$grid - gutter - small;
    }
}

.grid--small {
    margin - left: -10 px;

    .grid__item {
        padding - left: 10 px;
    }
}

.grid__item {
    float: left;
    padding - left: $grid - gutter;
    width: 100 % ;
    min - height: 1 px;

    @include media - query($small) {
        padding - left: $grid - gutter - small; &
        .grid - column {
            margin - bottom: 30 px; &
            : last - child {
                margin - bottom: 0;
            }
        }
    }

    &
    [class *= "--push"] {
        position: relative;
    }

}

.grid--small - gutters {
    margin - left: -10 px;
    margin - bottom: -10 px;

    .grid__item {
        padding - left: 10 px;
        padding - bottom: 10 px;
    }
}

.grid--full {
    margin - left: 0;

    >
    .grid__item {
        padding - left: 0;
    }
}

@include media - query($small) {
    .small--grid--flush {
        margin - left: -1 px;

        .page - width & {
            margin - left: -$page - width - gutter - small;
            margin - right: -$page - width - gutter - small;
        }

        >
        .grid__item {
            padding - left: 1 px;
        }
    }
}

@include media - query($medium - up) {
    .grid--table - large {
        display: table;
        width: 100 % ;
        table - layout: fixed;

        >
        .grid__item {
            display: table - cell;
            vertical - align: middle;
            float: none;
        }
    }
}

/*============================================================================
  Grid Columns
    - Create width classes, prepended by the breakpoint name.
==============================================================================*/

@mixin grid - column - generator($grid - breakpoint - type: '') {
    /* Whole */
    .# { $grid - breakpoint - type }
    one - whole { width: 100 % ; }

    /* Halves */
    .# { $grid - breakpoint - type }
    one - half { width: percentage(1 / 2); }

    /* Thirds */
    .# { $grid - breakpoint - type }
    one - third { width: percentage(1 / 3); }
        .# { $grid - breakpoint - type }
    two - thirds { width: percentage(2 / 3); }

    /* Quarters */
    .# { $grid - breakpoint - type }
    one - quarter { width: percentage(1 / 4); }
        .# { $grid - breakpoint - type }
    two - quarters { width: percentage(2 / 4); }
        .# { $grid - breakpoint - type }
    three - quarters { width: percentage(3 / 4); }

    /* Fifths */
    .# { $grid - breakpoint - type }
    one - fifth { width: percentage(1 / 5); }
        .# { $grid - breakpoint - type }
    two - fifths { width: percentage(2 / 5); }
        .# { $grid - breakpoint - type }
    three - fifths { width: percentage(3 / 5); }
        .# { $grid - breakpoint - type }
    four - fifths { width: percentage(4 / 5); }

    /* Sixths */
    .# { $grid - breakpoint - type }
    one - sixth { width: percentage(1 / 6); }
        .# { $grid - breakpoint - type }
    two - sixths { width: percentage(2 / 6); }
        .# { $grid - breakpoint - type }
    three - sixths { width: percentage(3 / 6); }
        .# { $grid - breakpoint - type }
    four - sixths { width: percentage(4 / 6); }
        .# { $grid - breakpoint - type }
    five - sixths { width: percentage(5 / 6); }

    /* Eighths */
    .# { $grid - breakpoint - type }
    one - eighth { width: percentage(1 / 8); }
        .# { $grid - breakpoint - type }
    two - eighths { width: percentage(2 / 8); }
        .# { $grid - breakpoint - type }
    three - eighths { width: percentage(3 / 8); }
        .# { $grid - breakpoint - type }
    four - eighths { width: percentage(4 / 8); }
        .# { $grid - breakpoint - type }
    five - eighths { width: percentage(5 / 8); }
        .# { $grid - breakpoint - type }
    six - eighths { width: percentage(6 / 8); }
        .# { $grid - breakpoint - type }
    seven - eighths { width: percentage(7 / 8); }

    /* Tenths */
    .# { $grid - breakpoint - type }
    one - tenth { width: percentage(1 / 10); }
        .# { $grid - breakpoint - type }
    two - tenths { width: percentage(2 / 10); }
        .# { $grid - breakpoint - type }
    three - tenths { width: percentage(3 / 10); }
        .# { $grid - breakpoint - type }
    four - tenths { width: percentage(4 / 10); }
        .# { $grid - breakpoint - type }
    five - tenths { width: percentage(5 / 10); }
        .# { $grid - breakpoint - type }
    six - tenths { width: percentage(6 / 10); }
        .# { $grid - breakpoint - type }
    seven - tenths { width: percentage(7 / 10); }
        .# { $grid - breakpoint - type }
    eight - tenths { width: percentage(8 / 10); }
        .# { $grid - breakpoint - type }
    nine - tenths { width: percentage(9 / 10); }

    /* Twelfths */
    .# { $grid - breakpoint - type }
    one - twelfth { width: percentage(1 / 12); }
        .# { $grid - breakpoint - type }
    two - twelfths { width: percentage(2 / 12); }
        .# { $grid - breakpoint - type }
    three - twelfths { width: percentage(3 / 12); }
        .# { $grid - breakpoint - type }
    four - twelfths { width: percentage(4 / 12); }
        .# { $grid - breakpoint - type }
    five - twelfths { width: percentage(5 / 12); }
        .# { $grid - breakpoint - type }
    six - twelfths { width: percentage(6 / 12); }
        .# { $grid - breakpoint - type }
    seven - twelfths { width: percentage(7 / 12); }
        .# { $grid - breakpoint - type }
    eight - twelfths { width: percentage(8 / 12); }
        .# { $grid - breakpoint - type }
    nine - twelfths { width: percentage(9 / 12); }
        .# { $grid - breakpoint - type }
    ten - twelfths { width: percentage(10 / 12); }
        .# { $grid - breakpoint - type }
    eleven - twelfths { width: percentage(11 / 12); }
}

/*================ Grid push classes ================*/

@mixin grid - push - generator($grid - breakpoint - type: '') {
    /* Halves */
    .# { $grid - breakpoint - type }
    push - one - half { left: percentage(1 / 2); }

    /* Thirds */
    .# { $grid - breakpoint - type }
    push - one - third { left: percentage(1 / 3); }
        .# { $grid - breakpoint - type }
    push - two - thirds { left: percentage(2 / 3); }

    /* Quarters */
    .# { $grid - breakpoint - type }
    push - one - quarter { left: percentage(1 / 4); }
        .# { $grid - breakpoint - type }
    push - two - quarters { left: percentage(2 / 4); }
        .# { $grid - breakpoint - type }
    push - three - quarters { left: percentage(3 / 4); }

    /* Fifths */
    .# { $grid - breakpoint - type }
    push - one - fifth { left: percentage(1 / 5); }
        .# { $grid - breakpoint - type }
    push - two - fifths { left: percentage(2 / 5); }
        .# { $grid - breakpoint - type }
    push - three - fifths { left: percentage(3 / 5); }
        .# { $grid - breakpoint - type }
    push - four - fifths { left: percentage(4 / 5); }

    /* Sixths */
    .# { $grid - breakpoint - type }
    push - one - sixth { left: percentage(1 / 6); }
        .# { $grid - breakpoint - type }
    push - two - sixths { left: percentage(2 / 6); }
        .# { $grid - breakpoint - type }
    push - three - sixths { left: percentage(3 / 6); }
        .# { $grid - breakpoint - type }
    push - four - sixths { left: percentage(4 / 6); }
        .# { $grid - breakpoint - type }
    push - five - sixths { left: percentage(5 / 6); }

    /* Eighths */
    .# { $grid - breakpoint - type }
    push - one - eighth { left: percentage(1 / 8); }
        .# { $grid - breakpoint - type }
    push - two - eighths { left: percentage(2 / 8); }
        .# { $grid - breakpoint - type }
    push - three - eighths { left: percentage(3 / 8); }
        .# { $grid - breakpoint - type }
    push - four - eighths { left: percentage(4 / 8); }
        .# { $grid - breakpoint - type }
    push - five - eighths { left: percentage(5 / 8); }
        .# { $grid - breakpoint - type }
    push - six - eighths { left: percentage(6 / 8); }
        .# { $grid - breakpoint - type }
    push - seven - eighths { left: percentage(7 / 8); }

    /* Tenths */
    .# { $grid - breakpoint - type }
    push - one - tenth { left: percentage(1 / 10); }
        .# { $grid - breakpoint - type }
    push - two - tenths { left: percentage(2 / 10); }
        .# { $grid - breakpoint - type }
    push - three - tenths { left: percentage(3 / 10); }
        .# { $grid - breakpoint - type }
    push - four - tenths { left: percentage(4 / 10); }
        .# { $grid - breakpoint - type }
    push - five - tenths { left: percentage(5 / 10); }
        .# { $grid - breakpoint - type }
    push - six - tenths { left: percentage(6 / 10); }
        .# { $grid - breakpoint - type }
    push - seven - tenths { left: percentage(7 / 10); }
        .# { $grid - breakpoint - type }
    push - eight - tenths { left: percentage(8 / 10); }
        .# { $grid - breakpoint - type }
    push - nine - tenths { left: percentage(9 / 10); }

    /* Twelfths */
    .# { $grid - breakpoint - type }
    push - one - twelfth { left: percentage(1 / 12); }
        .# { $grid - breakpoint - type }
    push - two - twelfths { left: percentage(2 / 12); }
        .# { $grid - breakpoint - type }
    push - three - twelfths { left: percentage(3 / 12); }
        .# { $grid - breakpoint - type }
    push - four - twelfths { left: percentage(4 / 12); }
        .# { $grid - breakpoint - type }
    push - five - twelfths { left: percentage(5 / 12); }
        .# { $grid - breakpoint - type }
    push - six - twelfths { left: percentage(6 / 12); }
        .# { $grid - breakpoint - type }
    push - seven - twelfths { left: percentage(7 / 12); }
        .# { $grid - breakpoint - type }
    push - eight - twelfths { left: percentage(8 / 12); }
        .# { $grid - breakpoint - type }
    push - nine - twelfths { left: percentage(9 / 12); }
        .# { $grid - breakpoint - type }
    push - ten - twelfths { left: percentage(10 / 12); }
        .# { $grid - breakpoint - type }
    push - eleven - twelfths { left: percentage(11 / 12); }
}

/*================ Clearfix helper on uniform grids ================*/

@mixin grid--uniform - clearfix($grid - breakpoint - type: '') {
    .grid--uniform {
        .# { $grid - breakpoint - type }
        one - half: nth - child(2 n + 1),
            .# { $grid - breakpoint - type }
        one - third: nth - child(3 n + 1),
            .# { $grid - breakpoint - type }
        one - quarter: nth - child(4 n + 1),
            .# { $grid - breakpoint - type }
        one - fifth: nth - child(5 n + 1),
            .# { $grid - breakpoint - type }
        one - sixth: nth - child(6 n + 1),
            .# { $grid - breakpoint - type }
        two - sixths: nth - child(3 n + 1),
            .# { $grid - breakpoint - type }
        three - sixths: nth - child(2 n + 1),
            .# { $grid - breakpoint - type }
        one - eighth: nth - child(8 n + 1),
            .# { $grid - breakpoint - type }
        two - eighths: nth - child(4 n + 1),
            .# { $grid - breakpoint - type }
        four - eighths: nth - child(2 n + 1),
            .# { $grid - breakpoint - type }
        five - tenths: nth - child(2 n + 1),
            .# { $grid - breakpoint - type }
        one - twelfth: nth - child(12 n + 1),
            .# { $grid - breakpoint - type }
        two - twelfths: nth - child(6 n + 1),
            .# { $grid - breakpoint - type }
        three - twelfths: nth - child(4 n + 1),
            .# { $grid - breakpoint - type }
        four - twelfths: nth - child(3 n + 1),
            .# { $grid - breakpoint - type }
        six - twelfths: nth - child(2 n + 1) { clear: both; }
    }
}

/*================ Build Base Grid Classes ================*/

@include grid - column - generator();

@include responsive - display - helper();

@include responsive - text - align - helper();

/*================ Build Responsive Grid Classes ================*/

@each $breakpoint in $grid - breakpoint - has - widths {
    @include media - query($breakpoint) {
        @include grid - column - generator('#{$breakpoint}--');
        @include grid--uniform - clearfix('#{$breakpoint}--');
    }
}

@each $breakpoint in $grid - breakpoint - has - utility {
    @include media - query($breakpoint) {
        @include responsive - display - helper('#{$breakpoint}--');
        @include responsive - text - align - helper('#{$breakpoint}--');
    }
}

/*================ Build Grid Push Classes ================*/

@each $breakpoint in $grid - breakpoint - has - push {
    @include media - query($breakpoint) {
        @include grid - push - generator('#{$breakpoint}--');
    }
}

/*================ Partials | Helper Classes ================*/

[tabindex = '-1']: focus {
    outline: none;
}

html: not(.tab - outline) *: focus {
    outline: none;
}

.is - transitioning {
    display: block!important;
    visibility: visible!important;
}

.visually - hidden {
    @include visuallyHidden();
}

// Keep dimensions but hide visually

.visually - invisible {
    opacity: 0!important;
}

/*============================================================================
  #OOCSS Media Object
    - http://www.stubbornella.org/content/2010/06/25/the-media-object-saves-hundreds-of-lines-of-code/
==============================================================================*/

.media,
.media - flex {
    overflow: hidden;
    _overflow: visible;
    zoom: 1;
}

.media - img {
    float: left;
    margin - right: $gutter;
}

.media - img - right {
    float: right;
    margin - left: $gutter;
}

.media - img img,
    .media - img - right img {
        display: block;
    }

/*============================================================================
  Skip to content button
    - Overrides .visually-hidden when focused
==============================================================================*/

.skip - link: focus {
    clip: auto;
    width: auto;
    height: auto;
    margin: 0;
    color: $colorTextBody;
    background - color: $colorBody;
    padding: 10 px;
    opacity: 1;
    z - index: $zindexSkipToContent;
    transition: none;
}

.splash - screen {
    display: none!important;
}

.transition - body {
    opacity: 1!important;
    transition: opacity 0.2 s ease;
}

html {
    -ms - touch - action: manipulation;
    touch - action: manipulation; -
    webkit - tap - highlight - color: transparent;
}

html,
body {
    background - color: $colorBody;
    color: $colorTextBody;
}

.page - width {
    max - width: $page - width;
    margin: 0 auto;
}

.page - width,
    .page - full {
        padding: 0 $page - width - gutter - small;

        @include media - query($medium - up) {
            padding: 0 $gutter;
        }
    }

.page - content,
    .shopify - policy__container {
        padding - top: $gutter * 0.75;
        padding - bottom: $gutter * 0.75;
        @include media - query($medium - up) {
            padding - top: $gutter * 1.5;
            padding - bottom: $gutter * 1.5;
        }
    }

.page - content--with - blocks {
    padding - bottom: 0;
}

.product - section.page - content {
    @include media - query($small) {
        padding - top: $gutter / 2;
    }
}

.main - content {
    min - height: 300 px;
    @include media - query($medium - up) {
        min - height: 700 px;
    }
}

hr {
    height: $borderWidth;
    border: 0;
    border - top: $borderWidth solid $colorBorder;
}

.hr--small {
    margin: 15 px auto;
}

.hr--medium {
    margin: 25 px auto;

    @include media - query($medium - up) {
        margin: 35 px auto;
    }
}

.hr--large {
    margin: ($gutter) auto;

    @include media - query($medium - up) {
        margin: ($gutter * 1.5) auto;
    }
}

.hr--clear {
    border: 0;
}

/*============================================================================
  Responsive tables, defined with .table--responsive on table element.
  Only defined for IE9+
==============================================================================*/

.table--responsive {
    @include media - query($small) {
        thead {
            display: none;
        }

        tr {
            display: block;
        }

        // IE9 table layout fixes
        tr,
        td {
            float: left;
            clear: both;
            width: 100 % ;
        }

        th,
        td {
            display: block;
            text - align: right;
            padding: 15 px;
        }

        td: before {
            @include smallFontSize;
            content: attr(data - label);
            float: left;
            padding - right: 10 px;
        }
    }
}

@include media - query($small) {
    .table--small - hide {
        display: none!important;
    }

    .table__section + .table__section {
        position: relative;

        &
        : after {
            content: '';
            display: block;
            position: absolute;
            top: 0;
            left: 15 px;
            right: 15 px;
            border - bottom: $borderWidth solid $colorBorder;
        }
    }
}

p,
.paragraph {
    margin: 0 0($gutter / 2) 0;

    img {
        margin: 0;
    }
}

em {
    font - style: italic;
}

b, strong {
    font - weight: bold;
}

small {
    @include smallFontSize;
}

sup, sub {
    position: relative;
    font - size: 60 % ;
    vertical - align: baseline;
}

sup {
    top: -0.5e m;
}

sub {
    bottom: -0.5e m;
}

blockquote,
.rte blockquote {
    @include largeFontSize;
    margin: 0;
    padding: ($gutter / 2) $gutter 40 px;

    p {
        margin - bottom: 0;

        &
        +cite {
            margin - top: $gutter / 2;
        }
    }

    cite {
        display: block;

        &
        : before {
            content: "\2014 \0020";
        }
    }
}

code, pre {
    background - color: #faf7f5;
    font - family: Consolas, monospace;
    font - size: 1e m;
    border: 0 none;
    padding: 0 2 px;
    color: #51ab62;

}



pre {

  overflow: auto;

  padding: $gutter / 2;

  margin: 0 0 $gutter;

}



/*= === === === === === Form elements === === === === === = * /

    label {
        display: block;
        margin - bottom: 10 px;
    }

    .label - info {
        display: block;
        margin - bottom: 10 px;
    }

    /*============================================================================
      Headings
    ==============================================================================*/

    h1, .h1,
    h2, .h2,
    h3, .h3,
    h4, .h4,
    h5, .h5,
    h6, .h6 {
        margin: 0 0($gutter / 4);

        @include media - query($medium - up) {
            margin: 0 0($gutter / 2);
        }

        a {
            text - decoration: none;
            font - weight: inherit;
        }
    }

    h1, .h1,
    .section - header__title,
        .spr - header - title.spr - header - title {
            @include header - size(1);
        }

    // h2 does not use header font stack

    h2, .h2 {
        @include header - size(0.66);
    }

    h3, .h3 {
        @include header - size(0.57);
    }

    h4, .h4 {
        @include header - size(0.45);
    }

    h5, .h5,
    h6, .h6 {
        @include header - size(0.4);
    }

    .subheading {
        font - size: $type_base_size - 3;
        letter - spacing: 0.25e m;
        text - transform: uppercase;
        margin - bottom: 15 px;

        @include media - query($medium - up) {
            font - size: $type_base_size - 5;
            margin - bottom: 15 px;
        }
    }

    // Standardize text spacing sometimes

    .text - spacing {
        margin - bottom: $gutter / 2;
    }

    /*================ Rich Text Editor Styles ================*/

    .rte {
        table {
            @include media - query($small) {
                    td,
                    th {
                        padding: 6 px 8 px;
                    }
                }
                .collapsible - content & {
                    td,
                    th {
                        padding: 6 px 8 px;
                    }
                }
        }
    }

    /*================ Blog Typography ================*/

    .comment {
        border - bottom: 1 px solid $colorBorder;
        padding - bottom: $gutter;
        margin - bottom: $gutter;

        &
        : last - child {
            border - bottom: 0;
        }
    }

    .comment__date {
        @include smallestFontSize;
        margin - top: 3 px;
        @include media - query($small) {
            margin - bottom: $gutter / 2
        }
    }

    /*================ Misc typography ================*/

    .skrim__title {
        @include header - size(0.57);
    }

    .enlarge - text {
        @include smallestFontSize;
    }

    .rte {
        .enlarge - text {
            margin: 0;

            p {

                &
                : last - child {
                    margin - bottom: 0;
                }
            }
        }
    }

    /*================ Partials | Lists ================*/

    ul, ol {
        margin: 0 0($gutter / 2)($gutter);
        padding: 0;
        text - rendering: optimizeLegibility;
    }

    ol ol {
        list - style: lower - alpha;
    }

    ol { list - style: decimal; }

    ul ul, ul ol,
    ol ol, ol ul { margin: 4 px 0 5 px 20 px; }

    li { margin - bottom: 0.25e m; }

    ul.square { list - style: square outside; }

    ul.disc { list - style: disc outside; }

    ol.alpha { list - style: lower - alpha outside; }

    .no - bullets {
        list - style: none outside;
        margin - left: 0;
    }

    .inline - list {
        padding: 0;
        margin: 0;

        li {
            display: inline - block;
            margin - bottom: 0;
            vertical - align: middle;
        }
    }

    table {
        width: 100 % ;
        border - spacing: 1 px;
        position: relative;
        border: 0 none;
        background: $colorBorder;
    }

    .table - wrapper {
        max - width: 100 % ;
        overflow: auto; -
        webkit - overflow - scrolling: touch;
    }

    td,
    th {
        border: 0 none;
        text - align: left;
        padding: 10 px 15 px;
        background: $colorBody;
    }

    th {
        font - weight: bold;
    }

    // Typography

    th,
    .table__title {
        font - weight: bold;
    }

    /*================ Partials | Links ================*/

    a,
    .text - link {
        color: inherit;
        text - decoration: none;
        background: transparent;

        &
        : hover {
            color: inherit;
        }
    }

    /*================ Force an input/button to look like a text link ================*/

    .text - link {
        display: inline;
        border: 0 none;
        background: none;
        padding: 0;
        margin: 0;
        font - size: inherit;
    }

    /*================ Links in RTE ================*/

    .rte a,
    .shopify - policy__container a {
        color: $colorLink;
    }

    /*================ Animated underline links ================*/

    .customers {
        a: not(.rte__image) {
            text - decoration: none;
            border - bottom: $borderWidth solid rgba($colorTextBody, 0.1);
            position: relative;
        }

            @if($animate_underlines) {
            a: not(.btn): after {
                content: '';
                position: absolute;
                bottom: -$borderWidth;
                left: 0;
                width: 0 % ;
                border - bottom: $borderWidth solid currentColor;
                transition: width $animate_underlines_duration ease;
            }

                a: not(.btn) { &
                : hover: after, &
                    : focus: after {
                        width: 100 % ;
                    }
            }


        }
    }

    .rte {
        a: not(.rte__image): not(.btn) {
            display: inline - block;
            text - decoration: none;
            padding - bottom: 2 px;
            border - bottom: $borderWidth solid currentColor;
        }

            a.rte__image: after {
            content: none;
        }
    }

    /*================ Partials | Buttons ================*/

    button {
        color: currentColor;
        overflow: visible;
    }

    button[disabled],
        html input[disabled] {
            cursor: default;
        }

    .btn,
    .rte.btn,
        .shopify - payment - button.shopify - payment - button__button--unbranded,
        .product - reviews.spr - summary - actions a,
        .product - reviews.spr - button {
            @include buttonFontStack;
            display: inline - block;
            padding: $btnPrimaryPadding;
            @if($button_type_style == 'caps') {
                padding: $btnPrimaryPaddingCaps;
            }
            margin: 0;
            width: auto;
            min - width: 90 px;
            line - height: 1.42;
            text - decoration: none;
            text - align: center;
            vertical - align: middle;
            white - space: normal;
            cursor: pointer;
            border: $borderWidth solid transparent; -
            webkit - user - select: none; -
            moz - user - select: none; -
            ms - user - select: none;
            user - select: none; -
            webkit - appearance: none; -
            moz - appearance: none;
            border - radius: $button - radius;
            color: $colorBtnPrimaryText;
            background: $colorBtnPrimary;
            transition: $colorBtnPrimaryBgTransition;

            @include media - query($small) {
                padding: $btnPrimaryPaddingSmall;
                @if($button_type_style == 'caps') {
                    padding: $btnPrimaryPaddingSmallCaps;
                }
            }

            &
            : hover {
                color: $colorBtnPrimaryText;
                background - color: $colorBtnPrimary;
            }

            &
            : active {
                background - color: $colorBtnPrimaryActive;
            }

            &
            [disabled], &
            .disabled {
                cursor: default;
                color: darken($disabledBorder, 27 % );
                background - color: $disabledGrey;
                transition: none;

                &
                : hover {
                    color: darken($disabledBorder, 27 % );
                    background - color: $disabledGrey;
                }
            }
        }

    // Mimic the .btn hover style for Shopify Payment Button

    .shopify - payment - button.shopify - payment - button__button--unbranded: hover: not([disabled]) {
        color: $colorBtnPrimaryText;
        background - color: $colorBtnPrimary;
    }

    // Match rounded corners on branded buttons

    .shopify - payment - button.shopify - payment - button__button--branded {
        border - radius: $button - radius;
        @if($button - radius != 0) {
            overflow: hidden;
        }
    }

    // Match additional cart button styles to theme

    .additional - checkout - buttons div[role = "button"] {
        border - radius: $button - radius!important;
    }

    .btn--secondary,
    .rte.btn--secondary {
        color: $colorBtnPrimary;
        background: $colorBtnPrimaryText;

        &
        : hover {
            color: $colorBtnPrimary;
            background - color: $colorBtnPrimaryText;
        }
    }

    .btn--tertiary,
    .rte.btn--tertiary {
        background - color: $colorBody;
        border: $borderWidth solid $colorTextBody;
        color: $colorTextBody;
        font - weight: normal;

        &
        : hover {
            background - color: $colorBody;
            color: $colorTextBody;
        }

        &
        [disabled], &
        .disabled {
            cursor: default;
            color: darken($disabledBorder, 27 % );
            background - color: $disabledGrey;
        }

        &
        : active {
            color: $colorTextBody;
            background: $colorBody;
        }

        @if($buttonStyle == 'shadow') {
            box - shadow: 5 px 5 px 0 0 $colorTextBody;
            transition: transform 0.05 s, box - shadow 0.05 s;
            margin - bottom: 5 px;

            &
            : active {
                transform: translate(4 px, 4 px);
                box - shadow: 1 px 1 px 0 0 $colorTextBody;
            }

            &
            .btn--full {
                width: calc(100 % -5 px);

                @include media - query($small) {
                    .small--text - center & {
                        transform: translateX(-2.5 px);
                    }
                }
            }
        }
    }

    /*================ Button variations ================*/

    .btn--small,
    .collapsibles - wrapper.spr - summary - actions a,
        .collapsibles - wrapper.spr - button {
            @include smallFontSize;
            padding: $btnSmallPadding;
            background - position: 150 % 45 % ;
            min - width: 90 px;

            @include media - query($small) {
                padding: $btnSmallPaddingSmall;
            }
        }

    .btn--large {
        padding: 15 px 20 px;
    }

    .btn--full {
        width: 100 % ;
    }

    .btn--inverse {
        background - color: $colorHeroText;
        color: color - control($colorHeroText, 0.9);

        &
        : hover {
            background - color: $colorHeroText;
            color: color - control($colorHeroText, 0.9);

            @if($buttonStyle == 'shadow') {
                color: #fff;
            }
        }

        &
        : active {
            background - color: darken($colorHeroText, 5 % );

            @if($buttonStyle == 'shadow') {
                transform: translate(4 px, 4 px);
                box - shadow: 1 px 1 px 0 0# fff;
            }
        }

        @if($buttonStyle == 'shadow') {
            background - color: transparent!important;
            //border: 2px solid #fff;
            color: #fff;
            //box-shadow: 5px 5px 0 0 #fff;
            transition: transform 0.05 s, box - shadow 0.05 s;
        }
    }

    // Tertiary link in hero can have custom color

    .hero__link.btn--inverse {
        @if($buttonStyle == 'shadow') {
            //box-shadow: 5px 5px 0 0 $colorHeroText;

            &
            : active {
                box - shadow: 1 px 1 px 0 0 $colorHeroText;
            }
        }
    }

    /*================ Button loading indicator - requires child span ================*/

    .btn--loading {
        position: relative;

        // Loading text and animation
        span: after {
            display: -ms - flexbox;
            display: flex; -
            ms - flex - align: center;
            align - items: center; -
            ms - flex - pack: center;
            justify - content: center;
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            animation: pulse - fade 0.3 s infinite linear;
        }

        // Add to cart and loading text colors
            span {
            color: $colorBtnPrimary;

            &
            : after {
                color: $colorBody;
            }
        }

            &
            .btn--tertiary span {
                color: $colorBody;

                &
                : after {
                    color: $colorTextBody;
                }
            }
    }

    /*================ Collapsible trigger ================*/

    .collapsible - trigger - btn {
        display: block;
        width: 100 % ;
        text - align: left;
        margin: 0;
        padding: ($gutter / 2) 0;

        @include media - query($small) {
            padding: ($gutter / 2) 0;
        }

        // One-off for the show more/less collection tag button
        &
        .btn--tertiary {
            padding: 6 px 10 px;
            width: auto;
        }
    }

    .collapsible - trigger - btn--borders {
        border - top: $borderWidth solid $colorBorder;

        &
        : first - child {
                border - top: none;
            }
            .collapsible - content + & {
                margin - top: -$borderWidth;
            }

        +
        .collapsible - content.collapsible - content__inner {
            padding - bottom: $gutter / 2;
        }
    }

    /*================ Collapsible trigger, tab style ================*/

    .collapsible - trigger--tab {
        display: inline - block;
        padding: 5 px 0 2 px;
        margin: 0 10 px 5 px;

        &
        : after {
            content: '';
            position: absolute;
            bottom: -$borderWidth;
            left: 0;
            width: 0 % ;
            border - bottom: $borderWidth solid currentColor;
        }

            &
            .is - open: after {
                width: 100 % ;
                transition: width $animate_underlines_duration ease;
            }

            @include media - query($medium - up) {
            padding - left: 0;
            padding - right: 0;
            margin: 0 15 px 5 px 0;
        }
    }

    /*================ Modal and screen layer close ================*/

    .btn--circle {
        padding: 10 px;
        border - radius: 50 % ;
        min - width: 0;

        .icon {
            width: 26 px;
            height: 26 px;
        }

        &
        .btn--large.icon {
            width: 34 px;
            height: 34 px;
        }

        @include media - query($small) { &
            .btn--large {
                padding: 15 px;
            }
        }
    }

    /*============================================================================
      Button styles when additional quick checkout buttons
      are enabled on product page
    ==============================================================================*/

    .shopify - payment - button__button--hidden {
        display: none!important;
    }

    .shopify - payment - button {
        margin - top: 10 px;
    }

    .shopify - payment - button.shopify - payment - button__button--unbranded {
        display: block;
        width: 100 % ;
        transition: none;
    }

    .payment - buttons {
        .add - to - cart,
            .shopify - payment - button,
            .shopify - payment - button__button--unbranded {
                min - height: $btnMinHeightWhenQuickCheckout;
                @if($button_type_style != 'caps') {
                    font - size: $type_base_size + 2;
                }
            }

        // Force .btn--tertiary to have similar styles as .btn here
        .btn--tertiary {
            padding: $btnPrimaryPadding;

            @include media - query($small) {
                padding: $btnPrimaryPaddingSmall;
            }
        }
    }

    /*================ Partials | Images, SVG, and iframes ================*/

    img {
        border: 0 none;
    }

    svg: not(: root) {
        overflow: hidden;
    }

    img,
    iframe {
        max - width: 100 % ;
    }

    img[data - sizes = "auto"] {
        display: block;
        width: 100 % ;
    }

    .lazyload,
    .lazyautosizes {
        opacity: 0;

        .no - js & {
            display: none;
        }
    }

    .lazyloaded {
        opacity: 1;
        @if($animate_images) {
            transition: opacity 0.15 s ease;
        }
    }

    .image - wrap {
        overflow: hidden;
        animation: placeholder - shimmer 1.3 s linear 2 s infinite;
        background: linear - gradient(100 deg, $colorSmallImageBg 40 % , darken($colorSmallImageBg, 3 % ) 63 % , $colorSmallImageBg 79 % );
        background - size: 400 % 100 % ;

        // Added by `lazyloaded` event on parent of all `lazyload` imgs
        &
        .loaded {
            animation: none;
        }
    }

    .image - wrap--transparent.loaded {
        background: none;
    }

    // Same image-wrap loading animation for skrim images

    .skrim__link {
        animation: placeholder - shimmer 1.3 s linear 2 s infinite;
        background: linear - gradient(100 deg, $colorSmallImageBg 40 % , darken($colorSmallImageBg, 3 % ) 63 % , $colorSmallImageBg 79 % );
        background - size: 400 % 100 % ;

        &
        .loaded {
            animation: none;
        }
    }

    .image - wrap img: not([role = "presentation"]) {
        display: block;

        .no - js & .lazyload {
            display: none;
        }
    }

    .video - wrapper {
        position: relative;
        overflow: hidden;
        max - width: 100 % ;
        padding - bottom: 56.25 % ;
        height: 0;
        height: auto;

        iframe {
            position: absolute;
            top: 0;
            left: 0;
            width: 100 % ;
            height: 100 % ;
        }
    }

    .video - wrapper--modal {
        width: 1000 px;
    }

    /*================ Aspect ratio grid images ================*/

    .grid__image - ratio {
        position: relative;
        background - repeat: no - repeat;
        background - size: contain;
        background - position: center center;

        &
        : before {
            content: '';
            display: block;
            height: 0;
            width: 100 % ;
        }

            .placeholder - svg {
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
        }
    }

    .grid__image - ratio--cover {
        background - size: cover;
    }

    .grid__image - ratio--wide: before {
        padding - bottom: 56.25 % ;
    }

    .grid__image - ratio--landscape: before {
        padding - bottom: 75 % ;
    }

    .grid__image - ratio--square: before {
        padding - bottom: 100 % ;
    }

    .grid__image - ratio--portrait: before {
        padding - bottom: 150 % ;
    }

    /*================ Partials | Forms ================*/

    form {
        margin: 0;
    }

    .form - vertical {
        margin - bottom: $gutter / 2;
    }

    .inline {
        display: inline;
    }

    /*================ Prevent zoom on touch devices in active inputs ================*/

    @include media - query($small) {
        input,
        textarea,
        select {
            font - size: 16 px!important;
        }
    }

    button,
    input,
    textarea {
        -webkit - appearance: none; -
        moz - appearance: none;
    }

    button {
        background: none;
        border: none;
        display: inline - block;
        cursor: pointer;
    }

    fieldset {
        border: $borderWidth solid $colorBorder;
        padding: $gutter / 2;
    }

    legend {
        border: 0;
        padding: 0;
    }

    button,
    input[type = "submit"] {
        cursor: pointer;
    }

    input,
    textarea,
    select {
        background - color: transparent;
        color: inherit;
        border: 0;
        border - bottom: $borderWidth solid $colorBorder;
        max - width: 100 % ;
        padding: 8 px 0;
        border - radius: $input - radius;

        &
        [disabled], &
        .disabled {
            cursor: default;
            background - color: $disabledGrey;
            border - bottom - color: transparent;
        }

        &
        : active, &
        : focus {
            border - bottom - color: $colorBorder;
        }

        &
        .input - full {
            width: 100 % ;
        }
    }

    textarea {
        min - height: 100 px;
    }

    /*================ Input element overrides ================*/

    input[type = "checkbox"],
        input[type = "radio"] {
            margin: 0 10 px 0 0;
            padding: 0;
            width: auto;
        }

    input[type = "checkbox"] {
        -webkit - appearance: checkbox; -
        moz - appearance: checkbox;
    }

    input[type = "radio"] {
        -webkit - appearance: radio; -
        moz - appearance: radio;
    }

    input[type = "image"] {
        padding - left: 0;
        padding - right: 0;
        background - color: transparent;
    }

    select {
        -webkit - appearance: none; -
        moz - appearance: none;
        appearance: none;
        background - position: right center;
        background: {
            image: url({
                { "ico-select.svg" | asset_url } });
            repeat: no - repeat;
            position: right 10 px center;
            color: transparent;
            size: 11 px;
        }
        display: inline - block;
        vertical - align: middle;
        padding - right: 28 px;
        text - indent: 0.01 px;
        text - overflow: '';
        cursor: pointer;
        color: inherit;
    }

    optgroup {
        font - weight: bold;
    }

    // Force option color (affects IE and some Firefox versions)

    option {
        color: #000;

  background-color: # fff;

        &
        [disabled] {
            color: #ccc;
        }
    }

    select::-ms - expand {
        display: none;
    }

    /*================ Form labels ================*/

    .hidden - label {
        @include visuallyHidden();
    }

    label[
        for] {
        cursor: pointer;
    }

    /*================ Vertical Form ================*/

    .form - vertical {
        input,
        select,
        textarea {
            display: block;
            margin - bottom: 30 px;
        }

        input[type = "checkbox"],
        input[type = "radio"],
        .btn {
            display: inline - block;
        }
    }

    small {
        display: block;
    }

    /*================ Error styles ================*/

    input,
    textarea { &
        .error {
            border - color: $errorRed;
            background - color: $errorRedBg;
            color: $errorRed;
        }
    }

    label.error {
        color: $errorRed;
    }

    /*================ Placeholders ================*/

    : -ms - input - placeholder {
        color: inherit;
        opacity: 0.5;
    }

    ::placeholder {
        color: inherit;
        opacity: 0.5;
    }

    /*================ Selector wrapper ================*/

    .selector - wrapper {
        label {
            margin - right: 10 px;
        }

        +
        .selector - wrapper {
            margin - top: $gutter / 2;
        }
    }

    /*================ Input Group ================*/

    .input - group {
        display: -ms - flexbox;
        display: flex;

        .input - group - btn: first - child,
        .input - group - btn: first - child > .btn,
        input[type = "hidden"]: first - child + .input - group - btn > .btn {
            border - radius: $button - radius 0 0 $button - radius;
        }

            .input - group - btn: last - child > .btn {
            border - radius: 0 $button - radius $button - radius 0;
        }

            .input - group - field: last - child {
            padding - left: 10 px;
        }

            input {
            // Nasty Firefox hack for inputs http://davidwalsh.name/firefox-buttons
            &
            ::-moz - focus - inner {
                border: 0;
                padding: 0;
                margin - top: -1 px;
                margin - bottom: -1 px;
            }
        }
    }

    .input - group - field,
        .input - group - btn {
            margin: 0;
        }

    .input - group.input - group - field {
        -ms - flex: 1 1 auto;
        flex: 1 1 auto;
        border - radius: 0;
        color: currentColor;
        border - color: currentColor;
        min - width: 0;
    }

    .input - group - btn {
        -ms - flex: 0 1 auto;
        flex: 0 1 auto;
        padding: 0;

        .icon {
            vertical - align: initial;
        }
    }

    .input - group - btn.btn {
        margin - top: 0;
        height: 100 % ;

        &
        : hover {
            padding - right: 20 px;
        }
    }

    /*================ #Icons ================*/

    .icon {
        display: inline - block;
        width: 20 px;
        height: 20 px;
        vertical - align: middle;
        fill: currentColor;

        .no - svg & {
            display: none;
        }
    }

    .icon1 {
        display: inline - block;
        width: 50 px;
        height: 50 px;
        vertical - align: middle;
        fill: currentColor;

        .no - svg & {
            display: none;
        }
    }
    .icon2 {
        display: inline - block;
        width: 80 px;
        height: 50 px;
        vertical - align: middle;
        fill: currentColor;

        .no - svg & {
            display: none;
        }
    }

    .icon--full - color {
        fill: initial;
    }

    svg,
    symbol {
        text - align: center; &
        .icon: not(.icon--full - color) {
            circle,
            ellipse,
            g,
            line,
            path,
            polygon,
            polyline,
            rect {
                fill: inherit;
                stroke: inherit;
            }
        }
    }

    /* Override the above for our stroke-only icons */

    .icon - bag,
        .icon - cart,
        .icon - search,
        .icon - close,
        .icon - chevron - down,
        .icon - email,
        .icon - user,
        .icon - select,
        .icon - hamburger {
            circle,
            ellipse,
            g,
            line,
            path,
            polygon,
            polyline,
            rect {
                fill: none!important;
                stroke - width: $icon_weight;
                stroke: currentColor!important;
                stroke - linecap: $icon_linecaps;
                stroke - linejoin: $icon_linecaps;
            }
        }

    .icon - cart circle {
        fill: currentColor!important;
    }

    .icon__fallback - text {
        @include visuallyHidden();
    }

    /*================ Payment Icons ================*/

    .payment - icons {
        -webkit - user - select: none; -
        moz - user - select: none; -
        ms - user - select: none;
        user - select: none;
        cursor: default;

        li {
            cursor: default;
            margin: 0 4 px 0;
        }

        .icon {
            width: 40 px;
            height: 40 px;
        }

        .icon__fallback - text {
            text - transform: capitalize;
        }
    }

    .js - drawer - open {
        overflow: hidden;
    }

    .drawer {
        display: none;
        position: fixed;
        overflow: hidden; -
        webkit - overflow - scrolling: touch;
        top: 0;
        bottom: 0;
        padding: 0($gutter / 2)($gutter / 2);
        z - index: $zindexDrawer;
        color: $colorDrawerText;
        background - color: $colorDrawers;
        transition: transform $drawerCloseSpeed cubic - bezier(0.165, 0.84, 0.44, 1);

        a: not(.btn) {
            color: $colorDrawerText;

            &
            : hover {
                color: $colorDrawerText;
            }
        }

            input,
        textarea {
            border - color: $colorDrawerText;

            &
            : active, &
            : focus {
                border - color: darken($colorDrawerText, 10 % );
            }
        }
    }

    // Right drawer on desktop, from bottom on mobile

    .drawer--cart {
        padding - bottom: calc(#{ $iosSafeZoneModifier } * env(safe - area - inset - bottom));

        &
        .drawer--is - open {
            display: block;
            transition - duration: $drawerOpenSpeed;
        }

        @include media - query($medium - up) {
            width: $drawerCartWidth;
            right: -$drawerCartWidth;

            &
            .drawer--is - open {
                transform: translateX(-$drawerCartWidth);
            }
        }
    }

    // Remove most absolute positioning on mobile

    @include media - query($small) {
        .drawer--cart {
            width: 100 % ;
            height: 100 % ;
            left: 0;
            right: 0;
            top: auto;
            transform: translateY(100 % );

            &
            .drawer--is - open {
                transform: translateY(0);
            }
        }

        .drawer--cart--static {
            height: auto;
            padding - bottom: 0;
            padding - bottom: calc(#{ $iosSafeZoneModifier } * env(safe - area - inset - bottom));

            .drawer__fixed - header,
            .drawer__inner,
            .drawer__inner--has - fixed - footer,
            .drawer__footer--fixed {
                position: static;
                padding - left: 0;
                padding - right: 0;
            }
        }
    }

    .js - drawer - open body: after,
        .js - drawer - closing body: after {
            content: '';
            display: block;
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background - color: $colorModalOverlay;
            opacity: 0;
            z - index: $zindexDrawerOverlay;
        }

    .js - drawer - open body: after {
        animation: partial - fade - in 0.5 s forwards;
    }

    .js - drawer - closing body: after {
        animation: partial - fade - out 0.4 s forwards;
    }

    /*================ Drawer header ================*/

    .drawer__header {
        display: -ms - flexbox;
        display: flex; -
        ms - flex - align: center;
        align - items: center;
        height: $drawerHeaderHeight;
        width: 100 % ;
        padding: ($gutter / 2.6) 0;
        margin - bottom: 0;

        @include media - query($medium - up) {
            height: $drawerHeaderHeightLarge;
        }
    }

    .drawer__fixed - header {
        position: absolute;
        top: 0;
        left: $gutter / 2;
        right: $gutter / 2;
        height: $drawerHeaderHeight;
        overflow: visible; // for close button hit area

        @include media - query($medium - up) {
            height: $drawerHeaderHeightLarge;
        }
    }

    .drawer__title {
        @include headerFontStack;
        font - size: em(24 px);
        width: 100 % ; -
        ms - flex: 1 1 auto;
        flex: 1 1 auto;
    }

    .drawer__close {
        -ms - flex: 1 1 auto;
        flex: 1 1 auto;
    }

    // Button sits on right by default

    .drawer__close - button {
        position: relative;
        right: -20 px;
        height: 100 % ;
        padding: 15 px;
        color: inherit;

        &
        : active {
            background - color: darken($colorDrawers, 5 % );
        }

            .icon {
            height: 28 px;
            width: 28 px;
        }
    }

    // Rare use case left close button

    .drawer__close--left {
        text - align: left;

        .drawer__close - button {
            right: auto;
            left: -20 px;
        }
    }

    /*================ Drawer content ================*/

    .drawer__inner {
        position: absolute;
        top: $drawerHeaderHeight;
        bottom: 0;
        left: 0;
        right: 0;
        padding: 0($gutter / 2);
        overflow: auto; -
        webkit - overflow - scrolling: touch;

        @include media - query($medium - up) {
            top: $drawerHeaderHeightLarge;
            padding - left: $gutter;
            padding - right: $gutter;
        }

        .drawer--has - fixed - footer & {
            overflow: hidden;
            overflow - y: auto;
        }
    }

    // Drawer content with fixed footer

    .drawer__inner--has - fixed - footer {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        margin: 0;
        bottom: $drawerCartFooterHeight; // overwritten with JS
        overflow: auto; -
        webkit - overflow - scrolling: touch;

        // Allow whole drawer to be scrollable on short screens
        // typically when Android keyboard is open
        @media screen and(max - height: $fixedHeightLimit) {
            position: static;
            padding: 0;
        }
    }

    /*================ Drawer footer ================*/

    .drawer__footer {
        padding - top: $gutter / 2;

        @include media - query($medium - up) {
            padding - top: $gutter / 1.35;
        }
    }

    .drawer__footer--fixed {
        position: absolute;
        bottom: 0;
        left: $gutter / 2;
        right: $gutter / 2;
        min - height: $drawerCartFooterHeight; // overwritten by JS
        padding - bottom: $gutter;

        @include media - query($small) {
            padding - bottom: $gutter / 2;
        }

        @include media - query($medium - up) {
            left: $gutter;
            right: $gutter;
        }

        // Allow whole drawer to be scrollable on short screens
        // typically when Android keyboard is open
        @media screen and(max - height: $fixedHeightLimit) {
            position: static;
        }
    }

    // Additional checkout buttons

    .drawer__footer.additional - checkout - buttons {
        margin - bottom: 10 px;

        [data - shopify - buttoncontainer] {
            -ms - flex - pack: center;
            justify - content: center;

            >
            * {
                height: auto!important;
            }
        }
    }

    /*================ Cart-specific styles ================*/

    .drawer__cart.is - loading {
        min - height: 100 px;

        .cart {
            transition: opacity 0.3 s ease 0.7 s;
            opacity: 0.4;
        }
    }

    #
    CartSpecialInstructions {
        margin - top: 10 px;
        margin - bottom: 10 px;
        min - height: 60 px;
        height: 60 px;
        @include media - query($medium - up) {
            min - height: 80 px;
            height: 80 px;
        }
    }

    /*================ Ajax Cart ================*/

    .ajax - cart__template {
        display: none;
    }

    .ajaxcart__product {
        position: relative;
        max - height: 500 px;

        &
        .is - removed {
            max - height: 0;
            overflow: hidden;
            visibility: hidden; -
            webkit - backface - visibility: hidden;
            backface - visibility: hidden;
            transition: all 450 ms cubic - bezier(0.57, .06, .05, .95);
        }
    }

    .ajaxcart__row - product {
        position: relative;
        padding - bottom: $gutter / 4;
        margin - bottom: $gutter / 4;

        @include media - query($medium - up) {
            padding - bottom: ($gutter / 1.35);
            margin - bottom: ($gutter / 1.35);
        }
    }

    .ajaxcart__product: last - child.ajaxcart__row - product {
        border - bottom: 0 none;
        padding - bottom: 0;
    }

    .ajaxcart__item - content {
        @include smallFontSize; -
        ms - flex: 1 1 auto;
        flex: 1 1 auto;
        padding - left: 15 px;
    }

    /*================ Sticky Cart ================*/

    .sticky - cart {
        box - sizing: content - box;
        display: none;
        position: fixed;
        bottom: 0;
        border - bottom: calc(#{ $iosSafeZoneModifier } * env(safe - area - inset - bottom)) solid $colorDrawers;
        left: 0;
        right: 0;
        height: $thumbButtonHeight + ($thumbGutter / 2);
        z - index: $zindexStickyCart;

        @include media - query($medium - up) {
            height: $thumbButtonHeight + $thumbGutter;
        }
    }

    .sticky - cart--open {
        display: block;
        animation: cart - rise - up 0.35 s forwards;

        .screen - layer - animating & {
            transform: translateY(120 % );
            animation: none;
        }
    }

    .sticky - cart__inner {
        display: -ms - flexbox;
        display: flex; -
        ms - flex - align: center;
        align - items: center; -
        ms - flex - pack: center;
        justify - content: center;
        height: 100 % ;
        background - color: $colorDrawers;
        color: $colorDrawerText;
        text - align: center;

        a: not(.btn) {
            color: $colorDrawerText;
            border - bottom: $borderWidth solid $colorDrawerText;
        }

            .site - nav__link,
        .site - nav__link: hover {
            color: $colorDrawerText;
        }
    }

    .sticky - cart__item {
        display: inline - block;
        vertical - align: middle;
        margin: 15 px 7 px;
        @include media - query($medium - up) {
            margin: 15 px 15 px;
        }
    }

    // Custom button styles

    .sticky - cart__item.btn {
        @if($button_type_style == 'caps') {
            letter - spacing: 0.2e m;
            text - transform: uppercase;
            font - size: $type_base_size - 2;
            padding: 15 px;
        }
        @else {
            font - size: $type_base_size + 2;
            padding: 10 px 20 px;
        }
        background - color: $colorDrawerText;
        color: $colorDrawers;

        @include media - query($medium - up) {
            padding: 15 px 30 px;
        }
    }

    /*================ Thumb Cart ================*/

    .site - nav__thumb - cart,
        .quick - view__thumb - cart {
            display: none; -
            ms - flex - align: center;
            align - items: center;
            background - color: $colorCartDot;
            color: $colorCartDotText;
            height: $thumbButtonHeight;
            padding: 0 20 px;
            border - top - right - radius: $button - radius;
            border - bottom - right - radius: $button - radius;

            .cart - has - items & {
                display: -ms - flexbox;
                display: flex;
            }

            .cart - link {
                left: -1 px;
            }

            // Hide cart option when thumb menu open
            .site - nav__thumb - button.is - active + & {
                display: none
            }

            &
            : hover,
            &
            : active {
                color: $colorCartDotText;
            }

                .icon {
                width: 30 px;
                height: 30 px;
            }
        }

    // Hide menu cart button when on cart page

    .template - cart.site - nav__thumb - cart {
        display: none;
    }

    // Add left-border if menu and cart color is the same

    @if($colorCartDot == $colorBtnPrimary) {
        .site - nav__thumb - cart {
            border - left: 1 px solid rgba(255, 255, 255, 0.3);
        }
    }

    .quick - view__thumb - cart {
        position: fixed;
        bottom: 20 px;
        bottom: $iosSafeZoneBottom;
        right: 20 px;
        border - radius: 100 % ; // always a circle
        transition: opacity 0.15 s ease - in ;
        z - index: $zindexModalClose;

        .screen - layer--is - sliding & {
            opacity: 0;
        }
    }

    /*================ Partials | Blank States ================*/

    $color - blankstate: rgba($colorTextBody, 0.35);

    $color - blankstate - background: #f4f4f4;

    .placeholder - svg {
        fill: $color - blankstate;
        background - color: $color - blankstate - background;
        width: 100 % ;
        height: 100 % ;
        max - width: 100 % ;
        max - height: 100 % ;
        display: block;
        padding: 30 px 0;
    }

    .placeholder - noblocks {
        padding: 40 px;
        text - align: center;
    }

    // Placeholder animation for loading product form

    .placeholder - content {
        overflow: hidden;
        animation: placeholder - shimmer 1.3 s linear infinite;
        background: linear - gradient(100 deg, $colorSmallImageBg 40 % , darken($colorSmallImageBg, 3 % ) 63 % , $colorSmallImageBg 79 % );
        background - size: 400 % 100 % ;
        margin - bottom: 20 px;
        border - radius: 4 px;
    }

    /*================ Animations ================*/

    // Page transitions

    @if($animate_page_transitions) {
        $page_transition_duration: 0.8;
        $page_transition_duration_out: 0.3;

        @if($animate_page_transition_style == 'page-slow-fade') {
            $page_transition_duration: 1.2;
            $page_transition_duration_out: 0.5;
            $animate_page_transition_style: 'page-fade';
        }

        @if($animate_page_transition_style == 'page-logo') {
            .unloading.loader - logo {
                display: -ms - flexbox;
                display: flex;
            }

            .unloading.loader - logo__img {
                animation: pulse - fade 0.4 s infinite linear;
            }
        }
        @else {
            @if($animate_page_transition_style == 'page-slide-reveal-across'
                or $animate_page_transition_style == 'page-slide-reveal-down') {
                .transition - body: before {
                    content: '';
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: $colorBody;
                    z - index: 10;
                    will - change: transform;
                }

                .loaded.transition - body: before {
                    animation: $animate_page_transition_style# { $page_transition_duration }
                    s ease forwards;
                }

                .unloading.transition - body: before {
                    animation: #{ $animate_page_transition_style } - out# { $page_transition_duration_out }
                    s ease forwards;
                }
            }
            @else {
                .transition - body {
                    opacity: 0;

                    .no - js & {
                        opacity: 1;
                    }
                }

                .loaded.transition - body {
                    opacity: 1;
                    animation: $animate_page_transition_style# { $page_transition_duration }
                    s ease forwards;
                    animation - fill - mode: initial;
                }

                .unloading.transition - body {
                    animation: #{ $animate_page_transition_style } - out# { $page_transition_duration_out }
                    s ease forwards;
                }
            }
        }
    }

    @if($animate_images) {
        // General animations
        // Any class with appear-delay or appear-delay-x
        [class *= "appear-delay"] {
            opacity: 0;
            transform: translate3d(0, 15 px, 0);
            transition: opacity .6 s cubic - bezier(0.04, 0, 0.2, 1),
            transform .6 s cubic - bezier(0.04, 0, 0.2, 1);

            .no - js & {
                opacity: 1;
            }
        }

        .aos - animate[class *= "appear-delay"] {
            opacity: 1;
            transform: translate3d(0, 0, 0);
        }

        .appear - delay { transition - delay: 0.1 s; }

        @for $i from 1 to 15 {
            .appear - delay - #{ $i } { transition - delay: ($i * 0.15 s) + 0.1 s; }
        }

        // Global image animations
        .image - wrap {
            img: not([role = "presentation"]),
            svg,
            .animate - me {
                opacity: 0;

                .no - js & {
                    opacity: 1;
                }
            }
        }

        .aos - animate.image - wrap,
            .aos - animate.image - wrap {
                .lazyloaded: not([role = "presentation"]),
                    svg,
                    .animate - me,
                    img[data - modal - lazy] {
                        animation: $animate_images_style 0.6 s ease 0 s forwards;
                    }
            }
    }

    // General review styles

    .spr - badge - starrating,
        .spr - badge - caption {
            display: inline - block;
        }

    .spr - badge - starrating {
        white - space: nowrap;
    }

    .spr - badge - starrating,
        .spr - starrating,
        .spr - starratings,
        .spr - icon - star - empty,
        .spr - icon - star - hover,
        .spr - icon - star - hover: hover {
            color: currentColor;
        }

    .spr - review - header - title {
        font - size: 22 px!important;
    }

    // Star size

    .spr - icon {
        font - size: 12 px!important;
        vertical - align: middle;
        display: inline - block;

        @include media - query($small) {
            top: 0!important;
        }
    }

    .spr - badge - caption {
        margin - left: 4 px;
    }

    .spr - container.spr - container {
        padding: 0;
        border: 0;
        text - align: center;
    }

    .product - reviews { &
        .index - section {
            margin - top: 0;
        }#
        shopify - product - reviews {
            margin: 0;
        }

        .spr - summary - actions - newreview {
            float: none;
        }

        .spr - review - content - body,
            .spr - form - label {
                font - size: 14 px;
                line - height: 1.563;
            }

        .spr - review - header - byline {
            font - size: 11 px;
            opacity: 1;

            strong {
                font - weight: normal;
            }
        }

        .spr - form - label {
            display: block;
            text - align: left;
        }

        .spr - summary - caption,
            .spr - summary - actions {
                display: block;
            }

        .spr - summary - actions {
            margin - top: 10 px;
        }
    }

    // Review styles in full width section

    .product - reviews--full {
        @include media - query($medium - up) { &
            .index - section {
                    margin - top: 30 px;
                }
                .spr - reviews {
                    display: -ms - flexbox;
                    display: flex; -
                    ms - flex - pack: distribute;
                    justify - content: space - around; -
                    ms - flex - wrap: wrap;
                    flex - wrap: wrap;
                }

            .spr - review {
                -ms - flex: 0 1 30 % ;
                flex: 0 1 30 % ;
                border: 1 px solid rgba($colorTextBody, 0.1);
                padding: 20 px!important;
                margin: 1.5 % !important;
            }
        }
    }

    // Review styles in product grid

    .grid - product {
        .spr - badge[data - rating = "0.0"] {
            display: none;
        }

        .spr - badge {
            margin - top: 3 px;
        }

        .spr - badge - starrating {
            @include smallFontSize;
            vertical - align: top;
        }

        .spr - badge - caption {
            @include smallFontSize;
            margin - left: 4 px;
        }
    }

    // Review styles in expandable tab

    .product - reviews--tab {
        .collapsible - trigger {
            .spr - badge - caption {
                margin - left: 0;
            }

            .spr - badge - starrating {
                @include smallFontSize;
                margin - right: 10 px;
            }

            .spr - badge[data - rating = "0.0"] {
                .spr - starrating {
                    display: none;
                }
            }
        }

        .spr - icon {
            margin - right: 1 px;
        }

        .spr - badge - caption {
            margin - left: 4 px;
        }

        .spr - header - title,
            .spr - summary - starrating,
            .spr - summary - caption {
                display: none!important;
            }

        .spr - summary - actions a,
            .spr - button {
                margin - top: 0!important;
            }

        .spr - button - primary {
            float: none;
        }

        @media only screen and(max - width: 480 px) {
            .spr - summary {
                text - align: left;
            }
        }

        // Form
        .spr - form - title {
            display: none;
        }

        .spr - form - label {
            font - size: 13 px!important;
        }

        // Review
        .spr - review - header.spr - starratings {
            font - size: 14 px;
        }
    }

    .spr - pagination.spr - pagination {
        -ms - flex: 1 0 100 % ;
        flex: 1 0 100 % ;
        border: 0;
    }

    /* Scrollable reviews */

    @include media - query($small) {#
        shopify - product - reviews {
            overflow: visible!important;
        }

        .spr - reviews.spr - reviews {
            display: -ms - flexbox;
            display: flex; -
            ms - flex - align: top;
            align - items: top;
            overflow: hidden;
            overflow - x: scroll; -
            webkit - overflow - scrolling: touch;
            margin: $page - width - gutter - small(-$page - width - gutter - small) 0;
            padding - right: $page - width - gutter - small;
        }

        .spr - review.spr - review {
            padding: 20 px 24 px!important;
            margin - right: $page - width - gutter - small;
            border: 1 px solid rgba($colorTextBody, 0.1); -
            ms - flex: 0 0 66 vw;
            flex: 0 0 66 vw;
            width: 66 vw;

            &
            : first - child {
                margin - left: $page - width - gutter - small;
                margin - top: 0;
            }
        }

        .spr - pagination.spr - pagination {
            -ms - flex: 1 0 auto;
            flex: 1 0 auto;
            padding: 0;
            display: -ms - flexbox;
            display: flex; -
            ms - flex - align: center;
            align - items: center;

            .spr - pagination - prev,
                .spr - pagination - next {
                    position: static;
                    padding: 0 15 px;
                }
        }
    }

    /*================ Module-specific styles ================*/

    /*================ Module | Footer ================*/

    .site - footer {
        @include smallFontSize;

        @include media - query($medium - up) {
            margin - top: $gutter * 2;

            .template - index & {
                margin - top: 0;
            }
        }
    }

    .site - footer__section + .site - footer__section {
        margin - top: $gutter / 4;

        @include media - query($medium - up) {
            margin - top: $gutter / 2;
        }
    }

    .footer__title {
        @include headerFontStack;
    }

    .site - footer__copyright {
        font - size: 9 px;

        @include media - query($medium - up) {
            font - size: 11 px;
        }

        >
        span {
            padding: 0 10 px;
        }
    }

    /*================ Footer menus ================*/

    .site - footer__linklist a {
        display: block;
        padding: 5 px 10 px;
    }

    /*================ Footer newsletter ================*/

    .site - footer__section--newsletter {
        background - color: $colorNewsletter;
        color: $colorNewsletterText;
        padding: ($gutter * 2) 0;
        margin - bottom: ($gutter * 2);

        @if($colorNewsletter == $colorBody) {
            padding: 0;
        }

        @include media - query($medium - up) {
            .page - width {
                max - width: 60 vw;
            }
        }
    }

    /*================ Module | Notes and Form Feedback ================*/

    .note,
    .errors {
        border - radius: $button - radius;
        padding: 6 px 18 px;
        margin - bottom: $gutter / 2;
        border: $borderWidth solid transparent;
        text - align: left;

        ul,
        ol {
            margin - top: 0;
            margin - bottom: 0;

            &
            : last - child {
                margin - bottom: 0;
            }
        }

        li: last - child {
            margin - bottom: 0;
        }

        p {
            margin - bottom: 0;
        }
    }

    .note {
        border - color: $colorBorder;
    }

    .errors {
        ul {
            list - style: disc outside;
            margin - left: 20 px;
        }
    }

    .note--success {
        color: $successGreen;
        background - color: $successGreenBg;
        border - color: $successGreen;

        a {
            color: $successGreen;
            text - decoration: underline;

            &
            : hover {
                text - decoration: none;
            }
        }
    }

    .form - error,
        .errors {
            color: $errorRed;
            background - color: $errorRedBg;
            border - color: $errorRed;

            a {
                color: $errorRed;
                text - decoration: underline;

                &
                : hover {
                    text - decoration: none;
                }
            }
        }

    /*================ Module | Pagination ================*/

    .pagination {
        @include smallFontSize;
        margin: 0;
        padding: ($gutter * 2) 0 0;
        text - align: center;

        >
        span {
            display: inline - block;
            line - height: 1;
        }

        a {
            display: inline - block;
        }

        a,
        .page.current {
            padding: 8 px 12 px;
        }

        .page.current {
            opacity: 0.3;
        }

        // Hard code font family for arrows as some fonts don't include them
        .next,
        .prev {
            color: $colorBtnPrimaryText;
            background: $colorBtnPrimary;
            width: 43 px;
            height: 43 px;
            line - height: 27 px;
            border - radius: 43 px;
            margin: 0 10 px;
            @include media - query($small) {
                width: 35 px;
                height: 35 px;
                line - height: 19 px;
            }
            .icon {
                color: $colorBtnPrimaryText;
                width: 13 px;
                height: 13 px;
                @include media - query($small) {
                    width: 12 px;
                    height: 12 px;
                }
            }
        }
    }

    /*================ Module | Rich Text Editor ================*/

    .rte {
        @include clearfix;

        &
        + & {
            margin - top: $gutter;
        }

        img {
            height: auto;
        }

        p,
        ul,
        ol,
        table {
            margin - bottom: 25 px;
        }

        ul {
            ul {
                margin - bottom: 0;
            }
        }

        a {
            text - decoration: none;
        }

        // Add some top margin to headers from the rich text editor
        h1, h2, h3, h4, h5, h6 {
            margin - top: 2.5e m;
            margin - bottom: 1e m;
        }

        h1, h2, h3, h4, h5, h6 { &
            : first - child {
                margin - top: 0;
            }

            a {
                text - decoration: none;
            }
        }

        // In case merchants paste meta tags into their content by accident
        meta: first - child { &
            +h1, & +h2, & +h3, & +h4, & +h5, & +h6 {
                margin - top: 0;
            }
        }

        >
        div {
            margin - bottom: $gutter / 2;
        }

        li {
            margin - bottom: 0;
        }

        >
        p: last - child, >
            div: last - child {
                margin - bottom: 0;
            }

        table {
            @include smallFontSize;
            table - layout: fixed;
        }
    }

    .rte--block {
        margin - bottom: 20 px;
    }

    .rte - setting { >
        p: last - child {
            margin - bottom: 0;
        }
    }

    .text - center.rte,
        .text - center.rte {
            ul,
            ol {
                list - style - position: inside;
                margin - left: 0;
            }
        }

    .rte--nomargin {
        margin - bottom: 0;
    }

    .rte--indented - images img: not([style]),
        .rte--indented - images img[style = "float: none;"] {
            max - width: 100 vw;
            margin: 0(-$grid - gutter - small);
            display: block;
            @include media - query($medium - up) {
                max - width: 130 % ;
                margin: $gutter - 15 % ;
            }
        }

    // Some people use text-align on the parent p tag, so do not style those images

    .rte--indented - images p[style] img {
        display: inline;
        margin: 0;
        max - width: 100 % ;
    }

    // Header layout

    .header - layout {
        display: -ms - flexbox;
        display: flex; -
        ms - flex - pack: justify;
        justify - content: space - between;
    }

    @include media - query($small) {
        .header - layout--mobile - logo - only {
            -ms - flex - pack: center;
            justify - content: center;
        }
    }

    .header - layout--center {
        -ms - flex - align: center;
        align - items: center;
    }

    // Header items

    .header - item {
        display: -ms - flexbox;
        display: flex; -
        ms - flex - align: center;
        align - items: center; -
        ms - flex: 1 1 auto;
        flex: 1 1 auto;
    }

    .header - item--logo {
        -ms - flex: 0 0 auto;
        flex: 0 0 auto;
    }

    .header - item--icons {
        -ms - flex - pack: end;
        justify - content: flex - end; -
        ms - flex: 0 1 auto;
        flex: 0 1 auto;
    }

    /*================ Header layout specific styles ================*/

    // Same default logo and icon container size, logo block width overrides

    .header - layout--left - center {
        .header - item--logo,
            .header - item--icons {
                -ms - flex: 0 0 200 px;
                flex: 0 0 200 px;
                max - width: 50 % ;

                @include media - query($medium - up) {
                    min - width: 130 px; // approx width of 2 icons
                }
            }
    }

    .header - layout[data - logo - align = "center"] {
        .header - item--logo {
            @include media - query($medium - up) {
                margin: 0 $gutter / 1.5;
            }
        }

        .header - item--navigation,
            .header - item--icons {
                -ms - flex: 1 1 130 px;
                flex: 1 1 130 px; // aprox width of 2 icons
            }
    }

    @include media - query($medium - up) {
        .header - layout[data - logo - align = "left"] {
            .site - header__logo {
                margin - right: $gutter / 3;
            }
        }
    }

    .header - item--logo - split {
        display: -ms - flexbox;
        display: flex; -
        ms - flex - pack: center;
        justify - content: center; -
        ms - flex - align: center;
        align - items: center; -
        ms - flex: 1 1 100 % ;
        flex: 1 1 100 % ;

        .header - item: not(.header - item--logo) {
            text - align: left; -
            ms - flex: 1 1 20 % ;
            flex: 1 1 20 % ;
        }
    }

    .header - item--split - left {
            -ms - flex - pack: end;
            display: block;
            text - align: left;

        }
        .header - item--split - right {
            -ms - flex - pack: end;
            text - align: right!important;

        }
        // Icon alignment

    .header - item--left {
        .site - nav {
            margin - left: -($siteNavIconPadding);

            @include media - query($small) {
                margin - left: -($siteNavItemPadding / 2);
            }
        }
    }

    .header - item--icons {
        .site - nav {
            margin - right: -($siteNavIconPadding);

            @include media - query($small) {
                margin - right: -($siteNavItemPadding / 2);
            }
        }
    }

    .site - header {
        position: relative;
        padding: 10 px 0;
        background: $colorNav;

        @include media - query($medium - up) {
            padding: 30 px 0;
        }
    }

    .site - header--sticky {
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        padding: 0;
        transform: translate3d(0, -100 % , 0);
        transition: none;
        z - index: $zindexStickyHeader;
    }

    .site - header--opening {
        transform: translate3d(0, 0, 0);
        transition: transform 0.4 s cubic - bezier(0.165, 0.84, 0.44, 1);
    }

    .site - header__logo {
        margin: ($gutter / 3) 0;
        display: block;

        @include media - query($medium - up) {
            .text - center & {
                padding - right: 0;
                margin: ($gutter / 3) auto;
            }
        }

        @include media - query($small) {
            margin - left: auto;
            margin - right: auto;
        }

        .header - layout[data - logo - align = "center"] & {
            margin - left: auto;
            margin - right: auto;
            text - align: center;
        }

        a,
        a: hover {
            text - decoration: none;
        }

            img {
            display: block;

            .header - layout--center & {
                margin: 0 auto;
            }
        }
    }

    .site - header__logo - link {
        display: -ms - flexbox;
        display: flex; -
        ms - flex - align: center;
        align - items: center;
        color: $colorNavText;

        &
        : hover {
            color: $colorNavText;
        }

            @include media - query($small) {
            margin: 0 auto;
        }
    }

    // Sticky header on top of image/slideshow

    .header - wrapper--overlay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        z - index: $zindexOverlayHeader;
        background: none;
        background: linear - gradient(to bottom, rgba(0, 0, 0, 0.3) 0 % , rgba(0, 0, 0, 0) 100 % );
        transform: translateZ(0);

        &
        : not(.header - wrapper--sticky).site - header {
            background: none;
        }
    }

    .header - wrapper--sticky {
        transform: none;
        background: none;
    }

    .search - modal__wrapper {
        border - bottom: $borderWidth solid currentColor;
    }

    .search - modal__input {
        border: 0;
        padding - left: 0;
        font - size: 2e m;

        &
        : focus {
            border: 0;
        }
    }

    .search - modal__submit {
        svg {
            width: 40 px;
            height: 40 px;
        }
    }

    /*================ Module | Search Bar ================*/

    .search - bar {
        max - width: 100 % ;
    }

    .search - bar--page {
        max - width: 300 px;
        margin: $gutter auto;
    }

    .search - bar.icon {
        width: 24 px;
        height: 24 px;
        vertical - align: middle;
    }

    /*================ Module | Section Headers ================*/

    .section - header {
        margin - bottom: $sectionHeaderBottomSmall;
        text - align: center;

        @include media - query($medium - up) {
            margin - bottom: $sectionHeaderBottom;
        }
    }

    .section - header--hero {
        position: relative; -
        ms - flex: 1 1 100 % ;
        flex: 1 1 100 % ;
        color: $colorHeroText;
        margin - bottom: $gutter / 2;

        @include media - query($medium - up) {
            margin - bottom: $gutter;
        }
    }

    .section - header__title {
        margin - bottom: 0;
    }

    .spr - header - title.spr - header - title {
        margin - bottom: 15 px;
    }

    .section - header__description {
        @include largeFontSize;
        max - width: 700 px;
        margin: 0 auto;

        .section - header__title + & {
            margin - top: 10 px;
        }
    }

    .section - header__description--large {
        @include largeFontSize;
    }

    .section - header--404 {
        margin - bottom: 0;
        padding: 80 px 0;
    }

    .section - header select {
        margin - left: $gutter / 2;
    }

    .section - header.btn {
        float: right;
        margin: 0;
    }

    .site - nav {
        @include largeFontSize;
        margin: 0;

        // Sticky header bar is desktop only
        .site - header--sticky & {
            font - size: ($type_base_size * 1.22) - 3; // 3 below largerFontSize
        }
    }

    .site - navigation {
        .text - center & {
            margin: 0 auto;
        }


        .text - right & {
            width: 100 % ;
        }

        .header - layout--left & {
            padding - left: $gutter / 3;
        }
    }

    .site - nav--icons {
        display: -ms - flexbox;
        display: flex; -
        ms - flex - align: center;
        align - items: center;
    }

    .site - nav__icons {
        white - space: nowrap;
    }

    .site - nav__item {
        position: relative;
        display: inline - block;
        margin: 0;

        li {
            display: block;
        }
    }

    .site - nav__link {
        display: inline - block;
        vertical - align: middle;
        text - decoration: none;
        padding: ($siteNavItemPadding / 2) $siteNavItemPadding;
        white - space: nowrap;
        color: $colorNavText;

        &
        : hover {
            color: $colorNavText;
        }

            .is - light & {
            color: $colorStickyNavLinks;

            &
            : hover {
                color: $colorStickyNavLinks;
            }
        }

            .site - nav--has - dropdown > & {
            position: relative;
            z - index: $zindexNavDropdowns + 1;
        }

            @include media - query($small) {
            padding: $siteNavItemPadding / 2;

            .header - layout--center & {
                padding - left: 2 px;
                padding - right: 2 px;
            }
        }
    }

    // Keep active state on parent dropdown link

    .site - nav--has - dropdown {
        z - index: $zindexNavDropdowns + 1;

        // Force on top of other dropdowns when active
        &
        : hover, &
        .is - focused {
            z - index: $zindexNavDropdowns + 2;
        }
    }

    .site - nav--has - dropdown.is - focused > a,
        .site - nav--has - dropdown: hover > a {
            color: $colorTextBody!important;
            background - color: $colorBody;
            opacity: 1;
            transition: none;
        }

    @if($animate_underlines) {
        .site - nav__item > a: before {
            content: '';
            position: absolute;
            left: 15 px;
            right: 100 % ;
            bottom: 0;
            display: block;
            border - bottom: $borderWidth solid currentColor;
            transition: right $animate_underlines_duration ease;
            z - index: $zindexNavDropdowns + 1;
        }

        .site - nav__item.is - focused > a,
            .site - nav__item: hover > a,
            .site - nav--active > a { &
                : before {
                    left: 15 px;
                    right: 15 px;
                }
            }
    }

    .site - nav__link--icon {
        padding - left: $siteNavIconPadding;
        padding - right: $siteNavIconPadding;

        @include media - query($small) {
            padding - left: $siteNavItemPadding / 2;
            padding - right: $siteNavItemPadding / 2;

            &
            + & {
                margin - left: -3 px; // ~amount of inline-block space
            }
        }

        .icon {
            display: block;
            width: $desktopMenuIconSize;
            height: $desktopMenuIconSize;
        }
    }

    /*================ Dropdowns ================*/

    .site - nav__dropdown {
        position: absolute;
        left: 0;
        margin: 0;
        z - index: $zindexNavDropdowns;
        display: block;
        visibility: hidden;
        background - color: $colorBody;
        min - width: 100 % ;
        padding: ($gutter / 3) 0 5 px;
        box - shadow: 0 px 10 px 20 px rgba(0, 0, 0, 0.09);
        transform: translate3d(0 px, -12 px, 0 px);

        .site - nav--has - dropdown: hover & ,
        .is - focused > & {
            display: block;
            visibility: visible;
            transform: translate3d(0 px, 0 px, 0 px);
            transition: all 300 ms cubic - bezier(0.2, 0.06, 0.05, 0.95);
        }

        // Right-align last two dropdown items
        .header - layout--right.site - nav--has - dropdown: nth - last - child(2) & ,
        .header - layout--right.site - nav--has - dropdown: last - child & {
            left: auto;
            right: 0;

            .site - nav__deep - dropdown {
                left: auto;
                right: 100 % ;

                &
                : before {
                    left: auto;
                    right: 0;
                    background - image: linear - gradient(to left, rgba(0, 0, 0, 0.09), transparent);
                }
            }
        }

            li {
            margin: 0;
        }

            >
            li {
                position: relative;

                >
                a {
                    position: relative;
                    z - index: $zindexNavDropdowns + 1;
                }
            }

            a {
            background - color: $colorBody;
            padding - right: 30 px;
        }
    }

    /*================ Third level dropdown ================*/

    .site - nav__deep - dropdown {
        background - color: $colorBody;
        box - shadow: 0 px 10 px 20 px rgba(0, 0, 0, 0.09);
        position: absolute;
        top: 0;
        left: 100 % ;
        margin: 0;
        visibility: hidden;
        opacity: 0;
        z - index: $zindexNavDropdowns;
        transform: translate3d(-12 px, 0 px, 0 px);

        // Last menu item is anchored to right if
        //   - center aligned menu
        .header - layout--center.site - nav__item: last - child & {
            left: auto;
            right: 100 % ;
        }

        .site - nav__deep - dropdown - trigger: hover & ,
            .is - focused > & {
                visibility: visible;
                opacity: 1;
                transform: translate3d(0 px, 0 px, 0 px);
                transition: all 300 ms cubic - bezier(0.2, 0.06, 0.05, 0.95);
            }

        &
        : before {
            content: '';
            display: block;
            position: absolute;
            top: 0;
            left: 0;
            bottom: 0;
            width: 10 px;
            background - image: linear - gradient(to right, rgba(0, 0, 0, 0.09), transparent);
            pointer - events: none;

            // Reverse box shadow on submenus if
            //   - center aligned menu
            .header - layout--center.site - nav__item: last - child & {
                left: auto;
                right: 0;
                background - image: linear - gradient(to left, rgba(0, 0, 0, 0.09), transparent);
            }
        }
    }

    .site - nav__dropdown - link--has - children {
        .site - nav__deep - dropdown - trigger: hover & , &
            : hover, &
            : focus {
                background - color: darken($colorBody, 5 % );
            }
    }

    // Rotate to face right

    .site - nav__deep - dropdown - trigger.icon - chevron - down {
        position: absolute;
        top: 50 % ;
        right: 10 px;
        width: $desktopMenuChevronSize;
        height: $desktopMenuChevronSize;
        transform: rotate(-90 deg) translateX(50 % );
    }

    /*================ Cart bubble for items in cart ================*/

    .cart - has - items {
        .site - nav__link--cart.site - nav__link--cart {
            background - color: $colorCartDot;
            color: $colorCartDotText;
            border - radius: 50 % ;
            padding: $siteNavIconPadding;

            &
            : hover, &
            : active {
                color: $colorCartDotText;
            }
        }
    }

    @include media - query($medium - up) {
        .site - nav__link--icon.icon {
            width: 28 px;
            height: 28 px;

            .site - header--sticky & {
                width: 24 px;
                height: 24 px;
            }
        }
    }

    .cart - link {
        position: relative;
        display: block;
        line - height: 1;

        .site - nav__link--cart & {
            left: -1 px;
        }
    }

    .cart - link__bubble {
        display: none;
        background - color: currentColor;
        text - align: center;
        line - height: 15 px;

        .cart - has - items & {
            display: block;
            position: absolute;
            top: 14 px;
            right: -2 px;
            width: 15 px;
            height: 15 px;
            border - radius: 50 % ;
        }
    }

    .cart - link__count {
        display: block;
        font - size: 8 px;
        letter - spacing: -0.5 px;
        color: $colorCartDot;
    }

    $z - index - sub - nav: 8;

    $return - button - width: 55 px;

    $nav - button - padding: 8 px;

    $transition - drawer: all 0.45 s cubic - bezier(0.29, 0.63, 0.44, 1);

    $thumb - nav - open - duration: 0.25 s;

    $thumb - nav - close - duration: 0.1 s;

    .page - container {
        display: block;
        transition: $transition - drawer;
    }

    .js - toggle - slide - nav {
        .icon - close {
            display: none;
        }

        &
        .is - active {
            .icon - close {
                display: inline - block;
            }

            .icon - hamburger,
                .icon - menu - label {
                    display: none;
                }
        }
    }

    .icon - menu - label {
        margin - left: 5 px;
    }

    .slide - nav {
        display: block;
        transform: translate3d(0, 0, 0);
        transition: $transition - drawer;
        margin: 0;
        padding: 15 px 0 0;

        .body--sticky - cart - open & {
            padding - bottom: 15 px;
        }

        .sub - nav--is - open & {
            transform: translate3d(-100 % , 0, 0);
        }

        .third - nav--is - open & {
            transform: translate3d(-200 % , 0, 0);
        }

        button {
            background - color: transparent;
            border: 0;
            margin: 0;
        }

        a,
        button {
            color: $colorBtnPrimaryText;

            &
            : hover,
            &
            : active,
            &
            : focus {
                color: $colorBtnPrimaryText;
            }
        }
    }

    .slide - nav__link,
        .slide - nav__sublist - link {
            @include headerFontStack;
            display: block;
            width: 100 % ;
            padding: $nav - button - padding($nav - button - padding * 2);
            transition: $colorBtnPrimaryBgTransition;
            text - align: center;

            &
            : active {
                background - color: $colorBtnPrimaryActive;
            }
        }

    .slide - nav__link {
        position: relative;
        transition: opacity 0.5 s ease;

        .sub - nav--is - open &: not(.slide - nav__sublist - link) {
            opacity: 0;
            transition - delay: 0.15 s;
        }
    }

    .slide - nav__sublist - link: not(.slide - nav__sublist - header) {
        padding - right: ($nav - button - padding * 2);
        padding - left: ($nav - button - padding * 2);
    }

    // Account for return arrow

    .slide - nav__sublist - header {
        padding - right: $return - button - width + $nav - button - padding;
    }

    .slide - nav__item {
        display: block;
        width: 100 % ;
        margin: 0;

        .icon {
            position: absolute;
            top: 50 % ;
            left: 50 % ;
            height: 12 px;
            width: 10 px;
            margin: -6 px 0 0 - 5 px;
        }
    }

    .slide - nav__return - btn {
        position: relative;
        padding: 24 px 0;
        width: $return - button - width;
        vertical - align: middle;
    }

    .slide - nav__icon {
        display: block;
        position: absolute;
        right: 0;
        top: 0;
        bottom: 0;
        padding - left: 30 px;
        padding - right: 30 px;
        pointer - events: none;
        overflow: hidden;
    }

    .slide - nav__table {
        display: table;
        width: 100 % ;
        margin - bottom: 20 px;
    }

    .slide - nav__table - cell {
        display: table - cell;
        vertical - align: middle;
        width: 1 % ;
        text - align: left;
        white - space: normal;
    }

    .slide - nav__toggle - button {
        padding: 20 px 15 px;
    }

    .slide - nav__dropdown {
        display: none;
        position: absolute;
        background - color: $colorBtnPrimary;
        z - index: $z - index - sub - nav;
        width: 100 % ;
        top: 0;
        right: -100 % ;
        padding: 15 px 0 0;
        margin: 0;
        opacity: 0;
        transition: opacity 1 s ease 0.15 s;

        .body--sticky - cart - open & {
            padding - bottom: 15 px;
        }

        &
        .is - active {
            display: block;
            opacity: 1;
        }

        .slide - nav__sublist - header {
            display: table - cell;
            vertical - align: middle;
            padding - left: $nav - button - padding;
        }
    }

    /*================ Mobile thumb menu trigger ================*/

    .site - nav__thumb - menu {
        position: fixed;
        bottom: 0;
        bottom: calc(#{ $iosSafeZoneModifier } * env(safe - area - inset - bottom));
        left: 0;
        right: 0;
        display: -ms - flexbox;
        display: flex;
        margin: $thumbGutter / 2;
        z - index: $zindexThumbMenuButton;

        @include media - query($medium - up) {
            margin: $thumbGutter;
            max - width: $thumbMenuDesktopWidth;
        }

        .js - animate & {
            transition: transform 0.25 s;
        }

        .body--sticky - cart - open & {
            display: none;
        }

        // Hide on short screens, typically Android with keyboard open
        @media screen and(max - height: 400 px) {
            display: none;
        }
    }

    // Animate thumb menu button in

    // - desktop on scroll

    // - mobile on page load

    .site - nav__thumb - menu--inactive {
        transform: translateY(200 % );
    }

    .site - nav__thumb - button {
        width: 100 % ;
        font - size: 19 px;
        letter - spacing: 0.2e m;
        text - transform: uppercase;
        height: $thumbButtonHeight;

        // Remove top left/right corners when active to
        // line up with open menu
        @if($buttonStyle == 'round') { &
            .is - active {
                border - top - right - radius: 0;
                border - top - left - radius: 0;
            }

            // Remove right border-radius if cart item exists, but not on cart page
            body: not(.template - cart).cart - has - items & {
                border - top - right - radius: 0;
            }

            body: not(.template - cart).cart - has - items &: not(.is - active) {
                border - bottom - right - radius: 0;
            }
        }

        .icon {
            width: 30 px;
            height: 30 px;
        }
    }

    /*================ Mobile nav positioning — thumb/slide ================*/

    .slide - nav__overflow--thumb {
        display: none;
        overflow - x: hidden;
        position: fixed;
        left: $thumbGutter;
        bottom: $thumbBottomPosition;
        max - height: calc(100 vh - #{ $thumbButtonHeight } - #{ $thumbGutter * 2 });
        transition: all 0.2 s ease - out;
        z - index: $zindexThumbMenu;
        @if($buttonStyle == 'round') {
            border - top - right - radius: $button - radius;
            border - top - left - radius: $button - radius;
        }

        &
        .js - menu--is - open {
            display: block;
            background - color: $colorBtnPrimary;
            transition: background - color 0.1 s ease $thumb - nav - open - duration;
        }

        @include media - query($medium - up) {
            width: 100 % ;
            max - width: $thumbMenuDesktopWidth;

            .body--sticky - cart - open & {
                left: 50 % ;
                transform: translate(-50 % );
                max - width: $thumbMenuDesktopWidthStickyActive;
            }
        }

        @include media - query($small) {
            left: $thumbGutter / 2;
            right: $thumbGutter / 2;
            bottom: $thumbBottomPositionSmall;
            bottom: calc(#{ $thumbBottomPositionSmall } + calc(#{ $iosSafeZoneModifier } * env(safe - area - inset - bottom)));
            max - height: calc(100 vh - #{ $thumbButtonHeight } - #{ $thumbGutter });
            max - width: 100 % ;

            .body--sticky - cart - open & {
                left: 0;
                right: 0;
            }
        }

        .slide - nav__dropdown {
            background - color: $colorBtnPrimary;

            @if($buttonStyle == 'round') {
                border - top - right - radius: $button - radius;
                border - top - left - radius: $button - radius;
            }
        }
    }

    .slide - nav__wrapper {
        background - color: $colorBtnPrimary;
        transform: translateY(100 % );
        transition: all $thumb - nav - close - duration linear; // closing animation

        @if($buttonStyle == 'round') {
            border - top - right - radius: $button - radius;
            border - top - left - radius: $button - radius;
        }

        .js - menu--is - open & {
            transform: translateY(0);
            transition: all $thumb - nav - open - duration cubic - bezier(0.29, 0.63, 0.44, 1); // open animation
        }
    }

    .slide - nav__overflow--slide {
        display: none;
        position: absolute;
        transform: translate3d(0, -100 % , 0);
        transition: $transition - drawer;
        width: 100 % ;
        background - color: $colorBtnPrimary;

        // Hack to prevent sliver of background color above nav while animating
        &
        : after {
            content: '';
            position: absolute;
            top: -9 px;
            left: 0;
            width: 100 % ;
            height: 10 px;
            background - color: $colorBtnPrimaryText;
        }

            &
            .js - menu--is - open {
                display: block;
            }
    }

    .modal {
        display: none;
        bottom: 0;
        left: 0;
        opacity: 1;
        overflow: hidden;
        position: fixed;
        right: 0;
        top: 0;
        z - index: $zindexModal; -
        ms - flex - align: center;
        align - items: center; -
        ms - flex - pack: center;
        justify - content: center;

        .modal - open & { &
            : before {
                content: '';
                position: fixed;
                top: 0;
                left: 0;
                width: 100 % ;
                height: 100 % ;
                background - color: $colorModalBg;
            }
        }

        &
        .modal--square: before {
            opacity: 0.6;
        }
    }

    .modal - open.modal--newsletter: before {
        background - color: rgba($colorModalOverlay, 0.5);
    }

    .modal--is - active {
        display: -ms - flexbox;
        display: flex;
    }

    // Class on body element when modal open.

    // Only medium-up because iOS jumps to top otherwise

    @include media - query($medium - up) {
        .modal - open {
            overflow: hidden;
        }
    }

    .modal__inner {
        transform - style: preserve - 3 d; -
        ms - flex: 0 1 auto;
        flex: 0 1 auto;
        margin: $gutter / 2;
        max - width: 100 % ;
        display: -ms - flexbox;
        display: flex; -
        ms - flex - align: center;
        align - items: center;

        @include media - query($medium - up) {
            margin: 40 px;
        }

        img {
            display: block;
            max - height: 90 vh;
        }
    }

    // No max height on product images

    .modal__inner {
        .image - wrap img {
            max - height: none;
        }
    }

    .modal__centered {
        position: relative; -
        ms - flex: 0 1 auto;
        flex: 0 1 auto;
        min - width: 1 px; // ie10 thing
        max - width: 100 % ;
    }

    .modal__centered - content {
        .modal--square & {
            max - height: 80 vh;
            padding: $gutter * .75;
            min - width: 200 px;
            min - height: 200 px;
            overflow: auto; -
            webkit - overflow - scrolling: touch;
            background - color: $colorModalBg;
            box - shadow: 0 0 10 px rgba(0, 0, 0, 0.1);

            @include media - query($medium - up) {
                padding: $gutter * 1.5;
                max - height: 90 vh;
                max - width: 1200 px;
            }
        }
    }

    .modal__close {
        position: fixed;
        top: $gutter / 2;
        right: $gutter / 2;
        border: 0;
        box - shadow: none; // override btn--tertiary

        @include media - query($small) {
            top: 15 px;
            right: 15 px;
        }

        &
        : focus {
            box - shadow: none;
        }

            .modal--square & {
            position: absolute;
            padding: $gutter / 3;
        }
    }

    .modal__close--bottom {
        position: absolute;
        bottom: 20 px;
        bottom: $iosSafeZoneBottom;
        left: 50 % ;
        transform: translateX(-50 % );
    }

    .modal__footer - text {
        @include smallFontSize;
        position: fixed;
        padding: ($gutter / 2) $gutter;
        bottom: 0;
        text - align: center;
        background - color: $colorModalBg;
    }

    // Ajax page adjustments

    .modal {
        .page - content,
            .page - width {
                padding: 0;
            }
    }

    // Google-friendly non intrusive mobile modal

    .popup - cta {
        margin: ($gutter / 2) 0;
    }

    // Newsletter modal is bottom aligned

    .modal--newsletter {
        -ms - flex - align: end;
        align - items: flex - end;

        &
        .modal--is - active.modal__inner {
            animation: rise - up 500 ms forwards;
        }

        .modal__inner {
            width: 100 % ;
            margin: 0;
        }

        .modal__centered {
            width: 100 % ;

            .modal__centered - content {
                max - width: none;
            }
        }
    }

    @include media - query($small) {
        .modal--mobile - friendly {
            top: auto;
            bottom: 0;
            overflow: auto;

            &
            .modal--square.modal__centered - content {
                padding: 20 px 20 px 0;
            }

            &
            .modal--is - active {
                overflow: auto;
            }

            .modal - open & { &
                : before {
                    display: none;
                }
            }

            .modal__inner {
                margin: 0;
                border - top: 2 px solid $colorTextBody;
            }

            .modal__close {
                background: none;
                padding: 5 px;
                margin: 0;
            }

            // Prevent overlap with close button
            .modal__title {
                margin - right: 40 px;
            }
        }
    }

    // Hide main content when product layer open on Safari

    // because it doesn't handle body scrolling well

    .screen - layer - open.root {
        display: none;
    }

    // Force it visible when closing the layer for the animation

    .screen - layer - closing.root {
        display: block;
    }

    .screen - layer {
        position: relative;
        display: none;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        opacity: 1;
        overflow: visible;
        z - index: $zindexModal;

        // Maintain visibility if animating
        .screen - layer - animating & {
            position: fixed;
        }
    }

    .screen - layer__inner {
        background - color: $colorBody;
    }

    .screen - layer--is - sliding {
        .screen - layer__inner {
            animation: page - slide - reveal - down 500 ms forwards;
        }
    }

    .screen - layer--is - sliding {
        display: block!important; // override .is-transitioning styles
        overflow: hidden;
    }

    .screen - layer--is - active {
        display: block!important; // override .is-transitioning styles
    }

    .screen - layer__inner {
        width: 100 % ;
        max - height: 100 % ;
        min - height: 100 % ; -
        webkit - overflow - scrolling: touch;
    }

    .screen - layer__close {
        position: fixed;
        bottom: 20 px;
        bottom: $iosSafeZoneBottom;
        left: 50 % ;
        transition: opacity 0.15 s ease - in ;
        z - index: $zindexModalClose;
        transform: translateX(-50 % );

        @include media - query($medium - up) {
            top: 20 px;
            right: 20 px;
            left: auto;
            transform: none;
            bottom: auto;
        }

        .screen - layer--is - sliding & {
            opacity: 0;
        }
    }

    .currency - picker {
        margin - bottom: $gutter / 2;
    }

    .currency - picker__text {
        display: inline - block;
        margin: 0;
    }

    // Btn mimics a select, but is a button to open a modal

    .currency - picker__btn {
        display: inline - block;
    }

    .currency - picker__label {
        display: inline - block;
        vertical - align: middle;
        padding - right: 22 px;
        text - indent: 0.01 px;
        background - position: right center;
        background: {
            image: url({
                { "ico-select.svg" | asset_url } });
            repeat: no - repeat;
            position: right 3 px center;
            color: transparent;
            size: 9 px;
        }
    }

    // List of options as buttons in modal, potentially scrollable

    .currency - options {
        max - height: 100 vh;
        padding: 100 px 0;
        width: 100 vw;
        overflow: auto; -
        webkit - overflow - scrolling: touch;
    }

    .currency - options__btn {
        display: block;
        width: 170 px;
        margin: 5 px auto;
        padding: 5 px;
    }

    .currency - flag {
        display: inline - block;
        vertical - align: middle;
        width: 50 px;
        height: 50 px;
        text - indent: -999 px;
        overflow: hidden;
    }

    .currency - flag--small {
        width: 35 px;
        height: 35 px;
    }

    .currency - options__label {
        display: inline - block;
        vertical - align: middle;
        width: 100 px;
        @include header - size(0.66);

        span {
            border - bottom: $borderWidth solid transparent;

            .is - active & ,
                .currency - options__btn: active & {
                    border - bottom: $borderWidth solid currentColor;
                }
        }
    }

    $collapsible - trigger - icon - width: 12 px;

    $collapsible - open - transition: opacity 0 s cubic - bezier(.25, .46, .45, .94), height 0 s cubic - bezier(.25, .46, .45, .94);

    $collapsible - close - transition: opacity 0 s cubic - bezier(.25, .46, .45, .94), height 0 s cubic - bezier(.25, .46, .45, .94);

    $collapsible - content - open - transition: opacity 0.6 s cubic - bezier(0.04, 0, 0.2, 1), transform 0.4 s cubic - bezier(0.04, 0, 0.2, 1);

    $collapsible - content - close - transition: transform 0 s cubic - bezier(.25, .46, .45, .94);

    // Tab style

    .collapsibles - content - wrapper {
        padding - top: $gutter / 2;
        text - align: left;
    }

    // Expandable box style

    .collapsibles - wrapper--border - bottom {
        border - bottom: $borderWidth solid $colorBorder;
        margin - top: -20 px;
    }

    .collapsible - trigger {
        color: inherit;
        position: relative;
    }

    .collapsible - trigger__icon {
        display: block;
        position: absolute;
        right: 0;
        top: 50 % ;
        width: $collapsible - trigger - icon - width;
        height: $collapsible - trigger - icon - width;
        transform: translateY(-50 % );

        .icon {
            display: block;
            width: $collapsible - trigger - icon - width;
            height: $collapsible - trigger - icon - width;
            transition: all 0.1 s ease - in ;
        }
    }

    .collapsible - trigger--inline {
        padding: 11 px 0 11 px 35 px;

        .collapsible - trigger__icon {
            right: auto;
            left: 0;
        }
    }

    .collapsible - trigger__icon--circle {
        border: $borderWidth solid $colorBorder;
        border - radius: 50 % ;
        width: 24 px;
        height: 24 px;
        text - align: center;

        .icon {
            position: absolute;
            top: 50 % ;
            left: 50 % ;
            transform: translate(-50 % , -50 % );
        }
    }

    .collapsible - trigger.is - open.collapsible - trigger__icon > .icon - chevron - down {
        transform: scaleY(-1);
    }

    .collapsible - trigger.is - open.collapsible - trigger__icon.icon - plus,
        .collapsible - trigger.collapsible - trigger__icon.icon - minus {
            display: none;
        }

    .collapsible - trigger.is - open.collapsible - trigger__icon.icon - minus {
        display: block;
    }

    .collapsible - content {
        transition: $collapsible - close - transition;

        &
        .is - open {
            visibility: visible;
            opacity: 1;
            transition: $collapsible - open - transition;
        }
    }

    .collapsible - content--all {
        visibility: hidden;
        overflow: hidden; -
        webkit - backface - visibility: hidden;
        backface - visibility: hidden;
        opacity: 0;
        height: 0;

        .collapsible - content__inner {
            transform: translateY(15 px);
        }

        .collapsible - content__inner--no - translate {
            transform: translateY(0);
        }
    }

    @include media - query($small) {
        .collapsible - content--small {
            visibility: hidden; -
            webkit - backface - visibility: hidden;
            backface - visibility: hidden;
            opacity: 0;
            height: 0;

            .collapsible - content__inner {
                transform: translateY(40 px);
            }

            .collapsible - content__inner--no - translate {
                transform: translateY(0);
            }
        }
    }

    .collapsible - content__inner {
        opacity: 0;
        transition: $collapsible - content - close - transition;

        .is - open & {
            opacity: 1;
            transform: translateY(0);
            transition: $collapsible - content - open - transition;
        }
    }

    .rte.collapsible - content__inner--faq {
        padding - bottom: $gutter;
    }

    .collapsible - label__closed {
        .collapsible - trigger[aria - expanded = "true"] & {
            display: none;
        }
    }

    .collapsible - label__open {
        display: none;

        .collapsible - trigger[aria - expanded = "true"] & {
            display: inline - block;
        }
    }

    .pswp {
        display: none;
        position: absolute;
        width: 100 % ;
        height: 100 % ;
        left: 0;
        top: 0;
        overflow: hidden; -
        ms - touch - action: none;
        touch - action: none;
        z - index: 1500; -
        webkit - text - size - adjust: 100 % ; -
        webkit - backface - visibility: hidden;
        outline: none;
    }

    .pswp img {
        max - width: none;
    }

    /* style is added when JS option showHideOpacity is set to true */

    .pswp--animate_opacity {
        /* 0.001, because opacity:0 doesn't trigger Paint action, which causes lag at start of transition */
        opacity: 0.001;
        will - change: opacity;
        transition: opacity 333 ms cubic - bezier(0.4, 0, 0.22, 1);
    }

    .pswp--open {
        display: block;
    }

    .pswp--zoom - allowed.pswp__img {
        cursor: zoom - in ;
    }

    .pswp--zoomed - in .pswp__img {
        cursor: grab;
    }

    .pswp--dragging.pswp__img {
        cursor: grabbing;
    }

    /*
      Background is added as a separate element.
      As animating opacity is much faster than animating rgba() background-color.
    */

    .pswp__bg {
        position: absolute;
        left: 0;
        top: 0;
        width: 100 % ;
        height: 100 % ;
        background: $colorBody;
        opacity: 0;
        transform: translateZ(0); -
        webkit - backface - visibility: hidden;
        will - change: opacity;
    }

    .pswp__scroll - wrap {
        position: absolute;
        left: 0;
        top: 0;
        width: 100 % ;
        height: 100 % ;
        overflow: hidden;
    }

    .pswp__container,
    .pswp__zoom - wrap {
        -ms - touch - action: none;
        touch - action: none;
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
    }

    /* Prevent selection and tap highlights */

    .pswp__container,
    .pswp__img {
        -webkit - user - select: none; -
        moz - user - select: none; -
        ms - user - select: none;
        user - select: none; -
        webkit - tap - highlight - color: transparent; -
        webkit - touch - callout: none;
    }

    .pswp__zoom - wrap {
        position: absolute;
        width: 100 % ;
        transform - origin: left top;
        /* for open/close transition */
        transition: transform 333 ms cubic - bezier(0.4, 0, 0.22, 1);
    }

    .pswp__bg {
        will - change: opacity;
        /* for open/close transition */
        transition: opacity 333 ms cubic - bezier(0.4, 0, 0.22, 1);
    }

    .pswp--animated - in .pswp__bg,
        .pswp--animated - in .pswp__zoom - wrap {
            transition: none;
        }

    .pswp__container,
    .pswp__zoom - wrap {
        -webkit - backface - visibility: hidden;
    }

    .pswp__item {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        overflow: hidden;
    }

    .pswp__img {
        position: absolute;
        width: auto;
        height: auto;
        top: 0;
        left: 0;
    }

    /*
      stretched thumbnail or div placeholder element (see below)
      style is added to avoid flickering in webkit/blink when layers overlap
    */

    .pswp__img--placeholder {
        -webkit - backface - visibility: hidden;
    }

    .pswp--ie.pswp__img {
        width: 100 % !important;
        height: auto!important;
        left: 0;
        top: 0;
    }

    /*
      Error message appears when image is not loaded
      (JS option errorMsg controls markup)
    */

    .pswp__error - msg {
        position: absolute;
        left: 0;
        top: 50 % ;
        width: 100 % ;
        text - align: center;
        line - height: 16 px;
        margin - top: -8 px;
        color: #CCC;
    }

    .pswp__error - msg a {
        color: #CCC;
        text - decoration: underline;
    }

    .pswp__button {
        position: relative;

        // Because JS listens to click on button element itself
        &
        : after {
            content: '';
            display: block;
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
        }
    }

    .pswp__button--arrow--left.icon,
        .pswp__button--arrow--right.icon {
            width: 13 px;
            height: 13 px;
            margin: 8 px;
        }

    .pswp__button[disabled] {
        opacity: 0;
        pointer - events: none;
    }

    .pswp__ui {
        position: absolute;
        display: -ms - flexbox;
        display: flex; -
        ms - flex - pack: center;
        justify - content: center; -
        ms - flex - align: center;
        align - items: center;
        bottom: $gutter;
        left: 0;
        right: 0;
        transform: translateY(0);
        transition: transform 0.25 s 0.6 s;

        .btn {
            margin: 15 px;
        }
    }

    .pswp__ui--hidden {
        transform: translateY(150 % );
        transition: transform 0.25 s;
    }

    /*================ Vendor-specific styles ================*/

    /*============================================================================
      Slick Slider 1.6.0

      - If upgrading Slick's styles, use the following variables/functions
        instead of the slick defaults
      - Remove `outline: none` from `.slick-dots li button`
      - Change slick-image-url to just url
      - Remove any instance of slick-font-url
    ==============================================================================*/

    $slick - font - family: "slick-icons, sans-serif";

    $slick - arrow - color: #000;



$slick-dot-color: # fff;

    $slick - dot - color - active: #fff!
        default;

    $slick - prev - character: '\2039';

    $slick - next - character: '\203A';

    $slick - dot - character: '';

    $slick - dot - size: 6 px;

    $slick - opacity -
        default: 0.75;

    $slick - opacity - on - hover: 1;

    $slick - opacity - not - active: 0.25;

    /*================ Slick Slider SCSS ================*/

    .slick - slider {
        position: relative;
        display: block;
        box - sizing: border - box; -
        webkit - touch - callout: none; -
        webkit - user - select: none; -
        moz - user - select: none; -
        ms - user - select: none;
        user - select: none; -
        ms - touch - action: pan - y;
        touch - action: pan - y; -
        webkit - tap - highlight - color: transparent;
        direction: ltr;
    }

    .slick - list {
        position: relative;
        overflow: hidden;
        display: block;
        margin: 0;
        padding: 0;

        &
        : focus {
            outline: none;
        }

            &
            .dragging {
                cursor: pointer;
                cursor: hand;
            }
    }

    .slick - slider.slick - track,
        .slick - slider.slick - list {
            transform: translate3d(0, 0, 0);
        }

    .slick - track {
        position: relative;
        left: 0;
        top: 0;
        display: block;

        &
        : before,
        &
        : after {
            content: "";
            display: table;
        }

            &
            : after {
                clear: both;
            }

            .slick - loading & {
            visibility: hidden;
        }
    }

    .slick - slide {
        float: left;
        height: 100 % ;
        min - height: 1 px;
        [dir = "rtl"] & {
            float: right;
        }
        img {
            display: block;
        } &
        .slick - loading img {
            display: none;
        }

        display: none;

        &
        .dragging img {
            pointer - events: none;
        }

        .slick - initialized & {
            display: block;
        }

        .slick - loading & {
            visibility: hidden;
        }

        .slick - vertical & {
            display: block;
            height: auto;
        }
    }

    .slick - arrow.slick - hidden {
        display: none;
    }

    /*================ Slick Slider Theme ================*/

    /* Arrows */

    .slick - prev,
        .slick - next {
            position: absolute;
            display: block;
            height: 20 px;
            width: 20 px;
            line - height: 0 px;
            font - size: 0 px;
            cursor: pointer;
            background: transparent;
            color: transparent;
            top: 50 % ;
            transform: translate(0, -50 % );
            padding: 0;
            border: none; &
            : hover,
            &: focus {
                    background: transparent;
                    color: transparent; &
                    : before {
                        opacity: $slick - opacity - on - hover;
                    }
                } &
                .slick - disabled: before {
                    opacity: $slick - opacity - not - active;
                } &
                : before {
                    font - family: $slick - font - family;
                    font - size: 20 px;
                    line - height: 1;
                    color: $slick - arrow - color;
                    opacity: $slick - opacity -
                        default; -
                    webkit - font - smoothing: antialiased; -
                    moz - osx - font - smoothing: grayscale;
                }
        }

    .slick - prev {
        left: -25 px;
        [dir = "rtl"] & {
            left: auto;
            right: -25 px;
        } &
        : before {
            content: $slick - prev - character;
            [dir = "rtl"] & {
                content: $slick - next - character;
            }
        }
    }

    .slick - next {
        right: -25 px;
        [dir = "rtl"] & {
            left: -25 px;
            right: auto;
        } &
        : before {
            content: $slick - next - character;
            [dir = "rtl"] & {
                content: $slick - prev - character;
            }
        }
    }

    /* Dots */

    .slick - dotted.slick - slider {
        margin - bottom: 0;
    }

    .slick - dots {
        position: absolute;
        bottom: 10 px;
        list - style: none;
        display: block;
        text - align: center;
        padding: 0;
        margin: 0;
        width: 100 % ;
        li {
            position: relative;
            display: inline - block;
            height: 20 px;
            width: 20 px;
            margin: 0 5 px;
            padding: 0;
            cursor: pointer;
            button {
                border: 0;
                background: transparent;
                display: block;
                height: 20 px;
                width: 20 px;
                line - height: 0 px;
                font - size: 0 px;
                color: transparent;
                padding: 5 px;
                cursor: pointer; &
                : hover,
                &: focus { &
                        : before {
                            opacity: $slick - opacity - on - hover;
                        }
                    } &
                    : before {
                        position: absolute;
                        top: 0;
                        left: 0;
                        content: $slick - dot - character;
                        width: 20 px;
                        height: 20 px;
                        font - family: $slick - font - family;
                        font - size: $slick - dot - size;
                        line - height: 20 px;
                        text - align: center;
                        color: $slick - dot - color;
                        opacity: $slick - opacity - not - active; -
                        webkit - font - smoothing: antialiased; -
                        moz - osx - font - smoothing: grayscale;
                    }
            } &
            .slick - active button: before {
                color: $slick - dot - color - active;
                opacity: $slick - opacity -
                    default;
            }
        }
    }

    /*================ Theme-specific partials ================*/

    /*================ Social share buttons ================*/

    $shareButtonHeight: 18 px;

    .social - sharing {
        .icon {
            height: $shareButtonHeight;
            width: $shareButtonHeight;
        }
    }

    .social - sharing__link {
        @include smallFontSize;
        display: inline - block;
        color: $colorTextBody;
        border - radius: 2 px;
        margin: 0 18 px 0 0;
        text - decoration: none;
        font - weight: normal;

        &
        : last - child {
            margin - right: 0;
        }
    }

    .social - sharing__title {
        display: inline - block;
        vertical - align: middle;
        padding - right: 15 px;
        padding - left: 3 px;
    }

    .grid - search {
        margin - bottom: $gutter;
    }

    .grid - search__product {
        position: relative;
        text - align: center;
    }

    // Force heights for consistency

    .grid - search__page - link,
        .grid - search__product - link {
            height: 280 px;
        }

    .grid - search__page - link {
        display: block;
        background - color: adaptive - color($colorBody, 2 % );
        padding: 20 px;
        color: $colorTextBody;
        overflow: hidden;
        text - overflow: ellipsis;

        &
        : hover,
        &
        : focus {
            background - color: adaptive - color($colorBody, 4 % );
        }
    }

    .grid - search__page - content {
        display: block;
        height: 100 % ;
        overflow: hidden;
    }

    .grid - search__page - content img {
        display: block;
        margin - bottom: 10 px;
    }

    .grid - search__image {
        display: block;
        padding: 20 px;
        margin: 0 auto;
        max - height: 100 % ;
        max - width: 100 % ;

        @include media - query($medium - up) {
            position: absolute;
            top: 50 % ;
            left: 50 % ;
            transform: translate(-50 % , -50 % );
        }
    }

    .index - section {
        margin: $indexSectionMarginSmall 0;
    }

    .index - section--alt {
        margin: 0;
        padding: $indexSectionMarginSmall 0;
    }

    .index - section--overflow - scroller {
        margin - bottom: 30 px;
    }

    .index - section--small {
        margin: ($indexSectionMarginSmall * 0.6) 0;
    }

    .index - section--faq {
        margin - bottom: $indexSectionMarginSmall;
    }

    @include media - query($medium - up) {
        .index - section {
            margin: $indexSectionMarginLarge 0;
        }

        .index - section--alt {
            margin: 0;
            padding: $indexSectionMarginLarge 0;
        }

        .index - section--small {
            margin: $indexSectionMarginSmall 0;
        }

        .index - section--faq {
            margin: $indexSectionMarginSmall 0($indexSectionMarginSmall / 2);
        }
    }

    /*================ Page blocks ================*/

    .page - blocks--flush.page - width {
        padding: 0;
    }

    .page - blocks > div: first - child {
        .index - section {
            margin - top: 0;
        }
    }

    /*================ Partials | Featured row section ================*/

    .feature - row - wrapper {
        overflow: hidden;
    }

    .feature - row {
        margin: 0 auto;
        display: -ms - flexbox;
        display: flex; -
        ms - flex - pack: justify;
        justify - content: space - between; -
        ms - flex - align: center;
        align - items: center;

        @include media - query($widescreen) {
            margin: 0 6 % ;
        }

        @include media - query($small) {
            -ms - flex - direction: column;
            flex - direction: column;
            margin: 0;
        }
    }

    @include media - query($small) {
        .feature - row--small - none {
            display: block;
        }
    }

    .feature - row__item {
        -ms - flex: 0 1 57 % ;
        flex: 0 1 57 % ;
        margin: 0 auto;

        @include media - query($small) {
            -ms - flex: 1 1 auto;
            flex: 1 1 auto;
            max - width: 100 % ;
            min - width: 100 % ;
        }
    }

    .feature - row__item--overlap - images {
        display: -ms - flexbox;
        display: flex; -
        ms - flex - pack: justify;
        justify - content: space - between; -
        ms - flex - align: center;
        align - items: center;
        padding: 0 0 15 px;
        margin: 0 0 0 - 30 px;

        @include media - query($medium - up) {
            padding: 50 px 0;
            margin: 0 auto;
        }

        >
        * {
            width: 50 % ;

            @if($animate_images) {
                .image - wrap {
                    transform: translate(50 px, 0);
                    opacity: 0;
                    transition: opacity 0.5 s ease,
                    transform 0.5 s cubic - bezier(0.2, 0.06, 0.05, 0.95);
                }

                &
                : first - child.image - wrap {
                    transform: translate(-50 px, 0);
                }
            }

            &
            : first - child {
                z - index: 1;
                transform: translate(30 px, 30 px);

                @include media - query($medium - up) {
                    transform: translate(50 px, 50 px);
                }
            }
        }

        @if($animate_images) { &
            .aos - animate.image - wrap {
                transform: translate(0, 0);
                opacity: 1;
            }
        }

        svg {
            border: 2 px solid $colorBody;
        }
    }

    .feature - row__text {
        min - width: 43 % ; -
        ms - flex: 0 1 43 % ;
        flex: 0 1 43 % ;
        padding: 0;

        @include media - query($small) {
            -ms - flex - order: 2;
            order: 2;
            margin - top: 0;
            padding: 30 px 20 px 0;
            padding - bottom: 0; // always last element on mobile
        }

        .rte {
            margin: 0;
        }

        .btn {
            margin - top: $gutter / 2;
        }
    }

    @include media - query($medium - up) {
        .feature - row__text--left {
            padding - right: $gutter / 2;
            padding - left: $gutter;
        }

        .feature - row__text--right {
            padding - right: $gutter;
            padding - left: $gutter / 2;
        }
    }

    .feature - row__image {
        display: block;
        margin: 0 auto;

        @include media - query($small) {
            -ms - flex - order: 1;
            order: 1;
        }
    }

    // Unique colors for alt coloured sections

    .index - section--alt {
        background - color: $colorAlt;
        color: $colorAltText;
    }

    .index - section--alt a: not(.btn) {
        color: $colorAltText;

        &
        : hover,
        &
        : focus {
            color: $colorAltText;
        }
    }

    .index - section--alt.btn {
        color: $colorAlt;
        background - color: $colorAltText;

        &
        : hover,
        &
        : active {
            color: $colorAlt;
            background - color: $colorAltText;
        }
    }

    .index - section--alt.btn--tertiary {
        background - color: $colorAlt;
        border - color: $colorAltText;
        color: $colorAltText;

        &
        : hover {
            background - color: $colorAlt;
            color: $colorAltText;
        }

        @if($buttonStyle == 'shadow') {
            box - shadow: 5 px 5 px 0 0 $colorAltText;

            &
            : active {
                box - shadow: 1 px 1 px 0 0 $colorAltText;
                background - color: $colorAlt;
                color: $colorAltText;
            }
        }
    }

    .index - section--alt.product - slider.slick - initialized: after {
        background - color: $colorAltText;
    }

    .index - section--alt.placeholder - svg {
        background - color: #fff;
    }

    .footer__social {
        li {
            margin: 5 px 5 px 0;
        }

        a {
            display: block;
            border - radius: 100 % ;
            border: 2 px solid $colorBorder;
            padding: 14 px;
            line - height: 1;

            &
            : active {
                color: $colorBtnPrimaryText;
                background: $colorBtnPrimary;
            }
        }

        .icon {
            width: 22 px;
            height: 22 px;

            @include media - query($medium - up) {
                width: 24 px;
                height: 24 px;
            }

            &
            .icon--wide {
                width: 40 px;
            }
        }
    }

    /*================ View-specific styles ================*/

    /*================ Templates | Cart Page ================*/

    .cart__empty - text {
        display: none;
        padding - bottom: 30 px;

        .cart--empty & {
            display: block;
        }
    }

    .cart__header - labels {
        @include headerFontStack;
        border - bottom: $borderWidth solid $colorBorder;
        padding - bottom: $gutter / 2;
    }

    .cart__header - labels,
        .cart__items,
        .cart__footer {
            .cart--empty & {
                display: none;
            }
        }

    .cart__items.loading {
        position: relative;

        .cart__item {
            opacity: 0.4;
            transition: opacity 0.2 s ease;
        }

        &
        : before,
        &
        : after {
            top: 100 px;
        }

            &
            : before {
                background - color: transparent;
            }

            &
            : after {
                background - color: $colorBtnPrimary;
            }
    }

    .cart__row {
        margin - bottom: 30 px;
    }

    .cart__checkout - wrapper {
        margin - top: $gutter / 2;

        .additional - checkout - buttons {
            margin - top: 12 px;
        }

        &
        + & {
            margin - top: $gutter;
        }
    }

    .cart__row[data - shopify - buttoncontainer] {
        -ms - flex - pack: end;
        justify - content: flex - end;
    }

    .cart__footer: not(.drawer__footer) {
        border - top: $borderWidth solid $colorBorder;
        padding - top: $gutter / 2;
    }

    @include media - query($medium - up) {
        .cart__footer.btn + .btn {
            margin - left: $gutter / 2;
        }
    }

    .cart__row--table {
        display: table;
        table - layout: fixed;
        width: 100 % ;

        .grid__item {
            display: table - cell;
            vertical - align: middle;
            float: none;
        }
    }

    @include media - query($medium - up) {
        .cart__row--table - large {
            display: table;
            table - layout: fixed;
            width: 100 % ;

            .grid__item {
                display: table - cell;
                vertical - align: middle;
                float: none;
            }
        }
    }

    .cart__row - product {
        display: -ms - flexbox;
        display: flex; -
        ms - flex - align: center;
        align - items: center;
    }

    .cart__row - content {
        padding - left: 20 px;
    }

    .cart__product - image - wrap {
        position: relative;
        width: 15 % ;
        min - width: 75 px;

        @include media - query($medium - up) {
            min - width: 115 px;
        }
    }

    .cart__product - image {
        display: block;
        width: 100 % ;
        padding - top: 100 % ;
        background - repeat: no - repeat;
        background - size: cover;
        background - position: top center;
        opacity: 0;
        transition: opacity 0.5 s ease;

        &
        .lazyloaded {
            opacity: 1;
        }
    }

    .cart__product - name {
        @include largeFontSize;
        display: block;
    }

    .cart__item - subtitle {
        margin - bottom: 5 px;
    }

    .cart__item - price--bold {
        font - weight: bold;
    }

    .cart__item - price--original {
        display: block;
    }

    .cart__quantity {
        display: inline - block;
        width: 40 px;
        @include media - query($medium - up) {
            width: 70 px;
        }
        padding: 5 px;
        margin - bottom: 5 px;
        text - align: right;
    }

    .cart__remove {
        @include smallFontSize;

        @include media - query($small) {
            font - size: 13 px;
        }
    }

    .cart__note {
        font - size: 11 px;
        opacity: 0.8;
        margin: 10 px 0;

        @include media - query($medium - up) {
            margin: 20 px 0;
        }
    }

    .cart__note--terms {
        input {
            vertical - align: middle;
        }

        label {
            display: inline;
        }

        a {
            text - decoration: underline;
        }
    }

    .cart__details {
        display: -ms - flexbox;
        display: flex; -
        ms - flex - align: center;
        align - items: center;
        margin - bottom: 5 px;
    }

    .cart__detail - title {
        @include largeFontSize;
        margin - bottom: 0;
    }

    .cart__detail - info {
        -ms - flex: 1 1 auto;
        flex: 1 1 auto;
        text - align: right;
    }

    .cart__detail - discount - amount {
        margin - left: 10 px;
    }

    // Remove animation

    .cart__item--remove {
        animation: remove 0.25 s ease - out;
        max - height: 0;
        overflow: hidden;
        opacity: 0;
    }

    // PayPal button has unhelpful z-index

    iframe.zoid - component - frame {
        z - index: 1!important;
    }

    /*================ Templates | Product Page ================*/

    @include media - query($medium - up) {
        .product - single__sticky {
            position: -webkit - sticky;
            position: sticky;
            top: 0;
        }
    }

    .product - single__header {
        margin - bottom: $gutter / 2;

        @include media - query($medium - up) {
            margin - top: 60 px;

            .screen - layer & {
                margin - right: 50 px; // account for desktop close icon
            }
        }
    }

    .product - single__title {
        word - wrap: break -word;
        margin - bottom: 15 px;
        @if($type_product_capitalize) {
            text - transform: uppercase;
        }
    }

    .product - single__meta {
        padding - left: 45 px;

        @include media - query($small) {
            padding - left: 0;
            margin - top: $gutter / 2;
        }

        .social - sharing {
            margin - top: $gutter;
            text - align: center;

            @include media - query($medium - up) {
                margin - top: $gutter;
            }
        }
    }

    .product - single__review - link {
        display: block;

        .spr - badge[data - rating = "0.0"] {
            display: none;
        }

        .spr - badge {
            margin - bottom: 15 px;
        }

        .spr - badge - starrating {
            margin - right: 8 px;
        }

        .spr - icon {
            vertical - align: initial;
        }

        .spr - badge - caption {
            @include smallFontSize;
        }
    }

    .product - single__sku,
        .product - single__vendor {
            @include smallFontSize;
            margin - bottom: $gutter / 6;
        }

    .product - form - holder {
        margin - bottom: $gutter;
    }

    .product - single__form {
        margin - bottom: $gutter;

        .product - form - holder & {
            margin: 0;
        }
    }

    .product - single__variants {
        display: none;

        .no - js & {
            display: block;
            margin - bottom: $gutter;
        }
    }

    .product - image - main {
        position: relative;
    }

    .trust - image {
        margin: 0 auto $gutter;
    }

    // Video div

    .product__video - wrapper {
        position: relative;
        overflow: hidden;
        max - width: 100 % ;
        padding - bottom: 100 % ; // apsect ratio overwritten inline
        height: auto;
        background - color: $colorSmallImageBg;

        iframe {
            width: 100 % ;
            height: 100 % ;
            transition: opacity 0.5 s ease - in ;
        }

        // Put overlay on muted videos because they cannot be interacted with
        &
        [data - video - style = "muted"].loaded: before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            z - index: 1;
        }

        // Unless low power mode requires them to be touched to start
            &
            .video - interactable: before {
                display: none;
            }

        // Allow Vimeo videos to be clicked on so they can start to play.
        // This prevents swiping on a video to go to the next slide.
            @include media - query($small) { &
            [data - video - type = "vimeo"].loaded: before {
                display: none;
            }
        }

            &
            .loading: before {
                background: color - control($colorSmallImageBg, 0.15);
            } &
            .loading: after {
                background: color - control($colorSmallImageBg, 1);
            }

            &
            .loading iframe {
                opacity: 0.01; // sneaky way to avoid talking to an invisible YT iframe
            }

            &
            .loaded iframe {
                opacity: 1;
            }
    }

    .product__video {
        position: absolute;
        top: 0;
        left: 0;
        width: 100 % ;
        height: 100 % ;
    }

    // Images

    .product__photos--beside {
        display: -ms - flexbox;
        display: flex;
        width: 100 % ;
    }

    .product__photos {
        direction: ltr;

        a {
            display: block;
            max - width: 100 % ;
        }

        img {
            display: block;
            margin: 0 auto;
            max - width: 100 % ;
            width: 100 % ;
        }

        @include media - query($small) {
            width: auto;
            margin: (-$gutter * 0.75)(-$page - width - gutter - small) 0;
        }
    }

    .product__main - photos {
        position: relative;
        overflow: hidden; -
        ms - flex: 1 1 auto;
        flex: 1 1 auto;

        @include media - query($medium - up) {
            -ms - flex - order: 2;
            order: 2;
        }
    }

    .product__main - photos--slider {
        img {
            display: none;
        }

        .starting - slide img,
            .slick - initialized img {
                display: block;
            }

        .secondary - slide: not(.slick - slide) {
            display: none;
        }
    }

    .product__slide {
        position: relative;
    }

    // Thumbnails

    .product__thumbs {
        position: relative;
    }

    .product__thumbs - sticky {
        position: -webkit - sticky;
        position: sticky;
        top: $gutter / 2;
    }

    .product__thumbs--below {
        margin - top: $grid - gutter - small / 2;

        @include media - query($medium - up) {
            margin - top: $gutter / 2;
        }
    }

    .product__thumbs--beside {
        @include media - query($medium - up) {
            -ms - flex: 0 0 80 px;
            flex: 0 0 80 px;
            max - width: 80 px;
            margin - left: 0;
            margin - right: $gutter / 2;
        }

        .slick - list {
            min - height: 100 % ;
        }
    }

    // Thumbnails

    .product__thumb - item {
        border: 2 px solid transparent;
        transition: border - color 0.1 s ease;

        &
        .slick - current,
        &
        .thumb--current {
            border - color: $colorTextBody;
        }

        .product__thumbs--beside & {
            margin - bottom: $grid - gutter - small / 2;

            @include media - query($medium - up) {
                margin - bottom: $gutter / 2;
            }
        }

        .product__thumbs--below & {
            margin - right: $grid - gutter - small / 2;

            @include media - query($medium - up) {
                margin - right: $gutter / 2;
            }

            &
            : last - child {
                margin - right: 0;
            }
        }
    }

    // Align them before slick initializes to reduce page reflows

    .product__thumbs--below: not(.slick - initialized).product__thumb - item {
        max - width: 100 px;
        float: left;
    }

    .product__thumb {
        position: relative;
        display: block;
        cursor: pointer;
    }

    .product__thumb - play {
        position: absolute;
        top: 50 % ;
        left: 50 % ;
        transform: translate(-50 % , -50 % );
        background - color: $colorBtnPrimary;
        border - radius: 100 px;
        padding: 7 px;
        z - index: 1;
        opacity: 0;
        transition: opacity 0.5 s ease;
        font - size: 0;

        .aos - animate & {
            opacity: 1;
        }

        .icon {
            fill: $colorBtnPrimaryText;
            width: 24 px;
            height: 24 px;
            @include media - query($medium - up) {
                width: 30 px;
                height: 30 px;
            }
        }
    }

    // Zoom button

    .product__photo - zoom {
        position: absolute;
        bottom: 0;
        right: 0;
        margin: 15 px;
        cursor: zoom - in ;

        // Visually hidden, covers full image on desktop
        @include media - query($medium - up) {
            opacity: 0;
            width: 100 % ;
            top: 0;
            left: 0;
            border - radius: 0;
            margin: 0;

            svg,
            span {
                display: none;
            }
        }
    }

    // Loading animation for zoom images

    .pswp__img--placeholder {
        overflow: hidden;
        animation: placeholder - shimmer 1.3 s linear 2 s infinite;
        background: linear - gradient(100 deg, $colorSmallImageBg 40 % , darken($colorSmallImageBg, 3 % ) 63 % , $colorSmallImageBg 79 % );
        background - size: 400 % 100 % ;
    }

    // Container for prices and optional shipping note

    .product - single__prices {
        display: -ms - flexbox;
        display: flex; -
        ms - flex - wrap: wrap;
        flex - wrap: wrap; -
        ms - flex - pack: start;
        justify - content: flex - start; -
        ms - flex - align: center;
        align - items: center;

        @include media - query($small) {
            -ms - flex - pack: center;
            justify - content: center;
        }

        >
        * {-ms - flex: 0 1 auto;
            flex: 0 1 auto;
            padding - right: 15 px;

            &
            : last - child {
                padding - right: 0;
            }
        }
    }

    .product__price {
        @include largeFontSize;
    }

    // Used anywhere unit price is visible

    .product__unit - price {
        font - size: 0.8e m;
        opacity: 0.8;
    }

    .product__price--compare {
        text - decoration: line - through;
    }

    .product__inventory {
        font - style: italic;
    }

    // Quantity selector and label

    .product__quantity {
        margin - bottom: $gutter / 2;
        @include media - query($medium - up) {
            margin - bottom: $gutter;
        }

        input[type = "number"] {
            max - width: 80 px;
        }
    }

    .product__quantity--dropdown {
        display: inline - block;
    }

    // Hide Shopify Payment Buttons if no variant

    .add - to - cart[disabled] + .shopify - payment - button {
        display: none;
    }

    /*================ Templates | Theme Blog ================*/

    .article__date,
    .article__author {
        margin - bottom: 5 px;

        @include media - query($medium - up) {
            margin - bottom: 10 px;
        }
    }

    .article__featured - image {
        display: block;
        margin - bottom: $gutter;

        img {
            display: block;
            margin: 0 auto;
        }
    }

    .article__body {
        margin - bottom: $gutter / 2;
        @include media - query($medium - up) {
            margin - bottom: $gutter;
        }
    }

    /*================ Article listings ================*/

    .article - listing {
        //margin-bottom: $gutter * 1.5;
        margin - bottom: 0 px;

        @include media - query($medium - up) {
            margin - bottom: $gutter * 3;
        }
    }

    .article__image - wrap {
        margin: 0 auto;
        max - width: 850 px;
    }

    .article__content {
        margin: 0 auto;
        max - width: 750 px
    }

    .article__content - meta {
        margin - bottom: $gutter / 2;

        >
        * {
            margin - bottom: 5 px;
        }
    }

    /*================ Comments ================*/

    .comment.last {
        margin - bottom: -($gutter / 2);
    }

    $image - index: 1;

    $image - overlay - index: 2;

    $content - index: 3;

    @keyframes zoom - fade - password {
        0 % {
            opacity: 0;
            transform: scale(1.4, 1.4);
        }
        5 % {
            opacity: 1;
            transform: scale(1, 1);
        }
        100 % {
            opacity: 1;
            transform: scale(1.2, 1.2);
        }
    }

    .password - page__image {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        opacity: 0;
        background - size: cover;
        background - repeat: no - repeat;
        background - position: center center;
        z - index: $image - index;
        animation: zoom - fade - password 20 s ease 1 s forwards;

        &
        : before,
        &
        : after {
            position: fixed;
            content: '';
            left: 0;
            right: 0;
            bottom: 0;
            z - index: $image - overlay - index;
        }

            &
            : before {
                top: 0;
                background - color: rgba(0, 0, 0, 0.2);
            }

            &
            : after {
                position: fixed;
                height: 55 vh;
                background: linear - gradient(rgba(0, 0, 0, 0) 0, rgba(0, 0, 0, 0.8) 100 % );
            }
    }

    // Main layout

    .password - page__wrapper {
        position: absolute;
        display: -ms - flexbox;
        display: flex; -
        ms - flex - direction: column;
        flex - direction: column;
        height: 100 % ;
        width: 100 % ;
        color: #fff;
        padding: $gutter / 2;

        @include media - query($medium - up) {
            padding: $gutter;
        }

        >
        div {
            -ms - flex: 0 0 auto;
            flex: 0 0 auto;
            position: relative;
        }

        >
        .password - page__main {
            position: relative; -
            ms - flex: 1 0 auto;
            flex: 1 0 auto;
        }

        a: not(.btn) {
            color: inherit;
        }

            hr {
            border - color: currentColor;
        }
    }

    // Header

    .password - page__header {
        position: relative;
        display: -ms - flexbox;
        display: flex; -
        ms - flex - pack: justify;
        justify - content: space - between; -
        ms - flex - align: center;
        align - items: center; -
        ms - flex - wrap: wrap;
        flex - wrap: wrap;
        z - index: $content - index;

        >
        * {
            margin - bottom: 20 px;
        }
    }

    .password - page__logo {
        h1 {
            margin - bottom: 0;
        }

        .logo {
            max - width: 100 % ;
        }
    }

    .password - page__logo - image {
        display: -ms - flexbox;
        display: flex; -
        ms - flex - align: center;
        align - items: center;
    }

    // Custom button style for password link

    .btn--password {
        display: block;
        border - radius: 35 px;
        background - color: transparent;
        color: #fff;
        border - color: #fff;
        box - shadow: none;

        &
        : hover,
        &
        : active {
            background - color: transparent;
            color: #fff;
            border - color: #fff;
        }

            &
            : after {
                content: '';
            }
    }

    .password__lock.icon {
        position: relative;
        top: -2 px;
        margin - right: 4 px;
        width: 12 px;
        height: 12 px;
    }

    // Main content area

    .password - page__content - wrapper {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        max - height: 80 vh;
        z - index: $content - index;

        @include media - query($small) {
            bottom: -90 px;
            padding - bottom: 20 px;
        }
    }

    .password - page__content {
        display: -ms - flexbox;
        display: flex; -
        ms - flex - pack: justify;
        justify - content: space - between; -
        ms - flex - align: end;
        align - items: flex - end; -
        ms - flex - wrap: wrap;
        flex - wrap: wrap;
    }

    .password - page__form {
        -ms - flex: 1 1 100 % ;
        flex: 1 1 100 % ;

        @include media - query($medium - up) {
            -ms - flex: 0 0 35 % ;
            flex: 0 0 35 % ;
        }
    }

    .password - form {
        margin - bottom: 1e m;
    }

    .password - page__signup - form {
        .errors ul {
            list - style - type: none;
            margin - left: 0;
        }
    }

    .password - page__social - sharing {
        margin - top: 30 px;
    }

    .icon - shopify - logo {
        width: 60 px;
        height: 20 px;
    }

    #
    LoginModal.modal__close {
        @include media - query($small) {
            padding: 20 px;
        }
    }

    #
    LoginModal.modal__inner {
        background: $colorBody;
        color: $colorTextBody;
        padding: 30 px;
    }

    .password - admin - link {
        margin: 0;

        a {
            border - bottom: $borderWidth solid $colorBorder!important;
        }
    }

    // Footer

    .password - page__footer {
        -ms - flex: 1 1 100 % ;
        flex: 1 1 100 % ;

        @include media - query($medium - up) {
            -ms - flex: 0 0 auto;
            flex: 0 0 auto;
        }

        line - height: 1.5 * $type_base_size;
        font - size: 80 % ;

        @include media - query($small) {
            margin - top: $gutter;
        }
    }

    // Custom newsletter styles placeholder color

    .password - page__content {
        .newsletter - form - group {
            max - width: none;
        }

        .input - group - field: -ms - input - placeholder {
            opacity: 1;
        }

        .input - group - field::placeholder {
            opacity: 1;
        }
    }

    @include media - query($small) {#
        ShopifyChat# ShopifyChat {
            bottom: 100 px!important;
        }
    }

    /*================ Modules and sections ================*/

    $slideshow - dot - size: 6 px;

    $slideshow - dot - size - large: 8 px;

    .slick - slider {

        // Dots
        .slick - dots {

            li {
                vertical - align: middle;
            }

            // Inactive dot
            li,
            li button {
                width: $slideshow - dot - size;
                height: $slideshow - dot - size;
            }

            li button::before {
                width: $slideshow - dot - size;
                height: $slideshow - dot - size;
                border - radius: 100 % ;
            }

            // Active dot
            li.slick - active,
                li.slick - active button,
                li.slick - active button::before {
                    width: $slideshow - dot - size - large;
                    height: $slideshow - dot - size - large;
                }
        }
    }

    .hero.slick - dots {
        li button::before {
            background - color: $slideshow - text - light;
        }
    }

    // Keep room for zoom button

    .product__main - photos {
        .slick - dots {
            bottom: -5 px;
            padding: 18 px 100 px 20 px;
            background: radial - gradient(rgba(0, 0, 0, 0.2) 0 % , rgba(0, 0, 0, 0) 40 % );
        }

        .slick - slider.slick - dots li button::before {
            background - color: #fff;
        }

        .slick - dots li button: before {
                opacity: 0.5;
            }
            .slick - dots li.slick - active button: before {
                opacity: 1;
            }
    }

    $z - index - slideshow - image: 1;

    $z - index - slideshow - video: 2;

    $z - index - slideshow - image - overlay: 3;

    $z - index - slideshow - text: 4;

    // Slick overrides

    .hero.slick - dotted {
        margin - bottom: 0;
    }

    .slick - track {
        cursor: pointer;
        cursor: -webkit - grab;

        // Disable grab cursor if only a single slide
        [data - slide - count = "1"] & {
            cursor: default;

            &
            : active {
                cursor: default;
            }
        }

        &
        : active {
            cursor: -webkit - grabbing;
        }
    }

    // To enable arrows

    $slickArrowSize: 40 px;

    .slick - prev,
        .slick - next {
            width: $slickArrowSize;
            height: $slickArrowSize;
            top: 40 % ;
            z - index: 20;

            &
            : before {
                color: $colorHeroText;
                font - size: 60 px;
                line - height: $slickArrowSize;
                text - shadow: 0 0 20 px rgba(0, 0, 0, 1);
            }
        }

    .slick - prev {
        left: 25 px;
        [dir = "rtl"] & {
            right: 25 px;
        }

        @include media - query($small) {
            left: $page - width - gutter - small;
            [dir = "rtl"] & {
                right: $page - width - gutter - small;
            }
        }
    }

    .slick - next {
        right: 25 px;
        [dir = "rtl"] & {
            left: 25 px;
        }

        @include media - query($small) {
            right: $page - width - gutter - small;
            [dir = "rtl"] & {
                left: $page - width - gutter - small;
            }
        }
    }

    .hero {
        overflow: hidden;

        // Make sure slides fill full height
        .slideshow__slide,
        .slick - list,
        .slick - track {
            height: 100 % ;
        }
    }

    // General slideshow styles

    .slideshow - wrapper {
        position: relative;
    }

    // Pause button (focusable by keyboard only)

    .slideshow__pause: focus {
        clip: auto;
        width: auto;
        height: auto;
        margin: 0;
        color: $colorBtnPrimaryText;
        background - color: $colorBtnPrimary;
        padding: 10 px;
        z - index: $zindexSkipToContent;
        transition: none;

        .video - is - playing & {
            display: none;
        }
    }

    .slideshow__pause - stop {
        display: block;

        .is - paused & {
            display: none;
        }
    }

    .slideshow__pause - play {
        display: none;

        .is - paused & {
            display: block;
        }
    }

    // General slide styles

    .slideshow__slide {
        display: none;
        position: relative;
        overflow: hidden;

        &
        : first - child {
            display: block;
        }

        // Progress bar
            &
            : after {
                content: '';
                position: absolute;
                background: $colorTextBody;
                bottom: 0;
                height: 2 px;
                width: 0 % ;
                z - index: 1;
                transition: width 0 s linear 0 s;
            }
    }

    $z - index - hero - image: 1;

    $z - index - hero - video: 2;

    $z - index - hero - image - overlay: 3;

    $z - index - hero - text: 4;

    .hero - wrapper {
        position: relative;
    }

    .hero {
        position: relative;
        overflow: hidden;
        animation: placeholder - shimmer 1.3 s linear 0.5 s infinite;
        background: linear - gradient(100 deg, $colorLargeImageBg 40 % , lighten($colorLargeImageBg, 13 % ) 63 % , $colorLargeImageBg 79 % );
        background - size: 300 % 100 % ;

        &
        .loaded {
            animation: none;
        }
    }

    .hero__text - shadow {
        position: relative;
        display: inline - block;
        transform: translateZ();

        >
        * {
            position: relative;
        }

        &
        : before {
            @include heroRadial;
            opacity: 0;
            transition: opacity 0.6 s cubic - bezier(0.04, 0, 0.2, 1) 0.3 s;
        }

            &
            .aos - animate: before {
                opacity: 1;
            }
    }

    .hero__image - wrapper,
        .hero__media {
            position: absolute;
            top: 0;
            left: 0;
            height: 100 % ;
            width: 100 % ;
        }

    .hero__image - wrapper--overlay,
        .hero__media--overlay { &
            : before {
                @include overlay($z - index - hero - image - overlay);
                @include heroScrim();

                .video - interactable & {
                    pointer - events: none;
                }
            }
        }


    .sidenav {
        height: 100 % ;
        width: 250 px;
        position: fixed;
        z - index: 1;
        top: 0;
        left: 0;
        background - color: #111;

  overflow-x: hidden;

  transition: 0.5s;

  padding-top: 60px;

}



.sidenav a {

  padding: 8px 8px 8px 32px;

  text-decoration: none;

  font-size: 25px;

  color: # 818181;
        display: block;
        transition: 0.3 s;
    }

    .sidenav a: hover {
        color: #f1f1f1;
    }

    .sidenav.closebtn {
        position: absolute;
        top: 0;
        right: 25 px;
        font - size: 36 px;
        margin - left: 50 px;
    }



    .hero__image {
        position: relative;
        width: 100 % ;
        height: 100 % ;
        z - index: $z - index - hero - image;
        object - fit: cover;
        font - family: "object-fit: cover";
    }

    .hero__media iframe,
    .hero__media video {
        width: 100 % ;
        height: 100 % ;
        pointer - events: none;

        .video - interactable & {
            pointer - events: auto;
        }
    }

    // MP4 sizing

    .hero__media video {
        position: relative;
        object - fit: cover;
        object - position: 50 % 20 % ;
        font - family: "object-fit: cover";
    }

    // YouTube iframes need more specific sizing

    .hero__media iframe {
        position: absolute;
        top: 0;
        left: 0;
        width: 300 % ;
        left: -100 % ;
        max - width: none;

        // This min-width may need to change slightly depending on
        // embedded video dimensions. Can do on a per-shop basis
        @media screen and(min - width: 1140 px) {
            width: 100 % ;
            height: 300 % ;
            left: auto;
            top: -100 % ;
        }
    }

    // Mobile only vimeo play button

    .vimeo - mobile - trigger {
        display: block;
        position: absolute;
        width: 100 % ;
        z - index: 2;
        margin - top: 90 px;

        .hero__text - content & {
            margin - top: -130 px;
        }

        .icon {
            width: 40 px;
            height: 40 px;
            background - color: #fff;
            color: #000;

    border-radius: 50%;

    padding: 10px;

  }

}



.hero__slide-link {

  display: block;

  position: relative;

  height: 100%;

  color: $colorHeroText;

  z-index: $z-index-hero-text;

}



.hero__text-wrap {

  position: absolute;

  height: 100%;

  width: 100%;

  color: $colorHeroText;

  z-index:1;



  .video-interactable & {

    pointer-events: none;

  }



  .page-width {

    display: table;

    width: 100%;

    height: 100%;

  }

}



.hero__text-content {

  position: relative;

  padding: 35px 0;

  z-index: $z-index-hero-text;

  @include media-query($medium-up) {

    padding: 60px 0;

  }

}



.hero__title {

  display: block;

  margin-bottom: 0;

  font-size: em(40px);



  @include media-query($medium-up) {

    font-size: em(80px);

  }

}



.hero__subtext {

  margin-top: 20px;

}



.hero__subtitle {

  @include largeFontSize;

  vertical-align: middle;

  margin-top: 5px;



  @include media-query($medium-up) {

    display: inline-block;

    margin-top: 12px;

    margin-right: 20px;

  }

}



.hero__link {

  display: inline-block;



  .video-interactable & {

    pointer-events: auto;

  }



  .btn {

    margin-top: 12px;

  }

}



// Text alignment



.hero__text-content {

  display: table-cell;



  &.horizontal-left {

    text-align: left;

    padding-right: 10%;



    @include media-query($medium-up) {

      padding-right: 33%;

    }

  }



  &.horizontal-center {

    text-align: center;



    @include media-query($medium-up) {

      padding-left: 40px;

      padding-right: 40px;

    }

  }



  &.horizontal-right {

    text-align: right;

    padding-left: 10%;



    @include media-query($medium-up) {

      padding-left: 33%;

    }

  }



  &.vertical-center {

    vertical-align: middle;

    padding-top: 50px;



    @include media-query($medium-up) {

      padding-top: 90px;

    }



    .hero__subtitle {

      margin-right: 0; // because link is a block below subtitle

    }



    .hero__link {

      display: block;



      .btn {

        margin-top: 15px;



        @include media-query($medium-up) {

          margin-top: 20px;

        }

      }

    }

  }



  &.vertical-top {

    vertical-align: top;

  }

  &.vertical-bottom {

    vertical-align: bottom;

  }

}



.slick-dotted .hero__text-content.vertical-bottom {

  padding-bottom: 50px;

}



// Hero section heights



.hero--450px {

  height: floor(450px * 0.65);

}



.hero--550px {

  height: floor(550px * 0.65);

}



.hero--650px {

  height: floor(650px * 0.65);

}



.hero--750px {

  height: floor(750px * 0.65);

}



.hero--850px {

  height: floor(850px * 0.65);

}



.hero--100vh {

  height: 100vh;

}



.hero[data-natural] {

  position: absolute;

  top: 0;

  left: 0;

  right: 0;

  bottom: 0;

}



@include media-query($medium-up) {

  .hero--450px {

    height: 450px;

  }

  .hero--550px {

    height: 550px;

  }

  .hero--650px {

    height: 650px;

  }

  .hero--750px {

    height: 750px;

  }

  .hero--850px {

    height: 850px;

  }

}



@include media-query($small) {

  .hero--mobile--250px:not([data-natural]) {

    height: 250px;

  }

  .hero--mobile--300px:not([data-natural]) {

    height: 300px;

  }

  .hero--mobile--400px:not([data-natural]) {

    height: 400px;

  }

  .hero--mobile--500px:not([data-natural]) {

    height: 500px;

  }

  .hero--mobile--100vh:not([data-natural]) {

    height: 90vh;

  }

}



// Align to top of page if first section on page



.index-section--hero:first-child {

  [data-align-top] .hero-wrapper {

    position: relative;

    z-index: 1;

  }

}



@if ($animate_images) {

  [data-aos= "hero__animation"],
        .hero.slideshow__slide {
            .hero__media,
            .hero__image {
                opacity: 0;

                .no - js & {
                    opacity: 1;
                }
            }
        }

        [data - aos = "hero__animation"].loaded.aos - animate,
        .hero.loaded.aos - animate.slideshow__slide.slick - active {
            .hero__media,
            .hero__image.lazyloaded,
                .hero__image--svg {
                    animation: #{ $animate_images_style } - bg 1.5 s cubic - bezier(0.26, 0.54, 0.32, 1) 0 s forwards;
                    transition: none; // fixes safari animation conflict
                }
        }

        // Collection header image
        [data - aos = "hero__animation"].collection - hero__image {
            opacity: 0;

            .no - js & {
                opacity: 1;
            }

            &
            .lazyloaded {
                animation: #{ $animate_images_style } - bg 1.5 s cubic - bezier(0.26, 0.54, 0.32, 1) 0 s forwards;
                transition: none; // fixes safari animation conflict
            }
        }


    }

    @else {
        // No image animation if product screen is closing
        .slideshow - refresh[data - aos = "hero__animation"].loaded {
            .hero__media,
            .hero__image {
                animation: none;
                opacity: 1;
            }
        }
    }

    .animated__slide {
        opacity: 0;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        overflow: hidden;

        &
        : first - child {
            display: block;
        }
    }

    .animated__slide--active {
        opacity: 1;
    }

    // Fading style animations

    .hero - animated[data - style = "fading"] {
        .animated__slide--inactive {
            opacity: 0;
            animation: hero - animate - out 0.5 s linear forwards;
            z - index: 1;
        }
        .animated__slide--active {
            animation: hero - animate 4 s cubic - bezier(0.12, 0.63, 0.6, 0.74) forwards;
            z - index: 1;
        }

        @include media - query($small) {
            .animated__slide--inactive {
                animation - name: hero - animate - out - small;
            }
            .animated__slide--active {
                animation - name: hero - animate - small;
            }
        }
    }

    .collection - filter {
        display: -ms - flexbox;
        display: flex; -
        ms - flex - align: center;
        align - items: center; -
        ms - flex - pack: center;
        justify - content: center; -
        ms - flex - wrap: wrap;
        flex - wrap: wrap;
        margin - bottom: $gutter;

        select {
            display: block;
            width: 100 % ;
        }
    }

    .collection - filter__item {
        -ms - flex: 0 1 20 % ;
        flex: 0 1 20 % ;
        margin: 0($gutter / 2);

        @include media - query($small) {
            -ms - flex: 0 1 40 % ;
            flex: 0 1 40 % ;
        }
    }

    /*================ Module | Collection images at top of templates ================*/

    $collectionHeroLarge: 550 px;

    $collectionHeroSmall: 330 px;

    .collection - hero {
        position: relative;
        width: 100 % ;
        height: $collectionHeroSmall;
        overflow: hidden;
        background: $colorLargeImageBg;
        @include media - query($medium - up) {
            height: $collectionHeroLarge;
        }
    }

    .collection - hero__spacer {
        height: $collectionHeroSmall;
        @include media - query($medium - up) {
            height: $collectionHeroLarge;
        }
    }

    .collection - hero__image {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        width: 100 % ;
        background - size: cover;
        background - position: 50 % 50 % ;
        background - repeat: no - repeat;
    }

    .collection - hero__content {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        width: 100 % ;
        display: -ms - flexbox;
        display: flex; -
        ms - flex - align: center;
        align - items: center;

        .page - width {
            width: 100 % ;
        }

        .section - header--hero {
            margin - bottom: 0;
        }
    }

    /*================ Logo Image ================*/

    .site - header__logo.logo--has - inverted {
        .is - light & {
            opacity: 0;
            visibility: hidden;
            overflow: hidden;
            height: 0;
        }
    }

    .site - header__logo.logo--inverted {
        opacity: 0;
        visibility: hidden;
        overflow: hidden;
        height: 0;

        .is - light & {
            opacity: 1;
            visibility: visible;
            height: auto;
        }
    }

    /*================ Text Shop Name ================*/

    .site - header__logo {
        font - size: em(25 px);

        @include media - query($small) {
            font - size: em(20 px);
            text - align: center;
        }
    }

    .site - header__logo a,
        .header - logo a {
            color: $colorNavText;

            .is - light & {
                color: $colorStickyNavLinks;

                &
                : hover {
                    color: $colorStickyNavLinks;
                }
            }
        }

    /*================ Submenu items ================*/

    .site - nav__dropdown - link {
        display: block;
        white - space: nowrap;
        padding: 8 px 15 px;
        font - size: em(16 px);
    }

    /*================ Module | Theme Tags ================*/

    .tags--vertical {
        list - style: none outside;
        margin: 0;
        padding: 0;

        li {
            margin - bottom: 5 px;

            @include media - query($medium - up) {
                margin - bottom: 10 px;
            }
        }
    }

    .tags--article {
        a {
            padding - right: $gutter / 2;
            padding - left: 0;
        }
    }

    .tags__title {
        margin - right: $gutter / 2;
    }

    .tag--active {
        font - weight: 900;
    }

    // Show more/less button

    .tags - toggle {
        margin - top: 10 px;

        @include media - query($medium - up) {
            margin - top: 20 px;
        }
    }

    $label - bottom - margin: 12 px;

    .variant - input - wrap {
        border: 0;
        padding: 0;
        margin: 0 0($gutter / 1.5);
        position: relative;

        input {
            @include visuallyHidden;
        }

        label {
            @include smallFontSize;
            position: relative;
            display: inline - block;
            line - height: 1;
            font - weight: normal;
            padding: 15 px 18 px;
            margin: 0 8 px $label - bottom - margin 0;
            font - style: normal;
            text - transform: none;
            border - radius: 100 px;
            color: $colorTextBody;
            background - color: transparent;

            &
            .color - swatch {
                height: $type_base_size + 26 px;
                width: $type_base_size + 26 px;
            }

            &
            .disabled {
                color: $disabledBorder;
                box - shadow: none;
            }

            &
            .disabled.color - swatch {
                box - shadow: 0 0 0 $borderWidth $disabledBorder;
            }

            &
            .disabled: after {
                position: absolute;
                content: "";
                left: 50 % ;
                top: 0;
                bottom: 0;
                border - left: $borderWidth solid;
                border - color: $disabledBorder;
                transform: rotate(45 deg);
            }
        }

        // selected style
        input[type = 'radio']: checked + label {
            box - shadow: 0 0 0 $borderWidth $colorTextBody;

            // Remove thin background line bleed fix
            &
            : after {
                content: none;
            }
        }
    }

    .variant - input {
        display: inline - block;

        // Firefox bug fix
        select & {
            display: block;
        }
    }

    .variant - wrapper {
        margin - bottom: -$label - bottom - margin;

        .no - js & {
            display: none;
        }
    }

    .variant - wrapper--dropdown {
        display: inline - block;
        max - width: 100 % ;
        margin - right: $gutter / 2;
    }

    .variant__label {
        display: block;
        margin - bottom: 15 px;
        cursor: default;
    }

    // Extra left/right padding when one-per row

    @include media - query($small) {
        .grid - product--padded.grid - product__content {
            padding - left: 10 px;
            padding - right: 10 px;

            @if($product_image_scatter) {
                padding - left: 0;
                padding - right: 0;
            }
        }
    }

    .grid - product__content {
        position: relative;
        margin - bottom: $gutter / 2;
        text - align: center;

        @include media - query($medium - up) {
            margin - bottom: $gutter;

            .grid - product__hover - details & {
                margin - bottom: 0;
            }
        }
    }

    .grid - product__link {
        display: block;
        overflow: hidden;
    }

    .grid - product__image {
        display: block;
        margin: 0 auto;
        width: 100 % ;

        .grid - product__link--disabled & ,
        .grid - product__link--disabled: hover & ,
        .grid - product__link--disabled: focus & {
            opacity: 0.5;
        }
    }

    // Product title/price

    .grid - product__meta {
        position: relative;
        padding: 10 px 0;
        line - height: $type_base_line_height - 0.1;

        .overflow - scroller & {
            padding - bottom: 0;
        }

        @include media - query($small) {
            .small--grid--flush & {
                padding: 10 px;
            }
        }
    }

    @include media - query($medium - up) {
        @media(any - hover: hover) {
            .grid - product__colors,
                .grid - product__meta,
                .grid - product__tag {
                    .grid - product__hover - details & {
                        opacity: 0;
                        transform: translateY(7 px);
                        transition: all 0.15 s cubic - bezier(0.23, 0.55, 0.49, 1.01);
                    }

                    .grid - product__hover - details: hover & {
                        transform: translateY(0 px);
                        opacity: 1;
                    }
                }
        }
    }

    .grid - product__title {
        @include largeFontSize;
        @if($type_product_capitalize) {
            text - transform: uppercase;
        }
    }

    .grid - product__vendor {
        @include smallFontSize;
        margin - top: 3 px;
    }

    .grid - product__price {
        @include smallFontSize;
        margin - top: 3 px;
    }

    .grid - product__price--original {
        margin - right: 5 px;
    }

    // Product sale and sold out tag

    .grid - product__tag {
        @include smallFontSize;
        position: absolute;
        top: 0;
        right: 0;
        line - height: 1;
        padding: 6 px 6 px 6 px 8 px;
        background - color: $colorBtnPrimary;
        color: $colorBtnPrimaryText;
        z - index: 1;
        transition: opacity 0.4 s ease;

        @include media - query($medium - up) {
            padding: 7 px 9 px 7 px 11 px;
        }
    }

    // See all (mobile overflow)

    .grid - product__see - all {
        display: inline - block;
        padding: $gutter / 2;
        text - align: center;
        border: $borderWidth solid $colorBorder;
        margin - top: -60 px; // approx of what title+price is
    }

    // Unload

    .grid - product { &
        .aos - animate.unload {
            opacity: 0;
            transition - duration: 0.3 s;
            animation: grid - product__loading 1.5 s ease infinite 1.5 s;
        }
    }

    .grid - product__colors {
        display: -ms - flexbox;
        display: flex; -
        ms - flex - wrap: wrap;
        flex - wrap: wrap; -
        ms - flex - align: center;
        align - items: center; -
        ms - flex - pack: center;
        justify - content: center;
        line - height: $colorSwatchCollectionSize;

        @include media - query($medium - up) {
            line - height: $colorSwatchCollectionSizeLarge;
        }

        .overflow - scroller & {
            padding - top: 10 px;
        }

        .grid - product__hover - details & {
            margin - bottom: 5 px;
        }
    }

    // Product image slider

    .product - slider { &
        : not(.slick - initialized) {
            .product - slide {
                display: none;
            }

            .product - slide: first - child {
                display: block;
            }
        }

        .slick - slide {
            opacity: 0!important;
            transition: opacity 0 s ease 0.3 s!important;
        }

        .slick - active {
            opacity: 1!important;
            transition: opacity 0.3 s ease 0 s!important;
        }

        .slick - track {
            cursor: pointer;
        }
    }

    .product - slider.slick - initialized: after {
        content: '';
        position: absolute;
        background - color: $colorTextBody;
        bottom: -2 px;
        height: 2 px;
        width: 0 % ;
        left: 0;
        z - index: 1;
        animation: progressBar 1350 ms infinite linear; // duration updated inline
    }

    // Prevent Slick slider from having 0 opacity after destroyed

    .product - slide {
        opacity: 1!important;
    }

    // Remove lazyload + aos fade animation to prevent flash on init/destroy

    .product - slider--init {
        img,
        .grid__image - ratio {
            opacity: 1!important;
            animation: none!important;
        }
    }

    .product - slide.placeholder - svg {
        opacity: 1;
    }

    @if($product_image_scatter) {
        $productImageOffset: 20 px;
        $productImageOffsetLarge: 30 px;

        @include media - query($medium - up) {
            .grid--scattered - large - 2 {
                .grid - product: nth - child(2 n + 2) {
                    padding - top: $productImageOffsetLarge;
                }
            }

            .grid--scattered - large - 3 {
                .grid - product: nth - child(3 n + 2) {
                    padding - top: $productImageOffsetLarge;
                }
            }

            .grid--scattered - large - 4 {
                .grid - product: nth - child(2 n + 2) {
                    padding - top: $productImageOffsetLarge;
                }
            }
        }

        @include media - query($small) {
            .grid--scattered - small - 1 {
                .grid - product: nth - child(2 n) {
                    padding - left: $grid - gutter - small * 2;
                    padding - right: 10 px;
                }

                .grid - product: nth - child(2 n + 1) {
                    padding - left: $grid - gutter - small + 10 px;
                    padding - right: $grid - gutter - small * 2;
                }
            }

            .grid--scattered - small - 2 {
                .grid - product: nth - child(2 n + 2) {
                    padding - top: $productImageOffset;
                }
            }
        }

        // Product page thumbnails
        @include media - query($medium - up) {
            .product__thumbs--beside {
                -ms - flex: 0 0 100 px;
                flex: 0 0 100 px;
                max - width: 100 px;
                margin - top: 20 px;
                margin - right: 0;
                transform: translateX(40 px);

                .product__thumb - item {
                    margin - right: 20 px;
                }

                .product__thumb - item: nth - child(2 n + 2) {
                    margin - right: 0;
                    margin - left: 20 px;
                }
            }
        }
    }

    .color - swatch {
        position: relative;
        display: block;
        text - indent: -9999 px;
        overflow: visible;
        margin: 0 1 px 4 px;
        background - position: center;
        background - size: cover;
        background - repeat: no - repeat;
        width: 2.5e m;
        transition: box - shadow 0.2 s ease;
        border - radius: 100 px;

        &
        : before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            z - index: 2;
            border: 3 px solid $colorBody;
            border - radius: 100 px;
            box - shadow: 0 0 1 px 1 px rgba(0, 0, 0, 0.15) inset;
        }

        // Cover thin background line bleed
            &
            : not(.disabled): after {
                content: '';
                position: absolute;
                top: -1 px;
                left: -1 px;
                right: -1 px;
                bottom: -1 px;
                z - index: 3;
                border: 2 px solid $colorBody;
                border - radius: 100 px;
            }
    }

    .index - section--alt {
        .color - swatch: before,
            .color - swatch: not(.disabled): after {
                border - color: $colorAlt;
            }
    }

    // Product grid direct variant links

    .color - swatch--small {
        width: $colorSwatchCollectionSize;
        height: $colorSwatchCollectionSize;

        @include media - query($medium - up) {
            width: $colorSwatchCollectionSizeLarge;
            height: $colorSwatchCollectionSizeLarge;
        }

        &
        : after {
            content: none;
        }
    }

    .featured - collection {
        overflow - x: hidden;
    }

    @if($animate_images) {
        [data - aos = "overflow__animation"] {
            transform: translateX(200 px);
            opacity: 0;
            transition: all 0.4 s cubic - bezier(0.04, 0, 0.2, 1) 0.3 s;

            @include media - query($medium - up) {
                transition - duration: 0.6 s;
            }

            .no - js & ,
            &
            .aos - animate {
                opacity: 1;
                transform: translateX(0);
                transition - delay: unset;
            }
        }
    }

    .overflow - scroll - wrap {
        position: relative;
        overflow: hidden;
    }

    .overflow - scroller {
        position: relative;
        overflow: hidden;
        overflow - x: scroll; -
        webkit - overflow - scrolling: touch;
        padding - bottom: $gutter / 2;

        .grid {
            white - space: nowrap;
            display: -ms - flexbox;
            display: flex; &
            : after { // end spacing fix
                width: 1 px;
                height: 1 px;
                padding - left: 1 px;
            }
        }

        // Same sizing as .grid-product--small
        .grid__item {
            display: inline - block;
            float: none;
            white - space: normal;
            width: $scrollingProductSmallMobile; -
            ms - flex: 0 0 $scrollingProductSmallMobile;
            flex: 0 0 $scrollingProductSmallMobile;
            overflow: hidden; // firefox + slick slider fix

            &
            : first - child {
                margin - left: $page - width - gutter - small;
            }

                &
                : last - child {
                    margin - right: $page - width - gutter - small;
                }

                @include media - query($medium - up) {
                width: $scrollingProductSmallDesktop; -
                ms - flex: 0 0 $scrollingProductSmallDesktop;
                flex: 0 0 $scrollingProductSmallDesktop;

                &
                : first - child {
                    margin - left: 80 px;
                }

                    &
                    : last - child {
                        margin - right: 80 px;
                    }
            }
        }

        .grid - product--medium {
            width: $scrollingProductMediumMobile; -
            ms - flex: 0 0 $scrollingProductMediumMobile;
            flex: 0 0 $scrollingProductMediumMobile;

            @include media - query($medium - up) {
                width: $scrollingProductMediumDesktop; -
                ms - flex: 0 0 $scrollingProductMediumDesktop;
                flex: 0 0 $scrollingProductMediumDesktop;
            }
        }

        .grid - product--large {
            width: $scrollingProductLargeMobile; -
            ms - flex: 0 0 $scrollingProductLargeMobile;
            flex: 0 0 $scrollingProductLargeMobile;

            @include media - query($medium - up) {
                width: $scrollingProductLargeDesktop; -
                ms - flex: 0 0 $scrollingProductLargeDesktop;
                flex: 0 0 $scrollingProductLargeDesktop;
            }
        }

        .grid - product__content {
            margin - bottom: 0;
        }
    }

    // Scrolling arrows

    $scrollerArrowSize: 60 px;

    .overflow - scroller__arrow {
        position: absolute;
        top: 50 % ;
        margin - top: -80 px;
        width: $scrollerArrowSize;
        height: $scrollerArrowSize;
        z - index: 3;
        transition: transform 0.1 s;
        padding: 10 px;
        border - radius: 100 % ;
        min - width: 0;

        .overflow - scroll - wrap: hover & {
            transition - duration: 0.25 s;
        }

            @if($buttonStyle == 'shadow') {
            .overflow - scroll - wrap &: active {
                transform: translate(4 px, 4 px) !important;
                transition: none;
            }
        }
    }

    .overflow - scroller__arrow--left {
        left: 10 px;
        transform: translateX(-80 px);

        .icon {
            position: relative;
            top: -1 px;
            right: 1 px;
        }

        .overflow - scroll - wrap: hover &: not([class *= "--disable-left"]) {
            transform: translateX(0);
        }
    }

    .overflow - scroller__arrow--right {
        right: 10 px;
        transform: translateX(80 px);

        .icon {
            position: relative;
            top: -1 px;
            left: 1 px;
        }

        .overflow - scroll - wrap: hover &: not([class *= "--disable-right"]) {
            transform: translateX(0);
        }
    }

    // Loading new products indicator, added to section container

    .collection - loading[data - ajax - loader] {
        position: relative;

        &
        : after {
            content: '';
            display: block;
            width: 24 px;
            height: 24 px;
            position: absolute;
            right: 10 px;
            top: 0;
            border - radius: 50 % ;
            border: 3 px solid $colorTextBody;
            border - top - color: transparent;
            opacity: 0.2;
            animation: spin 1 s infinite linear;
        }
    }

    // Overscroll indicator on iOS

    $loaderSize: 50 px;

    $loaderIconSize: 100 px;

    // defined in SVG

    .overscroll - loader {
        display: none;
        position: fixed;
        z - index: 0;
        width: $loaderSize;
        height: $loaderSize;
        top: 20 px;
        left: 50 % ;
        margin - left: -($loaderSize / 2);

        .screen - layer - closing & ,
        .screen - layer - open & {
            display: block;
        }

        .icon {
            position: relative;
            display: block;
            height: $loaderIconSize;
            width: $loaderIconSize;
            margin - left: -($loaderSize / 2);
            margin - top: -($loaderSize / 2);
            fill: none;
            transform: scale(0.5);
        }

        path {
            stroke: #fff;
            stroke - width: 4;
        }

        .icon - loader__path {
            stroke - linecap: round;
            stroke - dasharray: calc(40 * 3.142 * 1.85);
            stroke - dashoffset: 200; // 0 is full, adjusted in JS
        }

        .icon - loader__close {
            transform: translate(18 px, 22 px);
        }

    }

    /*================ Theme collection grid item ================*/

    .skrim - grid {
        display: -ms - flexbox;
        display: flex; -
        ms - flex - pack: center;
        justify - content: center; -
        ms - flex - line - pack: center;
        align - content: center; -
        ms - flex - wrap: wrap;
        flex - wrap: wrap;
        margin: 0 - 20 px;

        @include media - query($medium - up) {
            margin - bottom: -$grid - gutter;
        }
    }

    .skrim__item {
        position: relative;
        overflow: hidden;
        width: 40 % ;
        width: calc(50 % -20 px);
        margin: 0(20 px / 2) 20 px;

        @include media - query($medium - up) {
            margin: 0($grid - gutter / 2) $grid - gutter;
            width: 20 % ;
            width: calc(25 % -#{ $grid - gutter });
        }

        &
        : after {
            content: '';
            display: block;
            padding - bottom: 100 % ;
        }
    }

    .skrim__link {
        display: block;
        position: absolute;
        overflow: hidden;
        height: 100 % ;
        width: 100 % ;
        border - radius: $button - radius * 0.71;
        will - change: transform;

        @include media - query($medium - up) {
            border - radius: $button - radius;
        }

        @if($animate_images) { &
            : hover, &
            : focus {
                .skrim__overlay {
                    transform: scale(1.03);
                    transition - duration: 0.8 s;
                }
                .skrim__overlay: before {
                    opacity: 0.3;
                    transition - duration: 0.5 s;
                }
            }
        }
    }

    .skrim__overlay {
        position: relative;
        display: block;
        overflow: hidden;
        height: 100 % ;
        width: 100 % ;
        background - size: cover;
        background - repeat: no - repeat;
        background - position: center;
        transition: transform 0.5 s ease;

        &
        : after {
            @include overlay();
            @include heroScrim();
            transition: all 0.5 s ease;
        }

            &
            : before {
                @include overlay();
                background: #000;

    opacity: 0.15;

    transition: opacity 0.2s ease;

  }

}



.skrim__title {

  @include headerFontStack;

  position: absolute;

  top: 0;

  bottom: 0;

  left: 0;

  right: 0;

  margin: 0 ($gutter/1.6/2) 0;

  color: $colorHeroText;

  transition: bottom 0.5s ease;

  display: -ms-flexbox;

  display: flex;

  text-align: center;

  -ms-flex-align: center;

      align-items: center;

  -ms-flex-pack: center;

      justify-content: center;



  @include media-query($medium-up) {

    margin: 0 ($gutter/1.6);

  }



  &:before {

    @include heroRadial;

    background: radial-gradient(rgba(0,0,0,$colorImageOverlayTextShadow) 0%, rgba(0,0,0,0) 40%);

    margin: 35% -10%;

  }

}



.skrim__title--right {

  left: auto;

  right: 0;

}



.skrim__underline-me {

  position: relative;

  display: inline-block;

}



@if ($animate_underlines) {

  .skrim__underline-me:after {

    content: '';

    position: absolute;

    bottom: -4px;

    left: 0;

    width: 0%;

    border-bottom: $borderWidth solid $colorHeroText;

    transition: $animate_underlines_duration;

  }



  .skrim__link:hover {

    .skrim__underline-me:after {

      width: 100%;

    }



    .skrim__title {

      bottom: 10px;

    }

  }

}



.custom-content {

  display: -ms-flexbox;

  display: flex;

  -ms-flex-align: stretch;

      align-items: stretch;

  -ms-flex-wrap: wrap;

      flex-wrap: wrap;

  width: auto;

  margin-bottom: -$grid-gutter;

  margin-left: -$grid-gutter;



  @include media-query($small) {

    margin-bottom: -$grid-gutter-small;

    margin-left: -$grid-gutter-small;

  }

}



.custom__item {

  -ms-flex: 0 0 auto;

      flex: 0 0 auto;

  margin-bottom: $grid-gutter;

  padding-left: $grid-gutter;

  max-width: 100%;



  @include media-query($small) {

    -ms-flex: 0 0 auto;

        flex: 0 0 auto;

    padding-left: $grid-gutter-small;

    margin-bottom: $grid-gutter-small;



    &.small--one-half {

      -ms-flex: 1 0 50%;

          flex: 1 0 50%;

      max-width: 400px;

      margin-left: auto;

      margin-right: auto;

    }

  }



  img {

    display: block;

  }

}



.custom__item-inner {

  position: relative;

  display: inline-block;

  text-align: left;

  max-width: 100%;

  width: 100%;

}



.custom__item-inner--video,

.custom__item-inner--html {

  display: block;

}



.custom__item-inner--image {

  width: 100%;

}



.custom__item-inner--html img {

  display: block;

  margin: 0 auto;

}



.custom__item-inner--placeholder-image {

  width: 100%;

}



/*= === === === === === Flex item alignment === === === === === = * /

                .align--top - middle {
                    text - align: center;
                }

                .align--top - right {
                    text - align: right;
                }

                .align--middle - left {
                    -ms - flex - item - align: center; -
                    ms - grid - row - align: center;
                    align - self: center;
                }

                .align--center {
                    -ms - flex - item - align: center; -
                    ms - grid - row - align: center;
                    align - self: center;
                    text - align: center;
                }

                .align--middle - right {
                    -ms - flex - item - align: center; -
                    ms - grid - row - align: center;
                    align - self: center;
                    text - align: right;
                }

                .align--bottom - left {
                    -ms - flex - item - align: end;
                    align - self: flex - end;
                }

                .align--bottom - middle {
                    -ms - flex - item - align: end;
                    align - self: flex - end;
                    text - align: center;
                }

                .align--bottom - right {
                    -ms - flex - item - align: end;
                    align - self: flex - end;
                    text - align: right;
                }

                .article__grid - image {
                    display: block;
                    text - align: center;
                    margin - bottom: $gutter / 2;

                    img {
                        display: block;
                    }
                }

                .article__date {
                    @include smallFontSize;
                }

                .article__author {
                    @include smallFontSize;
                    font - style: italic;
                }

                .article__grid - meta {
                    margin - bottom: $gutter;
                }

                .logo - bar {
                    text - align: center;
                    margin - bottom: -$gutter;
                    display: -ms - flexbox;
                    display: flex; -
                    ms - flex - align: center;
                    align - items: center; -
                    ms - flex - pack: center;
                    justify - content: center; -
                    ms - flex - wrap: wrap;
                    flex - wrap: wrap;
                }

                .logo - bar__item {
                    -ms - flex: 0 1 110 px;
                    flex: 0 1 110 px;
                    vertical - align: middle;
                    margin: 0($gutter / 2)($gutter / 1.5);
                    @include media - query($medium - up) {
                        -ms - flex: 0 1 160 px;
                        flex: 0 1 160 px;
                        margin: 0($gutter / 1.5) $gutter;
                    }
                }

                .logo - bar__image {
                    display: block;
                    margin: 0 auto;
                }

                .logo - bar__link {
                    display: block;
                }

                @if($animate_images) {
                    [data - aos = "logo__animation"].logo - bar__item {
                        opacity: 0;
                    }

                    [data - aos = "logo__animation"].aos - animate.logo - bar__item {
                            animation: fade - in 0.5 s ease 0 s forwards;
                        }
                        [data - aos = "logo__animation"].aos - animate.logo - bar__item: nth - child(2) {
                            animation - delay: 0.2 s;
                        }
                        [data - aos = "logo__animation"].aos - animate.logo - bar__item: nth - child(3) {
                            animation - delay: 0.4 s;
                        }
                        [data - aos = "logo__animation"].aos - animate.logo - bar__item: nth - child(4) {
                            animation - delay: 0.6 s;
                        }
                        [data - aos = "logo__animation"].aos - animate.logo - bar__item: nth - child(5) {
                            animation - delay: 0.8 s;
                        }
                        [data - aos = "logo__animation"].aos - animate.logo - bar__item: nth - child(6) {
                            animation - delay: 1.0 s;
                        }
                        [data - aos = "logo__animation"].aos - animate.logo - bar__item: nth - child(7) {
                            animation - delay: 1.2 s
                        }
                        [data - aos = "logo__animation"].aos - animate.logo - bar__item: nth - child(8) {
                            animation - delay: 1.4 s;
                        }
                        [data - aos = "logo__animation"].aos - animate.logo - bar__item: nth - child(9) {
                            animation - delay: 1.6 s;
                        }
                }

                .background - media - text {
                    position: relative;
                    width: 100 % ;
                    overflow: hidden;
                    background: $colorLargeImageBg;
                }

                .background - media - text__image {
                    position: absolute;
                    top: 0;
                    left: 0;
                    bottom: 0;
                    width: 100 % ;
                    background - size: cover;
                    background - position: 50 % 50 % ;
                    background - repeat: no - repeat;
                    z - index: 0;
                }

                .background - media - text__inner {
                    position: absolute;
                    z - index: 1;
                    width: 100 % ;
                }

                .background - media - text__aligner {
                    margin: $gutter;
                }

                .background - media - text__text {
                    text - align: center;
                    background: $colorBody;
                    padding: $gutter;
                    width: 430 px;
                }

                .background - media - text__text.btn {
                    margin - top: $gutter / 2;
                }

                @include media - query($medium - up) {
                    .background - media - text--right.background - media - text__text {
                        float: right;
                    }
                }

                // Section height

                @include media - query($small) {
                    .background - media - text {
                            position: relative;
                        }
                        .background - media - text__inner {
                            position: relative;
                        }
                        .background - media - text__image {
                            position: relative;
                            height: 240 px;
                        }
                        .background - media - text__aligner {
                            margin: -20 px 10 px 10 px;
                        }
                        .background - media - text__text {
                            padding: $gutter / 2;
                            width: auto;
                        }
                        .background - media - text.loading { &
                            : before, &: after {
                                top: 117 px;
                            }
                        }
                }

                @if($animate_images) {
                    [data - aos = "background-media-text__animation"].background - media - text__image.lazyloaded, [data - aos = "background-media-text__animation"].background - media - text__image svg {
                        opacity: 0.2;
                        transform: scale(1.06, 1.06);

                        .no - js & {
                            animation: none;
                            opacity: 1;
                        }
                    }

                    [data - aos = "background-media-text__animation"].aos - animate.background - media - text__image.lazyloaded, [data - aos = "background-media-text__animation"].aos - animate.background - media - text__image svg {
                        animation: #{ $animate_images_style } - bg 1.5 s cubic - bezier(0.26, 0.54, 0.32, 1) 0 s forwards;
                        transition: none; // fixes safari animation conflict
                    }
                }

                .testimonials - slider__text {
                    position: relative;
                    padding: 20 px 0 0;
                    margin - bottom: $gutter * 1.5;

                    .slick - slider & {
                        margin - right: $gutter / 2;
                        margin - bottom: 0;
                    }

                    .text - center.slick - slider & {
                        margin - left: $gutter / 2;
                        margin - right: $gutter / 2;
                    }

                    p {
                        font - size: 1.2e m;
                        margin - bottom: $gutter / 4;

                        +
                        cite {
                            margin - top: 0;
                        }
                    }

                    .quote - icon {
                        position: absolute;
                        top: 0;
                        left: 0;
                        opacity: 0.1;

                        .text - center & {
                            left: 50 % ;
                            transform: translateX(-50 % );
                        }

                        svg {
                            width: 50 px;
                            height: 50 px;
                        }
                    }
                }

                // Section image

                $testimonialImageSize: 80 px;

                .testimonail - image {
                    max - width: $testimonialImageSize;
                    background - color: $colorBody;

                    .text - center & {
                        margin - left: auto;
                        margin - right: auto;
                    }
                }

                .testimonail - image--round {
                    width: $testimonialImageSize;
                    height: $testimonialImageSize;
                    max - width: none;
                    border - radius: $testimonialImageSize;

                    // fix animation bug in Safari
                    img {
                        overflow: hidden;
                        border - radius: $testimonialImageSize;
                    }
                }

                // Slick overrides

                .testimonials - slider.slick - initialized {
                    cursor: grab;
                }

                @include media - query($medium - up) {
                    .testimonials - slider.slick - initialized[data - count = "1"],
                        .testimonials - slider.slick - initialized[data - count = "2"],
                        .testimonials - slider.slick - initialized[data - count = "3"] {
                            cursor: default;

                            .slick - track {
                                cursor: default;
                            }
                        }
                }

                // Slick dot positioning and color

                .testimonials - wrapper.slick - dots {
                    position: relative;
                    bottom: 0;
                    margin - top: $gutter / 2;

                    li button::before {
                        background - color: $colorTextBody;
                    }
                }

                // Slick selected outline overrides

                .testimonials - wrapper.slick - slide[tabindex = "0"] {
                    outline: none;
                }

                .announcement {
                    position: relative;
                    overflow: hidden;
                    z - index: $zindexAnnouncement;
                }

                .announcement__wrapper {
                    background - color: $colorAnnouncement;
                    color: $colorAnnouncementText;
                }

                // One-off font styling

                .announcement__text {
                    font - size: 12 px;
                    letter - spacing: 0.2e m;
                    text - transform: uppercase;
                    display: block;
                    padding: 7 px 20 px 6 px;
                    transition: opacity 0.75 s ease;
                    text - align: center;
                }

                .announcement__link {
                    display: block;
                    color: $colorAnnouncementText;

                    &
                    : hover {
                        color: $colorAnnouncementText;
                    }
                }

                // Marquee animation speed overwritten by settings

                $marqueeAnimationSpeed: 10 s;

                $marqueeAnimationSpeedMobile: 6.6 s;

                .marquee__container {
                    display: -ms - flexbox;
                    display: flex; -
                    ms - flex - align: center;
                    align - items: center;
                    overflow: hidden;
                    transform: translateZ(0);
                }

                .marquee__text {
                    font - size: 25 px;
                    margin: 0.15e m 0;
                    white - space: nowrap;
                    width: auto;
                    perspective: 900;
                    animation: marquee - left $marqueeAnimationSpeedMobile forwards linear infinite;

                    @include media - query($medium - up) {
                        animation - duration: $marqueeAnimationSpeed;

                        span {
                            padding: 0 15 px;
                        }
                    }

                    span {
                        padding: 0 20 px;
                    }
                }

                .marquee__text--right {
                    animation - name: marquee - right;
                }

                .shopify - challenge__container {
                    padding: 30 px 22 px;
                    @include media - query($medium - up) {
                        padding: 120 px 0;
                    }
                }

                .newsletter - section {
                    background - color: $colorNewsletter;
                    color: $colorNewsletterText;
                }

                .newsletter {
                    margin: 0 auto;
                    max - width: 520 px;
                }

                // Space for title when inside a mobile popup

                @include media - query($small) {
                    .modal.newsletter.newsletter__title {
                        padding - right: 50 px;
                    }
                }

                .newsletter - section.errors {
                    margin - left: auto;
                    margin - right: auto;
                    max - width: 520 px;
                }

                .newsletter - form - group {
                    position: relative;
                    max - width: 400 px;
                    margin: 0 auto;

                    @include media - query($small) {
                        max - width: 85 % ;

                        .modal--newsletter & {
                            max - width: none;
                        }
                    }
                }

                .newsletter - form - group__input {
                    margin: 0 auto;
                    width: 100 % ;
                    border - bottom - color: currentColor;
                    border - radius: 0;
                    padding - right: 45 px;

                    &
                    : focus {
                        border - bottom - color: currentColor;
                    }
                }

                .newsletter - form - group__input: -ms - input - placeholder {
                    color: currentColor;
                    opacity: 1;
                }

                .newsletter - form - group__input::placeholder {
                    color: currentColor;
                    opacity: 1;
                }

                .newsletter - form - group__submit {
                    position: absolute;
                    top: 0;
                    right: 0;
                    bottom: 0;
                    color: currentColor;
                    padding - right: 0;

                    .icon {
                        width: 26 px;
                        height: 24 px;
                    }
                }

                .map - section {
                    position: relative;
                    height: 650 px;
                    width: 100 % ;
                    overflow: hidden;

                    @include media - query($medium - up) {
                        height: 500 px;
                    }

                    .page - width {
                        height: 100 % ;
                    }
                }

                .map - section--load - error {
                    height: auto;
                }

                .map - onboarding {
                    position: absolute;
                    top: 0;
                    left: 0;
                    bottom: 0;
                    width: 100 % ;
                    background - size: cover;
                    background - position: 50 % 50 % ;
                    background - repeat: no - repeat;
                    z - index: 0;
                }

                .map - section__overlay - wrapper {
                    position: relative;
                    height: 100 % ;
                }

                .map - section__overlay {
                    position: relative;
                    display: inline - block;
                    background - color: $colorBody;
                    padding: $grid - gutter - small;
                    margin: $grid - gutter - small;
                    z - index: 3;

                    @include media - query($medium - up) {
                        position: absolute;
                        left: $gutter;
                        margin: $gutter;
                        padding: $gutter;
                        top: 50 % ;
                        transform: translateY(-50 % );
                        margin - top: 0;
                        max - width: 430 px;
                    }

                    .map - section--load - error & {
                        position: static;
                        transform: translateY(0);
                    }
                }

                .map - section__link {
                    display: block;
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100 % ;
                    height: 100 % ;
                    z - index: 2;
                }

                // Optically center map in visible area with

                // extended height/widths and negative margins

                .map - section__container {
                    position: absolute!important; // api will inline relative sometimes
                    top: 0;
                    left: 0;
                    width: 100 % ;
                    height: 150 % ;
                    margin - bottom: -50 % ;

                    @include media - query($medium - up) {
                        width: 130 % ;
                        height: 100 % ;
                        margin: 0 - 30 % 0 0;
                    }
                }

                // Animations

                @if($animate_images) {
                    [data - aos = "map-section__animation"].map - section__container {
                        animation: fade - out 0.5 s cubic - bezier(0.26, 0.54, 0.32, 1) 0 s forwards;
                        will - change: opacity,
                        transform;
                        opacity: 0;
                    }

                    [data - aos = "map-section__animation"].aos - animate.map - section__container {
                        animation: $animate_images_style 2.5 s cubic - bezier(0.26, 0.54, 0.32, 1) 0 s forwards;
                    }
                }

                // Prevent major reflow

                .instagram - section__grid {
                    min - height: 300 px; // remove with JS after images load
                }

                .instagram - section__wrapper {
                        background: #fff;
                        color: #000;

  border: 1px solid rgba($colorTextBody, 0.1);



  a {

    display: block;

  }



  .placeholder-svg {

    padding: 0;

  }

}



.instagram-section__meta {

  padding: 9px;

  font-size: 12px;

  font-weight: normal;

  font-family: sans-serif;

  line-height: 1.4;



  @include media-query($medium-up) {

    font-size: 13px;

    padding: 14px;

  }

}



.instagram-section__caption {

  p {

    display: inline;

  }



  .instagram-section__likes + & {

    margin-top: 10px;

  }

}



.instagram-section__likes {

  display: -ms-flexbox;

  display: flex;

  -ms-flex-align: center;

      align-items: center;



  &:before {

    content: '';

    display: inline-block;

    height: 24px;

    width: 24px;

    margin-right: 10px;

    background-repeat: no-repeat;

    background-size: 24px;

    background-image: url(data:image/gif;base64,R0lGODlhJgAmAPcAAO9GUv/8/P/+/v/9/e9HUfBIU//7++9GUfSEjPN5gveepPFeavecovBNWP719u9IU/329vnAxPm/xPBIUvvU1vrU2O9UX/WCi/BGUfzv8fWPlf3y8vBMWfqzuPWOlPmprfmvtfqwtvivtO9LVfNsdfFcZe9IUv309PJpcfFpcfWKk/JqdPvEyPJga/Jia/FOWPeepfVwefRye/3o6f/z9f3z9f719fN4gPNjbfzo6fvX2fJlbvFWYPrR1PaLlPJwevFRXPz0+PzU2P+6wO9MWe5GUfyur/eqsPJZYvR5gPmxtvqvtfvU1/3k5PaWnfX09fJvePimrPJsdvWSm/FSXfJqcvvQ0vmorv3u7viorfaRmPWVmvvd3/u4u//9/vrs8fJmb/m+wf3q7PejqPm8wPnFyPnCx/BKV/BLV+9PWPBRXPBQWe9PWe9LVvFcZvaKk+5KVvBdZvvU2PWDivFaZP3y8/R6g/m+w+9RXP/Q0/bv7/ve4PacovJrdfFeafFaZfFWYfro7vWEjf7s7Pvj5PBLVPFha/uvsu5HUfz2+fn5+fWMk/R0ff3f4vaNlfqjqf7u7/JXYv76+vBVYPrb3v/6+vebofNmcPq8wPnHyvifpfrAxPzh4/BGU//7/P3v8f3t7v3j5f349/R7gvrFyf319fvO0vNrdfzl5/i0ufzW2fJZZPvKzvBXYvaYoP3l6fBQWvzd3/aKkvR/hvemrfakqvBPWvFfaveaof7j5f7x8fBZZPaRl/WOlvFncfN0fPaTm//5+v739/vT1fWFjPmtsv3p6fN3gfBPW/JncPrIy/q6v+9RXfBHUvBHU+9HUv///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH/C1hNUCBEYXRhWE1QPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS4wLWMwNjAgNjEuMTM0Nzc3LCAyMDEwLzAyLzEyLTE3OjMyOjAwICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M1IE1hY2ludG9zaCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo3MzI1OThFNUFCQ0QxMUU5QUY3NDhFMDFCODlFN0ZDMyIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo3MzI1OThFNkFCQ0QxMUU5QUY3NDhFMDFCODlFN0ZDMyI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjczMjU5OEUzQUJDRDExRTlBRjc0OEUwMUI4OUU3RkMzIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjczMjU5OEU0QUJDRDExRTlBRjc0OEUwMUI4OUU3RkMzIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+Af/+/fz7+vn49/b19PPy8fDv7u3s6+rp6Ofm5eTj4uHg397d3Nva2djX1tXU09LR0M/OzczLysnIx8bFxMPCwcC/vr28u7q5uLe2tbSzsrGwr66trKuqqainpqWko6KhoJ+enZybmpmYl5aVlJOSkZCPjo2Mi4qJiIeGhYSDgoGAf359fHt6eXh3dnV0c3JxcG9ubWxramloZ2ZlZGNiYWBfXl1cW1pZWFdWVVRTUlFQT05NTEtKSUhHRkVEQ0JBQD8+PTw7Ojk4NzY1NDMyMTAvLi0sKyopKCcmJSQjIiEgHx4dHBsaGRgXFhUUExIREA8ODQwLCgkIBwYFBAMCAQAAIfkEAAAAAAAsAAAAACYAJgAACP8AoQkcSLCgwYMIEypcyHCggBllskxZ1MuViDx6DDpgkoqBBhVaxkjgFCAhBBYefOFx1qxZIUBQGOgoKbBRrWN/0Dh7VsCWIQTLPh3cAAKFiWfOkiJF+uKGGU/QehAD8qxqs6Qtny1QkEMAQQhHkFgFUFUpy2cpSMlJMKHlTqVVATRjswXUwAERVj1zW7Wv250/Eowou3NvX8MNPiQSSOhUy2Z7syKFTPnBg8N7z1I2XGKYgAFXNi+FvLT02beQNZ817KNUhipLUcd+azU15qSFD1vYwwrOW81XC2fN3Xd1WcJVOzgZbdUsccksJafOjfXNJcO4d161GpswacpwU1//jcGhdOnH25OSJcsSq3ay01u6SJP772HJpjMjhVu8Ko4+cnVXXHDm1dbeZIedJQMMkR0nHHLQAaAdbf1VxYsQazxDVoMFPoiVYSDaZhUZNCSxF3uZBYdbfto9Rttmt6DixR1ErIbbY4bhmCB7xu2FwSOKQKMLAgekR1t70O23Ym3HSZGLQAJQkMxxtYkIImqy7SRXKxIMMFAAYcThl5a2oZdZi/w1w0wUDhQkyhJ0NLffmNHd5t4zyPAByUEnFOMGd9ohJ6df21GBixgJ1aDEAhPmiCSCz02iwCALBdEFGEX2hx9mhu1CCxYNVRIBCZ08eBVpkRXmjB8h1NGQQAYoeMMIAXXG15dcBOwwxBOvfmmFHQVklR5mRaywSTC9EjRABXO0gSN8kyHySyYGJGtQLLI0EBmqzRQwiik0WVtQE8Co4VdVZ1ygilfiHmSMJpEcBosjlLSr0BdGtEDAMzxY8oq9C9mAiSCzHBIIwAxJEgoXwiDssEIBAQA7);

  }

}



.instagram-image {

  display: block;

  height: 0;

  padding-bottom: 100%;

  background-size: cover;

  background-repeat: no-repeat;

}



.instagram-image--error {

  height: auto;

  padding: 10px;

  font-size: 13px;

  text-align: center;

  color: $errorRed;



  small {

    word-break: break-word;

    display: block;

    font-size: 10px;

  }

}



.instagram__product-title {

  @include smallFontSize;

  font-style: italic;

  text-align: center;

  padding: 5px;

}



/*= === === === === === App overrides === === === === === = * /

                        // Override Messenger channel bubble to have bottom positioning

                        // that does not interfere with our fixed menu bars

                            .messengermessageus--fixed.messengermessageus--fixed {
                            top: auto;
                            bottom: 100 px;
                        }

                        #ShopifyChat# ShopifyChat {
                            bottom: 100 px!important;
                            z - index: $zindexShopifyChatBubble!important;

                            .modal - open & ,
                            .screen - layer - open & {
                                display: none;
                            }
                        }

                        #tidio - chat iframe { bottom: 100 px!important }