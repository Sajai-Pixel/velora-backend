import jwt from 'jsonwebtoken'
const adminLogin = async (req, res) => {
    try {
        const { username, password } = req.body

        if (!username || !password) {
            return res.status(400).json({
                message: 'Username and password are required'
            })
        }

        if (
            username !== process.env.ADMIN_USERNAME ||
            password !== process.env.ADMIN_PASSWORD
        ) {
            return res.status(401).json({
                message: 'Invalid username or password'
            })
        }

        const admintoken = jwt.sign(
            {
                username: process.env.ADMIN_USERNAME
            },
            process.env.JWT_SECRET,
            {
                expiresIn: '1d'
            }
        )

        return res.status(200).json({
            message: 'Admin login successful',
            admintoken,
            admin: {
                username
            }
        })

    } catch (error) {
        console.error(error)

        return res.status(500).json({
            message: 'Internal server error'
        })
    }
}

export default adminLogin