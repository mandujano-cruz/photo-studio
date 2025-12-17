const router = require('express').Router();
const {
  getUsers,
  getUserById,
  getCurrentUser,
  createUser,
  updateProfile,
} = require('../controllers/users');

// const {
//   validateUserIdParam,
//   validateUpdateProfile,
//   validateUpdateAvatar,
// } = require('../middleware/validators');

router.get('/', getUsers);
router.get('/me', getCurrentUser); // sin uso
router.post('/register', createUser);
router.patch('/me', updateProfile);
// router.get('/:userId', validateUserIdParam, getUserById);
// router.patch('/me', validateUpdateProfile, updateProfile);
// router.patch('/me/avatar', validateUpdateAvatar, updateAvatar);

module.exports = router;