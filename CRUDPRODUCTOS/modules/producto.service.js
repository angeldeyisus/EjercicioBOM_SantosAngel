const API_URL = "http://localhost:3000/api/productos";

export default class ProductosService{
    static getProductos(){
        return fetch(`${API_URL}`).then(response => response.json());
    }

    static getProductById(id){
        return fetch(`${API_URL}/${id}`).then(response => response.json());
    }

    static crearProducto(productData){
        return fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(productData)
        }).then(response => response.json());
    }

    static editarProducto(id, productData){
        return fetch(`${API_URL}/${id}`, {
            method: "PUT",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(productData)
        }).then(response => response.json());
    }

    static eliminarProducto(id){
        return fetch(`${API_URL}/${id}`,{
            method: "DELETE"
        }).then(response => response.json());
    }

    static buscarProducto(filtro){
        return fetch(`${API_URL}/${filtro}`).then(response => response.json());
    }
}