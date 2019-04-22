;
var PVD_preloader = ( function(){
    var getPreloader = function() {
        if ( !cookieModule.get('pvd') || cookieModule.get('pvd') === 'pvd_Off') return;

        var PVD_preloader = $('<div id="pvm-preloader">');
        PVD_preloader.append('' +
            '<svg xmlns:svg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.0" width="64px" height="64px" viewBox="0 0 128 128" xml:space="preserve" class="preload-img"><g>\n' +
            '<circle cx="16" cy="64" r="14" fill-opacity="1"></circle>\n' +
            '<circle cx="16" cy="64" r="12.344" fill-opacity="1" transform="rotate(45 64 64)"></circle>\n' +
            '<circle cx="16" cy="64" r="10.531" fill-opacity="1" transform="rotate(90 64 64)"></circle>\n' +
            '<circle cx="16" cy="64" r="8.75" fill-opacity="1" transform="rotate(135 64 64)"></circle>\n' +
            '<circle cx="16" cy="64" r="8.063" fill-opacity="1" transform="rotate(180 64 64)"></circle>\n' +
            '<circle cx="16" cy="64" r="6.063" fill-opacity="1" transform="rotate(225 64 64)"></circle>\n' +
            '<circle cx="16" cy="64" r="4.438" fill-opacity="1" transform="rotate(270 64 64)"></circle>\n' +
            '<circle cx="16" cy="64" r="3.375" fill-opacity="1" transform="rotate(315 64 64)"></circle>\n' +
            '<animateTransform attributeName="transform" type="rotate" values="0 64 64;315 64 64;270 64 64;225 64 64;180 64 64;135 64 64;90 64 64;45 64 64" calcMode="discrete" dur="720ms" repeatCount="indefinite"></animateTransform>\n' +
            '</g>\n' +
            '</svg>\n' +
            '</div>');

        switch (cookieModule.get('pvd_sc')) {
            case 'pvd_theme1':
                PVD_preloader.attr('class', '').addClass('pvd_theme1');
                break;
            case 'pvd_theme2':
                PVD_preloader.attr('class', '').addClass('pvd_theme2');
                break;
            case 'pvd_theme3':
                PVD_preloader.attr('class', '').addClass('pvd_theme3');
                break;
        }

        $('body').prepend(PVD_preloader);
    };
    return{
        getPreloader: getPreloader
    }
})();