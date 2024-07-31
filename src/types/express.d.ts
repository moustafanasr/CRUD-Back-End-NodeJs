// src/types/express.d.ts

import 'express';

declare global {
  namespace Express {
    interface Request {
      userId?: string; // Add `userId` property to the Request object
    }
  }
}
