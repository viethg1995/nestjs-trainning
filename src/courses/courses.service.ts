import { HttpException, Injectable } from '@nestjs/common';
import { COURSES } from './courses.mock';
import { CreateCourseDto } from './Dto/create-course.dto';

@Injectable()
export class CoursesService {

    courses = COURSES;

    // lay toan to khoa hoc
    getCourses(): Promise<any> {
        return new Promise(resolve => {
             resolve(this.courses);
        });
    }

    // lay khoa hoc theo id
    getCourse(courseId): Promise<any> {
        let id = Number(courseId);
        return new Promise(resolve => {
            const course = this.courses.find(course => course.id === id);
            if (!course) {
                throw new HttpException('Course does not exist', 404)
            }
            resolve(course);
        });
    }

    // them khoa hoc
    addCourse(course): Promise<any> {
        return new Promise(resolve => {
            this.courses.push(course);
            resolve({status: '200', message: 'Khóa học được thêm thành công'});
        });
    }

    // cap nhat khoa hoc
    updateCourse(coursesId: string | number ,course: CreateCourseDto) {
        let id = Number(coursesId);

        return new Promise(resolve => {
            const courseUpdate = this.courses.find(course => course.id === id);
            if (!courseUpdate) {
                throw new HttpException('Course does not exist', 404)
            }

            courseUpdate.title = course.title;
            courseUpdate.author = course.author;
            courseUpdate.description = course.description;
            courseUpdate.url = course.url;

            resolve({status: '200', message: 'Khóa học được cập nhật thành công'});
        });
    }

    // xoa khoa hoc
    deleteCourse(courseId): Promise<any> {
        let id = Number(courseId);
        return new Promise(resolve => {
            let index = this.courses.findIndex(course => course.id === id);
            if (index === -1) {
                throw new HttpException('Course does not exist', 404);
            }
            this.courses.splice(index, 1);
            resolve({status: '200', message: 'Khóa học được xóa thành công'});
        });
    }
}
