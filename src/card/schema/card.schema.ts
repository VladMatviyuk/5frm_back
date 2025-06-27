// src/card/schemas/card.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

@Schema()
export class Card {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  text: string;

  @Prop({ type: Types.ObjectId, ref: 'Section', required: true })
  sectionId: Types.ObjectId;
}

export const CardSchema = SchemaFactory.createForClass(Card);
export type CardDocument = HydratedDocument<Card>;
