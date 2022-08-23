const router = require('express').Router();
const { Author, Blog } = require('../models');

// GET all blogs for homepage
router.get('/', async (req, res) => {
  try {
    const dbBlogData = await Blog.findAll({
      include: [
        {
          model: Blog,
          attributes: ['name', 'description'],
        },
      ],
    });

    const blogs = dbBlogData.map((blog) =>
      blog.get({ plain: true })
    );

    res.render('homepage', {
      blogs,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET one blog
router.get('/blogs/:id', async (req, res) => {
  // If the user is not logged in, redirect the user to the login page
  if (!req.session.loggedIn) {
    res.redirect('/login');
  } else {
    // If the user is logged in, allow them to view the blog
    try {
      const dbBlogData = await Blog.findByPk(req.params.id, {
        include: [
          {
            model: Blog,
            attributes: [
              'blog_id',
              'title',
              'description',
              'author',
            ],
          },
        ],
      });
      const blog = dbBlogData.get({ plain: true });
      res.render('blog', { blog, loggedIn: req.session.loggedIn });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }
});

// GET one author
router.get('/author/:id', async (req, res) => {
  // If the user is not logged in, redirect the user to the login page
  if (!req.session.loggedIn) {
    res.redirect('/login');
  } else {
    // If the user is logged in, allow them to view the author
    try {
      const dbAuthorData = await Author.findByPk(req.params.id);

      const author = dbAuthorData.get({ plain: true });

      res.render('author', { author, loggedIn: req.session.loggedIn });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }
});

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

module.exports = router;
