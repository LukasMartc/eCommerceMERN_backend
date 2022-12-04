import User from "../models/User.js";
import generateId from "../helpers/generateId.js";
import generateJWT from "../helpers/generateJWT.js";
import { emailRegister, emailForgetPassword } from "../helpers/email.js";

const register = async (req, res) => {
    // Evitar registros duplicados
    const { email } = req.body;
    const userExists = await User.findOne({ email });

    if(userExists) {
        const error = new Error('Usuario ya registrado');
        return res.status(400).json({ msg: error.message });
    }

    try {
        const user = new User(req.body);
        user.token = generateId();
        await user.save();

        // Enviar el email de confirmación
        emailRegister({
            email: user.email,
            name: user.name,
            token: user.token
        })

        res.json({
            success: true,
            msg: "Usuario registrado con exito, revisa tu email para confirmar tu cuenta",
            userId: user._id
        });
    } catch (error) {
        res.json({
            success: false,
            error: error.message
        })
    }
}

const authenticate = async (req, res) => {
    const { email, password } = req.body;

    // Comprobar si el usuario existe
    const user = await User.findOne({ email });
    if(!user) {
        const error = new Error('Usuario y/o clave incorrecta');
        return res.status(404).json({ msg: error.message });
    }
    
    // Comprobar si el usuario esta confirmado
    if(!user.confirmed) {
        const error = new Error('Tu cuenta no ha sido confirmada');
        return res.status(403).json({ msg: error.message });
    }

    // Comprobar su password
    if(await user.checkPassword(password)) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateJWT(user._id)
        })
    } else {
        const error = new Error('Usuario y/o clave incorrecta');
        return res.status(403).json({ msg: error.message });
    }
}

const confirmed = async (req, res) => {
    const { token } = req.params;
    const userConfirm = await User.findOne({ token });

    if(!userConfirm) {
        const error = new Error('Token no válido');
        return res.status(403).json({ msg: error.message }); 
    }

    try {
        userConfirm.confirmed = true;
        userConfirm.token = '';
        await userConfirm.save();
        res.json({
            msg: "Usuario confirmado correctamente"
        })
    } catch (error) {
        console.log(error);
    }
}

const forgetPassword = async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if(!user) {
        const error = new Error('El usuario no existe');
        return res.status(404).json({ msg: error.message });
    }

    try {
        user.token = generateId();
        await user.save();

        // Enviar el email
        emailForgetPassword({
            email: user.email,
            name: user.name,
            token: user.token
        })

        res.json({
            msg: "Hemos enviado un email con las instrucciones"
        })
    } catch (error) {
        console.log(error);
    }
}

const checkToken = async (req, res) => {
    const { token } = req.params;
    const validToken = await User.findOne({ token });
    if(validToken) {
        res.json({
            msg: 'Token válido y el usuario existe'
        })
    } else {
        const error = new Error('Token no válido');
        return res.status(404).json({ msg: error.message });
    }
}

const newPassword = async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;
    
    const user = await User.findOne({ token });
    if(user) {
        user.password = password;
        user.token = '';
        try {
            await user.save();
            res.json({
                msg: 'Password modificado correctamente'
            })
        } catch (error) {
            console.log(error);
        }

        
    } else {
        const error = new Error('Token no válido');
        return res.status(404).json({ msg: error.message });
    }
}

const profile = async (req, res) => {
    const { user } = req;
    res.json(user);
}

const registerAdmin = async (req, res) => {
    const id = req.user._id.toString();
    const user = await User.findById(id);
    if(!user.admin) {
        const error = new Error('No estás autorizado para registrar un administrador');
        return res.status(400).json({ msg: error.message });
    }

    const { email } = req.body;
    const userExists = await User.findOne({ email });

    if(userExists) {
        const error = new Error('Usuario ya registrado');
        return res.status(400).json({ msg: error.message });
    }

    try {
        const user = new User(req.body);
        user.token = generateId();
        user.admin = true;
        const storedUser = await user.save();

        // Enviar el email de confirmación
        emailRegister({
            email: user.email,
            name: user.name,
            token: user.token
        })

        res.json({
            success: true,
            message: "Administrador registrado con exito",
            userId: storedUser._id
        });
    } catch (error) {
        res.json({
            success: false,
            error: error.message
        })
    }
}

export {
    register,
    authenticate,
    confirmed,
    forgetPassword,
    checkToken,
    newPassword,
    profile,
    registerAdmin
} 