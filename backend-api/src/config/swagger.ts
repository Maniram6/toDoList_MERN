import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Todo API',
      version: '1.0.0',
      description: 'A simple Todo List API with TypeScript, Express, and MongoDB',
      contact: {
        name: 'Mani Ram Madu',
        email: 'madu.maniram@gmail.com'
      },
      license: {
        name: 'MIT',
        url: 'https://spdx.org/licenses/MIT.html'
      }
    },
    servers: [
      {
        url: 'http://localhost:5000',
        description: 'Development server'
      },
      {
        url: 'https://your-production-url.com',
        description: 'Production server'
      }
    ],
    components: {
      schemas: {
        Todo: {
          type: 'object',
          required: ['text'],
          properties: {
            _id: {
              type: 'string',
              description: 'Auto-generated todo ID',
              example: '507f1f77bcf86cd799439011'
            },
            text: {
              type: 'string',
              description: 'The todo text content',
              example: 'Buy groceries'
            },
            completed: {
              type: 'boolean',
              description: 'Completion status of the todo',
              default: false,
              example: false
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Auto-generated creation timestamp',
              example: '2023-12-01T10:30:00.000Z'
            }
          }
        },
        CreateTodoRequest: {
          type: 'object',
          required: ['text'],
          properties: {
            text: {
              type: 'string',
              description: 'The todo text content',
              example: 'Learn TypeScript'
            }
          }
        },
        UpdateTodoRequest: {
          type: 'object',
          properties: {
            text: {
              type: 'string',
              description: 'The updated todo text content',
              example: 'Learn TypeScript and Node.js'
            },
            completed: {
              type: 'boolean',
              description: 'Updated completion status',
              example: true
            }
          }
        },
        Error: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
              description: 'Error message',
              example: 'Todo not found'
            }
          }
        }
      }
    },
    tags: [
      {
        name: 'Todos',
        description: 'Todo management endpoints'
      }
    ]
  },
  apis: ['./src/routes/*.ts'] // Path to the API routes
};

const swaggerSpec = swaggerJSDoc(options);

export const setupSwagger = (app: Express): void => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  app.get('/api-docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });
};