( function( $ ){
    // Constants
    var PLUGIN_NS = 'vmPVD';

    // Default settings object
    var defaults = {
        // properties
        cookies: {
            pvd: 'pvd_On',
            classes: {
                // fontSize
                pvd_fs: {
                    names: ['pvd_fontSizeBig', 'pvd_fontSizeBigger', 'pvd_fontSizeBiggest'],
                    count: 3,
                    caption: 'Размер шрифта',
                    content: ['A', 'A', 'A'],
                    mobileContent: ['A', 'A', 'A']
                },
                // showImage
                pvd_si: {
                    names: ['pvd_imageYes', 'pvd_imageNo'],
                    count: 2,
                    caption: 'Изображения',
                    content: ['Вкл', 'Выкл'],
                    mobileContent: ['Вкл', 'Выкл']
                },
                // letterSpacing
                pvd_ls: {
                    names: ['pvd_letterSpacingBig', 'pvd_letterSpacingBigger', 'pvd_letterSpacingBiggest'],
                    count: 3,
                    caption: 'Интервал между буквами',
                    content: ['Нормальный', 'Увеличенный', 'Большой'],
                    mobileContent: ['Aa', 'Aa', 'Aa']
                },
                // fontColor and backgroundColor
                pvd_sc: {
                    names: ['pvd_theme1', 'pvd_theme2', 'pvd_theme3'],
                    count: 3,
                    caption: 'Цвет сайта',
                    content: ['A', 'A', 'A'],
                    mobileContent: ['A', 'A', 'A']
                }
                // lineHeight
                // pvd_lh: {
                //     names: ['pvd_lineHeightBig', 'pvd_lineHeightBigger','pvd_lineHeightBiggest'],
                //     count: 3,
                //     caption: 'Высота строки',
                //     content: ['Нормальный', 'Увеличенный', 'Большой']
                // },
                // fontFamily
                //pvd_ff: {
                //    names: ['pvd_fontFamilySans', 'pvd_fontFamilySerif'],
                //    count: 2,
                //    caption: 'Гарнитура',
                //    content: ['С засечками', 'Без засечек']
                //},
            }
        },

        // callbacks
        activated: function(){
            console.log('activated');
        },
        deactivated: function(){
            console.log('deactivated');
        },
        hideImg: function(){
            console.log('Images was hide');
        },
        showImg: function(){
            console.log('Images was shown');
        }
    };

    // Test callbacks
    function activateCall(){
        var $slider_news = $('.news__slider .slider_sm');
        $slider_news.trigger('refresh.owl.carousel');
    }
    function deactivatedCall(){
        var $slider_news = $('.news__slider .slider_sm');
        $slider_news.trigger('refresh.owl.carousel');
    }

    $.fn.vmPVD = function( method ){
        var it = $( this ),
            plugin = it.data( PLUGIN_NS );

        if( plugin && typeof method === 'string' ){
            if( plugin[method] ) return plugin[method].apply( this, Array.prototype.slice.call( arguments, 1 ) );
            else $.error( 'A method named  ' + method + ' does not exist for jQuery.vmPVD' );
        }
        else if( plugin && typeof method === 'object' ) plugin['option'].apply( plugin, arguments );
        else if( typeof method === 'object' || !method ) return init.apply( this, arguments );

        return it;
    };
    $.fn.vmPVD.defaults = defaults;

    function init( options ){
        if( !options ) options = {};
        options = $.extend( {}, $.fn.vmPVD.defaults, options );

        return this.each( function(){
            var it = $( this );

            var plugin = it.data( PLUGIN_NS );

            if( !plugin ){
                plugin = new VmPVD( it, options );
                it.data( PLUGIN_NS, plugin );
            }
        });
    }

    function VmPVD( element, options ){
        var options = $.extend( {}, options );
        
        // Body
        var body = $( 'body' );

        // Methods for work with cookie
        // var cookie = new Cookie;
        var cookie = cookieModule;

        // Magic ;)
        var isActive = cookie.get( 'pvd' );
        
        if( isActive === 'pvd_On' ){
            element.addClass( 'active' );
            togglePVD( options.cookies, true );
        }

        element.on( 'click', function(){
            var it = $( this );

            if( it.hasClass( 'active' ) ){
                togglePVD( options.cookies, true );
                PVD_preloader.getPreloader();
            }
            else{
                togglePVD( options.cookies, false );
                options.deactivated();
            }
        });

        // Public methods
        this.showData = function(){
            console.log( 'showData: ', $( this ).data( PLUGIN_NS ) );
        };
        this.setData = function( str ){
            console.log( 'Your data is: ' + str );
        };


        // Helpers

        function togglePVD( cookieObject, isEnable ){
            var classString = 'pvd_On ',
                cookieObject = cookieObject.classes;

            isActive = cookie.get( 'pvd' );

            for( var key in cookieObject ){
                if( !isEnable || ( isEnable && isActive ) ){
                    if( !cookie.get( key ) ) {
                        classString = undefined;
                        break;
                    }
                    classString += cookie.get( key ) + ' ';
                }
                else if( isEnable && !isActive ){
                    cookie.set( key, cookieObject[key].names[0] );
                    classString += cookieObject[key].names[0] + ' ';
                }
            }

            togglePanel();
            cookie.set( 'pvd', isEnable ? 'pvd_On' : ( isActive ? 'pvd_Off' : '' ) );
            switchClasses( classString, isEnable );
            toggleLink( isEnable ); // Toggle create/remove css file (and set activated callback function by add event listener to load event of css file)
        }
        function switchClasses( classString, isEnable ){
            if( isEnable ) body.addClass( classString );
            else removeClasses();
        }
        function removeClasses(){
            var classesNew = body.attr( 'class' ).replace( /pvd_\w+\s?/g, '' );
            body.attr( 'class', classesNew );
        }
        function toggleLink( isEnable ){
            var head = $( 'head' ),
                link = createLink();

            if( isEnable ) head.append( link );
            else head.find( '#pvdStyle' ).remove();
        }
        function createLink(){
            var link = $( '<link>', {
                'id': 'pvdStyle',
                'rel': 'stylesheet',
                'type': 'text/css',
                'href': '/css/spec.css',
                'media': 'all',
                'load': function(){
                    options.activated();
                    removePreloader();
                    console.log('load');
                }
            });
            return link;
        }
        function togglePanel(){
            if( $( '.pvd-temp' ).length ) $( '.pvd-temp' ).toggle();
            else createPanel();
        }
        function createPanel(){
            // Tags
            var section = $( '<section />', { 'class': 'pvd-panel pvd-temp' }),
                block,
                caption,
                content,
                button;

            // Settings object
            var settings = options.cookies.classes;

            var active;

            for( var key in settings ){
                block = $( '<div />', {
                    'class': 'pvd-block ' + key,
                    'data-cookie-key': key
                });
                caption = $( '<div />', {
                    'class': 'pvd-caption',
                    'text': settings[key].caption
                });
                content = $( '<div />', {
                    'class': 'pvd-content'
                });

                active = cookie.get( key );

                for( var i = 0, l = settings[key].count; i < l; i++ ){
                    button = $( '<button />', {
                        'class': 'pvd-control ' + settings[key].names[i] + ( ( active === settings[key].names[i] ) ? ' active' : '' ),
                        'data-cookie-value': settings[key].names[i],
                        'html': '<span class="button-text-desktop">' + settings[key].content[i]  + '</span><span class="button-text-mobile">' + settings[key].mobileContent[i] + '</span>',
                        'click': buttonClick
                    });
                    content.append( button );
                }

                block.append( caption, content );
                section.append( block );
            }
            $('body').prepend( section );
        }
        function buttonClick(){
            var it = $( this ),
                block = it.closest( '.pvd-block' ),

                prevActiveButton = block.find( '.active' ),
                prevActiveButtonClass = prevActiveButton.attr( 'data-cookie-value' ),

                cookieKey = block.attr( 'data-cookie-key' ),
                cookieValue = it.attr( 'data-cookie-value' );

            changeCookie( cookieKey, cookieValue );
            changeBodyClass( prevActiveButtonClass, cookieValue );
            addActiveClass( it, prevActiveButton );
        }
        function changeCookie( cookieKey, cookieValue ){
            cookie.set( cookieKey, cookieValue );
        }
        function changeBodyClass( classNameRemove, classNameAdd ){
            body.removeClass( classNameRemove ).addClass( classNameAdd );
        }
        function addActiveClass( newActiveButton, prevActiveButton ){
            prevActiveButton.removeClass( 'active' );
            newActiveButton.addClass( 'active' );
        }
        function removePreloader(){
            if( $( '#pvm-preloader' ).length ) {
                $( '#pvm-preloader' ).fadeOut( function(){
                    $( this ).remove();
                });
            }
        }
        function long() {
            var start = 50000;
            while( start ){
                console.log(start);
                start--;
            }
        }
    }

})( jQuery );