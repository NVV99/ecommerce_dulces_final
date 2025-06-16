const express = require('express');
const {
  getAllUsers,
  getUserProfile,
  updateUser,
  deleteUser
} = require('../controllers/userController');
const auth = require('../middlewares/authMiddleware');
const isAdmin = require('../middlewares/isAdmin');

const router = express.Router();

// Perfil propio
router.get('/me', auth, getUserProfile);
router.put('/me', auth, updateUser);

// ADMINs
router.get('/', auth, isAdmin, getAllUsers);
router.delete('/:id', auth, isAdmin, deleteUser);

module.exports = router;
