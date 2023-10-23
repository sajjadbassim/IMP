const jwt = require('jsonwebtoken');
const acount = require("../models/Acounts");


exports.isAuthenticatedUser = async (req, res, next) => {
    try {
        const token = req.header('token')
        if (!token) {
            return res.send({ success: false, message: 'Login first ' })
        }
        jwt.verify(token, process.env.JWT_KEY, async (err, decoded) => {
            if (err) {
                return res.send({
                    success: false, message: err.message
                })
            }
            const checkUserId = await acount.findOne({
                where: { id: decoded.user.ID }
            })
            if (!checkUserId) {
                return res.send({ success: false, message: 'Login first ' })
            }
            req.user = decoded.user;
           // req.session.user = decoded.session.user;
            next();
            //console.log(req.user);
        });

    } catch (err) {
        res.send(err.message)
    }
}


exports.isAuth = async (req, res, next) => {
    try {
        if (req.isAuth && req.session.user) {
            delete req.session.error;
            if (!req.session.token) {
                return res.send({ success: false, message: 'Login first ' })
            }
            jwt.verify(req.session.token, process.env.JWT_KEY, async (err, decoded) => {
                if (err) {
                    return res.send({
                        success: false,
                        message: 'Login first',
                        error: err.message
                    })
                }
                const checkUserId = await User.findOne({
                    where: { id: decoded.user.id }
                })
                if (!checkUserId) {
                    return res.send({ success: false, message: 'Login first ' })
                }
                req.user = decoded.user;
                await Session.destroy({
                    where: {
                        isAuth: null,
                        userAgent: null,
                    }
                })
                res.json(
                    {
                        success: true,
                        message: 'Auth successful',
                        token: req.session.token,
                        user: checkUserId,
                        sessionID: req.sessionID,
                        session: req.session
                    }
                )
            });


        } else {
            req.session.error = "Login first";
            res.json(
                {
                    success: false,
                    message: 'Login first',
                    error: req.session.error
                }
            )
        }
    } catch (error) {
        return res.send({ success: false, message: 'Login first ' })
    }

};

