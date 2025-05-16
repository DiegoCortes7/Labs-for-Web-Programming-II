const Student = require('./student');
const Course = require('./course');

// === Create a course ===
const course = new Course("Web Dev II", "Advanced JavaScript topics", "12 weeks");

// === Add students ===
const s1 = new Student("Alice", 22, ["HTML", "CSS"]);
const s2 = new Student("Bob", 24);
s2.addSubject("JavaScript");

course.addStudent(s1);
course.addStudent(s2);

// === Display course info ===
console.log("Total Students:", course.students.length);
console.log("Average Age:", course.getAverageAge());

// === Serialize course to JSON ===
const courseJSON = JSON.stringify(course.toJSON());
console.log("\nSerialized JSON:\n", courseJSON);

// === Deserialize JSON back to object ===
const parsedCourse = Course.fromJSON(courseJSON);
console.log("\nParsed Course Object:", parsedCourse);

// === Type checking ===
function isString(input) {
    return typeof input === 'string';
}

function validateStudent(student) {
    return typeof student.name === 'string' &&
           typeof student.age === 'number' &&
           Array.isArray(student.subjects);
}

// === Test type checking ===
console.log("\nIs 'Alice' a string?", isString("Alice"));
console.log("Is valid student?", validateStudent(s1));