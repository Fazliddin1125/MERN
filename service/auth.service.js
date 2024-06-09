const userModel = require("../models/user.model")
const bcrypt = require("bcrypt")
const userDto = require("../dtos/user.dto")
const UserDto = require("../dtos/user.dto")
const tokenService = require("./token.service")
const mailService = require("./mail.service")
const tokenModel = require("../models/token.model")
const BaseError = require("../errors/base.error")


class AuthService {
    async register(email, password){
        // userni topish
        const existUser = await userModel.findOne({email})

        if(existUser){
            throw BaseError.BadRequest("User is not defined")
           
        }
        // parolni hashlash
        const hashPassword = await bcrypt.hash(password, 10)
        // userni yaratish
        const user = await userModel.create({email, password: hashPassword})
        // malumotlarni tariblash olish
        const Dto = new UserDto(user)
        // emil service 
        await mailService.sendMail(email, `${process.env.API_URL}/api/auth/activation/${Dto.id}`)
        // token generatsiya qilish
        const tokens = tokenService.generateToken({...Dto})
        await tokenService.saveToken(Dto.id, tokens.refreshToken)

        return {user: Dto, ...tokens}
    }

    async activation(id){
        const isActivated = true
        const activUser = await userModel.findByIdAndUpdate(id, {isActivated: true}, {new: true})
        return activUser

    }

    async login(email, password){
        // userni aniqlash
        const user = await userModel.findOne({email})
        // hatolik berish
        if(!user){
            throw BaseError.BadRequest("User is not defined")
        }
        // paasswordni solishtirish
        const isPassword = await bcrypt.compare(password, user.password)
        if(!isPassword){
            throw BaseError.BadRequest("Password is incorrect")
        }

        // malumotlarni tariblash olish
        const Dto = new UserDto(user)

        // token generatsiya qilish
        const tokens = tokenService.generateToken({...Dto})
        await tokenService.saveToken(Dto.id, tokens.refreshToken)

        return {user: Dto, ...tokens}
    }

    async logout(refreshToken) {
		return await tokenService.removeToken(refreshToken)
	}

    async refresh(refreshToken) {
		if (!refreshToken) {
			throw new Error('Bad authorization')
		}

		const userPayload = tokenService.validateRefreshToken(refreshToken)
		const tokenDb = await tokenService.findToken(refreshToken)
		if (!userPayload || !tokenDb) {
			throw new Error('Bad authorization')
		}

		const user = await userModel.findById(userPayload.id)
		const userDto = new UserDto(user)

		const tokens = tokenService.generateToken({ ...userDto })

		await tokenService.saveToken(userDto.id, tokens.refreshToken)

		return { user: userDto, ...tokens }
	}

    async getUsers(){
        const users = await userModel.find()
        return users
    }
}

module.exports = new AuthService()