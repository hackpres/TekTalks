const router = require('express').Router();
const { User, Post, Comment } = require('../../models');

router.get('/', (req, res) => {
  try {
    const dbUserData = User.findAll({
      attributes: { exclude: ['password'] }
    })
    res.status(200).json(dbUserData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
})

router.get('/:id', (req, res) => {
  try {
    const dbUserData = User.findOne({
      attributes: { exclude: ['password'] },
      where: { user_id: req.params.id },
      include: [{
        model: Post,
        attributes: ['post_id', 'title', 'post_content', 'createdAt'],
      },
      {
        model: Comment,
        attributes: ['comment_id', 'comment_text', 'createdAt'],
        include: {
          model: Post,
          attributes: ['title']
        }
      },
      {
        model: Post,
        attributes: ['title'],
      }]
    },
    )
    if (!dbUserData) {
      res.status(404).json({ message: 'No user found with provided id' });
      return;
    }
    res.status(200).json(dbUserData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// CREATE new user
router.post('/', async (req, res) => {
  try {
    const dbUserData = await User.create({
      username: req.body.username,
      password: req.body.password,
    });
    req.session.regenerate((err) => {
      if(err) return next(err);
      req.session.user_id = dbUserData.user_id;
      req.session.username = dbUserData.username;
      req.session.loggedIn = true;
      console.log(req.session);
    })
    req.session.save((err) => {
      if(err) return next(err);
      res.status(200).json({ user: dbUserData });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const dbUserData = await User.findOne({
      where: {
        username: req.body.username,
      },
    });

    if (!dbUserData) {
      res.status(400).json({ message: 'No user with provided username was found!' });
      return;
    }
    const validPassword = dbUserData.checkPassword(req.body.password);
    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect password. Please try again!' });
      return;
    }
    req.session.regenerate((err) => {
      if(err) return next(err);
      req.session.save((err) => {
        if(err) return next(err)
        req.session.user_id = dbUserData.user_id;
        req.session.username = dbUserData.username;
        req.session.loggedIn = true;
        console.log(req.session);

        res.json({ user: dbUserData, message: 'You are now logged in!' });
        // res.render('/dashboard', { dbUserData, loggedIn: req.session.loggedIn});
        return;
      })
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Logout
router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

router.put('/:id', (req, res) => {
  try {
    const dbUserData = User.update({
      where: {
        user_id: req.params.id
      }
    })
    if (!dbUserData[0]) {
      res.status(404).json({ message: 'No user found with provided id' });
      return;
    }
    res.status(200).json(dbUserData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.delete('/:id', (req, res) => {
  try {
    const dbUserData = User.destroy({
      where: { user_id: req.params.id }
    })
    if (!dbUserData) {
      res.status(404).json({ message: 'No user found with provided id' });
      return;
    }
    res.status(200).json(dbUserData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
})

module.exports = router;
