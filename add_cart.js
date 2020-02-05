
  $('body').on('click','selected_element', function(){
  var variantImages = {},
    thumbnails,
    variant,
    variantImage,
    optionValue,
    productOptions = [];
    
       variant = {"id":31808334659677,"title":"XS \/ Blue","option1":"XS","option2":"Blue","option3":null,"sku":"LRT001-1","requires_shipping":true,"taxable":true,"featured_image":{"id":14214607110237,"product_id":4450733031517,"position":1,"created_at":"2019-12-11T07:16:50-05:00","updated_at":"2020-01-14T21:52:17-05:00","alt":null,"width":852,"height":776,"src":"https:\/\/cdn.shopify.com\/s\/files\/1\/0290\/7829\/0525\/products\/Screen_Shot_2019-12-11_at_12.12.19.png?v=1579056737","variant_ids":[31808334659677,31808334823517,31808334954589,31808335085661]},"available":true,"name":"The Emily - XS \/ Blue","public_title":"XS \/ Blue","options":["XS","Blue"],"price":7000,"weight":0,"compare_at_price":null,"inventory_management":null,"barcode":"","featured_media":{"alt":"The Emily","id":6365709238365,"position":1,"preview_image":{"aspect_ratio":1.098,"height":776,"width":852,"src":"https:\/\/cdn.shopify.com\/s\/files\/1\/0290\/7829\/0525\/products\/Screen_Shot_2019-12-11_at_12.12.19.png?v=1576066610"}}};
       if ( typeof variant.featured_image !== 'undefined' && variant.featured_image !== null ) {
         variantImage =  variant.featured_image.src.split('?')[0].replace(/http(s)?:/,'');
         variantImages[variantImage] = variantImages[variantImage] || {};
         
         
           
           
         	
           if (typeof variantImages[variantImage]["option-0"] === 'undefined') {
             variantImages[variantImage]["option-0"] = "XS";
           }
           else {
             var oldValue = variantImages[variantImage]["option-0"];
             if ( oldValue !== null && oldValue !== "XS" )  {
               variantImages[variantImage]["option-0"] = null;
             }
           }
         
         
           
           
         	
           if (typeof variantImages[variantImage]["option-1"] === 'undefined') {
             variantImages[variantImage]["option-1"] = "Blue";
           }
           else {
             var oldValue = variantImages[variantImage]["option-1"];
             if ( oldValue !== null && oldValue !== "Blue" )  {
               variantImages[variantImage]["option-1"] = null;
             }
           }
         
       }
       productOptions.push(variant);
    
       variant = {"id":31808334692445,"title":"XS \/ Red","option1":"XS","option2":"Red","option3":null,"sku":"LRT001-2","requires_shipping":true,"taxable":true,"featured_image":{"id":14604576489565,"product_id":4450733031517,"position":4,"created_at":"2020-01-14T21:52:22-05:00","updated_at":"2020-01-14T21:52:22-05:00","alt":null,"width":852,"height":776,"src":"https:\/\/cdn.shopify.com\/s\/files\/1\/0290\/7829\/0525\/products\/red_68f35a45-181c-4a31-a3c4-a96345803e9d.png?v=1579056742","variant_ids":[31808334692445,31808334856285,31808334987357,31808335118429]},"available":true,"name":"The Emily - XS \/ Red","public_title":"XS \/ Red","options":["XS","Red"],"price":7000,"weight":0,"compare_at_price":null,"inventory_management":null,"barcode":"","featured_media":{"alt":"The Emily","id":6755680125021,"position":4,"preview_image":{"aspect_ratio":1.098,"height":776,"width":852,"src":"https:\/\/cdn.shopify.com\/s\/files\/1\/0290\/7829\/0525\/products\/red_68f35a45-181c-4a31-a3c4-a96345803e9d.png?v=1579056742"}}};
       if ( typeof variant.featured_image !== 'undefined' && variant.featured_image !== null ) {
         variantImage =  variant.featured_image.src.split('?')[0].replace(/http(s)?:/,'');
         variantImages[variantImage] = variantImages[variantImage] || {};
         
         
           
           
         	
           if (typeof variantImages[variantImage]["option-0"] === 'undefined') {
             variantImages[variantImage]["option-0"] = "XS";
           }
           else {
             var oldValue = variantImages[variantImage]["option-0"];
             if ( oldValue !== null && oldValue !== "XS" )  {
               variantImages[variantImage]["option-0"] = null;
             }
           }
         
         
           
           
         	
           if (typeof variantImages[variantImage]["option-1"] === 'undefined') {
             variantImages[variantImage]["option-1"] = "Red";
           }
           else {
             var oldValue = variantImages[variantImage]["option-1"];
             if ( oldValue !== null && oldValue !== "Red" )  {
               variantImages[variantImage]["option-1"] = null;
             }
           }
         
       }
       productOptions.push(variant);
    
       variant = {"id":31808334725213,"title":"XS \/ White","option1":"XS","option2":"White","option3":null,"sku":"LRT001-3","requires_shipping":true,"taxable":true,"featured_image":{"id":14604575899741,"product_id":4450733031517,"position":2,"created_at":"2020-01-14T21:52:17-05:00","updated_at":"2020-01-14T21:52:17-05:00","alt":null,"width":852,"height":776,"src":"https:\/\/cdn.shopify.com\/s\/files\/1\/0290\/7829\/0525\/products\/white.png?v=1579056737","variant_ids":[31808334725213,31808334889053,31808335020125,31808335151197]},"available":true,"name":"The Emily - XS \/ White","public_title":"XS \/ White","options":["XS","White"],"price":7000,"weight":0,"compare_at_price":null,"inventory_management":null,"barcode":"","featured_media":{"alt":"The Emily","id":6755679535197,"position":2,"preview_image":{"aspect_ratio":1.098,"height":776,"width":852,"src":"https:\/\/cdn.shopify.com\/s\/files\/1\/0290\/7829\/0525\/products\/white.png?v=1579056737"}}};
       if ( typeof variant.featured_image !== 'undefined' && variant.featured_image !== null ) {
         variantImage =  variant.featured_image.src.split('?')[0].replace(/http(s)?:/,'');
         variantImages[variantImage] = variantImages[variantImage] || {};
         
         
           
           
         	
           if (typeof variantImages[variantImage]["option-0"] === 'undefined') {
             variantImages[variantImage]["option-0"] = "XS";
           }
           else {
             var oldValue = variantImages[variantImage]["option-0"];
             if ( oldValue !== null && oldValue !== "XS" )  {
               variantImages[variantImage]["option-0"] = null;
             }
           }
         
         
           
           
         	
           if (typeof variantImages[variantImage]["option-1"] === 'undefined') {
             variantImages[variantImage]["option-1"] = "White";
           }
           else {
             var oldValue = variantImages[variantImage]["option-1"];
             if ( oldValue !== null && oldValue !== "White" )  {
               variantImages[variantImage]["option-1"] = null;
             }
           }
         
       }
       productOptions.push(variant);
    
       variant = {"id":31808334757981,"title":"XS \/ Metallic Turquoise","option1":"XS","option2":"Metallic Turquoise","option3":null,"sku":"LRT001-4","requires_shipping":true,"taxable":true,"featured_image":{"id":14604576358493,"product_id":4450733031517,"position":3,"created_at":"2020-01-14T21:52:21-05:00","updated_at":"2020-01-14T21:52:21-05:00","alt":null,"width":852,"height":776,"src":"https:\/\/cdn.shopify.com\/s\/files\/1\/0290\/7829\/0525\/products\/green.png?v=1579056741","variant_ids":[31808334757981,31808334921821,31808335052893,31808335183965]},"available":true,"name":"The Emily - XS \/ Metallic Turquoise","public_title":"XS \/ Metallic Turquoise","options":["XS","Metallic Turquoise"],"price":7000,"weight":0,"compare_at_price":null,"inventory_management":null,"barcode":"","featured_media":{"alt":"The Emily","id":6755679993949,"position":3,"preview_image":{"aspect_ratio":1.098,"height":776,"width":852,"src":"https:\/\/cdn.shopify.com\/s\/files\/1\/0290\/7829\/0525\/products\/green.png?v=1579056741"}}};
       if ( typeof variant.featured_image !== 'undefined' && variant.featured_image !== null ) {
         variantImage =  variant.featured_image.src.split('?')[0].replace(/http(s)?:/,'');
         variantImages[variantImage] = variantImages[variantImage] || {};
         
         
           
           
         	
           if (typeof variantImages[variantImage]["option-0"] === 'undefined') {
             variantImages[variantImage]["option-0"] = "XS";
           }
           else {
             var oldValue = variantImages[variantImage]["option-0"];
             if ( oldValue !== null && oldValue !== "XS" )  {
               variantImages[variantImage]["option-0"] = null;
             }
           }
         
         
           
           
         	
           if (typeof variantImages[variantImage]["option-1"] === 'undefined') {
             variantImages[variantImage]["option-1"] = "Metallic Turquoise";
           }
           else {
             var oldValue = variantImages[variantImage]["option-1"];
             if ( oldValue !== null && oldValue !== "Metallic Turquoise" )  {
               variantImages[variantImage]["option-1"] = null;
             }
           }
         
       }
       productOptions.push(variant);
    
       variant = {"id":31808334823517,"title":"S \/ Blue","option1":"S","option2":"Blue","option3":null,"sku":"LRT001-5","requires_shipping":true,"taxable":true,"featured_image":{"id":14214607110237,"product_id":4450733031517,"position":1,"created_at":"2019-12-11T07:16:50-05:00","updated_at":"2020-01-14T21:52:17-05:00","alt":null,"width":852,"height":776,"src":"https:\/\/cdn.shopify.com\/s\/files\/1\/0290\/7829\/0525\/products\/Screen_Shot_2019-12-11_at_12.12.19.png?v=1579056737","variant_ids":[31808334659677,31808334823517,31808334954589,31808335085661]},"available":true,"name":"The Emily - S \/ Blue","public_title":"S \/ Blue","options":["S","Blue"],"price":7000,"weight":0,"compare_at_price":null,"inventory_management":null,"barcode":"","featured_media":{"alt":"The Emily","id":6365709238365,"position":1,"preview_image":{"aspect_ratio":1.098,"height":776,"width":852,"src":"https:\/\/cdn.shopify.com\/s\/files\/1\/0290\/7829\/0525\/products\/Screen_Shot_2019-12-11_at_12.12.19.png?v=1576066610"}}};
       if ( typeof variant.featured_image !== 'undefined' && variant.featured_image !== null ) {
         variantImage =  variant.featured_image.src.split('?')[0].replace(/http(s)?:/,'');
         variantImages[variantImage] = variantImages[variantImage] || {};
         
         
           
           
         	
           if (typeof variantImages[variantImage]["option-0"] === 'undefined') {
             variantImages[variantImage]["option-0"] = "S";
           }
           else {
             var oldValue = variantImages[variantImage]["option-0"];
             if ( oldValue !== null && oldValue !== "S" )  {
               variantImages[variantImage]["option-0"] = null;
             }
           }
         
         
           
           
         	
           if (typeof variantImages[variantImage]["option-1"] === 'undefined') {
             variantImages[variantImage]["option-1"] = "Blue";
           }
           else {
             var oldValue = variantImages[variantImage]["option-1"];
             if ( oldValue !== null && oldValue !== "Blue" )  {
               variantImages[variantImage]["option-1"] = null;
             }
           }
         
       }
       productOptions.push(variant);
    
       variant = {"id":31808334856285,"title":"S \/ Red","option1":"S","option2":"Red","option3":null,"sku":"LRT001-6","requires_shipping":true,"taxable":true,"featured_image":{"id":14604576489565,"product_id":4450733031517,"position":4,"created_at":"2020-01-14T21:52:22-05:00","updated_at":"2020-01-14T21:52:22-05:00","alt":null,"width":852,"height":776,"src":"https:\/\/cdn.shopify.com\/s\/files\/1\/0290\/7829\/0525\/products\/red_68f35a45-181c-4a31-a3c4-a96345803e9d.png?v=1579056742","variant_ids":[31808334692445,31808334856285,31808334987357,31808335118429]},"available":true,"name":"The Emily - S \/ Red","public_title":"S \/ Red","options":["S","Red"],"price":7000,"weight":0,"compare_at_price":null,"inventory_management":null,"barcode":"","featured_media":{"alt":"The Emily","id":6755680125021,"position":4,"preview_image":{"aspect_ratio":1.098,"height":776,"width":852,"src":"https:\/\/cdn.shopify.com\/s\/files\/1\/0290\/7829\/0525\/products\/red_68f35a45-181c-4a31-a3c4-a96345803e9d.png?v=1579056742"}}};
       if ( typeof variant.featured_image !== 'undefined' && variant.featured_image !== null ) {
         variantImage =  variant.featured_image.src.split('?')[0].replace(/http(s)?:/,'');
         variantImages[variantImage] = variantImages[variantImage] || {};
         
         
           
           
         	
           if (typeof variantImages[variantImage]["option-0"] === 'undefined') {
             variantImages[variantImage]["option-0"] = "S";
           }
           else {
             var oldValue = variantImages[variantImage]["option-0"];
             if ( oldValue !== null && oldValue !== "S" )  {
               variantImages[variantImage]["option-0"] = null;
             }
           }
         
         
           
           
         	
           if (typeof variantImages[variantImage]["option-1"] === 'undefined') {
             variantImages[variantImage]["option-1"] = "Red";
           }
           else {
             var oldValue = variantImages[variantImage]["option-1"];
             if ( oldValue !== null && oldValue !== "Red" )  {
               variantImages[variantImage]["option-1"] = null;
             }
           }
         
       }
       productOptions.push(variant);
    
       variant = {"id":31808334889053,"title":"S \/ White","option1":"S","option2":"White","option3":null,"sku":"LRT001-7","requires_shipping":true,"taxable":true,"featured_image":{"id":14604575899741,"product_id":4450733031517,"position":2,"created_at":"2020-01-14T21:52:17-05:00","updated_at":"2020-01-14T21:52:17-05:00","alt":null,"width":852,"height":776,"src":"https:\/\/cdn.shopify.com\/s\/files\/1\/0290\/7829\/0525\/products\/white.png?v=1579056737","variant_ids":[31808334725213,31808334889053,31808335020125,31808335151197]},"available":true,"name":"The Emily - S \/ White","public_title":"S \/ White","options":["S","White"],"price":7000,"weight":0,"compare_at_price":null,"inventory_management":null,"barcode":"","featured_media":{"alt":"The Emily","id":6755679535197,"position":2,"preview_image":{"aspect_ratio":1.098,"height":776,"width":852,"src":"https:\/\/cdn.shopify.com\/s\/files\/1\/0290\/7829\/0525\/products\/white.png?v=1579056737"}}};
       if ( typeof variant.featured_image !== 'undefined' && variant.featured_image !== null ) {
         variantImage =  variant.featured_image.src.split('?')[0].replace(/http(s)?:/,'');
         variantImages[variantImage] = variantImages[variantImage] || {};
         
         
           
           
         	
           if (typeof variantImages[variantImage]["option-0"] === 'undefined') {
             variantImages[variantImage]["option-0"] = "S";
           }
           else {
             var oldValue = variantImages[variantImage]["option-0"];
             if ( oldValue !== null && oldValue !== "S" )  {
               variantImages[variantImage]["option-0"] = null;
             }
           }
         
         
           
           
         	
           if (typeof variantImages[variantImage]["option-1"] === 'undefined') {
             variantImages[variantImage]["option-1"] = "White";
           }
           else {
             var oldValue = variantImages[variantImage]["option-1"];
             if ( oldValue !== null && oldValue !== "White" )  {
               variantImages[variantImage]["option-1"] = null;
             }
           }
         
       }
       productOptions.push(variant);
    
       variant = {"id":31808334921821,"title":"S \/ Metallic Turquoise","option1":"S","option2":"Metallic Turquoise","option3":null,"sku":"LRT001-8","requires_shipping":true,"taxable":true,"featured_image":{"id":14604576358493,"product_id":4450733031517,"position":3,"created_at":"2020-01-14T21:52:21-05:00","updated_at":"2020-01-14T21:52:21-05:00","alt":null,"width":852,"height":776,"src":"https:\/\/cdn.shopify.com\/s\/files\/1\/0290\/7829\/0525\/products\/green.png?v=1579056741","variant_ids":[31808334757981,31808334921821,31808335052893,31808335183965]},"available":true,"name":"The Emily - S \/ Metallic Turquoise","public_title":"S \/ Metallic Turquoise","options":["S","Metallic Turquoise"],"price":7000,"weight":0,"compare_at_price":null,"inventory_management":null,"barcode":"","featured_media":{"alt":"The Emily","id":6755679993949,"position":3,"preview_image":{"aspect_ratio":1.098,"height":776,"width":852,"src":"https:\/\/cdn.shopify.com\/s\/files\/1\/0290\/7829\/0525\/products\/green.png?v=1579056741"}}};
       if ( typeof variant.featured_image !== 'undefined' && variant.featured_image !== null ) {
         variantImage =  variant.featured_image.src.split('?')[0].replace(/http(s)?:/,'');
         variantImages[variantImage] = variantImages[variantImage] || {};
         
         
           
           
         	
           if (typeof variantImages[variantImage]["option-0"] === 'undefined') {
             variantImages[variantImage]["option-0"] = "S";
           }
           else {
             var oldValue = variantImages[variantImage]["option-0"];
             if ( oldValue !== null && oldValue !== "S" )  {
               variantImages[variantImage]["option-0"] = null;
             }
           }
         
         
           
           
         	
           if (typeof variantImages[variantImage]["option-1"] === 'undefined') {
             variantImages[variantImage]["option-1"] = "Metallic Turquoise";
           }
           else {
             var oldValue = variantImages[variantImage]["option-1"];
             if ( oldValue !== null && oldValue !== "Metallic Turquoise" )  {
               variantImages[variantImage]["option-1"] = null;
             }
           }
         
       }
       productOptions.push(variant);
    
       variant = {"id":31808334954589,"title":"M \/ Blue","option1":"M","option2":"Blue","option3":null,"sku":"LRT001-9","requires_shipping":true,"taxable":true,"featured_image":{"id":14214607110237,"product_id":4450733031517,"position":1,"created_at":"2019-12-11T07:16:50-05:00","updated_at":"2020-01-14T21:52:17-05:00","alt":null,"width":852,"height":776,"src":"https:\/\/cdn.shopify.com\/s\/files\/1\/0290\/7829\/0525\/products\/Screen_Shot_2019-12-11_at_12.12.19.png?v=1579056737","variant_ids":[31808334659677,31808334823517,31808334954589,31808335085661]},"available":true,"name":"The Emily - M \/ Blue","public_title":"M \/ Blue","options":["M","Blue"],"price":7000,"weight":0,"compare_at_price":null,"inventory_management":null,"barcode":"","featured_media":{"alt":"The Emily","id":6365709238365,"position":1,"preview_image":{"aspect_ratio":1.098,"height":776,"width":852,"src":"https:\/\/cdn.shopify.com\/s\/files\/1\/0290\/7829\/0525\/products\/Screen_Shot_2019-12-11_at_12.12.19.png?v=1576066610"}}};
       if ( typeof variant.featured_image !== 'undefined' && variant.featured_image !== null ) {
         variantImage =  variant.featured_image.src.split('?')[0].replace(/http(s)?:/,'');
         variantImages[variantImage] = variantImages[variantImage] || {};
         
         
           
           
         	
           if (typeof variantImages[variantImage]["option-0"] === 'undefined') {
             variantImages[variantImage]["option-0"] = "M";
           }
           else {
             var oldValue = variantImages[variantImage]["option-0"];
             if ( oldValue !== null && oldValue !== "M" )  {
               variantImages[variantImage]["option-0"] = null;
             }
           }
         
         
           
           
         	
           if (typeof variantImages[variantImage]["option-1"] === 'undefined') {
             variantImages[variantImage]["option-1"] = "Blue";
           }
           else {
             var oldValue = variantImages[variantImage]["option-1"];
             if ( oldValue !== null && oldValue !== "Blue" )  {
               variantImages[variantImage]["option-1"] = null;
             }
           }
         
       }
       productOptions.push(variant);
    
       variant = {"id":31808334987357,"title":"M \/ Red","option1":"M","option2":"Red","option3":null,"sku":"LRT001-10","requires_shipping":true,"taxable":true,"featured_image":{"id":14604576489565,"product_id":4450733031517,"position":4,"created_at":"2020-01-14T21:52:22-05:00","updated_at":"2020-01-14T21:52:22-05:00","alt":null,"width":852,"height":776,"src":"https:\/\/cdn.shopify.com\/s\/files\/1\/0290\/7829\/0525\/products\/red_68f35a45-181c-4a31-a3c4-a96345803e9d.png?v=1579056742","variant_ids":[31808334692445,31808334856285,31808334987357,31808335118429]},"available":true,"name":"The Emily - M \/ Red","public_title":"M \/ Red","options":["M","Red"],"price":7000,"weight":0,"compare_at_price":null,"inventory_management":null,"barcode":"","featured_media":{"alt":"The Emily","id":6755680125021,"position":4,"preview_image":{"aspect_ratio":1.098,"height":776,"width":852,"src":"https:\/\/cdn.shopify.com\/s\/files\/1\/0290\/7829\/0525\/products\/red_68f35a45-181c-4a31-a3c4-a96345803e9d.png?v=1579056742"}}};
       if ( typeof variant.featured_image !== 'undefined' && variant.featured_image !== null ) {
         variantImage =  variant.featured_image.src.split('?')[0].replace(/http(s)?:/,'');
         variantImages[variantImage] = variantImages[variantImage] || {};
         
         
           
           
         	
           if (typeof variantImages[variantImage]["option-0"] === 'undefined') {
             variantImages[variantImage]["option-0"] = "M";
           }
           else {
             var oldValue = variantImages[variantImage]["option-0"];
             if ( oldValue !== null && oldValue !== "M" )  {
               variantImages[variantImage]["option-0"] = null;
             }
           }
         
         
           
           
         	
           if (typeof variantImages[variantImage]["option-1"] === 'undefined') {
             variantImages[variantImage]["option-1"] = "Red";
           }
           else {
             var oldValue = variantImages[variantImage]["option-1"];
             if ( oldValue !== null && oldValue !== "Red" )  {
               variantImages[variantImage]["option-1"] = null;
             }
           }
         
       }
       productOptions.push(variant);
    
       variant = {"id":31808335020125,"title":"M \/ White","option1":"M","option2":"White","option3":null,"sku":"LRT001-11","requires_shipping":true,"taxable":true,"featured_image":{"id":14604575899741,"product_id":4450733031517,"position":2,"created_at":"2020-01-14T21:52:17-05:00","updated_at":"2020-01-14T21:52:17-05:00","alt":null,"width":852,"height":776,"src":"https:\/\/cdn.shopify.com\/s\/files\/1\/0290\/7829\/0525\/products\/white.png?v=1579056737","variant_ids":[31808334725213,31808334889053,31808335020125,31808335151197]},"available":true,"name":"The Emily - M \/ White","public_title":"M \/ White","options":["M","White"],"price":7000,"weight":0,"compare_at_price":null,"inventory_management":null,"barcode":"","featured_media":{"alt":"The Emily","id":6755679535197,"position":2,"preview_image":{"aspect_ratio":1.098,"height":776,"width":852,"src":"https:\/\/cdn.shopify.com\/s\/files\/1\/0290\/7829\/0525\/products\/white.png?v=1579056737"}}};
       if ( typeof variant.featured_image !== 'undefined' && variant.featured_image !== null ) {
         variantImage =  variant.featured_image.src.split('?')[0].replace(/http(s)?:/,'');
         variantImages[variantImage] = variantImages[variantImage] || {};
         
         
           
           
         	
           if (typeof variantImages[variantImage]["option-0"] === 'undefined') {
             variantImages[variantImage]["option-0"] = "M";
           }
           else {
             var oldValue = variantImages[variantImage]["option-0"];
             if ( oldValue !== null && oldValue !== "M" )  {
               variantImages[variantImage]["option-0"] = null;
             }
           }
         
         
           
           
         	
           if (typeof variantImages[variantImage]["option-1"] === 'undefined') {
             variantImages[variantImage]["option-1"] = "White";
           }
           else {
             var oldValue = variantImages[variantImage]["option-1"];
             if ( oldValue !== null && oldValue !== "White" )  {
               variantImages[variantImage]["option-1"] = null;
             }
           }
         
       }
       productOptions.push(variant);
    
       variant = {"id":31808335052893,"title":"M \/ Metallic Turquoise","option1":"M","option2":"Metallic Turquoise","option3":null,"sku":"LRT001-12","requires_shipping":true,"taxable":true,"featured_image":{"id":14604576358493,"product_id":4450733031517,"position":3,"created_at":"2020-01-14T21:52:21-05:00","updated_at":"2020-01-14T21:52:21-05:00","alt":null,"width":852,"height":776,"src":"https:\/\/cdn.shopify.com\/s\/files\/1\/0290\/7829\/0525\/products\/green.png?v=1579056741","variant_ids":[31808334757981,31808334921821,31808335052893,31808335183965]},"available":true,"name":"The Emily - M \/ Metallic Turquoise","public_title":"M \/ Metallic Turquoise","options":["M","Metallic Turquoise"],"price":7000,"weight":0,"compare_at_price":null,"inventory_management":null,"barcode":"","featured_media":{"alt":"The Emily","id":6755679993949,"position":3,"preview_image":{"aspect_ratio":1.098,"height":776,"width":852,"src":"https:\/\/cdn.shopify.com\/s\/files\/1\/0290\/7829\/0525\/products\/green.png?v=1579056741"}}};
       if ( typeof variant.featured_image !== 'undefined' && variant.featured_image !== null ) {
         variantImage =  variant.featured_image.src.split('?')[0].replace(/http(s)?:/,'');
         variantImages[variantImage] = variantImages[variantImage] || {};
         
         
           
           
         	
           if (typeof variantImages[variantImage]["option-0"] === 'undefined') {
             variantImages[variantImage]["option-0"] = "M";
           }
           else {
             var oldValue = variantImages[variantImage]["option-0"];
             if ( oldValue !== null && oldValue !== "M" )  {
               variantImages[variantImage]["option-0"] = null;
             }
           }
         
         
           
           
         	
           if (typeof variantImages[variantImage]["option-1"] === 'undefined') {
             variantImages[variantImage]["option-1"] = "Metallic Turquoise";
           }
           else {
             var oldValue = variantImages[variantImage]["option-1"];
             if ( oldValue !== null && oldValue !== "Metallic Turquoise" )  {
               variantImages[variantImage]["option-1"] = null;
             }
           }
         
       }
       productOptions.push(variant);
    
       variant = {"id":31808335085661,"title":"L \/ Blue","option1":"L","option2":"Blue","option3":null,"sku":"LRT001-13","requires_shipping":true,"taxable":true,"featured_image":{"id":14214607110237,"product_id":4450733031517,"position":1,"created_at":"2019-12-11T07:16:50-05:00","updated_at":"2020-01-14T21:52:17-05:00","alt":null,"width":852,"height":776,"src":"https:\/\/cdn.shopify.com\/s\/files\/1\/0290\/7829\/0525\/products\/Screen_Shot_2019-12-11_at_12.12.19.png?v=1579056737","variant_ids":[31808334659677,31808334823517,31808334954589,31808335085661]},"available":true,"name":"The Emily - L \/ Blue","public_title":"L \/ Blue","options":["L","Blue"],"price":7000,"weight":0,"compare_at_price":null,"inventory_management":null,"barcode":"","featured_media":{"alt":"The Emily","id":6365709238365,"position":1,"preview_image":{"aspect_ratio":1.098,"height":776,"width":852,"src":"https:\/\/cdn.shopify.com\/s\/files\/1\/0290\/7829\/0525\/products\/Screen_Shot_2019-12-11_at_12.12.19.png?v=1576066610"}}};
       if ( typeof variant.featured_image !== 'undefined' && variant.featured_image !== null ) {
         variantImage =  variant.featured_image.src.split('?')[0].replace(/http(s)?:/,'');
         variantImages[variantImage] = variantImages[variantImage] || {};
         
         
           
           
         	
           if (typeof variantImages[variantImage]["option-0"] === 'undefined') {
             variantImages[variantImage]["option-0"] = "L";
           }
           else {
             var oldValue = variantImages[variantImage]["option-0"];
             if ( oldValue !== null && oldValue !== "L" )  {
               variantImages[variantImage]["option-0"] = null;
             }
           }
         
         
           
           
         	
           if (typeof variantImages[variantImage]["option-1"] === 'undefined') {
             variantImages[variantImage]["option-1"] = "Blue";
           }
           else {
             var oldValue = variantImages[variantImage]["option-1"];
             if ( oldValue !== null && oldValue !== "Blue" )  {
               variantImages[variantImage]["option-1"] = null;
             }
           }
         
       }
       productOptions.push(variant);
    
       variant = {"id":31808335118429,"title":"L \/ Red","option1":"L","option2":"Red","option3":null,"sku":"LRT001-14","requires_shipping":true,"taxable":true,"featured_image":{"id":14604576489565,"product_id":4450733031517,"position":4,"created_at":"2020-01-14T21:52:22-05:00","updated_at":"2020-01-14T21:52:22-05:00","alt":null,"width":852,"height":776,"src":"https:\/\/cdn.shopify.com\/s\/files\/1\/0290\/7829\/0525\/products\/red_68f35a45-181c-4a31-a3c4-a96345803e9d.png?v=1579056742","variant_ids":[31808334692445,31808334856285,31808334987357,31808335118429]},"available":true,"name":"The Emily - L \/ Red","public_title":"L \/ Red","options":["L","Red"],"price":7000,"weight":0,"compare_at_price":null,"inventory_management":null,"barcode":"","featured_media":{"alt":"The Emily","id":6755680125021,"position":4,"preview_image":{"aspect_ratio":1.098,"height":776,"width":852,"src":"https:\/\/cdn.shopify.com\/s\/files\/1\/0290\/7829\/0525\/products\/red_68f35a45-181c-4a31-a3c4-a96345803e9d.png?v=1579056742"}}};
       if ( typeof variant.featured_image !== 'undefined' && variant.featured_image !== null ) {
         variantImage =  variant.featured_image.src.split('?')[0].replace(/http(s)?:/,'');
         variantImages[variantImage] = variantImages[variantImage] || {};
         
         
           
           
         	
           if (typeof variantImages[variantImage]["option-0"] === 'undefined') {
             variantImages[variantImage]["option-0"] = "L";
           }
           else {
             var oldValue = variantImages[variantImage]["option-0"];
             if ( oldValue !== null && oldValue !== "L" )  {
               variantImages[variantImage]["option-0"] = null;
             }
           }
         
         
           
           
         	
           if (typeof variantImages[variantImage]["option-1"] === 'undefined') {
             variantImages[variantImage]["option-1"] = "Red";
           }
           else {
             var oldValue = variantImages[variantImage]["option-1"];
             if ( oldValue !== null && oldValue !== "Red" )  {
               variantImages[variantImage]["option-1"] = null;
             }
           }
         
       }
       productOptions.push(variant);
    
       variant = {"id":31808335151197,"title":"L \/ White","option1":"L","option2":"White","option3":null,"sku":"LRT001-15","requires_shipping":true,"taxable":true,"featured_image":{"id":14604575899741,"product_id":4450733031517,"position":2,"created_at":"2020-01-14T21:52:17-05:00","updated_at":"2020-01-14T21:52:17-05:00","alt":null,"width":852,"height":776,"src":"https:\/\/cdn.shopify.com\/s\/files\/1\/0290\/7829\/0525\/products\/white.png?v=1579056737","variant_ids":[31808334725213,31808334889053,31808335020125,31808335151197]},"available":true,"name":"The Emily - L \/ White","public_title":"L \/ White","options":["L","White"],"price":7000,"weight":0,"compare_at_price":null,"inventory_management":null,"barcode":"","featured_media":{"alt":"The Emily","id":6755679535197,"position":2,"preview_image":{"aspect_ratio":1.098,"height":776,"width":852,"src":"https:\/\/cdn.shopify.com\/s\/files\/1\/0290\/7829\/0525\/products\/white.png?v=1579056737"}}};
       if ( typeof variant.featured_image !== 'undefined' && variant.featured_image !== null ) {
         variantImage =  variant.featured_image.src.split('?')[0].replace(/http(s)?:/,'');
         variantImages[variantImage] = variantImages[variantImage] || {};
         
         
           
           
         	
           if (typeof variantImages[variantImage]["option-0"] === 'undefined') {
             variantImages[variantImage]["option-0"] = "L";
           }
           else {
             var oldValue = variantImages[variantImage]["option-0"];
             if ( oldValue !== null && oldValue !== "L" )  {
               variantImages[variantImage]["option-0"] = null;
             }
           }
         
         
           
           
         	
           if (typeof variantImages[variantImage]["option-1"] === 'undefined') {
             variantImages[variantImage]["option-1"] = "White";
           }
           else {
             var oldValue = variantImages[variantImage]["option-1"];
             if ( oldValue !== null && oldValue !== "White" )  {
               variantImages[variantImage]["option-1"] = null;
             }
           }
         
       }
       productOptions.push(variant);
    
       variant = {"id":31808335183965,"title":"L \/ Metallic Turquoise","option1":"L","option2":"Metallic Turquoise","option3":null,"sku":"LRT001-16","requires_shipping":true,"taxable":true,"featured_image":{"id":14604576358493,"product_id":4450733031517,"position":3,"created_at":"2020-01-14T21:52:21-05:00","updated_at":"2020-01-14T21:52:21-05:00","alt":null,"width":852,"height":776,"src":"https:\/\/cdn.shopify.com\/s\/files\/1\/0290\/7829\/0525\/products\/green.png?v=1579056741","variant_ids":[31808334757981,31808334921821,31808335052893,31808335183965]},"available":true,"name":"The Emily - L \/ Metallic Turquoise","public_title":"L \/ Metallic Turquoise","options":["L","Metallic Turquoise"],"price":7000,"weight":0,"compare_at_price":null,"inventory_management":null,"barcode":"","featured_media":{"alt":"The Emily","id":6755679993949,"position":3,"preview_image":{"aspect_ratio":1.098,"height":776,"width":852,"src":"https:\/\/cdn.shopify.com\/s\/files\/1\/0290\/7829\/0525\/products\/green.png?v=1579056741"}}};
       if ( typeof variant.featured_image !== 'undefined' && variant.featured_image !== null ) {
         variantImage =  variant.featured_image.src.split('?')[0].replace(/http(s)?:/,'');
         variantImages[variantImage] = variantImages[variantImage] || {};
         
         
           
           
         	
           if (typeof variantImages[variantImage]["option-0"] === 'undefined') {
             variantImages[variantImage]["option-0"] = "L";
           }
           else {
             var oldValue = variantImages[variantImage]["option-0"];
             if ( oldValue !== null && oldValue !== "L" )  {
               variantImages[variantImage]["option-0"] = null;
             }
           }
         
         
           
           
         	
           if (typeof variantImages[variantImage]["option-1"] === 'undefined') {
             variantImages[variantImage]["option-1"] = "Metallic Turquoise";
           }
           else {
             var oldValue = variantImages[variantImage]["option-1"];
             if ( oldValue !== null && oldValue !== "Metallic Turquoise" )  {
               variantImages[variantImage]["option-1"] = null;
             }
           }
         
       }
       productOptions.push(variant);
    
           });
