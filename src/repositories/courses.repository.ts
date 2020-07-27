import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {Courses, CoursesRelations, Lessons} from '../models';
import {DbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {LessonsRepository} from './lessons.repository';

export class CoursesRepository extends DefaultCrudRepository<
  Courses,
  typeof Courses.prototype.id,
  CoursesRelations
> {

  public readonly lessons: HasManyRepositoryFactory<Lessons, typeof Courses.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('LessonsRepository') protected lessonsRepositoryGetter: Getter<LessonsRepository>,
  ) {
    super(Courses, dataSource);
    this.lessons = this.createHasManyRepositoryFactoryFor('lessons', lessonsRepositoryGetter,);
    this.registerInclusionResolver('lessons', this.lessons.inclusionResolver);
  }
}
