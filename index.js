const Form = document.getElementById('Form')
const ToDoo = localStorage.getItem('ToDoo')
const ToDooParse = JSON.parse(ToDoo)
const Tarea = ToDooParse || []

const completeTask = localStorage.getItem('Complete')
const completeToDo = JSON.parse(completeTask)
const completeArray = completeToDo || []

function generateRandomId() {
    const randomNumber = Math.floor(Math.random() * 100) // Puedes ajustar el rango según tus necesidades
    const timestamp = Date.now();
    const randomId = `${randomNumber}${timestamp}`
    return randomId;
}

Form.addEventListener('submit', (e) => {
    e.preventDefault() 

    const Input = document.getElementById('Input')
    const InputDate = document.getElementById('InputDate')

    if(!Input.value){
        return
    }

    const randomId = generateRandomId()

    const DATA = {
        Tarea: Input.value,
        Date: InputDate.value || '🤷',
        ID: randomId 
    }

    Tarea.push(DATA)

    localStorage.setItem('ToDoo', JSON.stringify(Tarea))
    Input.value = ''
    
    ListToDoo()
})

const DeleteTarea = (ID) => {
    const bannerDelete = document.getElementById('bannerDelete')

    let index = Tarea.findIndex(objeto => objeto.ID === ID.toString())
    console.log(index)
    if (index !== -1) {
        Tarea.splice(index, 1);
        localStorage.setItem('ToDoo', JSON.stringify(Tarea)); // Actualiza el localStorage
        ListToDoo() // Vuelve a mostrar la lista actualizada
        
    }
    bannerDelete.style.display = ''
    setTimeout(()=>{
        bannerDelete.style.display = 'none'
    },3000)
}

const complete = (tarea, ID) => {
    const bannerComplete = document.getElementById('bannerComplete')
    taskCompleted = {
        tarea: tarea
    }

    completeArray.push(taskCompleted)

    localStorage.setItem('Complete', JSON.stringify(completeArray))
    DeleteTarea(ID)
    Modal()
    bannerComplete.style.display = ''
    setTimeout(()=>{
        bannerComplete.style.display = 'none'
    },3000)
}

const ListToDoo = () => {
    const Tbody = document.getElementById('Tbody')
    const Span = document.getElementById('Span')

    Tbody.innerHTML = ''
    Span.innerHTML = ''

    if(Tarea.length < 1 ){
        return Span.innerHTML += 
        `
            <span class="fw-bold text-center text-light">AUN NO HAY TAREAS</span>
        `
    }

    Tarea.map((ToDooList) => {
        Tbody.innerHTML += 
        `
        <tr>
            <td scope="row">${ToDooList.Tarea}</td>
            <td scope="row">${ToDooList.Date}</td>
            <td class="px-1 py-2">
                <button onclick="complete('${ToDooList.Tarea}', ${ToDooList.ID})" class="btn btn-outline-success m-2" >Completada</button>
                <button onclick="DeleteTarea(${ToDooList.ID})" class="btn btn-outline-danger m-2">Eliminar</button>
            </td>
        </tr>
        `
    }) 
}

ListToDoo()

const Modal = () => {
    const ModalViewComplete = document.getElementById('ModalViewComplete')
    ModalViewComplete.innerHTML = ''

    completeArray.map((CompleteArrayTask) => {
        ModalViewComplete.innerHTML +=
        `
            <div class="card mb-4 p-2 d-flex align-items-center bg-dark">
                <img src="./assest/img/TaskComplete.png" width="33" alt="" class="mr-2">
                <span class="text-light">${CompleteArrayTask.tarea}</span>
            </div>    
        `
    })
}

Modal()

const Reset = () => {
    localStorage.clear()
}



