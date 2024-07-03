const whitelist = [
  'https://www.yoursite.com',
  'http://127.0.0.1:5500',
  'http://localhost:5000'
];

const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true, // Allow cookies and other credentials to be sent cross-origin
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Specify which methods are allowed
  allowedHeaders: 'Content-Type,Authorization', // Specify which headers are allowed
  optionsSuccessStatus: 200, // Specify a custom success status for OPTIONS requests
};


module.exports = corsOptions;