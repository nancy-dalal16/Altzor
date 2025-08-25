// On Scroll Animation Intialization
AOS.init();

$('#testimonial').owlCarousel({
    loop: false,
    margin: 0,
    responsiveClass: true,
    autoplay: false,
    nav: false,
    dots: false,
    responsive: {
        0: {
            items: 1,
            autoplay: true,
            loop: true,
        },
        600: {
            items: 1,
            autoplay: true,
            loop: true,
        },
        1000: {
            items: 2,
        },
        1200: {
            items: 3,
        }
    }
});