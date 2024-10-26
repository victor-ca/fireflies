// Validation middleware
import { Request, Response, NextFunction } from "express";
import { ValidationChain, validationResult } from "express-validator";

export const validate = (validations: ValidationChain[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    await Promise.all(validations.map((validation) => validation.run(req)));

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    res.status(400).json({ errors: errors.array() });
  };
};

// Example usage:
// app.post('/api/example', validate([
//   body('username').isString().notEmpty(),
//   body('email').isEmail(),
// ]), (req, res) => {
//   // Your route handler
// });