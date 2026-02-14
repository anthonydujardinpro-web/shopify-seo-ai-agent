const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const dotenv = require('dotenv');
const winston = require('winston');
const shopifyModule = require('./modules/shopify');
const seoModule = require('./modules/seo');
const chatbotModule = require('./modules/chatbot');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Logger configuration
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple()
  }));
}

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Routes
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date() });
});

// Shopify routes
app.use('/api/shopify', shopifyModule.router);

// SEO routes
app.use('/api/seo', seoModule.router);

// Chatbot routes
app.use('/api/chatbot', chatbotModule.router);

// Error handling middleware
app.use((err, req, res, next) => {
  logger.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error', message: err.message });
});

// Start server
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
  console.log(`🚀 Shopify SEO AI Agent running on http://localhost:${PORT}`);
});

module.exports = app;