import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @Expose()
  @ApiProperty({
    description: 'Id of the user',
    example: '66ffe659e5d76494b2514953',
  })
  _id: string;

  @Expose()
  @ApiProperty({
    description: 'Username of the user',
    example: 'pratham-airfi',
  })
  username: string;

  @Expose()
  @ApiProperty({
    description: 'Name of the user',
    example: 'Pratham',
  })
  name: string;

  @Expose()
  @ApiProperty({
    description: 'Email of the user',
    example: 'pratham@example.com',
  })
  email: string;

  @Expose()
  @ApiProperty({
    description: 'Whether the user is a super admin or not',
    example: false,
  })
  superAdmin: boolean;

  @Expose()
  @ApiProperty({
    description: 'Last logged in date of the user',
    example: '2022-01-01T00:00:00.000Z',
  })
  lastLoggedInOn?: Date;

  @Expose()
  @ApiProperty({
    description: 'Roles of the user',
    example: ['admin', 'user'],
  })
  roles: string[];

  @Expose()
  @ApiProperty({
    description: 'Datetime when the user was created',
    example: '2022-01-01T00:00:00.000Z',
  })
  createdAt: Date;

  @Expose()
  @ApiProperty({
    description: 'Datetime when the user was updated',
    example: '2022-01-01T00:00:00.000Z',
  })
  updatedAt: Date;
}
