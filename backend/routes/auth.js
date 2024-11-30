import express from 'express';
import User from '../models/user.js';


const router = express.Router();

router.post('/login', async(req, res) => {
    const {username, password} = req.body;
    try {
        const user = await User.findOne({username});
        if(user && (await user.matchPassword(password))){
            res.status(200).json({ message: 'Login successful' });

        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

export default router;

