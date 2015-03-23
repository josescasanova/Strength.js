/*!
 * strength.js
 * Original author: @aaronlumsden
 * Further changes, comments: @aaronlumsden, @nyon
 * Licensed under the MIT license
 */
;(function($, window, document) {
    var defaults = {
        strengthClass: 'strength',
        strengthMeterClass: 'strength_meter',
        strengthButtonClass: 'button_strength',
        strengthButtonText: 'Show Password',
        strengthButtonTextToggle: 'Hide Password'
    };


    function Plugin( element, options ) {
        this.element = element;
        this.$elem = $(this.element);
        this.options = $.extend( {}, defaults, options );
        this._defaults = defaults;
        this.init();
    }

    Plugin.prototype = {
        init: function() {
            function check_strength(thisval,thisid) {
                // calculate bit count that is needed to store this password
                var bit_strength = Math.log2(Math.max(1, $.unique(thisval.split('')).length));

                // Now check for different password guidelines and amplify bit strength
                if (thisval.match(/[A-Z]/)) bit_strength *= 1.5;
                if (thisval.match(/[a-z]/)) bit_strength *= 1.2;
                if (thisval.match(/[0-9]/)) bit_strength *= 1.2;
                if (thisval.match(/[!%&@#$^*?_~,]/)) bit_strength *= 1.5;

                // Amplify by password length
                bit_strength *= Math.log2(Math.max(1, thisval.length));



                var thismeter = $('div[data-meter="'+thisid+'"]');
                thismeter.removeClass();
                if(bit_strength >= 40.0) thismeter.addClass('strong').html('strong');
                else if(bit_strength >= 20.0) thismeter.addClass('medium').html('medium');
                else if(bit_strength >= 15.0) thismeter.addClass('weak').html('weak');
                else if(bit_strength > 0.0) thismeter.addClass('veryweak').html('very weak');
                else thismeter.removeClass().html('Strength');
            }



            var isShown = false;
            var strengthButtonText = this.options.strengthButtonText;
            var strengthButtonTextToggle = this.options.strengthButtonTextToggle;


            thisid = this.$elem.attr('id');


            this.$elem.addClass(this.options.strengthClass).attr('data-password',thisid).after('<input style="display:none" class="'+this.options.strengthClass+'" data-password="'+thisid+'" type="text" name="" value=""><a data-password-button="'+thisid+'" href="" class="'+this.options.strengthButtonClass+'">'+this.options.strengthButtonText+'</a><div class="'+this.options.strengthMeterClass+'"><div data-meter="'+thisid+'">Strength</div></div>');

            this.$elem.on('keyup', function(e) {
                thisid = $(e.target).attr('id');
                thisval = $('#'+thisid).val();
                $('input[type="text"][data-password="'+thisid+'"]').val(thisval);
                check_strength(thisval,thisid);

            });

            $('input[type="text"][data-password="'+thisid+'"]').on('keyup', function(e) {
                thisval = $(e.target).val();
                $('input[type="password"][data-password="'+$(e.target).data('password')+'"]').val(thisval);
                check_strength(thisval,thisid);
            });

            $(document.body).on('click', '.'+this.options.strengthButtonClass, function(e) {
                e.preventDefault();
                thisclass = 'hide_'+$(this).attr('class');

                if (isShown) {
                    $('input[type="text"][data-password="'+thisid+'"]').hide();
                    $('input[type="password"][data-password="'+thisid+'"]').show().focus();
                    $('a[data-password-button="'+thisid+'"]').removeClass(thisclass).html(strengthButtonText);
                    isShown = false;

                } else {
                    $('input[type="text"][data-password="'+thisid+'"]').show().focus();
                    $('input[type="password"][data-password="'+thisid+'"]').hide();
                    $('a[data-password-button="'+thisid+'"]').addClass(thisclass).html(strengthButtonTextToggle);
                    isShown = true;
                }
            });
        }
    };

    $.fn.strength = function ( options ) {
        return this.each(function () {
            $(this).data("strength", new Plugin( this, options ));
        });
    };

})(jQuery, window, document);


