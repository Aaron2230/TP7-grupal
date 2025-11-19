class Estudiante{
    constructor(nombre, apellido, curso, nota1, nota2, nota3){
        this.nombre = nombre
        this.apellido = apellido
        this.curso  = curso
        this.nota1 = Number(nota1)
        this.nota2 = Number(nota2)
        this.nota3 = Number(nota3)
    }
    getNombre(){
        return this.nombre
    }
    getApellido(){
        return this.apellido
    }
    getCurso(){
        return this.curso
    }
    getPromedio(){
        var promedio=(this.nota1+this.nota2+this.nota3)/3
        return promedio
    }
    getMejorNota(){
        if (this.nota1>this.nota2 && this.nota1>this.nota3){
            return this.nota1
        }
        else if (this.nota2>this.nota1 && this.nota2>this.nota3){
            return this.nota2
        }
        else {
            return this.nota3
        }
    }
    getPeorNota(){
        if (this.nota1<this.nota2 && this.nota1<this.nota3){
            return this.nota1
        }
        else if (this.nota2<this.nota1 && this.nota2<this.nota3){
            return this.nota2
        }
        else {
            return this.nota3
        }
    }
}
class Escuela {
    constructor(){
        this.ListaEstudiantes = []
    }
    agregarEstudiante(estudiante){
        this.ListaEstudiantes.push(estudiante)
    }
    getEstudiantes(){
        return this.ListaEstudiantes
    }
    getEstudiantePorCurso(curso){
        var lista = []
        for (var i = 0; i < this.ListaEstudiantes.length; i ++){
            var estudiante = this.ListaEstudiantes[i]
            if (estudiante.getCurso() == curso){
                lista.push(estudiante)
            } 
        }
        return lista
    }
    getEstudiantePorPromedio(promedio){
        var lista = []
        for (var i = 0; i < this.ListaEstudiantes.length; i ++){
            var estudiante = this.ListaEstudiantes[i]
            if (estudiante.getPromedio() >= promedio){
                lista.push(estudiante)
            } 
        }
        return lista
    }
    getPeorNota(){
        var peorEstu = this.ListaEstudiantes[0]
        for (var i = 0; i < this.ListaEstudiantes.length; i ++){
            var estudiante = this.ListaEstudiantes[i]
            if (estudiante.getPeorNota() < peorEstu.getPeorNota()){
                peorEstu=estudiante
            }
        }
        return peorEstu
    }
    getMejorNota(){
        var MejorEstu = this.ListaEstudiantes[0]
        for (var i = 0; i < this.ListaEstudiantes.length; i ++){
            var estudiante = this.ListaEstudiantes[i]
            if (estudiante.getMejorNota() > MejorEstu.getMejorNota()){
                MejorEstu=estudiante
            }
        }
        return MejorEstu
    }
    getMejorPromedio(){
        var mejor = this.ListaEstudiantes[0]
        for (var i = 0; i < this.ListaEstudiantes.length; i++){
            var estudiante = this.ListaEstudiantes[i]
            if (estudiante.getPromedio() > mejor.getPromedio()){
                mejor = estudiante
            }
        }
        return mejor
    }

    getPromedioGeneral(){
        var suma = 0
        for (var i = 0; i < this.ListaEstudiantes.length; i ++){
            var estudiante = this.ListaEstudiantes[i]
            suma += estudiante.getPromedio() 
        }   
        var promedioGeneral = suma/this.ListaEstudiantes.length
        return promedioGeneral
    }
}

var escuela = new Escuela()

function crear(){
    document.getElementById("crear").style.display = "block"
    document.getElementById("listar").style.display = "none"
    document.getElementById("buscar").style.display = "none"
}

function listar(){
    document.getElementById("crear").style.display = "none"
    document.getElementById("listar").style.display = "block"
    document.getElementById("buscar").style.display = "none"
    document.getElementById("mTodo").style.display="none"
    document.getElementById("moCurso").style.display="none"
}

function buscar(){
    document.getElementById("crear").style.display = "none"
    document.getElementById("listar").style.display = "none"
    document.getElementById("buscar").style.display = "block"
}
function enviar(){
    var nombre = document.getElementById("nombre").value;
    var apellido = document.getElementById("apellido").value;
    var curso = document.getElementById("curso").value;
    var nota1 = document.getElementById("n1").value;
    var nota2 = document.getElementById("n2").value;
    var nota3 = document.getElementById("n3").value;
    var estudiante = new Estudiante(nombre, apellido, curso, nota1, nota2, nota3)
    escuela.agregarEstudiante(estudiante)
    alert("Estudiante agregado")
}
function todo(){
    var estudiantes = escuela.getEstudiantes()
    if (estudiantes.length > 0){
        document.getElementById("listado1").innerHTML = ""
        for (var i = 0; i < estudiantes.length; i ++){
            var estudiante = estudiantes[i]
            document.getElementById("listado1").innerHTML += estudiante.getNombre() + " " + estudiante.getApellido() + " Curso: " + estudiante.getCurso() + "<br>"
        }
    }else{
        document.getElementById("listado1").innerHTML = "No hay estudiantes cargados"
    }
}

function activarcurso(){
    document.getElementById("moCurso").style.display="block"
}

function mostrarCurso(){
    var estudiantes = escuela.getEstudiantePorCurso(document.getElementById("curso2").value)
    if (estudiantes.length > 0){
        document.getElementById("listado1").innerHTML=""
        for (var i=0 ; i < estudiantes.length; i++){
            var estudiante = estudiantes[i]
            document.getElementById("listado1").innerHTML += estudiante.getNombre() + " " + estudiante.getApellido() + "<br>"
        }
    }
}
function buscarEstudiante(){
    var nombreBuscado = document.getElementById("buscarNombre").value
    var estudiantes = escuela.getEstudiantes()
    var encontrado = ""
    for (var i = 0; i < estudiantes.length; i++){
        if (estudiantes[i].getNombre() == nombreBuscado){
            encontrado = estudiantes[i]
        }
    }
    if (encontrado != ""){
        document.getElementById("resultadodeBusqueda").innerHTML = encontrado.getNombre() + " " + encontrado.getApellido() + " Curso: " + encontrado.getCurso()
    }else{
        document.getElementById("resultadodeBusqueda").innerHTML = "No se encontro al estudiante"
    }
}
function buscarPorPromedio(){
    var prom = document.getElementById("promBuscar").value
    var lista = escuela.getEstudiantePorPromedio(prom)
    var resultado = ""
    if(lista.length > 0){
        for(var i = 0; i < lista.length; i++){
            var bus = lista[i]
            resultado += bus.getNombre()+" "+ bus.getApellido()+" Promedio: "+ bus.getPromedio() + "<br>"
        }
    }else{
        resultado = "No se encontro al estudiante"
    }
    document.getElementById("resultadodeBusqueda").innerHTML = resultado
}
function mostrarMejorPromedio(){
    var mejor = escuela.getMejorPromedio()
    document.getElementById("resultadodeBusqueda").innerHTML = 
    mejor.getNombre() + " " + mejor.getApellido() + "Mejor Promedio: " + mejor.getPromedio()
}
function mostrarPromedioGeneral(){
    var total = escuela.getPromedioGeneral()
    document.getElementById("resultadodeBusqueda").innerHTML = "Promedio general: " + total
}
