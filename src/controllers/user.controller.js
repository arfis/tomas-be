import User from '../models/user.model';

const UserController = {
    async signUp(req, res) {
        try {
            const user = await User.create(req.body);
            return res.status(201).json(user);
        } catch (e) {
            return res.status(500).json(e);
        }
    },
    async login(req, res, next) {
        res.status(200).json(req.user);
        return next();
    }
}

export default UserController;
