import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Blog } from './entities/blog.entity';

@Injectable()
export class BlogRepository extends Repository<Blog> {}