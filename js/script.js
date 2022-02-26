var addTarefaButton = document.querySelector(".add-tarefas h2")
var closeModalCriarTarefas = document.querySelector(".modalCriarTarefas .modalTarefas h2")
var modalCriarTarefas = document.querySelector(".modalCriarTarefas")
var lista = document.querySelector(".lista .items-lista")
var modalInfo = document.querySelector(".modalInfosTarefas")

var file = document.querySelector("#img-tarefas")
var img = ""

var tarefas = []


addTarefaButton.addEventListener("click",()=>{
    modalCriarTarefas.style.display = "block"
})

file.addEventListener("change",(t)=>{
            const tgt = t.target

            const files = tgt.files

            const fr = new FileReader()

            fr.onload = function(){
                img = fr.result
            }

            fr.readAsDataURL(files[0])
        })


if(modalCriarTarefas.style.display != "block"){
    closeModalCriarTarefas.addEventListener("click",()=>{
        modalCriarTarefas.style.display = "none"
    })

    let criarTarefa = document.querySelector(".modalCriarTarefas .modalTarefas .criarTarefa .criarTarefaForm")

    criarTarefa.addEventListener("submit",(e)=>{
        e.preventDefault()

        let name = e.target.querySelector("#title-tarefas").value
        let desc = e.target.querySelector("#desc-tarefas").value
        let termino = e.target.querySelector("#date-tarefas").value


        if(name == "" || desc == "" || termino == "" || file == ""){
            return alert("Por favor preencha todos os campos")
        }

            tarefas = []

                tarefas.push({
                    nomeTarefa:name,
                    descTarefa:desc,
                    terminoTarefa:termino,
                    imgTarefa:img
                })

                    lista.innerHTML += `
                        <div class="items-lista-single" nome="${name}" desc="${desc}" termino="${termino}" img="${img}">
                            <div>
                                <h4>${name}</h4>  
                            </div>
                            <div>
                                <input type="button" value="infos" ident="${tarefas.length}" id="buttonInfo"> 
                                <h2  id="excluir-tarefa"><i class="fas fa-trash-alt"></i></h2>
                            </div>   
                        </div>
                    `
            

                var infoButton = document.querySelectorAll("#buttonInfo")
                var excluirTarefa = document.querySelectorAll("#excluir-tarefa")

                for(var c = 0; c < infoButton.length;c++){
            
                    infoButton[c].addEventListener("click",(e)=>{
                    
                    var nomeDaTarefa = e.target.parentNode.parentNode.getAttribute("nome")
                    var descDaTarefa = e.target.parentNode.parentNode.getAttribute("desc")
                    var terminoDaTarefa = e.target.parentNode.parentNode.getAttribute("termino")
                    var imgDaTarefa = e.target.parentNode.parentNode.getAttribute("img")

                    var infosTarefas = modalInfo.querySelector(".modalInfos .infoTarefa")

                    if(imgDaTarefa == ""){
                        infosTarefas.innerHTML = `
                            <h3>Nome: </h3>
                            <p>${nomeDaTarefa}</p>
                            <h3>Descrição: </h3>
                            <p>${descDaTarefa}</p>
                            <h3>Termino: </h3>
                            <p>${terminoDaTarefa}</p>
                            <h3>Imagem: </h3>
                            <img src="img/imgnaodisponivel.jpg" />
                        `
                    }else{
                        infosTarefas.innerHTML = `
                            <h3>Nome: </h3>
                            <p>${nomeDaTarefa}</p>
                            <h3>Descrição: </h3>
                            <p>${descDaTarefa}</p>
                            <h3>Termino: </h3>
                            <p>${terminoDaTarefa}</p>
                            <h3>Imagem: </h3>
                            <img src="${imgDaTarefa}" />
                        `
                    }

                    modalInfo.style.display = "block"
                })

                excluirTarefa[c].addEventListener("click",(e)=>{
                    var tarefaExcluir = e.target.parentNode.parentNode.parentNode

                    tarefaExcluir.innerHTML = ""
                    tarefaExcluir.style.borderBottom = "0"
                    tarefaExcluir.style.display = "none"
                })
            
                }    
        e.target.querySelector("#title-tarefas").value = ""
        e.target.querySelector("#desc-tarefas").value = ""
        e.target.querySelector("#date-tarefas").value = ""
        e.target.querySelector("#img-tarefas").value = ""

        console.log(tarefas)

        modalCriarTarefas.style.display = "none"

        
    })
    
} 


if(modalInfo.style.display != "block"){
    let closeModalInfo = document.querySelector(".modalInfosTarefas .modalInfos h2")

    closeModalInfo.addEventListener("click",()=>{
        modalInfo.style.display = "none"
    })
}