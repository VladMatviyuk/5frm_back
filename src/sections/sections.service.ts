import { Injectable, NotFoundException } from '@nestjs/common';
import { Section, SectionDocument } from './schema/section.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateSectionDto } from './dto/create-section.dto';
import { UpdateSectionDto } from './dto/update-section.dto';

@Injectable()
export class SectionsService {
  constructor(
    @InjectModel(Section.name)
    private sectionModel: Model<Section>,
  ) {}

  async findAll(): Promise<SectionDocument[]> {
    return this.sectionModel.find().exec();
  }

  async findOne(alias: string): Promise<SectionDocument> {
    const section = await this.sectionModel.findOne({ alias }).exec();

    if (!section) {
      throw new NotFoundException(`Section with ID ${alias} not found`);
    }

    return section;
  }

  async create(createSectionDto: CreateSectionDto): Promise<SectionDocument> {
    const createdSection = new this.sectionModel(createSectionDto);
    return createdSection.save();
  }

  async update(
    id: string,
    updateSectionDto: UpdateSectionDto,
  ): Promise<SectionDocument | null> {
    return this.sectionModel
      .findByIdAndUpdate(id, updateSectionDto, { new: true })
      .exec();
  }

  async remove(id: string): Promise<any> {
    return this.sectionModel.findByIdAndDelete(id).exec();
  }
}
