const User = require('../models/user.js');

async function handleGetAllUsers(req, res) {
    const allDbUsers = await User.find({});
    console.log(allDbUsers);
    return res.json(allDbUsers);
}

async function handleGetUserById(req, res) {
    const user = await User.findById(req.params.id);
    if(!user){
        return res.status(404).json({ error: "id not found..."});
    }
    return res.json(user);
}

async function handleEditUserById(req, res) {
    await User.findByIdAndUpdate(req.params.id, { last_name: "changed" });
    return res.json({ msg: "updated" });
}

async function handleDeleteUserById(req, res) {
    await User.findByIdAndDelete(req.params.id);
    return res.json({ msg: "deleted" });
}

async function handleCreateNewUser(req, res) {
    const body = req.body;
    // to check something is missing
    if(!body || !body.first_name || !body.last_name || !body.email || !body.gender || !body.job_title){
        return res.status(400).json({ msg: 'All fields are required...'});
    }
    const result = await User.create({
        first_name: body.first_name,
        last_name: body.last_name,
        email: body.email,
        gender: body.gender,
        job_title: body.job_title,
    });
    return res.status(201).json({ msg: "successfully created", id: result._id });
}

module.exports = {
    handleGetAllUsers,
    handleGetUserById,
    handleEditUserById,
    handleDeleteUserById,
    handleCreateNewUser,
};