const Course = require('./course');

async function testLoad() {
  const loadedCourse = await Course.loadFromFile('courseData.json');
  if (!loadedCourse) {
    console.log('✔️ Gracefully handled missing courseData.json');
  } else {
    console.log('❌ Expected courseData.json to be missing, but it loaded.');
  }
}

testLoad();