import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCourseDto } from './Dto/create-course.dto';
import { Course } from './Entity/course.entity';

@Injectable()
export class CoursesService {

    constructor(
        @InjectRepository(Course)
        private courseRepository: Repository<Course>
    ) {}

    // lay toan to khoa hoc
    getCourses(): Promise<Course[]> {
        return this.courseRepository.find();
    }

    // lay khoa hoc theo id
    getCourse(courseId): Promise<Course> {
        let id = Number(courseId);
        return this.courseRepository.findOne(id);
    }

    // them khoa hoc
    addCourse(course: CreateCourseDto): Promise<any> {
        let courseAdd: Course = new Course();
        courseAdd.title = course.title;
        courseAdd.description = course.description;
        courseAdd.author = course.author;
        courseAdd.url = course.url;

        let result = this.courseRepository.save(courseAdd);
        if (result) {
            return new Promise(resolve => {
                resolve({status: '200', message: 'Khóa học được thêm thành công'});
            });
        }
        return new Promise(resolve => {
            resolve({status: '400', message: 'Khóa học được thêm không thành công'});
        });
    }

    // cap nhat khoa hoc
    async updateCourse(coursesId: string | number ,course: CreateCourseDto) {
        let courseUpdate: Course = await this.courseRepository.findOne(coursesId);
        courseUpdate.title = course.title;
        courseUpdate.description = course.description;
        courseUpdate.author = course.author;
        courseUpdate.url = course.url;

        let result = this.courseRepository.save(courseUpdate);

        if (result) {
            return new Promise(resolve => {
                resolve({status: '200', message: 'Khóa học được sửa thành công'});
            });
        }
        return new Promise(resolve => {
            resolve({status: '400', message: 'Khóa học được sửa không thành công'});
        });
    }

    // xoa khoa hoc
    deleteCourse(courseId): Promise<any> {
        let id = Number(courseId);

        let result = this.courseRepository.delete(id);
        if (result) {
            return new Promise(resolve => {
                resolve({status: '200', message: 'Khóa học được xóa thành công'});
            });
        }
        return new Promise(resolve => {
            resolve({status: '400', message: 'Khóa học được xóa không thành công'});
        });
    }
}
