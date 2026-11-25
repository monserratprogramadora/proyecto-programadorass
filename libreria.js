let semestre = document.body.dataset.semestre;

let catalogos = {
    1: [
        ["Temas selectos de Matematicas 1","Matematicas","",260,"temas de mate1.jpeg"],
        ["Boarding pass 1","Inglés","",260,"boarding pass1.jpeg"],
        ["Conciencia historica 1","Historia","",260,"concienciahistoria1.jpeg"],
        ["Identificacion de materia y energia en el entorno","Ciencias","",260,"identificacion de materia.jpeg"],
        ["Aplicacion de tecnologias digitales","Aplicaciones","",260,"historialibro.webp"]
    ],
    2: [
        ["Temas selectos de matematicas 2","Matematicas","",260,"temas de mate 2sem.png"],
        ["Boarding pass 2","Inglés","",260,"boarding pass2.gif"],
        ["Conciencia historica 2","Historia","",260,"concienciashistorica2.jpeg"],
        ["Cultura Digital 2","Cultura Digital","",260,"culturadigital2.jfif"],
        ["Lengua y Comunicacion","Español","",260,"lengua2.jfif"]
    ],
    3: [
        ["Pensamiento Matematico 3","Matematicas","",260,"pensamiento-matematico-3.webp"],
        ["Boarding pass 3","Inglés","",260,"boarding-pass-3.webp"],
        ["Conciencia historica 3","Historia","",260,"concienciahistorica3.jfif"],
        ["Lengua y Comunicacion 3","Español","",260,"lengua3.jfif"],
        ["Humanidades 3","Humanidades","",260,"humanidades3.jfif"],
        ["Ciencias Sociales 3","Ciencias","",260,"sociales3.jfif"]
    ],
    4: [
        ["Temas selectos de matematicas 2","Matematicas","",260,""],
        ["Boarding pass 4","Inglés","",260,"boarding pass4.gif"],
        ["Conciencia historica","Historia","",260,""],
        ["Aplicaciones de la administracion","Administraciòn","",260,""],
        ["La energia en los procesos de la vida diaria","Ciencias","",260,""]
    ],
    5: [
        ["Temas selectos de matematicas","Matematicas","",260,"matelibro.gif"],
        ["Boarding pass 5","Inglés","",260,"libroingles.webp"],
        ["Conciencia historica","Historia","",260,"historialibro.webp"],
        ["Aplicaciones de la administracion","Administraciòn","",260,"administracionlibro.png"],
        ["La energia en los procesos de la vida diaria","Ciencias","",260,"laenergialibro.gif"]
    ],
    6: [
        ["Temas selectos de matematicas 2","Matematicas","",260,""],
        ["Boarding pass 6","Inglés","",260,"ingles-boarding-pass-6.webp"],
        ["Conciencia historica","Historia","",260,""],
        ["Aplicaciones de la administracion","Administraciòn","",260,""],
        ["La energia en los procesos de la vida diaria","Ciencias","",260,""]
    ]
};

let libros = catalogos[semestre] || [];
let carrito = [];

// COMPROBAR USUARIO
let controlActivo = sessionStorage.getItem("usuarioActivo");
let usuarios = JSON.parse(localStorage.getItem("usuarios") || "[]");

let usuario = usuarios.find(u => u.control === controlActivo);

if(!usuario){
    window.location.href = "login.html";
}

else if(usuario.semestre != semestre){
    window.location.href = "semestre" + usuario.semestre + ".html";
}

else {
    document.getElementById("bienvenida").innerText =
    "¡Hola, " + usuario.nombre + "!";
}

// MOSTRAR LIBROS
function mostrarLibros(){
    let catalogo = document.getElementById("catalogo");
    catalogo.innerHTML = "";

    libros.forEach((libro,i)=>{
        catalogo.innerHTML += `
        <div class="col-md-4 col-lg-3 libro-item">
        <div class="card libro">
        <img src="${libro[4]}" class="imagen-libro">
        <div class="card-body">
        <span class="badge bg-primary">${libro[1]}</span>
        <h5 class="mt-2">${libro[0]}</h5>
        <p class="text-secondary">${libro[2]}</p>
        <p class="precio">$${libro[3].toFixed(2)}</p>
        <button class="btn btn-principal w-100" onclick="agregarCarrito(${i})">
        Agregar al carrito
        </button>
        </div>
        </div>
        </div>`;
    });
}

// AGREGAR AL CARRITO
function agregarCarrito(i){
    let libro = libros[i];

    let encontrado = carrito.find(item=>item.nombre===libro[0]);

    if(encontrado){
        alert("Este libro ya está agregado al carrito.");
        return;
    }

    carrito.push({
        nombre:libro[0],
        precio:libro[3],
        cantidad:1
    });

    mostrarCarrito();
    alert("Libro agregado al carrito.");
}

// MOSTRAR CARRITO
function mostrarCarrito(){
    let contenido = document.getElementById("productosCarrito");
    let total = 0, cantidad = 0;
    contenido.innerHTML = "";

    if(carrito.length===0)
        contenido.innerHTML = '<p class="text-secondary text-center">Tu carrito está vacío.</p>';

    carrito.forEach((libro,i)=>{
        let subtotal = libro.precio*libro.cantidad;
        total += subtotal;
        cantidad += libro.cantidad;

        contenido.innerHTML += `
        <div class="border rounded p-3 mb-3">
        <h6>${libro.nombre}</h6>
        <p>Precio: $${libro.precio.toFixed(2)}</p>
        <p>Cantidad: ${libro.cantidad}</p>
        <p class="fw-bold">Subtotal: $${subtotal.toFixed(2)}</p>
        <button class="btn btn-danger btn-sm" onclick="eliminarLibro(${i})">Eliminar</button>
        </div>`;
    });

    document.getElementById("total").innerText = total.toFixed(2);
    document.getElementById("cantidadCarrito").innerText = cantidad;
}

// ELIMINAR LIBRO
function eliminarLibro(i){
    carrito.splice(i,1);
    mostrarCarrito();
}

// BUSCADOR
function buscarLibros(){
    let texto = document.getElementById("buscarLibro").value.toLowerCase();
    let elementos = document.getElementsByClassName("libro-item");
    let encontrados = 0;

    for(let libro of elementos){
        let mostrar = libro.innerText.toLowerCase().includes(texto);
        libro.style.display = mostrar ? "" : "none";
        if(mostrar) encontrados++;
    }

    document.getElementById("sinResultados").style.display =
    encontrados ? "none" : "block";
}

// FINALIZAR COMPRA
function finalizarCompra(){
    if(carrito.length===0) alert("Tu carrito está vacío.");
    else{
        alert("¡Compra realizada correctamente! Gracias por tu compra.");
        carrito = [];
        mostrarCarrito();
    }
}

// CERRAR SESIÓN
function cerrarSesion(){
    if(confirm("¿Deseas cerrar sesión?")){
        sessionStorage.removeItem("usuarioActivo");
        window.location.href = "login.html";
    }
}

// INICIAR
mostrarLibros();
mostrarCarrito();