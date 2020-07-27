import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {Lessons, LessonsRelations, Courses} from '../models';
import {DbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {CoursesRepository} from './courses.repository';

export class LessonsRepository extends DefaultCrudRepository<
  Lessons,
  typeof Lessons.prototype.id,
  LessonsRelations
> {

  public readonly courses: BelongsToAccessor<Courses, typeof Lessons.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('CoursesRepository') protected coursesRepositoryGetter: Getter<CoursesRepository>,
  ) {
    super(Lessons, dataSource);
    this.courses = this.createBelongsToAccessorFor('courses', coursesRepositoryGetter,);
    this.registerInclusionResolver('courses', this.courses.inclusionResolver);
  }
}
