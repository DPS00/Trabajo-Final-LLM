import Clothes from '../models/Clothes.js';

// Muestra todos los cursos
export const mostrarClothes = async (req, res) => {
    try {
        // obtener todos los cursos
        const documents = await Clothes.find({})
                          .populate("category");

        res.json(documents);
    } catch (error) {
        console.log(error);
    }
};

export const showClothesyById = async (req, res) => {
    const document = await Clothes.findById(req.params.idClothes);
    if(!document) {
        res.json({message : 'Category no exists'});
    }
    res.json(document);
};

export const searchClothes = async (req, res) => {
    try {
        // obtener el query de la URL
        const { query } = req.params;
        const documents = await Clothes.find({ name: new RegExp(query, 'i') })
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

export const searchClothesByBrand = async (req, res) => {
    try {
        // obtener el query de la URL
        const { query } = req.params;
        const documents = await Clothes.find({ brand: new RegExp(query, 'i') })
        res.json(documents);
    } catch (error) {
        console.log(error);
    }
};

// Agrega una nueva prenda
export const nuevoClothes = async (req, res) => {
    const document = new Clothes(req.body);
    try {
        // almacenar el registro
        await document.save();
        res.json({ mensaje : 'Se agrego una nueva prenda' });
    } catch (error) {
        // si hay un error, console.log
        res.send(error);
    }
};

export const actualizarClothes = async (req, res) => {
    try {
        const filter = { _id : req.body.id };
        const update =  req.body;
        const options = {new : true};
        const document = await Clothes.findOneAndUpdate(filter, update, options);
        res.json({
            "message":"Category modified successfuly",
            ...document
         });
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
