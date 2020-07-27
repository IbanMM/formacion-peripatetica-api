import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Lessons,
  Courses,
} from '../models';
import {LessonsRepository} from '../repositories';

export class LessonsCoursesController {
  constructor(
    @repository(LessonsRepository)
    public lessonsRepository: LessonsRepository,
  ) { }

  @get('/lessons/{id}/courses', {
    responses: {
      '200': {
        description: 'Courses belonging to Lessons',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Courses)},
          },
        },
      },
    },
  })
  async getCourses(
    @param.path.string('id') id: typeof Lessons.prototype.id,
  ): Promise<Courses> {
    return this.lessonsRepository.courses(id);
  }
}
