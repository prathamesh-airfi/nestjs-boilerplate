import { HydratedDocument, Types } from 'mongoose';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ collection: 'users', timestamps: true, id: true })
export class User {
  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ default: false })
  superAdmin: boolean;

  @Prop({ default: null })
  lastLoggedInOn?: Date;

  @Prop({ type: [{ type: Types.ObjectId }], default: [] })
  roles: string[];

  @Prop({ type: Types.ObjectId, default: null })
  createdBy: User;

  @Prop({ type: Types.ObjectId, default: null })
  updatedBy: User;

  @Prop({ type: Types.ObjectId, default: null })
  archivedBy?: User;

  @Prop({ default: null })
  archievedAt?: Date;

  createdAt: Date;

  updatedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
