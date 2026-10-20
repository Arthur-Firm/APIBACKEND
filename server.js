const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const livroRoutes = require('./routes/livroRoutes');
const autorRoutes = require('./routes/autorRoutes');
const errorHandler = require('./middlewares/errorMiddleware');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./config/swagger');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Agrupamento Semântico de Rotas (RESTful /api/v1)
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/livros', livroRoutes);
app.use('/api/v1/autores', autorRoutes);

// Middleware Global de Tratamento de Erros
app.use(errorHandler);

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/docs/api.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerDocument);
});


app.listen(PORT, () => {
  console.log(`Livraria API rodando em http://localhost:${PORT}`);
});