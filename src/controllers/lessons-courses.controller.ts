import {authenticate} from '@loopback/authentication';
import {repository} from '@loopback/repository';
import {
  get,
  getModelSchemaRef, param
} from '@loopback/rest';
import {Courses, Lessons} from '../models';
import {LessonsRepository} from '../repositories';

@authenticate('jwt')

export class LessonsCoursesController {
  constructor(
    @repository(LessonsRepository)
    public lessonsRepository: LessonsRepository,
  ) {}

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
