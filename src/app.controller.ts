import { Controller, Get, StreamableFile, Res } from '@nestjs/common';
import axios from 'axios';
import { Response } from 'express';
import { Auth } from './common/decorators/auth.decorator';
import { Role } from './common/enums/rol.enum';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('File')
@ApiBearerAuth()
@Auth(Role.SECRETARY)
@Controller('file')
export class AppController {
  @Get()
  async getFile(
    @Res({ passthrough: true }) res: Response,
  ): Promise<StreamableFile> {
    const url = 'https://link.testfile.org/PDF200MB';
    try {
      const response = await axios.get(url, { responseType: 'stream' });
      console.log('Response:', response);
      if (response.status !== 200) {
        throw new Error(`Failed to retrieve PDF file: ${response.status}`);
      }
      res.set({
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="PDF200MB.pdf"',
      });
      return new StreamableFile(response.data);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).send({ message: 'Failed to retrieve PDF file' });
    }
  }
}
