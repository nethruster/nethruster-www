function sendmail(){
	var nombre = document.getElementById("con_nombre").value;
	var mail = document.getElementById("con_mail").value;
	var msg = document.getElementById("con_msg").value;
	var google_recaptcha_status = grecaptcha.getResponse();
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	if(!nombre){
		$("#con_nombre").focus();
            Materialize.toast('<span class="red-text text-accent-2">Por favor introduzca su nombre</span>', 2000);   
            return false;
	}else if(!mail || !regex.test(mail)){
	    $("#con_mail").focus();    
        Materialize.toast('<span class="red-text text-accent-2">Por favor revise su e-mail</span>', 2000);
	    return false;
    }else if(!msg){
    	$("#con_msg").focus();
        Materialize.toast('<span class="red-text text-accent-2">Por favor introduzca su mensaje</span>', 2000);    
	    return false;
    }else if(google_recaptcha_status === ""){
        Materialize.toast('<span class="red-text text-accent-2">Por favor resuelva el Captcha</span>', 2000);
    }else{
    	$('#con_load_container').removeClass('hide');
        $('#con_submit').addClass("disabled");
    	var datos = 'nombre='+ nombre + '&mail=' + mail + '&msg=' + msg + '&g_res=' + google_recaptcha_status;
                $.ajax({
                    type: "POST",
                    url: "php/mail.php",
                    data: datos,
                    success: function() {
                        $('#con_load_container').hide();
                        Materialize.toast('<span class="teal-text text-accent-3">¡Mensaje enviado!</span>', 5000);
                        document.getElementById("con_msg").value = "";
                        grecaptcha.reset();
                        $('#con_msg').trigger('autoresize');
                        $('#con_submit').removeClass("disabled");
                    },
                    error: function() {
                        $('#con_load_container').hide();
                        Materialize.toast('<span class="red-text text-accent-2">Error al enviar, revise el formulario</span>', 5000);
                        grecaptcha.reset();
                        $('#con_submit').removeClass("disabled");           
                    }
                });
                return false;
    }

}