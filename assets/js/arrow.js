
  // document.getElementById("nav__links").addEventListener("click", function(e) {
  //   const tgt = e.target;
  //   if (tgt.classList.contains('bx-chevron-down')) { // make sure we only target elements with this class
  //     tgt.classList.toggle('open');
  //     // here you can test tgt.classList.contains('open') to see the state
  //   }
  // });

  
$('#nav__links').click(function() {
    icon = $(this).find("i");
    if( icon.hasClass("bx-chevron-down open"))
    {
      icon.removeClass("open");
    }
    else{     
        icon.addClass("open");
      }
});
