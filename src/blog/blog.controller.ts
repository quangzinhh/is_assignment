import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BlogService } from './blog.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { PythonShell } from 'python-shell';

@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Post()
  create(@Body() createBlogDto: CreateBlogDto) {
    return this.blogService.create(createBlogDto);
  }

  @Get()
  findAll() {
    return this.blogService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.blogService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBlogDto: UpdateBlogDto) {
    return this.blogService.update(+id, updateBlogDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.blogService.remove(+id);
  }

  @Post('predict')
  async predictPrice(@Body() inputData: any): Promise<any> {
    return new Promise((resolve, reject) => {
      const shell = new PythonShell('inference.py', { args: [JSON.stringify(inputData)] });

      let output = '';
      shell.on('message', (message) => {
        output += message;
      });

      shell.on('error', (err) => {
        console.error('Error running Python script:', err);
        reject(err);
      });

      shell.on('close', () => {
        console.log('Python script result:', output);
        resolve(output);
      });
    });
  }
}
