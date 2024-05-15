import jwt from 'jsonwebtoken';

const generateTokenAndSetCookie = (userId, res) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })

    res.cookie('jwt', token, {
        httpOnly: true, //accessible only by web server (this cookie cannot be accessed by the browser => more secure)
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
        sameSite: 'strict', // csrf protection 
    })

    return token;
}

export default generateTokenAndSetCookie;