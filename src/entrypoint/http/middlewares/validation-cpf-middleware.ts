import { Injectable, NestMiddleware, Param } from '@nestjs/common';
import { cpf } from 'cpf-cnpj-validator';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class ValidationCpfMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const dataBody = cpf.isValid(req.body.cpf);
    const dataParam = cpf.isValid(req.params[0]);

    if (dataBody === true) {
      return next();
    }

    if (dataParam === true) {
      return next();
    }

    res.status(400).send({ message: 'CPF is not valid' });
  }
}
