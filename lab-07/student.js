class Student {
    constructor(name, age, subjects = []) {
        this.name = name;
        this.age = age;
        this.subjects = subjects;
    }

    addSubject(subject) {
        this.subjects.push(subject);
    }
}

module.exports = Student;