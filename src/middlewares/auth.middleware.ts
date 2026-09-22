import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    res.status(401).json({ erro: 'Token não fornecido.' });
    return;
  }

  const [prefix, token] = authHeader.split(' ');

  if (prefix !== 'Bearer' || !token) {
    res.status(401).json({ erro: 'Token inválido.' });
    return;
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET as string);
    next();
  } catch {
    res.status(401).json({ erro: 'Token inválido ou expirado.' });
  }
}
//É a página dedicada à autorização do token para acessar ao site.