class Course {
  constructor(title, description, duration) {
    this.title = title;
    this.description = description;
    this.duration = duration;
    this.students = [];
  }

  addStudent(student) {
    this.students.push(student);
  }

  getAverageAge() {
    if (this.students.length === 0) return 0;
    const totalAge = this.students.reduce((sum, s) => sum + s.age, 0);
    return totalAge / this.students.length;
  }

  toJSON() {
    return {
      title: this.title,
      description: this.description,
      duration: this.duration,
      students: this.students
    };
  }

  static fromJSON(jsonString) {
    const data = JSON.parse(jsonString);
    const course = new Course(data.title, data.description, data.duration);
    course.students = data.students;
    return course;
  }
}

module.exports = Course;