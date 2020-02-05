<div class="grid__item medium-up--three-quarters medium-up--push-one-eighth aos-init aos-animate">
<div
  id="CollectionSection"
  data-section-id="{{ section.id }}"
  data-section-type="collection-template"
  data-product-sliders-mobile="{% if section.settings.per_row_mobile == '1' %}true{% else %}false{% endif %}">
  {% if section.settings.collection_image_enable and collection.image %}

  {% endif %}
  <div class="slide_step">
    <div id="first_step">
      {%- unless section.settings.collection_image_enable and collection.image -%}
      <header class="section-header text-left" data-aos style="margin-bottom: 0 !important">
          <h1 class="section-header__title appear-delay">
            {{ collection.title }}
          </h1><br>
          <div class="product-nav clearfix">
            <span style="float:left;"> {% if collation.previous_protect %}
              {{'&larr:Previous'|Link_to:collation.previous_product}}
              {% endif %}</span>
          </div>
          <h6>
            STEP ONE | SELECT YOUR PREFFERED OPTION
          </h6>
          {% if collection.description != blank and section.settings.description_position == 'top' %}
            {%- assign desc_length = collection.description | size -%}
            <div class="rte section-header__description{% if desc_length < 200 %} section-header__description--large{% endif %} appear-delay-1">
              {{ collection.description }}
            </div>
          {% endif %}
      </header>
    {%- else -%}
      {% if collection.description != blank and section.settings.description_position == 'top' %}
        <div class="section-header" data-aos>
          {%- assign desc_length = collection.description | size -%}
          <div class="rte section-header__description{% if desc_length < 200 %} section-header__description--large{% endif %} appear-delay-1">
            {{ collection.description }}
          </div>
        </div>
      {% endif %}
    {%- endunless -%}

    {% if section.settings.collection_tags_enable or section.settings.collection_sort_enable %}
      <div class="collection-filter">
        {% if section.settings.collection_tags_enable %}
          <div class="collection-filter__item">
            <label for="SortTags" class="hidden-label">{{ 'collections.filters.title_tags' | t }}</label>
            <select name="SortTags" id="SortTags">
              {% if current_tags %}
                {% if collection.handle %}
                  <option value="/collections/{{ collection.handle }}">{{ 'collections.filters.all_tags' | t }}</option>
                {% elsif collection.current_type %}
                  <option value="{{ collection.current_type | url_for_type }}">{{ 'collections.filters.all_tags' | t }}</option>
                {% elsif collection.current_vendor %}
                  <option value="{{ collection.current_vendor | url_for_vendor }}">{{ 'collections.filters.all_tags' | t }}</option>
                {% endif %}
              {% else %}
                {% if current_tags contains tag %}
                  <option value="">{{ 'collections.filters.all_tags' | t }}</option>
                {% else %}
                  <option value="">{{ 'collections.filters.title_tags' | t }}</option>
                {% endif %}
              {% endif %}
              {% for tag in collection.all_tags %}
                {% include 'filter-out-custom-tags' %}
                <option value="/collections/{% if collection.handle != blank %}{{ collection.handle }}{% else %}all{% endif %}/{{ tag | handleize }}"{% if current_tags contains tag %} selected="selected"{% endif %}>{{ tag }}</option>
              {% endfor %}
            </select>
          </div>
        {% endif %}

        {% if section.settings.collection_sort_enable %}
          <div class="collection-filter__item">
            {%- assign sort_by = collection.sort_by | default: collection.default_sort_by -%}
            {%- assign default_sorted = false -%}
            {% if sort_by == collection.default_sort_by %}
              {%- assign default_sorted = true -%}
            {% endif %}
            <label for="SortBy" class="hidden-label">{{ 'collections.sorting.title' | t }}</label>
            <select name="SortBy" id="SortBy">
              <option value="title-ascending"{% if sort_by == collection.default_sort_by %} selected="selected"{% endif %}>{{ 'collections.sorting.title' | t }}</option>
              {% for option in collection.sort_options %}
                <option value="{{ option.value }}" {% unless default_sorted %}{% if option.value == sort_by %}selected="selected"{% endif %}{% endunless %}>{{ option.name }}</option>
              {% endfor %}
            </select>
          </div>
        {% endif %}
      </div>
    {% endif %}
      <table>
      <tr>
        <td>
          <div id="CollectionAjaxResult">
            <div id="CollectionAjaxContent">
              <div
                class="slideshow-container grid grid--uniform grid--scattered-large-{{ section.settings.per_row_desktop }} grid--scattered-small-{{ per_row_mobile }}{% if section.settings.per_row_mobile == '2-flush' %} small--grid--flush{% endif %}"
                data-collection-container>
                {%- assign have_sidebar = false -%}
                {%- assign tag_count = 0 -%}
                {%- assign tag_limit = 7 -%}
                {%- assign have_extra_tags = false -%}
                {% if section.settings.collection_tags_style == 'inline' %}
                  {% if collection.all_tags.size > 0 %}
                    <div class="grid__item grid-sidebar {{ grid_item_width }}">
                      <ul class="tags tags--vertical">
                        <li{% unless current_tags %} class="tag--active"{% endunless %}>
                          {% if collection.handle %}
                            <a href="{{ routes.collections_url }}/{{ collection.handle }}">
                              {{ 'collections.general.all_of_collection' | t }}
                            </a>
                          {% elsif collection.current_type %}
                            <a href="{{ collection.current_type | url_for_type }}">
                              {{ 'collections.general.all_of_collection' | t }}
                            </a>
                          {% elsif collection.current_vendor %}
                            <a href="{{ collection.current_vendor | url_for_vendor }}">
                              {{ 'collections.general.all_of_collection' | t }}
                            </a>
                          {% endif %}
                        </li>

                        {% for tag in collection.all_tags %}
                          {%- assign tag_count = tag_count | plus: 1 -%}
                          {% include 'filter-out-custom-tags' %}
                          {%- assign tag_with_hyphens = tag | replace: ' ', '-' -%}
                          {% if tag_count == tag_limit %}
                            {%- assign have_extra_tags = true -%}
                            </ul>
                            <div id="TagList-{{ section.id }}" class="collapsible-content collapsible-content--all">
                              <ul class="tags tags--vertical collapsible-content__inner collapsible-content__inner--no-translate">
                          {% endif %}
                          {% if current_tags contains tag or current_tags contains tag_with_hyphens %}
                            <li class="tag--active">
                              {{ tag | link_to_remove_tag: tag | replace: 'title=', 'class="js-no-transition" title=' | replace: 'view=ajax', '' }}
                            </li>
                          {% else %}
                            <li>
                              {{ tag | link_to_tag: tag | replace: 'title=', 'class="js-no-transition" title=' | replace: 'view=ajax', '' }}
                            </li>
                          {% endif %}
                        {% endfor %}

                        {% if have_extra_tags %}
                          </div>
                        {% endif %}
                      </ul>

                      {%- assign show_button_limit = tag_limit | minus: 1  -%}
                      {% if tag_count > show_button_limit %}
                        <p>
                          <button type="button" class="collapsible-trigger collapsible--auto-height collapsible-trigger-btn btn btn--tertiary tags-toggle" aria-controls="TagList-{{ section.id }}">
                            <span class="collapsible-label__closed">{{ 'collections.general.see_more' | t }}</span>
                            <span class="collapsible-label__open">{{ 'collections.general.see_less' | t }}</span>
                          </button>
                        </p>
                      {% endif %}
                    </div>
                  {% endif %}
                {% endif %}

                {%- for product in collection.products -%}
                {%- if product.type == 'Tops' -%}
                  {%- assign section_id = product.id -%}
                  {%- assign product_shipping_callout = section.settings.product_shipping_callout -%}
                  {%- assign product_image_size = section.settings.product_image_size -%}
                  {%- assign product_image_type = section.settings.product_image_type -%}
                  {%- assign product_zoom_enable = section.settings.product_zoom_enable -%}
                  {%- assign variant_type = "button" -%}
                  {%- assign variant_labels_enable = section.settings.variant_labels_enable -%}
                  {%- assign sku_enable = "true" -%}
                  {%- assign quantity_enable = section.settings.quantity_enable -%}
                  {%- assign inventory_enable = section.settings.inventory_enable -%}
                  {%- assign inventory_threshold = section.settings.inventory_threshold -%}
                  {%- assign inventory_transfers_enable = section.settings.inventory_transfers_enable -%}
                  {%- assign enable_payment_button = section.settings.enable_payment_button -%}
                  {%- assign social_enable = section.settings.social_enable -%}
<div id="ProductSection-{{ section_id }}"
  class="product-section"
  data-section-id="{{ section_id }}"
  data-section-type="product-template"
  {% if isModal %}
    data-subsection
  {% endif %}
  data-variant-type="{{ variant_type }}"
  {% if inventory_enable %}
    data-inventory="true"
    data-inventory-threshold="{{ inventory_threshold }}"
  {% endif %}
  {% if inventory_transfers_enable %}
    data-incoming-inventory="true"
  {% endif %}
  {% if product_image_type == 'stacked' %}
    data-images-stacked="true"
  {% endif %}
  {% unless isModal %}
    data-enable-history-state="true"
  {% endunless %}>

  {% include 'product-template-variables' %}

  <div class="page-content" style="padding-top:0!important;padding-bottom:0!important">
    <div class="page-width" style="max-width: 1000px;">

      <div class="grid">
        <table>
          <tr>
            <td style="width:50%;height:200px">
        <div class="grid__item {{ product_image_width }}">
{% if sku_enable %}
          <textarea class="data_sku_text" style="display:none" name="message" data-sku>{{ current_variant.sku }}</textarea>
          {%- assign img_url = current_variant.image.src | product_img_url: 'grande' -%}
          <img
          class="lazyload"
          data-photoswipe-src="{{ zoom_img_url }}"
          data-photoswipe-width="{{ image.width }}"
          data-photoswipe-height="{{ image.height }}"
          data-index="{{ forloop.index }}"
          data-src="{{ img_url }}"
          data-widths="[750, 900, 1080]"
          data-aspectratio="{{ image.aspect_ratio }}"
          data-sizes="auto"
          alt="{{ image_alt | escape }}">
{% endif %}
        </div>
            </td>
            <td>
        <div class="grid__item {{ product_description_width }}{% if product_image_type == 'stacked' %} product-single__sticky{% endif %}">
          <div class="product-single__meta">
            <div class="product-single__header small--text-center">
              {% if settings.vendor_enable %}
                <div class="product-single__vendor">
                  {{ product.vendor }}
                </div>
              {% endif %}

              {% if sku_enable %}
                <p class="product-single__sku" id="data_sku" data-sku>
                  {% if current_variant.sku %}
                    {{ current_variant.sku }}
                  {% endif %}
                </p>
              {% endif %}

              {% if isModal %}
                <p class="h1 product-single__title">
                  {{ product.title }}
                </p>
              {% else %}
                <h1 class="h1 product-single__title">
                  {{ product.title }}
                </h1>
              {% endif %}

              {% if settings.enable_product_reviews %}
                {% if isModal %}
                  {%- assign review_link = product.url | within: collection | append: '#Reviews-' | append: product.id -%}
                {% else %}
                  {%- assign review_link = '#Reviews-' | append: product.id -%}
                {% endif %}
                <a href="{{ review_link }}" class="product-single__review-link">
                  <span class="shopify-product-reviews-badge" data-id="{{ product.id }}"></span>
                </a>
              {% endif %}

              <div class="product-single__prices">

                {% if product.compare_at_price_max > product.price %}
                  {%- assign hide_sale_price = true -%}
                  {% if current_variant.compare_at_price %}
                    {%- assign hide_sale_price = false -%}
                  {% endif %}
                  <span
                    class="visually-hidden"
                    aria-hidden="{{ hide_sale_price }}"
                    data-price-a11y>
                      {{ 'products.general.regular_price' | t }}
                  </span>
                  <span class="{% if hide_sale_price %} hide{% endif %}" data-price-wrapper>
                    <span class="product__price product__price--compare" data-product-price-compare>
                      {% if current_variant.compare_at_price > current_variant.price %}
                        {{ current_variant.compare_at_price | money }}
                      {% endif %}
                    </span>
                  </span>
                  <span class="visually-hidden" data-compare-a11y>{{ 'products.general.sale_price' | t }}</span>
                {% else %}
                  <span class="visually-hidden" data-price-a11y>{{ 'products.general.regular_price' | t }}</span>
                {% endif %}

                <span
                  class="product__price{% if current_variant.compare_at_price > current_variant.price %} on-sale{% endif %}"
                  data-product-price>
                  {{ current_variant.price | money }}
                </span>

                {% if product_shipping_callout != blank %}
                  <span class="product__note">
                    {{ product_shipping_callout }}
                  </span>
                {% endif %}

              </div>
              <div data-product-unit-wrapper class="product__unit-price {% unless current_variant.unit_price_measurement %} hide{% endunless %}">
                {%- capture unit_price_base_unit -%}
                  {%- if current_variant.unit_price_measurement -%}
                    {%- if current_variant.unit_price_measurement.reference_value != 1 -%}
                      {{ current_variant.unit_price_measurement.reference_value }}
                    {%- endif -%}
                    {{ current_variant.unit_price_measurement.reference_unit }}
                  {%- endif -%}
                {%- endcapture -%}

                {{ current_variant.unit_price | money }}/{{ unit_price_base_unit }}
              </div>

              {%- if inventory_enable or inventory_transfers_enable -%}
                {%- assign variants_with_inventory_tracking = product.variants | where: 'inventory_management', 'shopify' -%}

                <script>
                  // Store inventory quantities in JS because they're no longer
                  // available directly in JS when a variant changes.
                  // Have an object that holds all potential products so it works
                  // with quick view or with multiple featured products.
                  window.inventories = window.inventories || {};
                  window.inventories['{{section_id}}'] = {};
                   {% for variant in variants_with_inventory_tracking %}
                    window.inventories['{{section_id}}'][{{variant.id}}] = {
                      'quantity': {{ variant.inventory_quantity | default: 0 }},
                      'incoming': {{ variant.incoming | default: false | json }},
                      'next_incoming_date': {{ variant.next_incoming_date | date: format: 'date' | json }}
                    };
                   {% endfor %}
                </script>

                {%- assign inventory_visible = false -%}
                {% if settings.inventory_enable and current_variant.inventory_management == 'shopify' %}
                  {%- if current_variant.inventory_quantity <= inventory_threshold and current_variant.inventory_quantity >= 0 -%}
                    {%- assign inventory_visible = true -%}
                  {%- endif -%}
                {% endif %}
                {% if current_variant.inventory_quantity == 0 %}
                  {%- assign inventory_visible = false -%}
                {% endif %}

                {%- if inventory_enable -%}
                  <p
                    data-product-inventory
                    class="product__inventory {% unless inventory_visible %}hide{% endunless %}"
                    >
                    {% if current_variant.available %}
                      {{ 'products.product.stock_label' | t: count: current_variant.inventory_quantity }}
                    {% endif %}
                  </p>
                {%- endif -%}

                {%- if inventory_transfers_enable -%}
                  <div
                    data-product-incoming-inventory
                    class="product__inventory{% if inventory_visible %} hide{% endif %}">
                    {%- if current_variant.incoming and inventory_visible == false -%}
                      {%- if current_variant.next_incoming_date -%}
                        {% assign date = current_variant.next_incoming_date | date: format: 'date' %}
                        {%- if current_variant.available -%}
                          {{ 'products.product.will_not_ship_until' | t: date: date }}
                        {%- else -%}
                          {{ 'products.product.will_be_in_stock_after' | t: date: date }}
                        {%- endif -%}
                      {%- else -%}
                        {{ 'products.product.waiting_for_stock' | t }}
                      {%- endif -%}
                    {%- endif -%}
                  </div>
                {%- endif -%}
              {% endif %}
            </div>

            {% unless isModal %}
              {% comment %}
                Shopify's product form attaches a number of tracking
                scripts that cause slower load times and false statistics.
                Quick view modals request these on-demand.
              {% endcomment %}
{% capture form_id %}AddToCartForm-{{ section_id }}{% endcapture %}
<form id="{{ form_id }}" class="product-single__form small--text-center" name="add_step_third">
  <input type="hidden" name="data-product-id" value="{{ product.id }}">
  {%- assign is_default_variant = false -%}
  {% if product.variants[0].title == 'Default Title' or product.variants[0].title == 'Default' %}
    {%- assign is_default_variant = true -%}
  {% endif %}
  {% unless product.options.size == 1 and is_default_variant %}
    {% for option in product.options_with_values %}

{%- assign option_drop = option -%}
{%- assign swatch_file_extension = 'png' -%}
{%- assign is_color = false -%}
{%- assign color_swatch_drop = option_drop -%}
{%- assign color_option_index = 0 -%}

{% if settings.product_color_swatches %}
  {% for option in product.options_with_values %}
    {% if option == color_swatch_drop %}
      {%- assign color_option_index = forloop.index0 -%}
      {%- assign downcased_option = color_swatch_drop.name | downcase -%}
      {% if downcased_option contains 'color' or downcased_option contains 'colour' %}
        {% assign is_color = true %}
      {% endif %}
    {% endif %}
  {% endfor %}
{% endif %}

<div class="variant-wrapper variant-wrapper--{{ variant_type }} js">
  <label class="variant__label{% if option.name == 'Default' or option.name == 'Title' %} hidden-label{% endif %}{% unless variant_labels_enable %} hidden-label{% endunless %}"
    for="ProductSelect-{{ section_id }}-option-{{ forloop.index0 }}">
    {{ option.name }}
    {% if is_color %}
      <span class="variant__label-info">
        &mdash;
        <span
          id="VariantColorLabel-{{ section_id }}-{{ forloop.index0 }}"
          data-option-index="{{ color_option_index }}">
          {{ option.selected_value }}
        </span>
      </span>
    {% endif %}
  </label>
  {%- assign option_index = forloop.index -%}
  <fieldset class="variant-input-wrap"
    name="{{ option.name }}"
    data-index="option{{ option_index }}"
    id="ProductSelect-{{ section_id }}-option-{{ forloop.index0 }}">
    {% for value in option.values %}
      {%- assign product_available = true -%}
      {% if product.options.size == 1 %}
        {%- assign product_available = product.variants[forloop.index0].available -%}
      {% endif %}
      <div
        class="variant-input"
        data-index="option{{ option_index }}"
        data-value="{{ value | escape }}">
        <input type="radio"
          {% if option.selected_value == value and product.available %} checked="checked"{% endif %}
          value="{{ value | escape }}"
          data-index="option{{ option_index }}"
          name="{{ option.name }}"
          data-variant-input
          {% if is_color %}data-color-swatch{% endif %}
          class="variant__input-{{ section_id }}{% unless product_available %} disabled{% endunless %} bikinis_top"
          {% if is_color %} data-color-name="{{ value | escape }}"{% endif %}
          {% if is_color %} data-color-index="{{ color_option_index }}"{% endif %}
          id="ProductSelect-{{ section_id }}-option-{{ option.name | handleize }}-{{ value | url_encode }}">
        {% if is_color %}
          {%- assign color_image = value | handle | append: '.' | append: swatch_file_extension | asset_img_url: '50x' | prepend: 'https:' | split: '?' | first -%}
          {%- assign color_swatch_fallback = value | split: ' ' | last | handle -%}
          <label
            for="ProductSelect-{{ section_id }}-option-{{ option.name | handleize }}-{{ value | url_encode }}"
            class="color-swatch color-swatch--{{ value | handle }}{% unless product_available %} disabled{% endunless %}"
            style="background-image: url({{ color_image }}); background-color: {{ color_swatch_fallback }};"
          >
            {{ value | escape }}
          </label>
        {% else %}
          <label for="ProductSelect-{{ section_id }}-option-{{ option.name | handleize }}-{{ value | url_encode }}"{% unless product_available %} class="disabled"{% endunless %}>{{ value | escape }}</label>
        {% endif %}
      </div>
    {% endfor %}
  </fieldset>
</div>
 
    {% endfor %}
  {% endunless %}

  <select name="id" id="ProductSelect-{{ section_id }}" class="product-single__variants no-js" data-product-select>
    {% for variant in product.variants %}
      {% if variant.available %}
        <option {% if variant == product.selected_or_first_available_variant %}
          selected="selected" {% endif %}
          value="{{ variant.id }}">
          {{ variant.title }} - {{ variant.price | money_with_currency }}
        </option>
      {% else %}
        <option disabled="disabled">
          {{ variant.title }} - {{ 'products.product.sold_out' | t }}
        </option>
      {% endif %}
    {% endfor %}
  </select>

  {% if quantity_enable %}
    <div class="product__quantity product__quantity--{{ variant_type }}">
      <label for="Quantity-{{ section_id }}" class="variant__label">{{ 'products.product.quantity' | t }}</label>
      <input type="number" id="Quantity-{{ section_id }}" name="quantity" value="1" min="1">
    </div>
  {% endif %}

  {%- assign enable_dynamic_buttons = false -%}
  {% if enable_payment_button and template != 'product.preorder' %}
    {%- assign enable_dynamic_buttons = true -%}
  {% endif %}

  {% if enable_dynamic_buttons %}
    <div class="payment-buttons">
  {% endif %}

    <button type="button" onclick="adding_step_third()" id="save_button">
      <span>
        {%- include 'icon-heart-save' -%}
      </span>
    </button>

    {% if enable_dynamic_buttons %}
      {{ form | payment_button }}
    {% endif %}

  {% if enable_dynamic_buttons %}
    </div>
  {% endif %}

  {% unless product.empty? %}
    <div class="hide" aria-hidden="true" data-variant-json>
      {{ product.variants | json }}
    </div>
    {% if product.options.size > 1 %}
      <div class="hide" aria-hidden="true" data-current-variant-json>
        {{ current_variant | json }}
      </div>
    {% endif %}
  {% endunless %}

</form>
<script>
        function adding_step_third() { 
//             document.getElementById("result").innerHTML = ""; 
            var parent = document.getElementsByClassName("product-section");
  			var bi_top = "";
            
          for(i = 0; i < parent.length; i++) {
            if(parent[i].style.display == "block") {
              var ele = parent[i].children; 
              for(j = 0; j < ele.length; j++) { 
                if(ele[i].checked) {
                      bi_top += ele[i].name + " Value: " + ele[i].value + "<br>"; 
                }
              } 
            }
          }
            
  alert(ele);
        } 
</script>
            {% else %}
              <div
                id="ProductFormPlaceholder-{{ section_id }}"
                data-url="{{ product.url | within: collection }}"
                data-template="{{ product.template_suffix }}"
                class="product-form-holder">
                {% if product.options.size > 0 %}
                  {% for i in (1..product.options.size) %}
                    <div class="placeholder-content" style="min-height: 86px; max-width: 66%;"></div>
                  {% endfor %}
                {% endif %}
                <div class="placeholder-content" style="min-height: 86px;"></div>
              </div>
            {% endunless %}

            {%- if settings.trust_image != blank -%}
              <div class="aos-animate trust-image" style="max-width: {{ settings.trust_image.width }}px;">
                <div class="image-wrap " style="height: 0; padding-bottom: {{ 100 | divided_by: settings.trust_image.aspect_ratio }}%;">
                  {%- assign img_url = settings.trust_image | img_url: '1x1' | replace: '_1x1.', '_{width}x.' -%}
                  <img class="lazyload"
                      data-src="{{ img_url }}"
                      data-widths="[360, 540]"
                      data-aspectratio="{{ settings.trust_image.aspect_ratio }}"
                      data-sizes="auto"
                      alt="{{ settings.trust_image.alt }}">
                  <noscript>
                    <img class="lazyloaded" src="{{ settings.trust_image | img_url: '540x' }}" alt="{{ settings.trust_image.alt }}">
                  </noscript>
                </div>
              </div>
            {%- endif -%}

            {% if settings.additional_content_style == 'expandable' %}
              {% include 'product-additional-content', section_id: section_id %}
            {% else %}
              {% include 'product-additional-tabs', section_id: section_id %}
            {% endif %}

            {% if social_enable %}
              {% include 'social-sharing', share_title: product.title, share_permalink: product.url, share_image: product %}
            {% endif %}
          </div>
        </div>
            </td>
          </tr>
        </table>
      </div>

    </div>
  </div>
</div>
                {%- endif -%}
                {%- else -%}
                  <div class="grid__item">
                    <p>{{ 'collections.general.no_matches' | t }}</p>
                  </div>
                {%- endfor -%}
                <a class="prev" onclick="plusSlides(-1)">&#10094;</a>
                <a class="next" onclick="plusSlides(1)">&#10095;</a>                  
              </div>
              {% if paginate.pages > 1 %}
                {% include 'pagination' %}
              {% endif %}
            </div>
          </div>
      <script>
      var slideIndex = 1;
      showSlides(slideIndex);

      function plusSlides(n) {
        showSlides(slideIndex += n);
      }

      function currentSlide(n) {
        showSlides(slideIndex = n);
      }

      function showSlides(n) {
        var i;
        var slides = document.getElementsByClassName("product-section");
        var dots = document.getElementsByClassName("dot");
        if (n > slides.length) {slideIndex = 1}    
        if (n < 1) {slideIndex = slides.length}
        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";  
        }
        for (i = 0; i < dots.length; i++) {
            dots[i].className = dots[i].className.replace(" active", "");
        }
        slides[slideIndex-1].style.display = "block";  
        dots[slideIndex-1].className += " active";
      }
      </script>
      <style>
      * {box-sizing: border-box}



      /* Slideshow container */
      .slideshow-container {
        max-width: 100%;
        position: relative;
        margin: auto;
      }

      /* Next & previous buttons */
      .prev, .next {
        cursor: pointer;
        position: absolute;
        top: 50%;
        width: auto;
        padding: 16px;
        margin-top: -22px;
        color: white;
        font-weight: bold;
        font-size: 18px;
        transition: 0.6s ease;
        border-radius: 0 3px 3px 0;
        user-select: none;
      }

      /* Position the "next button" to the right */
      .next {
        right: 0;
        border-radius: 3px 0 0 3px;
      }

      /* On hover, add a black background color with a little bit see-through */
      .prev:hover, .next:hover {
        background-color: rgba(0,0,0,0.8);
      }

      /* Caption text */
      .text {
        color: #f2f2f2;
        font-size: 15px;
        padding: 8px 12px;
        position: absolute;
        bottom: 8px;
        width: 100%;
        text-align: center;
      }

      /* Number text (1/3 etc) */
      .numbertext {
        color: #f2f2f2;
        font-size: 12px;
        padding: 8px 12px;
        position: absolute;
        top: 0;
      }

      /* The dots/bullets/indicators */
      .dot {
        cursor: pointer;
        height: 15px;
        width: 15px;
        margin: 0 2px;
        background-color: #bbb;
        border-radius: 50%;
        display: inline-block;
        transition: background-color 0.6s ease;
      }

      .active, .dot:hover {
        background-color: #717171;
      }

      /* Fading animation */
      .fade {
        -webkit-animation-name: fade;
        -webkit-animation-duration: 1.5s;
        animation-name: fade;
        animation-duration: 1.5s;
      }

      @-webkit-keyframes fade {
        from {opacity: .4} 
        to {opacity: 1}
      }

      @keyframes fade {
        from {opacity: .4} 
        to {opacity: 1}
      }

      /* On smaller screens, decrease text size */
      @media only screen and (max-width: 300px) {
        .prev, .next,.text {font-size: 11px}
      }
      </style>
        </td>
      </tr>
      <tr>
        <td>
          <div id="CollectionAjaxResult">
            <div id="CollectionAjaxContent">
              <div
                class="slideshow-container grid grid--uniform grid--scattered-large-{{ section.settings.per_row_desktop }} grid--scattered-small-{{ per_row_mobile }}{% if section.settings.per_row_mobile == '2-flush' %} small--grid--flush{% endif %}"
                data-collection-container>
                {%- assign have_sidebar = false -%}
                {%- assign tag_count = 0 -%}
                {%- assign tag_limit = 7 -%}
                {%- assign have_extra_tags = false -%}
                {% if section.settings.collection_tags_style == 'inline' %}
                  {% if collection.all_tags.size > 0 %}
                    <div class="grid__item grid-sidebar {{ grid_item_width }}">
                      <ul class="tags tags--vertical">
                        <li{% unless current_tags %} class="tag--active"{% endunless %}>
                          {% if collection.handle %}
                            <a href="{{ routes.collections_url }}/{{ collection.handle }}">
                              {{ 'collections.general.all_of_collection' | t }}
                            </a>
                          {% elsif collection.current_type %}
                            <a href="{{ collection.current_type | url_for_type }}">
                              {{ 'collections.general.all_of_collection' | t }}
                            </a>
                          {% elsif collection.current_vendor %}
                            <a href="{{ collection.current_vendor | url_for_vendor }}">
                              {{ 'collections.general.all_of_collection' | t }}
                            </a>
                          {% endif %}
                        </li>

                        {% for tag in collection.all_tags %}
                          {%- assign tag_count = tag_count | plus: 1 -%}
                          {% include 'filter-out-custom-tags' %}
                          {%- assign tag_with_hyphens = tag | replace: ' ', '-' -%}
                          {% if tag_count == tag_limit %}
                            {%- assign have_extra_tags = true -%}
                            </ul>
                            <div id="TagList-{{ section.id }}" class="collapsible-content collapsible-content--all">
                              <ul class="tags tags--vertical collapsible-content__inner collapsible-content__inner--no-translate">
                          {% endif %}
                          {% if current_tags contains tag or current_tags contains tag_with_hyphens %}
                            <li class="tag--active">
                              {{ tag | link_to_remove_tag: tag | replace: 'title=', 'class="js-no-transition" title=' | replace: 'view=ajax', '' }}
                            </li>
                          {% else %}
                            <li>
                              {{ tag | link_to_tag: tag | replace: 'title=', 'class="js-no-transition" title=' | replace: 'view=ajax', '' }}
                            </li>
                          {% endif %}
                        {% endfor %}

                        {% if have_extra_tags %}
                          </div>
                        {% endif %}
                      </ul>

                      {%- assign show_button_limit = tag_limit | minus: 1  -%}
                      {% if tag_count > show_button_limit %}
                        <p>
                          <button type="button" class="collapsible-trigger collapsible--auto-height collapsible-trigger-btn btn btn--tertiary tags-toggle" aria-controls="TagList-{{ section.id }}">
                            <span class="collapsible-label__closed">{{ 'collections.general.see_more' | t }}</span>
                            <span class="collapsible-label__open">{{ 'collections.general.see_less' | t }}</span>
                          </button>
                        </p>
                      {% endif %}
                    </div>
                  {% endif %}
                {% endif %}

                {% for product in collection.products %}
                {% if product.type == 'Bottoms' %}
                  {% include 'product-template-top',
                    section_id: product.id,

                    product_shipping_callout: section.settings.product_shipping_callout,
                    product_image_size: section.settings.product_image_size,
                    product_image_type: section.settings.product_image_type,
                    product_zoom_enable: section.settings.product_zoom_enable,
                    variant_type: variant_type,
                    variant_labels_enable: section.settings.variant_labels_enable,
                    sku_enable: section.settings.sku_enable,
                    quantity_enable: section.settings.quantity_enable,
                    inventory_enable: section.settings.inventory_enable,
                    inventory_threshold: section.settings.inventory_threshold,
                    inventory_transfers_enable: section.settings.inventory_transfers_enable,
                    enable_payment_button: section.settings.enable_payment_button,
                    social_enable: section.settings.social_enable
                  %}
                {% endif %}
                {% else %}
                  <div class="grid__item">
                    <p>{{ 'collections.general.no_matches' | t }}</p>
                  </div>
                {% endfor %}
                  <a class="prev" onclick="plusSlides1(-1)">&#10094;</a>
                  <a class="next" onclick="plusSlides1(1)">&#10095;</a>
              </div>

              {% if paginate.pages > 1 %}
                {% include 'pagination' %}
              {% endif %}
            </div>
          </div>
      <script>
      var slideIndex1 = 1;
      showSlides1(slideIndex1);

      function plusSlides1(n) {
        showSlides1(slideIndex1 += n);
      }

      function currentSlide1(n) {
        showSlides1(slideIndex1 = n);
      }

      function showSlides1(n) {
        var i;
        var slides = document.getElementsByClassName("product-section1");
        var dots = document.getElementsByClassName("dot");
        if (n > slides.length) {slideIndex1 = 1}    
        if (n < 1) {slideIndex1 = slides.length}
        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";  
        }
        for (i = 0; i < dots.length; i++) {
            dots[i].className = dots[i].className.replace(" active", "");
        }
        slides[slideIndex1-1].style.display = "block";  
        dots[slideIndex1-1].className += " active";
      }
      </script>
      <style>
      * {box-sizing: border-box}



      /* Slideshow container */
      .slideshow-container {
        max-width: 100%;
        position: relative;
        margin: auto;
      }

      /* Next & previous buttons */
      .prev, .next {
        cursor: pointer;
        position: absolute;
        top: 50%;
        width: auto;
        padding: 16px;
        margin-top: -22px;
        color: white;
        font-weight: bold;
        font-size: 18px;
        transition: 0.6s ease;
        border-radius: 0 3px 3px 0;
        user-select: none;
      }

      /* Position the "next button" to the right */
      .next {
        right: 0;
        border-radius: 3px 0 0 3px;
      }

      /* On hover, add a black background color with a little bit see-through */
      .prev:hover, .next:hover {
        background-color: rgba(0,0,0,0.8);
      }

      /* Caption text */
      .text {
        color: #f2f2f2;
        font-size: 15px;
        padding: 8px 12px;
        position: absolute;
        bottom: 8px;
        width: 100%;
        text-align: center;
      }

      /* Number text (1/3 etc) */
      .numbertext {
        color: #f2f2f2;
        font-size: 12px;
        padding: 8px 12px;
        position: absolute;
        top: 0;
      }

      /* The dots/bullets/indicators */
      .dot {
        cursor: pointer;
        height: 15px;
        width: 15px;
        margin: 0 2px;
        background-color: #bbb;
        border-radius: 50%;
        display: inline-block;
        transition: background-color 0.6s ease;
      }

      .active, .dot:hover {
        background-color: #717171;
      }

      /* Fading animation */
      .fade {
        -webkit-animation-name: fade;
        -webkit-animation-duration: 1.5s;
        animation-name: fade;
        animation-duration: 1.5s;
      }

      @-webkit-keyframes fade {
        from {opacity: .4} 
        to {opacity: 1}
      }

      @keyframes fade {
        from {opacity: .4} 
        to {opacity: 1}
      }

      /* On smaller screens, decrease text size */
      @media only screen and (max-width: 300px) {
        .prev, .next,.text {font-size: 11px}
      }
      </style>
        </td>
      </tr>
    </table>
    </div>
    <div id="second_step">
    {%- unless section.settings.collection_image_enable and collection.image -%}
      <header class="section-header text-left" data-aos style="margin-bottom: 0 !important">
          <h1 class="section-header__title appear-delay">
            {{ collection.title }}
          </h1><br>
          <div class="product-nav clearfix">
            <span style="float:left;"> {% if collation.previous_protect %}
              {{'&larr:Previous'|Link_to:collation.previous_product}}
              {% endif %}</span>
          </div>
          <h6>
            STEP TWO | ACCESSORIES
          </h6>
          {% if collection.description != blank and section.settings.description_position == 'top' %}
            {%- assign desc_length = collection.description | size -%}
            <div class="rte section-header__description{% if desc_length < 200 %} section-header__description--large{% endif %} appear-delay-1">
              {{ collection.description }}
            </div>
          {% endif %}
      </header>
    {%- else -%}
      {% if collection.description != blank and section.settings.description_position == 'top' %}
        <div class="section-header" data-aos>
          {%- assign desc_length = collection.description | size -%}
          <div class="rte section-header__description{% if desc_length < 200 %} section-header__description--large{% endif %} appear-delay-1">
            {{ collection.description }}
          </div>
        </div>
      {% endif %}
    {%- endunless -%}

    {% if section.settings.collection_tags_enable or section.settings.collection_sort_enable %}
      <div class="collection-filter">
        {% if section.settings.collection_tags_enable %}
          <div class="collection-filter__item">
            <label for="SortTags" class="hidden-label">{{ 'collections.filters.title_tags' | t }}</label>
            <select name="SortTags" id="SortTags">
              {% if current_tags %}
                {% if collection.handle %}
                  <option value="/collections/{{ collection.handle }}">{{ 'collections.filters.all_tags' | t }}</option>
                {% elsif collection.current_type %}
                  <option value="{{ collection.current_type | url_for_type }}">{{ 'collections.filters.all_tags' | t }}</option>
                {% elsif collection.current_vendor %}
                  <option value="{{ collection.current_vendor | url_for_vendor }}">{{ 'collections.filters.all_tags' | t }}</option>
                {% endif %}
              {% else %}
                {% if current_tags contains tag %}
                  <option value="">{{ 'collections.filters.all_tags' | t }}</option>
                {% else %}
                  <option value="">{{ 'collections.filters.title_tags' | t }}</option>
                {% endif %}
              {% endif %}
              {% for tag in collection.all_tags %}
                {% include 'filter-out-custom-tags' %}
                <option value="/collections/{% if collection.handle != blank %}{{ collection.handle }}{% else %}all{% endif %}/{{ tag | handleize }}"{% if current_tags contains tag %} selected="selected"{% endif %}>{{ tag }}</option>
              {% endfor %}
            </select>
          </div>
        {% endif %}

        {% if section.settings.collection_sort_enable %}
          <div class="collection-filter__item">
            {%- assign sort_by = collection.sort_by | default: collection.default_sort_by -%}
            {%- assign default_sorted = false -%}
            {% if sort_by == collection.default_sort_by %}
              {%- assign default_sorted = true -%}
            {% endif %}
            <label for="SortBy" class="hidden-label">{{ 'collections.sorting.title' | t }}</label>
            <select name="SortBy" id="SortBy">
              <option value="title-ascending"{% if sort_by == collection.default_sort_by %} selected="selected"{% endif %}>{{ 'collections.sorting.title' | t }}</option>
              {% for option in collection.sort_options %}
                <option value="{{ option.value }}" {% unless default_sorted %}{% if option.value == sort_by %}selected="selected"{% endif %}{% endunless %}>{{ option.name }}</option>
              {% endfor %}
            </select>
          </div>
        {% endif %}
      </div>
    {% endif %}
	<table>
      <tr>
        <td>
          <div id="CollectionAjaxResult">
            <div id="CollectionAjaxContent">
              <div
                class="slideshow-container grid grid--uniform grid--scattered-large-{{ section.settings.per_row_desktop }} grid--scattered-small-{{ per_row_mobile }}{% if section.settings.per_row_mobile == '2-flush' %} small--grid--flush{% endif %}"
                data-collection-container>
                {%- assign have_sidebar = false -%}
                {%- assign tag_count = 0 -%}
                {%- assign tag_limit = 7 -%}
                {%- assign have_extra_tags = false -%}
                {% if section.settings.collection_tags_style == 'inline' %}
                  {% if collection.all_tags.size > 0 %}
                    <div class="grid__item grid-sidebar {{ grid_item_width }}">
                      <ul class="tags tags--vertical">
                        <li{% unless current_tags %} class="tag--active"{% endunless %}>
                          {% if collection.handle %}
                            <a href="{{ routes.collections_url }}/{{ collection.handle }}">
                              {{ 'collections.general.all_of_collection' | t }}
                            </a>
                          {% elsif collection.current_type %}
                            <a href="{{ collection.current_type | url_for_type }}">
                              {{ 'collections.general.all_of_collection' | t }}
                            </a>
                          {% elsif collection.current_vendor %}
                            <a href="{{ collection.current_vendor | url_for_vendor }}">
                              {{ 'collections.general.all_of_collection' | t }}
                            </a>
                          {% endif %}
                        </li>

                        {% for tag in collection.all_tags %}
                          {%- assign tag_count = tag_count | plus: 1 -%}
                          {% include 'filter-out-custom-tags' %}
                          {%- assign tag_with_hyphens = tag | replace: ' ', '-' -%}
                          {% if tag_count == tag_limit %}
                            {%- assign have_extra_tags = true -%}
                            </ul>
                            <div id="TagList-{{ section.id }}" class="collapsible-content collapsible-content--all">
                              <ul class="tags tags--vertical collapsible-content__inner collapsible-content__inner--no-translate">
                          {% endif %}
                          {% if current_tags contains tag or current_tags contains tag_with_hyphens %}
                            <li class="tag--active">
                              {{ tag | link_to_remove_tag: tag | replace: 'title=', 'class="js-no-transition" title=' | replace: 'view=ajax', '' }}
                            </li>
                          {% else %}
                            <li>
                              {{ tag | link_to_tag: tag | replace: 'title=', 'class="js-no-transition" title=' | replace: 'view=ajax', '' }}
                            </li>
                          {% endif %}
                        {% endfor %}

                        {% if have_extra_tags %}
                          </div>
                        {% endif %}
                      </ul>

                      {%- assign show_button_limit = tag_limit | minus: 1  -%}
                      {% if tag_count > show_button_limit %}
                        <p>
                          <button type="button" class="collapsible-trigger collapsible--auto-height collapsible-trigger-btn btn btn--tertiary tags-toggle" aria-controls="TagList-{{ section.id }}">
                            <span class="collapsible-label__closed">{{ 'collections.general.see_more' | t }}</span>
                            <span class="collapsible-label__open">{{ 'collections.general.see_less' | t }}</span>
                          </button>
                        </p>
                      {% endif %}
                    </div>
                  {% endif %}
                {% endif %}
                {%- for product in collections['accessories'].products -%}
                  {%- include 'product-template-accessories',
                    section_id: product.id,

                    product_shipping_callout: section.settings.product_shipping_callout,
                    product_image_size: section.settings.product_image_size,
                    product_image_type: section.settings.product_image_type,
                    product_zoom_enable: section.settings.product_zoom_enable,
                    variant_type: variant_type,
                    variant_labels_enable: section.settings.variant_labels_enable,
                    sku_enable: section.settings.sku_enable,
                    quantity_enable: section.settings.quantity_enable,
                    inventory_enable: section.settings.inventory_enable,
                    inventory_threshold: section.settings.inventory_threshold,
                    inventory_transfers_enable: section.settings.inventory_transfers_enable,
                    enable_payment_button: section.settings.enable_payment_button,
                    social_enable: section.settings.social_enable
                  -%}
                {%- else -%}
                  <div class="grid__item">
                    <p>{{ 'collections.general.no_matches' | t }}</p>
                  </div>
                {%- endfor -%}
                <a class="prev" onclick="plusSlides2(-1)">&#10094;</a>
                <a class="next" onclick="plusSlides2(1)">&#10095;</a>                  
              </div>
              {% if paginate.pages > 1 %}
                {% include 'pagination' %}
              {% endif %}
            </div>
          </div>
      <script>
      var slideIndex2 = 1;
      showSlides2(slideIndex);

      function plusSlides2(n) {
        showSlides2(slideIndex2 += n);
      }

      function currentSlide2(n) {
        showSlides2(slideIndex2 = n);
      }

      function showSlides2(n) {
        var i;
        var slides = document.getElementsByClassName("product-section2");
        var dots = document.getElementsByClassName("dot");
        if (n > slides.length) {slideIndex2 = 1}    
        if (n < 1) {slideIndex2 = slides.length}
        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";  
        }
        for (i = 0; i < dots.length; i++) {
            dots[i].className = dots[i].className.replace(" active", "");
        }
        slides[slideIndex2-1].style.display = "block";  
        dots[slideIndex2-1].className += " active";
      }
      </script>
      <style>
      * {box-sizing: border-box}



      /* Slideshow container */
      .slideshow-container {
        max-width: 100%;
        position: relative;
        margin: auto;
      }

      /* Next & previous buttons */
      .prev, .next {
        cursor: pointer;
        position: absolute;
        top: 50%;
        width: auto;
        padding: 16px;
        margin-top: -22px;
        color: white;
        font-weight: bold;
        font-size: 18px;
        transition: 0.6s ease;
        border-radius: 0 3px 3px 0;
        user-select: none;
      }

      /* Position the "next button" to the right */
      .next {
        right: 0;
        border-radius: 3px 0 0 3px;
      }

      /* On hover, add a black background color with a little bit see-through */
      .prev:hover, .next:hover {
        background-color: rgba(0,0,0,0.8);
      }

      /* Caption text */
      .text {
        color: #f2f2f2;
        font-size: 15px;
        padding: 8px 12px;
        position: absolute;
        bottom: 8px;
        width: 100%;
        text-align: center;
      }

      /* Number text (1/3 etc) */
      .numbertext {
        color: #f2f2f2;
        font-size: 12px;
        padding: 8px 12px;
        position: absolute;
        top: 0;
      }

      /* The dots/bullets/indicators */
      .dot {
        cursor: pointer;
        height: 15px;
        width: 15px;
        margin: 0 2px;
        background-color: #bbb;
        border-radius: 50%;
        display: inline-block;
        transition: background-color 0.6s ease;
      }

      .active, .dot:hover {
        background-color: #717171;
      }

      /* Fading animation */
      .fade {
        -webkit-animation-name: fade;
        -webkit-animation-duration: 1.5s;
        animation-name: fade;
        animation-duration: 1.5s;
      }

      @-webkit-keyframes fade {
        from {opacity: .4} 
        to {opacity: 1}
      }

      @keyframes fade {
        from {opacity: .4} 
        to {opacity: 1}
      }

      /* On smaller screens, decrease text size */
      @media only screen and (max-width: 300px) {
        .prev, .next,.text {font-size: 11px}
      }
      </style>
        </td>
      </tr>
    </table>
    </div>
    <div id="third_step">
    {%- unless section.settings.collection_image_enable and collection.image -%}
      <header class="section-header text-left" data-aos style="margin-bottom: 0 !important">
          <h1 class="section-header__title appear-delay">
            {{ collection.title }}
          </h1><br>
          <div class="product-nav clearfix">
            <span style="float:left;"> {% if collation.previous_protect %}
              {{'&larr:Previous'|Link_to:collation.previous_product}}
              {% endif %}</span>
          </div>
          <h6>
            STEP THREE | CONFIRM YOUR SELECTION
          </h6>
          {% if collection.description != blank and section.settings.description_position == 'top' %}
            {%- assign desc_length = collection.description | size -%}
            <div class="rte section-header__description{% if desc_length < 200 %} section-header__description--large{% endif %} appear-delay-1">
              {{ collection.description }}
            </div>
          {% endif %}
      </header>
    {%- else -%}
      {% if collection.description != blank and section.settings.description_position == 'top' %}
        <div class="section-header" data-aos>
          {%- assign desc_length = collection.description | size -%}
          <div class="rte section-header__description{% if desc_length < 200 %} section-header__description--large{% endif %} appear-delay-1">
            {{ collection.description }}
          </div>
        </div>
      {% endif %}
    {%- endunless -%}

    {% if section.settings.collection_tags_enable or section.settings.collection_sort_enable %}
      <div class="collection-filter">
        {% if section.settings.collection_tags_enable %}
          <div class="collection-filter__item">
            <label for="SortTags" class="hidden-label">{{ 'collections.filters.title_tags' | t }}</label>
            <select name="SortTags" id="SortTags">
              {% if current_tags %}
                {% if collection.handle %}
                  <option value="/collections/{{ collection.handle }}">{{ 'collections.filters.all_tags' | t }}</option>
                {% elsif collection.current_type %}
                  <option value="{{ collection.current_type | url_for_type }}">{{ 'collections.filters.all_tags' | t }}</option>
                {% elsif collection.current_vendor %}
                  <option value="{{ collection.current_vendor | url_for_vendor }}">{{ 'collections.filters.all_tags' | t }}</option>
                {% endif %}
              {% else %}
                {% if current_tags contains tag %}
                  <option value="">{{ 'collections.filters.all_tags' | t }}</option>
                {% else %}
                  <option value="">{{ 'collections.filters.title_tags' | t }}</option>
                {% endif %}
              {% endif %}
              {% for tag in collection.all_tags %}
                {% include 'filter-out-custom-tags' %}
                <option value="/collections/{% if collection.handle != blank %}{{ collection.handle }}{% else %}all{% endif %}/{{ tag | handleize }}"{% if current_tags contains tag %} selected="selected"{% endif %}>{{ tag }}</option>
              {% endfor %}
            </select>
          </div>
        {% endif %}

        {% if section.settings.collection_sort_enable %}
          <div class="collection-filter__item">
            {%- assign sort_by = collection.sort_by | default: collection.default_sort_by -%}
            {%- assign default_sorted = false -%}
            {% if sort_by == collection.default_sort_by %}
              {%- assign default_sorted = true -%}
            {% endif %}
            <label for="SortBy" class="hidden-label">{{ 'collections.sorting.title' | t }}</label>
            <select name="SortBy" id="SortBy">
              <option value="title-ascending"{% if sort_by == collection.default_sort_by %} selected="selected"{% endif %}>{{ 'collections.sorting.title' | t }}</option>
              {% for option in collection.sort_options %}
                <option value="{{ option.value }}" {% unless default_sorted %}{% if option.value == sort_by %}selected="selected"{% endif %}{% endunless %}>{{ option.name }}</option>
              {% endfor %}
            </select>
          </div>
        {% endif %}
      </div>
    {% endif %}
    </div>
    {% if collection.description != blank and section.settings.description_position == 'bottom' %}
      <hr class="hr--clear hr--medium">
      <div class="rte text-center">
        {{ collection.description }}
      </div>
    {% endif %}
  </div>
</div>
</div>