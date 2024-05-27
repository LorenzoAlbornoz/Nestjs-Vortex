import { Controller, Get, StreamableFile, Res } from '@nestjs/common';
import axios from 'axios';
import { Response } from 'express';

@Controller('file')
export class AppController {
  @Get()
  async getFile(
    @Res({ passthrough: true }) res: Response,
  ): Promise<StreamableFile> {
    const url = 'https://link.testfile.org/PDF200MB';
    const response = await axios.get(url, { responseType: 'stream' });

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename="PDF200MB.pdf"',
    });

    return new StreamableFile(response.data);
  }
}
