const router = require('express').Router();
const { User, validate } = require('../app/models/user');
const bcrypt = require('bcrypt');
const auth = require('../app/middlewares/auth');
const admin = require('../app/middlewares/admin');
const validateObjectId = require('../app/middlewares/validateObjectId');

// Create user
router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) {
        return res.status(400).send({ message: error.details[0].message });
    }

    const user = await User.findOne({ email: req.body.email });
    if (user) {
        return res.status(403).send({ message: 'User with given email already exist!' });
    }

    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    let newUser = await new User({
        ...req.body,
        password: hashPassword,
    }).save();

    newUser.password = undefined;
    newUser.__v = undefined;

    res.status(200).send({ data: newUser, message: 'Account created successfully' });
});

// Get all users
router.get('/', admin, async (req, res) => {
    const users = await User.find().select('-password -__v');
    res.status(200).send({ data: users });
});

// Get user by id
router.get('/:id', [validateObjectId, auth], async (req, res) => {
    const user = await User.findById(req.params.id).select('-password -__v');
    res.status(200).send({ data: user });
});

// Update user by id
router.put('/:id', [validateObjectId, auth], async (req, res) => {
    const user = await User.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
    ).select('-password -__v');
    res.status(200).send({ data: user, message: 'Profile updated successfully' });
});

// Delete user by id
router.delete('/:id', [validateObjectId, admin], async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).send({ message: 'Successfully deleted user' });
});

module.exports = router;
