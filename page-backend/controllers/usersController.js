import Users from "./../models/Users.js";
import bcrypt from 'bcryptjs';

// Registra un nuevo usuario
/*------------------------------------------*/
export const registerUser = async (req, res) => {
    try {
        // Get user input
        const { name, surname, email, password } = req.body;
    
        console.log("registerUser", req.body);

        // Validate user input
        if (!(email && password && name && surname)) {
            res.status(400).json({
                "error":true,
                "message":"All input is required"
            });
        }

        // Check if user already exist. Validate if user exist in our database
        const oldUser = await Users.findOne({ email });
        if (oldUser) {
            //return res.status(409).send("User Already Exist. Please Login");
            return res.status(409).json({
                "error":true,
                "message":"User Already Exist. Please Login"
            });
        }

        //Encrypt user password
        const encryptedPassword = await bcrypt.hash(password, 10);

        // Create user in our database
        const user = await Users.create({
            name,
            surname,
            email: email.toLowerCase(), // sanitize: convert email to lowercase
            password: encryptedPassword,
        });

        // return new user
        res.status(201).json({
            "error":false,
            "message":"Register successful",
            "user":user
        }); 
    } catch (err) {
        console.log(err);
    }
}

// Autentica un usuario
/*------------------------------------------*/



export const loginUser = async (req, res) => {
    try {
        // Obtener datos de inicio de sesión del usuario
        const { email, password } = req.body;

        // Validar los datos de inicio de sesión del usuario
        if (!email || !password) {
            res.status(400).json({
                error: true,
                message: "Inserte todos los campos"
            });
            return;
        }

        // Validar si el usuario existe en la base de datos
        const user = await Users.findOne({ email });

        console.log(user);

        if (user) {
            if (user.password) {
                const passwordMatch = await bcrypt.compare(password, user.password);
                if (passwordMatch) {
                    // El usuario y la contraseña son válidos. Enviar datos del usuario
                    res.status(200).json({
                        error: false,
                        message: "Login successful",
                        user: user
                    });
                } else {
                    // La contraseña no es válida
                    res.status(400).json({
                        error: true,
                        message: "Contraseña Invalida"
                    });
                }
            } else {
                // No se encontró la propiedad password en el objeto user
                res.status(400).json({
                    error: true,
                    message: "No existe la propiedad password"
                });
            }
        } else {
            // El usuario no existe
            res.status(400).json({
                error: true,
                message: "El usuario no existe"
            });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: true,
            message: "Internal Server Error"
        });
    }
};
