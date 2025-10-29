document.addEventListener('DOMContentLoaded', async function(){
    const form = document.getElementById("product-form")
    const nameInput = document.getElementById("name")
    const priceInput = document.getElementById("price")
    const quantityInput = document.getElementById("quantity")
    const saveButton = document.getElementById("save-product")

    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    if (productId) {
        let producto = await fetch(`http://localhost:3000/api/productos/${productId}`);
        let product = await producto.json();

        nameInput.value = product.nombre;
        priceInput.value = product.precio;
        quantityInput.value = product.cantidad;
    }

    form.addEventListener('submit', async function(e){
        e.preventDefault();
        const name = nameInput.value;
        const price = priceInput.value;
        const cantidad = quantityInput.value;
        if(name && price && cantidad){
            const productData = {
                nombre: name,
                precio: price,
                cantidad: cantidad
            };

            if(productId){
                try {
                    await fetch(`http://localhost:3000/api/productos/${productId}`, {
                    method: 'PUT',
                    headers: {
                        "Content-type": "application/json"
                    },
                    body: JSON.stringify(productData)
                })

                alert('Producto Actulizado con exito')
                window.location.href = "producto.html"
                } catch (error) {
                    alert('Ocurrio un error al editar el producto')
                }
            }else{
                try {
                    await fetch(`http://localhost:3000/api/productos`, {
                    method: 'POST',
                    headers: {
                        "Content-type": "application/json"
                    },
                    body: JSON.stringify(productData)
                })

                alert('Producto Agregado con exito')
                window.location.href = "producto.html"
                } catch (error) {
                    alert('Ocurrio un error al agregar el producto')
                }
            }
        }else{
            alert('Por favor ingrese todos los datos del producto');
        }
    })
})