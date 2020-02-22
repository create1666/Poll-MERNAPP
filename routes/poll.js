const router = require('express').Router();

const handle = require('../handlers');
const auth = require('../middlewares/auth');

router
.route('/')
.get(handle.showPolls)// show everything
.post(auth, handle.createPoll);

router.get('/user', auth, handle.usersPolls);

router
.route('/:id')
.get(handle.getPoll)
.post()
.delete();

module.exports = router;