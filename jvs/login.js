document.getElementById("formulario").addEventListener("submit", function(event){
    event.preventDefault();
    var formData = new FormData(this);

    //Enviar datos del formulario mediante AJAX
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "../inventario/php/login.php", true);
    xhr.onload = function() {

        var username = document.getElementById('username').value;
        var password = document.getElementById('password').value;

        if (xhr.status === 200) {
        
            if (xhr.responseText.includes("Inicio de sesión exitoso")){
                localStorage.setItem('username', username);
                if (username === 'admin' && password === '1234'){

                    window.location.href = "../HTMLModElement.html"
                    window.location.href = "../inventario/home.html"

                } else {
                    window.location.href = "../HTMLModElement.html";
                    window.location.href = "../inventario/home.html"
                }
                
                
            } else {
                document.getElementById("errorMessage").textContent = "Error: "+xhr.responseText;
            }
        } else {
            document.getElementById("errorMessage").textContent = xhr.responseText;
        } 
    };
    xhr.send(formData);
});

document.getElementById("password-missed").addEventListener("click",function(){
    function getUsernameFromURL() {
        var username = document.getElementById("username").value; // Obtener el nombre de usuario
        localStorage.setItem("failedLoginUsername", username);
        window.location.href = "./gestionUsuario.html?forgotPassword=true&username=" + encodeURIComponent(username);
    }
})

