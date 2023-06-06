import { ObjectId } from "mongodb"
import CnxMongoDB from "../DBMongo.js"

class ModelMongo {

    constructor() {
    }

    obtenerProductos = async id => {
        if(!CnxMongoDB.connection) return id? {} : []

        if(id) {
            const producto = await CnxMongoDB.db.collection('productos').findOne({_id: new ObjectId(id)})
            return producto
        }
        else {
            const productos = await CnxMongoDB.db.collection('productos').find({}).toArray()
            return productos
        }    
    }

    guardarProducto = async producto => {
        if(!CnxMongoDB.connection) return {}

        await CnxMongoDB.db.collection('productos').insertOne(producto)
        return producto   
    }


    actualizarProducto = async (id, producto) => {
        if(!CnxMongoDB.connection) return {}

        await CnxMongoDB.db.collection('productos').updateOne(
            {_id: new ObjectId(id)},
            {$set: producto}
        )
        console.log(producto)
        let productoActualizado = await this.obtenerProductos(id)
        return productoActualizado  
    }

    borrarProducto = async id => {
        if(!CnxMongoDB.connection) return {}

        let productoEliminado = await this.obtenerProductos(id)
        await CnxMongoDB.db.collection('productos').deleteOne({_id: new ObjectId(id)})
        
        return productoEliminado    
    }
}

export default ModelMongo