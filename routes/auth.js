const express = require('express');
const router = express.Router();

// Login Page
router.get('/login', (req, res) => {
  res.render('login', { pageTitle: 'Login Page', invalid: false });
});

// Handle Login Submission
router.post('/login', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (username === 'admin' && password === '1234') { // For testing
    req.session.isAuthenticated = true;
    return res.redirect('/');
  } else {
    return res.render('login', {
      pageTitle: 'Login Page',
      invalid: true,
    });
  }
});

// Logout
router.get('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) console.log(err);
    res.redirect('/login');
  });
});

module.exports = router;
