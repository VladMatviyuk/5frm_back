import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Model } from 'mongoose';

@Schema()
export class Section {
  @Prop()
  name: string;

  @Prop()
  description: string;
}

export const SectionSchema = SchemaFactory.createForClass(Section);
export type SectionDocument = HydratedDocument<Section>;
export type SectionModel = Model<SectionDocument>;
