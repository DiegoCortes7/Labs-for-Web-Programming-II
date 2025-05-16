const Course = require('./course');
const Student = require('./student');

async function main() {
  // Step 1: Create a new course
  const webCourse = new Course("Web Programming II", "Advanced topics in web development", "10 weeks");

  // Step 2: Create and add students
  const student1 = new Student("Alice", 21, ["HTML", "CSS"]);
  const student2 = new Student("Bob", 23, ["JavaScript", "Node.js"]);

  webCourse.addStudent(student1);
  webCourse.addStudent(student2);

  // Step 3: Save course to a file
  const filename = 'courseData.json';
  await webCourse.saveToFile(filename);

  // Step 4: Load course from file
  const loadedCourse = await Course.loadFromFile(filename);

  // Step 5: Print loaded course info
  if (loadedCourse) {
    console.log("\n📘 Loaded Course Information:");
    console.log("Title:", loadedCourse.title);
    console.log("Description:", loadedCourse.description);
    console.log("Duration:", loadedCourse.duration);
    console.log("Average Student Age:", loadedCourse.getAverageAge());

    console.log("\n👥 Students:");
    loadedCourse.students.forEach((s, i) => {
      console.log(`- ${s.name}, Age: ${s.age}, Subjects: ${s.subjects.join(', ')}`);
    });
  } else {
    console.log("Failed to load course.");
  }
}

main();