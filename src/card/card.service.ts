import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CardDocument } from './schema/card.schema';

@Injectable()
export class CardService {
  constructor(
    @InjectModel('Card')
    private readonly cardModel: Model<CardDocument>,
  ) {}

  async findAll(): Promise<CardDocument[]> {
    return this.cardModel.find().exec();
  }

  async findOne(id: string): Promise<CardDocument> {
    const card = await this.cardModel.findById(id).populate('sectionId').exec();
    if (!card) {
      throw new NotFoundException(`Card with ID ${id} not found`);
    }
    return card;
  }

  async findAllBySection(sectionId: string): Promise<CardDocument[]> {
    return this.cardModel.find({ sectionId }).populate('sectionId').exec();
  }

  async create(createCardDto: CreateCardDto): Promise<CardDocument> {
    const createdCard = new this.cardModel(createCardDto);
    return createdCard.save();
  }

  async update(
    id: string,
    updateCardDto: UpdateCardDto,
  ): Promise<CardDocument | null> {
    return this.cardModel
      .findByIdAndUpdate(id, updateCardDto, { new: true })
      .populate('sectionId')
      .exec();
  }

  async remove(id: string): Promise<any> {
    const result = await this.cardModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Card with ID ${id} not found`);
    }
  }
}
