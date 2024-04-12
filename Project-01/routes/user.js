const express = require("express");
const {
    handleGetAllUsers,
    handleGetUserById,
    handleEditUserById,
    handleDeleteUserById,
    handleCreateNewUser,
} = require('../controllers/user.js');

const router = express.Router();

router
    .route('/')
    .get(handleGetAllUsers)
    .post(handleCreateNewUser)

router
    .route('/:id')
    .get(handleGetUserById)
    .patch(handleEditUserById)
    .delete(handleDeleteUserById)


module.exports = router;