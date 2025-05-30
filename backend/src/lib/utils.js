import JWT from 'jsonwebtoken';
export const generateToken= (userId, res) => {
     const token = JWT.sign({userId}, process.env.JWT_SECRET, {
        expiresIn: "7d",
    })

    res.cookie("jwt", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        httpOnly: true, // prevent XSS attacks
        sameSite: "strict", // prevent CSRF attacks
        secure:process.env.NODE_ENV !== "development",
    });
    return token;
}