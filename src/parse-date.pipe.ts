import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { parseISO } from 'date-fns';

@Injectable()
export class ParseDatePipe implements PipeTransform<string, Date> {
  transform(value: string, metadata: ArgumentMetadata): Date {
    const date = parseISO(value);

    if ('Invalid Date' === date.toString()) {
      throw new BadRequestException(
        `Invalid date provided for ${metadata.data}`,
      );
    }

    return date;
  }
}
