import fs from 'fs'

class ModelFile {

    constructor() {
        this.nombreArchivo = 'productos.json'
    }

    async leerArchivo() {
        return await fs.promises.readFile(this.nombreArchivo, 'utf-8')
    }

    async escribirArchivo(productos) {
        await fs.promises.writeFile(this.nombreArchivo, JSON.stringify(productos, null, '\t'))
    }

    obtenerProductos = async id => {
        try {
            const productos = JSON.parse(await this.leerArchivo())
            if(id) {
                const producto = productos.find( producto => producto.id == id )  
                //console.log(producto)
                return producto || {} // || short circuit operator
            }
            else {
                return productos
            }    
        }
        catch {
            return id? {} : []
        }
    }

    guardarProducto = async producto => {
        let productos = []
        try {
            productos = JSON.parse(await this.leerArchivo())
        }
        catch {}

        producto.id = (productos[productos.length - 1]?.id || 0) + 1       //?. -> optional chaining
        productos.push(producto)

        await this.escribirArchivo(productos)

        return producto
    }


    actualizarProducto = async (id, producto) => {
        let productos = []
        try {
            productos = JSON.parse(await this.leerArchivo())
        }
        catch {}

        producto.id = id

        const indice = productos.findIndex(producto => producto.id === id)
        if(indice != -1) {
            const productoAnt = productos[indice]
            const productoNuevo = { ...productoAnt, ...producto }

            productos.splice(indice, 1, productoNuevo)
            await this.escribirArchivo(productos)

            return productoNuevo
        }
        else {
            productos.push(producto)
            await this.escribirArchivo(productos)

            return producto
        }
    }

    borrarProducto = async id => {
        let productos = []
        try {
            productos = JSON.parse(await this.leerArchivo())
        }
        catch {}

        let producto = {}

        const indice = productos.findIndex(producto => producto.id == id)

        if(indice != -1) {
            producto = productos.splice(indice, 1)[0]
        }

        await this.escribirArchivo(productos)

        return producto
    }
}

export default ModelFile