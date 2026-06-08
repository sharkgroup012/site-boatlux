<?php

    $nome = addslashes($_POST['name']);
    $mail = addslashes($_POST['email']);
    $assunt = addslashes($_POST['subject']);
    $msg = addslashes($_POST['message']);

    $to = "comercial@boatluxsp.com.br";
    $subject = "Contato via Site";
    $body = "Nome: " .$nome. "\r\n"
            ."E-mail: " .$mail. "\r\n"
            ."Assunto: " .$assunt. "\r\n"
            ."Mensagem: " .$msg;
    $header = "From: " .$mail."\r\n"
            ."X=Mailer:PHP/".phpversion();
            

    if(mail($to,$subject,$body,$header)){

        echo "<script>window.location='contato.html';alert('$nome, seu email foi enviado com sucesso!');</script>";
        
    }else{
        
        echo "<script>window.location='contato.html';alert('Contato não enviando, favor tentar novamente.');</script>";
        
    }


?>