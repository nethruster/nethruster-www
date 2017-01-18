<?php
	//Guarda como objeto JSON la respuesta de Google Recaptcha.
	$gcheck = json_decode(file_get_contents("https://www.google.com/recaptcha/api/siteverify?secret=6LfiixUTAAAAAGdBGfPsdKhqdzllJBRuHjDItoI4&response=".$_POST['g_res']."&remoteip=".$_SERVER['REMOTE_ADDR']));
	$status = false;
	if ($gcheck->success) {
	 	// Guardar los datos recibidos en variables:
		$nombre = $_POST['nombre'];
		$mail = $_POST['mail'];
		$msg = $_POST['msg'];
		// Definir el correo de destino:
		$dest = "nethruster@gmail.com"; 
		 
		// Estas son cabeceras que se usan para evitar que el correo llegue a SPAM:
		$headers = "From: $nombre <webform@nethruster.com>\r\n";  
		$headers .= "X-Mailer: PHP5\n";
		$headers .= 'MIME-Version: 1.0' . "\n";
		$headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";
		 
		// Aqui definimos el asunto y armamos el cuerpo del mensaje
		$asunto = "Contacto - ". $mail;
		$cuerpo = "Nombre: ".$nombre."<br>";
		$cuerpo .= "Email: ".$mail."<br>";
		$cuerpo .= "Mensaje: <br>".$msg;
		 
		// Esta es una pequena validación, que solo envie el correo si todas las variables tiene algo de contenido:

		if($nombre && $mail && $msg){
		    $status = mail($dest,$asunto,$cuerpo,$headers); //ENVIAR!
		}
	}
	if (!$status) {
		header('HTTP/1.1 500 Internal Server mail send fail');
	}
?>