import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './Dto/create-course.dto';

@Controller('courses')
export class CoursesController {
    constructor(private coursesService: CoursesService) {}

    // lay toan bo khoa hoc
    @Get()
    async　getCourses() {
        const courses = await this.coursesService.getCourses();
        return courses;
    }

    // lay khoa hoc theo id
    @Get(':coursesId')
    async getCourse(@Param('coursesId') coursesId) {
        const course = this.coursesService.getCourse(coursesId);
        return course;
    }

    // them khoa hoc
    @Post()
    async addCourse(@Body() createCourseDto: CreateCourseDto) {
        const course = await this.coursesService.addCourse(createCourseDto);
        return course;
    }

    // cap nhat khoa hoc
    @Put(':coursesId')
    async updateCourse(@Param('coursesId') coursesId: string | number, @Body() createCourseDto: CreateCourseDto) {
        const course = await this.coursesService.updateCourse(coursesId, createCourseDto);
        return course;
    }

    // xoa khoa hoc
    @Delete()
    async deleteCourse(@Query() query) {
        const courses = await this.coursesService.deleteCourse(query.courseId);
        return courses;
    }
}
