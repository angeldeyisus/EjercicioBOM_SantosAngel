import ProductosService from "../modules/producto.service";

document.addEventListener("DOMContentLoaded", function(){
    const productList = document.getElementById('product-list');
    const searchInput = document.getElementById('search');
    const addProductButton = document.getElementById('add-product');

    console.log(window,navigator);
    console.log(window.location);
    console.log("Ancho de la pantalla: " + window.screen.width + 'px');
    console.log("Alto de la pantalla: " + window.screen.height + 'px');

    async function getProductos() {
        products = await ProductosService.getProductos()

        products = await products.json();

        products.forEach(product =>{
            const productItem = document.createElement('li');

            //Plantilla de un producto, con su boton de editar y eliminar
            productItem.innerHTML = `
                <p><strong>Nombre: </strong>${product.nombre}</p>
                <p><strong>Precio: </strong>${product.precio}</p>
                <p><strong>Cantidad: </strong>${product.cantidad}</p>
                <button data-id="${product._id}" class="edit-button"> Editar </button>
                <button data-id="${product._id}" class="delete-button"> Eliminar </button>
            `;

            //Agregar elemento a la lista
            productList.appendChild(productItem);
        })
    }

    getProductos();

    //Evento para llevarnos a la funcion crear producto
    addProductButton.addEventListener('click', function(){
        window.location.href = 'formulario.html'
    });

    //Evento de los botones eliminar y editar
    productList.addEventListener('click', async function(e){
        //Verifica si el click que se pulso es de tipo editar
        if(e.target.classList.contains('edit-button')){
            //Obtiene el id del producto al cual le dimos al boton eliminar
            const productId = e.target.getAttribute('data-id');
            window.location.href = `formulario.html?id=${productId}`;
            return;
        }
        //Verifica si el click que se pulso es de tipo eliminar
        if(e.target.classList.contains('delete-button')){
            const productId = e.target.getAttribute('data-id');
            if(confirm("¿Estás seguro de que deseas eliminar el producto?")){
                try {
                    await ProductosService.eliminarProducto(productId)
                    e.target.parentElement.remove();
                    alert("Producto eliminado con exito")
                } catch (error) {
                    alert("Ocurrio un error al eliminar el producto")
                }
                
            }
        }
    })

    searchInput.addEventListener('input', async function(){
        productList.innerHTML = ''
        const filtro = searchInput.value;
        if(filtro === ''){
            getProductos();
        }else{
            let products = await ProductosService.buscarProducto(filtro)

            products = await products.json();

            products.forEach(product =>{
            const productItem = document.createElement('li');

            //Plantilla de un producto, con su boton de editar y eliminar
            productItem.innerHTML = `
                <p><strong>Nombre: </strong>${product.nombre}</p>
                <p><strong>Precio: </strong>${product.precio}</p>
                <p><strong>Cantidad: </strong>${product.cantidad}</p>
                <button data-id="${product._id}" class="edit-button"> Editar </button>
                <button data-id="${product._id}" class="delete-button"> Eliminar </button>
            `;

            //Agregar elemento a la lista
            productList.appendChild(productItem);
        })
        }
    })

})