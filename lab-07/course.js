const fs = require('fs/promises');
const Student = require('./student');

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
      students: this.students,
    };
  }

  static fromJSON(jsonString) {
    const data = JSON.parse(jsonString);
    const course = new Course(data.title, data.description, data.duration);
    course.students = data.students.map(
      s => new Student(s.name, s.age, s.subjects)
    );
    return course;
  }

  // New method to save course to a JSON file asynchronously
  async saveToFile(filename) {
    try {
      const jsonData = JSON.stringify(this);
      await fs.writeFile(filename, jsonData);
      console.log(`Course data saved to ${filename}`);
    } catch (error) {
      console.error(`Error saving course data: ${error.message}`);
    }
  }

  // New static method to load course from a JSON file asynchronously
  static async loadFromFile(filename) {
    try {
      const fileContent = await fs.readFile(filename, 'utf-8');
      const data = JSON.parse(fileContent);
      const course = new Course(data.title, data.description, data.duration);
      course.students = data.students.map(
        s => new Student(s.name, s.age, s.subjects)
      );
      return course;
    } catch (error) {
      console.error(`Error loading course data: ${error.message}`);
      // Return null or throw to let caller handle error
      return null;
    }
  }
}

module.exports = Course;