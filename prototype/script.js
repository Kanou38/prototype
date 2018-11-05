$(function() {

    //onLoadPage add 'mise en avant' content
    fcn_url('cadeau-photo-noel-mise-en-avant.asp','site');

    // init Isotope
    var $grid = $('.tule').isotope({
        itemSelector: '.tule__item',
        filter:'.who',
        masonry: {
            columnWidth: 490,
            gutter: 16
        }
    });


    $('#christmas-2018').on('click', '.tule__item, .btn__tuleReStart-container, .btn__tuleReStart-container-menu, .menu__item', function(e){
            e.preventDefault();
        var filterValue,dataUrl,dataId;

        filterValue = $(this).closest('.link-container').find('a').data('filter');
        dataUrl = $(this).closest('.link-container').find('a').data('url');
        dataId = $(this).closest('.link-container').find('a').data('id');

        if(dataUrl && dataId){
            fcn_url(dataUrl,dataId);        	
            // $('.christmas-head, .christmas-choice').hide();
        }

        if(filterValue){
            $grid.isotope({
                filter: filterValue
            });
        }
    })

    // change is-checked class on buttons
    $('.menu').each(function (i, buttonGroup) {
        var $buttonGroup = $(buttonGroup);
        $buttonGroup.on('click', 'button', function () {
            $buttonGroup.find('.is-checked').removeClass('is-checked');
            $(this).addClass('is-checked');
        });
    });

    // sticky menu
    $(window).scroll(function (event) {
        var y = $(this).scrollTop();
        // if (y >= 258) {
        // 	$('.menu').addClass('fixed');			  		
        // } else {
        // 	$('.menu').removeClass('fixed');
        // }
    });


    function fcn_url(url,id) {
        $.ajax({
            url: url,
            type: 'GET',
            success: function (data) {
                $('.christmas-content').html(data);
                $('.christmas-content').attr('id',id);
                if(id != 'mse'){
                    ScrollToId(id);	
                } else{
                    ScrollToId('christmas-2018');
                    // $('.christmas-head, .christmas-choice').show();
                }
            },
            fail: function () {
                setError("Erreur lors du changement du fichier de la boutique de Noel 2018 de Photoweb");
            }
        });
    }

    function ScrollToId(idToGo){
        $('html, body').animate({scrollTop: $('#'+idToGo).offset().top-100 }, 500);
    }


    /*  -----   DYNAMIC PROMOTION ----------   */

       //construction url à injecter 
       var getIdProduct = new Array();       
       var urlToSendToJSON = 'showcaseProductIds%5B%5D=';

       var allProductIds = [];
       $('.banner-promotion').each(function() {  
           var idProduct = $(this).data('showcase-product-id');
           //on rempli le tableau que si l'index n'existe pas : pas de doublons !
           if (allProductIds.indexOf(idProduct) === -1) {
               allProductIds.push(idProduct);
           }
       });

       //concaténation des showcaseProductIds nécessaire pour la boutique
       urlToSendToJSON += allProductIds.join('&showcaseProductIds%5B%5D=');

       var url = "https://www.photoweb.fr/services/core-api/Banner?"+urlToSendToJSON;
       //on parse le ficher json pour récupérer les promotions. On remplis que les div qui sont présentent dans le fichier Json
       $.getJSON(url, function(data){
           $.each(data, function (index, value) {
               $('[data-showcase-product-id='+value.id+']').append("<span class=floatLeft>Bon plan :</span> <p>"+value.html+"</p>");
           });

       });

       /*  -----   DYNAMIC PROMOTION ----------   */

   });





