//import ModelMem from '../model/DAO/productosMem.js'
//import ModelFile from '../model/DAO/productosFile.js'
import ModelFactory from '../model/DAO/productosFactoy.js'
import validaciones from '../validaciones/productos.js'

import config from '../config.js'


class Servicio {

    constructor() {
        //this.model = new ModelMem()
        //this.model = new ModelFile()
        this.model = ModelFactory.get(config.MODO_PERSISTENCIA)
    }

    obtenerProductos = async id => {
        const productos = await this.model.obtenerProductos(id)
        return productos
    }

    guardarProducto = async producto => {
        let val = validaciones.validar(producto)
        if(val.result) {
            const productoGuardado = await this.model.guardarProducto(producto)
            return productoGuardado
        }
        else {
            throw val.error
        }
    }

    actualizarProducto = async (id, producto) => {
        const productoActualizado = await this.model.actualizarProducto(id,producto)
        return productoActualizado
    }

    borrarProducto = async id => {
        const productoBorrado = await this.model.borrarProducto(id)
        return productoBorrado
    }
}

export default Servicio