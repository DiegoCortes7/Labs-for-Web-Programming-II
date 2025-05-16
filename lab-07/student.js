class Student {
  constructor(name, age, subjects = []) {
    this.name = name;
    this.age = age;
    this.subjects = subjects;
  }

  addSubject(subject) {
    this.subjects.push(subject);
  }

  toJSON() {
    return {
      name: this.name,
      age: this.age,
      subjects: this.subjects,
    };
  }

  static fromJSON(data) {
    // data can be an object parsed from JSON
    return new Student(data.name, data.age, data.subjects);
  }
}

module.exports = Student;
