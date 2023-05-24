import Clothes from '../models/Clothes.js';

// Muestra todos los cursos
export const mostrarClothes = async (req, res) => {
    try {
        // obtener todos los cursos
        const documents = await Clothes.find({})
        res.json(documents);
    } catch (error) {
        console.log(error);
    }
};

export const searchClothes = async (req, res) => {
    try {
        // obtener el query de la URL
        const { query } = req.params;
        const documents = await Clothes.find({ title: new RegExp(query, 'i') })
        res.json(documents);
    } catch (error) {
        console.log(error);
    }
};

export const searchClothesPorPrecio = async (req, res) => {
    try {
        // obtener el query de la URL
        const {minPrecio, maxPrecio} = req.params; // req.params.minPrecio
        const documents = await Clothes.find(  { $and:
            [
                {precio: { $gte: minPrecio } },
                {precio: { $lte: maxPrecio }},
            ]
         })
        res.json(documents);
    } catch (error) {
        console.log(error);
    }
};

export const searchClothesByCategory = async (req, res) => {
    try {
        const documents = await Clothes.find({ category:ObjectId(req.params.idCategory) })
                                .populate("category");
            
        res.json(documents);
    } catch (error) {
        console.log(error);
    }
};

// Agrega un nuevo curso
export const nuevoClothes = async (req, res) => {
    const document = new Clothes(req.body);
    try {
        // almacenar el registro
        await document.save();
        res.json({ mensaje : 'Se agrego un nuevo curso' });
    } catch (error) {
        // si hay un error, console.log
        res.send(error);
    }
};

// Actualiza un curso via id
export const actualizarClothes = async (req, res) => {
    try {
        console.log("Datos a modificar", req.body);

        const filter = { _id : req.body.id };
        const update =  req.body;
        //Opciones, devolver el nuevo objeto modificado
        const options = {new : true};

        const document = await Clothes.findOneAndUpdate(filter, update, options);
        /*const curso = await Clothes.findAndModify({
            query:filter,
            update:{nombre:update.nombre, descripcion:update.descripcion},
            new:true
        });*/
        res.json(document);
    } catch (error) {
        res.send(error);
    }
};

// Elimina un curso via ID
export const eliminarClothes = async (req, res) => {
    try {
        await Clothes.findByIdAndDelete({ _id : req.params.idClothes });
        res.json({mensaje : 'El Clothes se ha eliminado'});
    } catch (error) {
        console.log(error);
    }
};
