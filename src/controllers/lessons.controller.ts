import {authenticate} from '@loopback/authentication';
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where
} from '@loopback/repository';
import {
  del, get,
  getModelSchemaRef, param,


  patch, post,




  put,

  requestBody
} from '@loopback/rest';
import {Lessons} from '../models';
import {LessonsRepository} from '../repositories';

@authenticate('jwt')

export class LessonsController {
  constructor(
    @repository(LessonsRepository)
    public lessonsRepository: LessonsRepository,
  ) {}

  @post('/lessons', {
    responses: {
      '200': {
        description: 'Lessons model instance',
        content: {'application/json': {schema: getModelSchemaRef(Lessons)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Lessons, {
            title: 'NewLessons',
            exclude: ['id'],
          }),
        },
      },
    })
    lessons: Omit<Lessons, 'id'>,
  ): Promise<Lessons> {
    return this.lessonsRepository.create(lessons);
  }

  @get('/lessons/count', {
    responses: {
      '200': {
        description: 'Lessons model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(Lessons) where?: Where<Lessons>,
  ): Promise<Count> {
    return this.lessonsRepository.count(where);
  }

  @get('/lessons', {
    responses: {
      '200': {
        description: 'Array of Lessons model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Lessons, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Lessons) filter?: Filter<Lessons>,
  ): Promise<Lessons[]> {
    return this.lessonsRepository.find(filter);
  }

  @patch('/lessons', {
    responses: {
      '200': {
        description: 'Lessons PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Lessons, {partial: true}),
        },
      },
    })
    lessons: Lessons,
    @param.where(Lessons) where?: Where<Lessons>,
  ): Promise<Count> {
    return this.lessonsRepository.updateAll(lessons, where);
  }

  @get('/lessons/{id}', {
    responses: {
      '200': {
        description: 'Lessons model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Lessons, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Lessons, {exclude: 'where'}) filter?: FilterExcludingWhere<Lessons>
  ): Promise<Lessons> {
    return this.lessonsRepository.findById(id, filter);
  }

  @patch('/lessons/{id}', {
    responses: {
      '204': {
        description: 'Lessons PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Lessons, {partial: true}),
        },
      },
    })
    lessons: Lessons,
  ): Promise<void> {
    await this.lessonsRepository.updateById(id, lessons);
  }

  @put('/lessons/{id}', {
    responses: {
      '204': {
        description: 'Lessons PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() lessons: Lessons,
  ): Promise<void> {
    await this.lessonsRepository.replaceById(id, lessons);
  }

  @del('/lessons/{id}', {
    responses: {
      '204': {
        description: 'Lessons DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.lessonsRepository.deleteById(id);
  }
}
