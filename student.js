// run `node index.js` in the terminal

const fs = require('fs');

async function sortStudents(filename) {
  try {
    const response = fs.readFileSync(filename, 'utf8');
    const data = response.data;
    const lines = data.trim().split('\n');
    const students = [];

    for (const line of lines) {
      const [name, chemistryMarks, biologyMarks, dateOfBirth] = line.split(',');
      const student = {
        name: name.trim(),
        chemistryMarks: parseInt(chemistryMarks.trim()),
        biologyMarks: parseInt(biologyMarks.trim()),
        dateOfBirth: dateOfBirth.trim(),
      };
      students.push(student);
    }

    students.sort((a, b) => {
      const totalMarksDiff = b.totalMarks - a.totalMarks;
      if (totalMarksDiff !== 0) {
        return totalMarksDiff;
      }
      const biologyMarksDiff = b.biologyMarks - a.biologyMarks;
      if (biologyMarksDiff != 0) {
        return biologyMarksDiff;
      }
      const dateA = new Date(a.dateOfBirth.split('-').reverse().join('-'));
      const dateB = new Date(b.dateOfBirth.split('-').reverse().join('-'));
      return dateA - dateB;
    });
    return students;
  } catch (error) {
    console.error('Error fetching file: ', error.message);
    return [];
  }
}

sortStudents(
  'https://raw.githubusercontent.com/ChandiniDevi/students/main/students.txt'
)
  .then((studentSorted) => {
    studentSorted.forEach((student) => {
      console.log(student);
    });
  })
  .catch((error) => {
    console.error('Error sorting students:', error.message);
  });
