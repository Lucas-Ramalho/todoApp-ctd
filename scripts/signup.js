const createUserButtonElement = document.querySelector('#createUserButton')
const formControlsElements = document.querySelectorAll('.form-control')

// Obtenção de Todos os Inputs do meu HTML em formato de Array
const allInputsElements = document.querySelectorAll('input')

// código linha 7 até 43 se refere a validação dos campos
var formValidation = {
    firstName: false,
    lastName: false,
    email: false,
    password: false,
    passwordConfirm: false
}

for (let control of formControlsElements) {

    const controlInputElement = control.children[1]
    const confirm_password = formControlsElements[4]
    const password = formControlsElements[3]

    controlInputElement.addEventListener('keyup', event => {

        let inputValid = event.target.checkValidity()
        formValidation[event.target.id] = inputValid

        // Validando Campos Nome, Sobrenome, Email, Senha
        if (inputValid) {
            control.classList.remove('error')
        } else {
            control.classList.add('error')
        }

        // Validando Campo Comfirmar Senha
        if(password.children[1].value !== confirm_password.children[1].value){
            formControlsElements[4].classList.add('error')
        } else {
            formControlsElements[4].classList.remove('error') 
        }

    })

}

// Obtendo os valores digitados dos campos validados
for(let input of allInputsElements) {

    input.addEventListener('keyup', event => {
        const inputValue = input.value
        const inputId = input.id

        formData[inputId] = inputValue
        console.log(formData)
    })
}

// Criando o objeto vazio para cadastro do usuario
var formData = {
    firstName: '',
    lastName: '',
    email: '',
    password: ''
}


// Função para criar o usuário
function createUser() {

    var requestHeaders = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
    
    // Variavel que irá conter o nosso objeto de configuração da requisição
    var requestPostConfiguration = {
        method: 'POST',
        headers: requestHeaders
    }

    requestPostConfiguration.body = JSON.stringify(formData)

      // O Fetch é responsável por fazer uma requisição para um back-end
      // O parametro do fetch serve justamente para especificarmos aonde ele irá fazer a requisição
      fetch('https://ctd-fe2-todo-v2.herokuapp.com/v1/users', requestPostConfiguration).then(

        response => {
            response.json().then(
                info => {
                    if(response.ok == true) {
                        alert('Parabens! Usuário criado com sucesso.')
                        window.location = '../index.html'
                    } else {
                        if(info === 'El usuario ya se encuentra registrado') {
                            alert('O e-mail digitado ja esta cadastrado')
                        }

                    }

                }

            )

        }

    )

}

// Ação executada ao clicar no botão criar conta -> Se os campos estiverem validados
// executa a requisicao de criação do usuário, caso contrário retorna dados inválidos

createUserButtonElement.addEventListener('click', event => {

    event.preventDefault()

    let formValid = Object.values(formValidation).every(Boolean)

    if (formValid) {

        createUser()
        
        
    } else {

        alert('Dados Preenchidos incorretamente!')
    }
})

