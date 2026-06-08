
function sendwhatsapp(){
    var phonenumber = "+5512996010000";
    
    var name = document.querySelector("#name").value;
    var email = document.querySelector("#email").value;
    var assunt = document.querySelector("#subject").value;
    var msg = document.querySelector("#message").value;

    var url = "https://wa.me/" + phonenumber + "?text="
    +"FORMULÁRIO DE CADASTRO DO SITE:"+"%0a"
    +"%0a"
    +"Nome: "+name+"%0a"
    +"E-mail: "+email+"%0a"
    +"Assunto: "+assunt+"%0a"
    +"Mensagem: "+msg;
    

    window.open(url, '_blank').focus();
}