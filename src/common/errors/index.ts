import { HttpException, HttpStatus } from '@nestjs/common';

interface ExceptionProps {
  message?: string;
  model?: string;
}

export class RecordNotFoundException extends HttpException {
  constructor({ message, model }: ExceptionProps) {
    super(
      message ? message : `${model ?? 'data'} does not exists`,
      HttpStatus.NOT_FOUND,
    );
  }
}

export class AlreadyExistsException extends HttpException {
  constructor({ message, model }: ExceptionProps) {
    super(
      message ? message : `${model ?? 'data'} already exists`,
      HttpStatus.FORBIDDEN,
    );
  }
}
