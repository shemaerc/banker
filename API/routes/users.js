import express from 'express';
import Users from'../controllers/users';

const router = express.Router();

router.get('/auth/', Users.getUsers);
router.post('/auth/signup', Users.register);
router.post('/auth/signin', Users.login);
router.get('/auth/:id',Users.getUser);
router.patch('/auth/:id',Users.updateUser);
router.delete('/auth/:id',Users.deleteUser);
// export default router;
module.exports = router;