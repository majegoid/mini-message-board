const express = require('express');
const router = express.Router();
const { formatRelative } = require('date-fns');

const messages = [
  {
    text: 'Hi there!',
    user: 'Amando',
    added: new Date(),
  },
  {
    text: 'Hello World!',
    user: 'Charles',
    added: new Date(),
  },
];

const messagesTransform = () => {
  return messages.map((message) => {
    return {
      ...message,
      dateString: formatRelative(message.added, new Date()),
    };
  });
};

/* GET home page. */
router.get('/', function (req, res) {
  res.render('index', {
    title: 'Mini Message Board',
    messages: messagesTransform(),
  });
});

/* GET home page. */
router.get('/new', function (req, res) {
  res.render('form', { title: 'Create New Message' });
});

/* handle form page post. */
router.post('/new', function (req, res) {
  const { name, text } = req.body;

  messages.push({
    text: text,
    user: name,
    added: new Date(),
  });

  res.redirect('/');
});

module.exports = router;
