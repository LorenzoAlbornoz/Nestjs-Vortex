import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { DiseaseService } from './disease.service';
import { CreateDiseaseDto } from './dto/create-disease.dto';
import { UpdateDiseaseDto } from './dto/update-disease.dto';
import { Auth } from 'src/common/decorators/auth.decorator';
import { Role } from 'src/common/enums/rol.enum';

@Auth(Role.SECRETARY)
@Controller('disease')
export class DiseaseController {
  constructor(private readonly diseaseService: DiseaseService) {}

  @Post()
  async create(@Body() createDiseaseDto: CreateDiseaseDto) {
    return this.diseaseService.create(createDiseaseDto);
  }

  @Get()
  findAll() {
    return this.diseaseService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.diseaseService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDiseaseDto: UpdateDiseaseDto) {
    return this.diseaseService.update(+id, updateDiseaseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.diseaseService.remove(+id);
  }

  @Get('/search/:enfermedad')
  async findByText(@Param('enfermedad') enfermedad: string){
    return this.diseaseService.findByText(enfermedad);
  }
}
