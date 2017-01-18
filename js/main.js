function readCookie(name) {
    return (name = new RegExp('(?:^|;\\s*)' + ('' + name).replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&') + '=([^;]*)').exec(document.cookie)) && name[1];
}
function AllowPolicyCookies(){
	document.cookie="PolicyCookies=true; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/";
	document.getElementById("card_cookies").style.opacity="0";
	setTimeout(function(){document.getElementById("card_cookies").style.display="none";}, 1000);
}
$(document).ready(function() {
    $(".button-collapse").sideNav();
    $('.modal-trigger').leanModal();
    if (!readCookie("PolicyCookies")) {
		$('#cookie_modal').openModal();
	} 
	if (navigator.appName == 'Microsoft Internet Explorer' ||  !!(navigator.userAgent.match(/Trident/) || navigator.userAgent.match(/rv 11/)) || $.browser.msie == 1){
		alert("Para obtener una experiencia completa le recomendamos que utilize otro navegador web tal como Google Chrome o Firefox");
	}
});
function mobileTabChange(id){
	$('ul.tabs').tabs('select_tab', id);
	$('.button-collapse').sideNav('hide');
}
