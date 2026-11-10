import { IsEmail, IsInt, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';

export class EmailCodeDto {
  @IsEmail()
  email: string;

  @Type(() => Number)
  @IsInt()
  @Min(10000, { message: 'Code must be 5 digits' })
  @Max(99999, { message: 'Code must be 5 digits' })
  code: number;
}