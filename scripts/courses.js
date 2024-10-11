const courses = [
    {
        subject: 'CSE',
        number: 110,
        title: 'Introduction to Programming',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce students to programming. It will introduce the building blocks of programming languages (variables, decisions, calculations, loops, array, and input/output) and use them to solve problems.',
        technology: [
            'Python'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 130,
        title: 'Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces students to the World Wide Web and to careers in web site design and development. The course is hands on with students actually participating in simple web designs and programming. It is anticipated that students who complete this course will understand the fields of web design and development and will have a good idea if they want to pursue this degree as a major.',
        technology: [
            'HTML',
            'CSS'
        ],
        completed: true
    },
    {
        subject: 'CSE',
        number: 111,
        title: 'Programming with Functions',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'CSE 111 students become more organized, efficient, and powerful computer programmers by learning to research and call functions written by others; to write, call , debug, and test their own functions; and to handle errors within functions. CSE 111 students write programs with functions to solve problems in many disciplines, including business, physical science, human performance, and humanities.',
        technology: [
            'Python'
        ],
        completed: true
    },
    {
        subject: 'CSE',
        number: 210,
        title: 'Programming with Classes',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce the notion of classes and objects. It will present encapsulation at a conceptual level. It will also work with inheritance and polymorphism.',
        technology: [
            'C#'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 131,
        title: 'Dynamic Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience in Web Fundamentals and programming. Students will learn to create dynamic websites that use JavaScript to respond to events, update content, and create responsive user experiences.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 231,
        title: 'Frontend Web Development I',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience with Dynamic Web Fundamentals and programming. Students will focus on user experience, accessibility, compliance, performance optimization, and basic API usage.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: false
    }
];

const coursesDiv = document.querySelector('#courses');
const courseDetails = document.querySelector('#course-details');
const allCoursesButton = document.querySelector('#all-courses');
const cseCourses = document.querySelector('#cse-courses');
const wddCourses = document.querySelector('#wdd-courses');

allCoursesButton.addEventListener('click', () => {
    allCoursesButton.classList.add("sub-nav-selected")
    cseCourses.classList.remove("sub-nav-selected")
    wddCourses.classList.remove("sub-nav-selected")
    createCourses(courses);
});

cseCourses.addEventListener('click', () => {
    allCoursesButton.classList.remove("sub-nav-selected")
    cseCourses.classList.add("sub-nav-selected")
    wddCourses.classList.remove("sub-nav-selected")
    createCourses(courses.filter((course) => course.subject === 'CSE'));
});

wddCourses.addEventListener('click', () => {
    allCoursesButton.classList.remove("sub-nav-selected")
    cseCourses.classList.remove("sub-nav-selected")
    wddCourses.classList.add("sub-nav-selected")
    createCourses(courses.filter((course) => course.subject === 'WDD'));
});

function createCourses(filteredCourses) {
    coursesDiv.innerHTML = '';
    for (const course of filteredCourses) {
        let courseDiv = document.createElement('div');
        courseDiv.className = 'course';
        if (course.completed) {
            courseDiv.classList.add('completed');
        }
        courseDiv.innerHTML = `${course.subject} ${course.number} (${course.credits})`;
        coursesDiv.appendChild(courseDiv);
        courseDiv.addEventListener('click', () => {
            showCourseModal(course);
        })
    }
}

function showCourseModal(course) {
    const completedIcon = course.completed ? '✅' : '❌';
    courseDetails.innerHTML = `
        <div class="course-detail">
            <div class="dialog-title-bar">
                <h2>${course.title}</h2>
                <button title="Close Dialog"></button>
            </div>
            <h4>${course.subject} ${course.number} : ${course.credits} Credits</h4>
            <h5>Completed: ${completedIcon}</h5>
            <p>${course.description}</p>
            <div class="technology">
                <h5>Technology</h5>
                ${course.technology.map((t) => `<span>${t}</span>`).join('')}
            </div>
        </div>
    `;
    courseDetails.querySelector('button').addEventListener('click', () => courseDetails.close());
    courseDetails.showModal();
}

const creditsRemainingSpan = document.querySelector('#credits-remaining');
function setCreditsRemaining() {
    let totalCredits = courses.reduce((accumulator, course) => accumulator + course.credits, 0);
    let creditsRemaining = courses
        .filter((course) => course.completed === false)
        .reduce((accumulator, course) => accumulator + course.credits, 0)

    creditsRemainingSpan.innerHTML = `(${creditsRemaining} of ${totalCredits} credits remaining)`;    
}

createCourses(courses);
setCreditsRemaining();
allCoursesButton.classList.add("sub-nav-selected")
