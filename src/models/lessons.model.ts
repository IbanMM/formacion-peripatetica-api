import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Courses} from './courses.model';

@model({settings: {strict: false}})
export class Lessons extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
  })
  desc?: string;

  @property({
    type: 'string',
  })
  image?: string;

  @property({
    type: 'string',
  })
  video?: string;

  @property({
    type: 'string',
    required: true,
  })
  slug: string;

  @belongsTo(() => Courses)
  coursesId: string;
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Lessons>) {
    super(data);
  }
}

export interface LessonsRelations {
  // describe navigational properties here
}

export type LessonsWithRelations = Lessons & LessonsRelations;
