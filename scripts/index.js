const inputsElements = document.querySelectorAll('input')
var loginButtomElement = document.querySelector('#loginButton')
const formControlsElements = document.querySelectorAll('.form-control')


// Validacao do campos
var loginValidation = {
    email: false,
    password: false
}

for (let control of formControlsElements) {

    const controlInputElement = control.children[1]

    controlInputElement.addEventListener('keyup', event => {

        let loginValid = event.target.checkValidity()
        loginValidation[event.target.id] = loginValid

         // Validando Campos Nome, Sobrenome, Email, Senha
         if (loginValid) {
            control.classList.remove('error')
        } else {
            control.classList.add('error')
        }
    })

}

// Obtendo os valores digitados dos campos validados
for (let input of inputsElements) {

    input.addEventListener('keyup', event => {
        loginPersonal[input.id] = input.value
    })

}

// Criando o objeto vazio para login do usuario
let loginPersonal = {
    email: '',
    password: ''
}

// função de validacao do login
function loginAutentication() {

    var requestHeaderslogin = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
    
    let requestConfigurationLogin = {
        method:'POST',
        headers: requestHeaderslogin,
        body: JSON.stringify(loginPersonal)
    }

    fetch('https://ctd-fe2-todo-v2.herokuapp.com/v1/users/login', requestConfigurationLogin).then(

    response => {
        response.json().then(
            info => {
                if(response.ok == true){
                    localStorage.setItem('token', info.jwt)
                    
                    window.location.href = 'pages/tarefas.html'    
                } else {
        
                    if(info  === 'El usuario no existe') {
                        alert('O usuário informado não existe')

                    }
                    else if(info  === 'Contraseña incorrecta') {
                        alert('Senha incorreta')
                    }
                }
            }
        )
    })
}


// Botão de ação para o login
loginButtomElement.addEventListener('click', event => {

    event.preventDefault()
    console.log(loginValidation)
    
    let loginValid = Object.values(loginValidation).every(Boolean)
    
    if (loginValid) {

        
        loginAutentication()
        
        
        
        
    } else {

        alert('Preencha todos os campos de login')
    }

})
