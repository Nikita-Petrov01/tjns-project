const AuthService = require('../services/AuthService');
const generateTokens = require('../utils/generateTokens');
const cookieConfig = require('../configs/cookieConfig');

class AuthController {
    
    static async signup(req, res) {
        try {
            const user = await AuthService.signup(req.body)
            const {accessToken, refreshToken} = generateTokens({user})
            return res
                .cookie('refreshToken', refreshToken, cookieConfig)
                .status(200)
                .json({accessToken, user});
        } catch (error) {
            console.error('Ошибка при регистрации пользователя', error)
            res.status(500).send('Ошибка сервера при регистрации пользователя')
        }
    }

    static async login(req, res) {
        try {
            const user = await AuthService.login(req.body);
            const {accessToken, refreshToken} = generateTokens({user});

            return res
                .cookie('refreshToken', refreshToken, cookieConfig)
                .status(200)
                .json({accessToken, user});
        } catch (error) {
            console.error('Ошибка при входе пользователя', error);
            res.status(500).send('Ошибка сервера при входе пользователя');
        }
    }

    static async logout(req, res) {
        try {
            res.clearCookie('refreshToken')
            res.sendStatus(200);
        } catch (error) {
            console.error('Ошибка при выходе пользователя', error);
            res.status(500).send('Ошибка сервера при выходе пользователя');
        }
    }
}

module.exports = AuthController;