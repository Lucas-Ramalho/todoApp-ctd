let closePage = document.querySelector('#closeApp')
let token = localStorage.getItem('token')
let novaTarefa = document.querySelector('#novaTarefa')
const userDados = document.querySelector('#nameUser')
const createTaskButtonElement = document.querySelector('#createTaskButton')
const skeletonElement = document.querySelector('#skeleton')
const listTasks = document.querySelector('.tarefas-pendentes')
const listTasksTrue = document.querySelector('.tarefas-terminadas')
const headersAuthRequest = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': token
}


function getInfoUser() {
    
    fetch('https://ctd-fe2-todo-v2.herokuapp.com/v1/users/getMe', {headers: headersAuthRequest} ).then(

        response => {

            if(response.ok) {

                response.json().then (

                    user => {
                        userDados.innerText = `Olá, ${user.firstName} ${user.lastName}`
                       }
   

                )
            
        
            } else {
        
                 localStorage.clear()
                 window.location.href = './../index.html'
        }
    })
}


// é aqui que recebemos e executamos as tarefas
function getTasks() {

    fetch('https://ctd-fe2-todo-v2.herokuapp.com/v1/tasks', {headers: headersAuthRequest}).then(

        response => {

            response.json().then(

                tasks => {

                    skeletonElement.style.display = 'none'

                    listTasks.innerHTML = ''

                    listTasksTrue.innerHTML = ''

                    

                    for(let task of tasks){
                   //     console.log(task)

                        let dataCriacao = new Date(task.createdAt)
                        let dataCriacaoFormatada = dataCriacao.toLocaleDateString('pt-BR',
                                {
                                    day: '2-digit',
                                    month: '2-digit',
                                    year: 'numeric'
                                }
                        )

                        if(task.completed) {

                            listTasksTrue.innerHTML += `
                            
                        <li class="tarefa">
                            <div class="not-done" onclick="updateTask(${task.id}, ${task.completed})"></div>
                            <div class="descricao">
                                <p class="nome">${task.description}</p>
                                <p class="timestamp">Criada em: ${dataCriacaoFormatada}</p>
                                <button type="submit">
                                <img src="./../assets/lixeira.png" onclick="deleteTask(${task.id})" alt="Excluir tarefa">
                              </button>
                            </div>
                        </li>

                        `
                        } else {
                           
                            listTasks.innerHTML += `
                            
                            <li class="tarefa">
                                <div class="not-done" onclick="updateTask(${task.id}, ${task.completed})"></div>
                                <div class="descricao">
                                    <p class="nome">${task.description}</p>
                                    <p class="timestamp">Criada em: ${dataCriacaoFormatada}</p>
                                    <button type="submit">
                                    <img src="./../assets/lixeira.png" onclick="deleteTask(${task.id})" alt="Excluir tarefa">
                                  </button>
                                </div>
                            </li>

                          `
                            
                        }
                    }

                }
            )

        }
    )

}

function updateTask(id, completed) {

    let requestConfig = {
        method: 'PUT',
        headers: headersAuthRequest,
        body: JSON.stringify ({completed: !completed})

    }

    fetch(`https://ctd-fe2-todo-v2.herokuapp.com/v1/tasks/${id}`, requestConfig).then(

            response => {

                if(response.ok){
                    getTasks()
                }
            }



    )


}


function createTask() {

    let data = {
        description: novaTarefa.value,
        completed: false
    }

    

    let postrequestConfiguration = {
        method: 'POST',
        headers: headersAuthRequest,
        body: JSON.stringify (data)
    }

    fetch('https://ctd-fe2-todo-v2.herokuapp.com/v1/tasks', postrequestConfiguration).then(
        
        response => {

            if(response.ok){
                getTasks()
                novaTarefa.value = ''
            }
        }
    )

}

function deleteTask(id) {

    let requestDeleteConfig = {
        method: 'DELETE',
        headers: headersAuthRequest,

    }

    fetch(`https://ctd-fe2-todo-v2.herokuapp.com/v1/tasks/${id}`, requestDeleteConfig).then(

        response => {
            if(response.ok) {
                getTasks()
            }
        }

    
 )}

if(token === null) {

    window.location.href = './../index.html'

} else {

    getInfoUser()
    getTasks()
}

// Identificando tecla enter

novaTarefa.addEventListener('keypress', event=>{
    if(event.which == 13){
        event.preventDefault()
        createTask()
    }
})


createTaskButtonElement.addEventListener('click', event => {

	event.preventDefault()
    createTask()
    
})

//fechar app
closePage.addEventListener('click', event => {

    localStorage.clear()
    window.location.href = '/index.html'

})
