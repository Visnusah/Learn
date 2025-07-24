// Course content data and utility functions

/**
 * @typedef {Object} LessonContent
 * @property {string} id
 * @property {string} title
 * @property {string} description
 * @property {'video'|'text'|'quiz'} type
 * @property {string} duration
 * @property {string} [content]
 * @property {string} [videoId]
 * @property {Object} [quiz]
 * @property {Array} [resources]
 */

/**
 * @typedef {Object} CourseSection
 * @property {string} id
 * @property {string} title
 * @property {string} description
 * @property {LessonContent[]} lessons
 */

/**
 * @typedef {Object} CourseContent
 * @property {string} courseId
 * @property {CourseSection[]} sections
 */

// Mock course content data
const courseContentData = [
  {
    courseId: '1',
    sections: [
      {
        id: 'section-1-1',
        title: 'Getting Started with Web Development',
        description: 'Learn the fundamentals of web development',
        lessons: [
          {
            id: 'lesson-1-1-1',
            title: 'Introduction to HTML',
            description: 'Learn the basics of HTML markup language',
            type: 'video',
            duration: '45 min',
            videoId: 'UB1O30fR-EE',
            content: `
              <h2>Introduction to HTML</h2>
              <p>HTML (HyperText Markup Language) is the standard markup language for creating web pages. It describes the structure of a web page using markup.</p>
              
              <h3>What is HTML?</h3>
              <p>HTML stands for HyperText Markup Language. It's the foundation of all web pages and provides the basic structure that all websites are built upon.</p>
              
              <h3>Key Concepts:</h3>
              <ul>
                <li><strong>Elements and Tags:</strong> HTML uses tags to define elements like headings, paragraphs, links, and images</li>
                <li><strong>Document Structure:</strong> Every HTML document has a basic structure with head and body sections</li>
                <li><strong>Semantic Markup:</strong> Using HTML elements that convey meaning about the content</li>
                <li><strong>Attributes:</strong> Additional information provided to HTML elements</li>
              </ul>
              
              <h3>Basic HTML Structure:</h3>
              <pre><code>&lt;!DOCTYPE html&gt;
&lt;html&gt;
  &lt;head&gt;
    &lt;title&gt;Page Title&lt;/title&gt;
  &lt;/head&gt;
  &lt;body&gt;
    &lt;h1&gt;My First Heading&lt;/h1&gt;
    &lt;p&gt;My first paragraph.&lt;/p&gt;
  &lt;/body&gt;
&lt;/html&gt;</code></pre>
              
              <h3>Common HTML Elements:</h3>
              <ul>
                <li><code>&lt;h1&gt; to &lt;h6&gt;</code> - Headings</li>
                <li><code>&lt;p&gt;</code> - Paragraphs</li>
                <li><code>&lt;a&gt;</code> - Links</li>
                <li><code>&lt;img&gt;</code> - Images</li>
                <li><code>&lt;div&gt;</code> - Division/container</li>
                <li><code>&lt;span&gt;</code> - Inline container</li>
              </ul>
            `,
            resources: [
              {
                name: 'HTML Cheat Sheet',
                type: 'pdf',
                url: '#'
              },
              {
                name: 'MDN HTML Reference',
                type: 'link',
                url: 'https://developer.mozilla.org/en-US/docs/Web/HTML'
              }
            ]
          },
          {
            id: 'lesson-1-1-2',
            title: 'CSS Fundamentals',
            description: 'Master the basics of CSS styling',
            type: 'video',
            duration: '1.5 hours',
            videoId: '1PnVor36_40',
            content: `
              <h2>CSS Fundamentals</h2>
              <p>CSS (Cascading Style Sheets) is used to style and layout web pages. It controls the presentation of HTML elements.</p>
              
              <h3>What is CSS?</h3>
              <p>CSS stands for Cascading Style Sheets. It's a stylesheet language used to describe the presentation of a document written in HTML.</p>
              
              <h3>Topics Covered:</h3>
              <ul>
                <li><strong>CSS Syntax:</strong> Understanding selectors, properties, and values</li>
                <li><strong>Selectors:</strong> Targeting HTML elements for styling</li>
                <li><strong>Box Model:</strong> Understanding margins, borders, padding, and content</li>
                <li><strong>Layout Techniques:</strong> Flexbox, Grid, and positioning</li>
                <li><strong>Responsive Design:</strong> Making websites work on all devices</li>
              </ul>
              
              <h3>CSS Syntax:</h3>
              <pre><code>selector {
  property: value;
  property: value;
}</code></pre>
              
              <h3>Common CSS Properties:</h3>
              <ul>
                <li><code>color</code> - Text color</li>
                <li><code>background-color</code> - Background color</li>
                <li><code>font-size</code> - Text size</li>
                <li><code>margin</code> - Outer spacing</li>
                <li><code>padding</code> - Inner spacing</li>
                <li><code>border</code> - Element border</li>
              </ul>
            `,
            resources: [
              {
                name: 'CSS Cheat Sheet',
                type: 'pdf',
                url: '#'
              },
              {
                name: 'CSS Tricks Guide',
                type: 'link',
                url: 'https://css-tricks.com/'
              }
            ]
          },
          {
            id: 'lesson-1-1-3',
            title: 'HTML & CSS Quiz',
            description: 'Test your knowledge of HTML and CSS basics',
            type: 'quiz',
            duration: '15 min',
            quiz: {
              questions: [
                {
                  id: 'q1',
                  question: 'What does HTML stand for?',
                  options: [
                    'Hyper Text Markup Language',
                    'High Tech Modern Language',
                    'Home Tool Markup Language',
                    'Hyperlink and Text Markup Language'
                  ],
                  correctAnswer: 0,
                  explanation: 'HTML stands for HyperText Markup Language, which is the standard markup language for creating web pages.'
                },
                {
                  id: 'q2',
                  question: 'Which CSS property is used to change the text color?',
                  options: [
                    'text-color',
                    'font-color',
                    'color',
                    'text-style'
                  ],
                  correctAnswer: 2,
                  explanation: 'The "color" property in CSS is used to set the color of text content.'
                },
                {
                  id: 'q3',
                  question: 'What does CSS stand for?',
                  options: [
                    'Computer Style Sheets',
                    'Cascading Style Sheets',
                    'Creative Style Sheets',
                    'Colorful Style Sheets'
                  ],
                  correctAnswer: 1,
                  explanation: 'CSS stands for Cascading Style Sheets, which is used to style HTML documents.'
                }
              ]
            }
          }
        ]
      },
      {
        id: 'section-1-2',
        title: 'JavaScript Basics',
        description: 'Learn programming fundamentals with JavaScript',
        lessons: [
          {
            id: 'lesson-1-2-1',
            title: 'JavaScript Introduction',
            description: 'Get started with JavaScript programming',
            type: 'video',
            duration: '2 hours',
            videoId: 'W6NZfCO5SIk',
            content: `
              <h2>JavaScript Introduction</h2>
              <p>JavaScript is a programming language that enables interactive web pages and is an essential part of web applications.</p>
              
              <h3>What is JavaScript?</h3>
              <p>JavaScript is a high-level, interpreted programming language that conforms to the ECMAScript specification. It's a language that is also characterized as dynamic, weakly typed, prototype-based and multi-paradigm.</p>
              
              <h3>What you'll learn:</h3>
              <ul>
                <li><strong>Variables and Data Types:</strong> Storing and working with different types of data</li>
                <li><strong>Functions:</strong> Creating reusable blocks of code</li>
                <li><strong>Control Structures:</strong> Making decisions and repeating actions</li>
                <li><strong>DOM Manipulation:</strong> Interacting with HTML elements</li>
                <li><strong>Events:</strong> Responding to user interactions</li>
              </ul>
              
              <h3>JavaScript Variables:</h3>
              <pre><code>let name = "John";
const age = 25;
var isStudent = true;</code></pre>
              
              <h3>Data Types:</h3>
              <ul>
                <li><code>String</code> - Text data</li>
                <li><code>Number</code> - Numeric data</li>
                <li><code>Boolean</code> - True/false values</li>
                <li><code>Array</code> - Lists of data</li>
                <li><code>Object</code> - Complex data structures</li>
              </ul>
            `,
            resources: [
              {
                name: 'JavaScript Cheat Sheet',
                type: 'pdf',
                url: '#'
              },
              {
                name: 'MDN JavaScript Guide',
                type: 'link',
                url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide'
              }
            ]
          },
          {
            id: 'lesson-1-2-2',
            title: 'JavaScript Functions',
            description: 'Learn how to create and use functions in JavaScript',
            type: 'video',
            duration: '1.5 hours',
            videoId: 'N8ap4k_1QEQ',
            content: `
              <h2>JavaScript Functions</h2>
              <p>Functions are one of the fundamental building blocks in JavaScript. A function is a reusable block of code designed to perform a particular task.</p>
              
              <h3>Function Declaration:</h3>
              <pre><code>function greet(name) {
  return "Hello, " + name + "!";
}

console.log(greet("World")); // Output: Hello, World!</code></pre>
              
              <h3>Function Expression:</h3>
              <pre><code>const greet = function(name) {
  return "Hello, " + name + "!";
};</code></pre>
              
              <h3>Arrow Functions:</h3>
              <pre><code>const greet = (name) => {
  return "Hello, " + name + "!";
};

// Or shorter syntax
const greet = name => "Hello, " + name + "!";</code></pre>
              
              <h3>Key Concepts:</h3>
              <ul>
                <li><strong>Parameters:</strong> Input values passed to functions</li>
                <li><strong>Return Values:</strong> Output values from functions</li>
                <li><strong>Scope:</strong> Variable accessibility within functions</li>
                <li><strong>Hoisting:</strong> Function declarations are moved to the top</li>
              </ul>
            `
          }
        ]
      }
    ]
  },
  {
    courseId: '2',
    sections: [
      {
        id: 'section-2-1',
        title: 'Python for Data Science',
        description: 'Learn Python programming for data analysis',
        lessons: [
          {
            id: 'lesson-2-1-1',
            title: 'Python Basics',
            description: 'Introduction to Python programming language',
            type: 'video',
            duration: '3 hours',
            videoId: '_uQrJ0TkZlc',
            content: `
              <h2>Python Basics</h2>
              <p>Python is a high-level, interpreted programming language known for its simplicity and readability.</p>
              
              <h3>Why Python for Data Science?</h3>
              <ul>
                <li>Easy to learn and read</li>
                <li>Extensive libraries for data analysis</li>
                <li>Strong community support</li>
                <li>Versatile and powerful</li>
              </ul>
              
              <h3>Core Concepts:</h3>
              <ul>
                <li><strong>Python Syntax:</strong> Clean and readable code structure</li>
                <li><strong>Variables and Data Types:</strong> Storing different types of information</li>
                <li><strong>Control Flow:</strong> Making decisions and loops</li>
                <li><strong>Functions and Modules:</strong> Organizing and reusing code</li>
              </ul>
              
              <h3>Python Variables:</h3>
              <pre><code>name = "Alice"
age = 30
height = 5.6
is_student = True</code></pre>
              
              <h3>Data Types:</h3>
              <ul>
                <li><code>str</code> - Strings (text)</li>
                <li><code>int</code> - Integers (whole numbers)</li>
                <li><code>float</code> - Floating point numbers</li>
                <li><code>bool</code> - Boolean (True/False)</li>
                <li><code>list</code> - Ordered collections</li>
                <li><code>dict</code> - Key-value pairs</li>
              </ul>
            `
          },
          {
            id: 'lesson-2-1-2',
            title: 'Data Manipulation with Pandas',
            description: 'Learn to work with data using the Pandas library',
            type: 'video',
            duration: '4 hours',
            videoId: 'vmEHCJofslg',
            content: `
              <h2>Data Manipulation with Pandas</h2>
              <p>Pandas is a powerful Python library for data manipulation and analysis. It provides data structures and functions needed to work with structured data.</p>
              
              <h3>Key Pandas Concepts:</h3>
              <ul>
                <li><strong>DataFrame:</strong> 2-dimensional labeled data structure</li>
                <li><strong>Series:</strong> 1-dimensional labeled array</li>
                <li><strong>Indexing:</strong> Selecting and filtering data</li>
                <li><strong>Grouping:</strong> Aggregating data by categories</li>
              </ul>
              
              <h3>Creating a DataFrame:</h3>
              <pre><code>import pandas as pd

data = {
    'Name': ['Alice', 'Bob', 'Charlie'],
    'Age': [25, 30, 35],
    'City': ['New York', 'London', 'Tokyo']
}

df = pd.DataFrame(data)
print(df)</code></pre>
              
              <h3>Common Operations:</h3>
              <ul>
                <li>Reading data from files (CSV, Excel, JSON)</li>
                <li>Filtering and selecting data</li>
                <li>Handling missing values</li>
                <li>Grouping and aggregation</li>
                <li>Merging and joining datasets</li>
              </ul>
            `
          }
        ]
      }
    ]
  },
  {
    courseId: '3',
    sections: [
      {
        id: 'section-3-1',
        title: 'Design Fundamentals',
        description: 'Learn the core principles of UI/UX design',
        lessons: [
          {
            id: 'lesson-3-1-1',
            title: 'Design Principles',
            description: 'Understanding the fundamental principles of good design',
            type: 'video',
            duration: '2 hours',
            videoId: 'a5KYlHNKQB8',
            content: `
              <h2>Design Principles</h2>
              <p>Good design is not just about making things look pretty. It's about creating solutions that are functional, usable, and delightful.</p>
              
              <h3>The 5 Fundamental Design Principles:</h3>
              <ul>
                <li><strong>Balance:</strong> Visual weight distribution in your design</li>
                <li><strong>Contrast:</strong> Making elements stand out from each other</li>
                <li><strong>Emphasis:</strong> Drawing attention to important elements</li>
                <li><strong>Movement:</strong> Guiding the user's eye through the design</li>
                <li><strong>Proportion:</strong> Size relationships between elements</li>
              </ul>
              
              <h3>Color Theory:</h3>
              <ul>
                <li>Primary, secondary, and tertiary colors</li>
                <li>Color harmony and complementary colors</li>
                <li>Psychology of colors in design</li>
                <li>Accessibility considerations</li>
              </ul>
              
              <h3>Typography:</h3>
              <ul>
                <li>Font families and classifications</li>
                <li>Hierarchy and readability</li>
                <li>Spacing and alignment</li>
                <li>Web fonts and performance</li>
              </ul>
            `
          }
        ]
      }
    ]
  },
  {
    courseId: '4',
    sections: [
      {
        id: 'section-4-1',
        title: 'Digital Marketing Foundations',
        description: 'Learn the basics of digital marketing',
        lessons: [
          {
            id: 'lesson-4-1-1',
            title: 'Digital Marketing Fundamentals',
            description: 'Introduction to digital marketing concepts and strategies',
            type: 'video',
            duration: '2 hours',
            videoId: 'nU-IIXBWlS4',
            content: `
              <h2>Digital Marketing Fundamentals</h2>
              <p>Digital marketing encompasses all marketing efforts that use electronic devices or the internet to connect with current and prospective customers.</p>
              
              <h3>Key Digital Marketing Channels:</h3>
              <ul>
                <li><strong>Search Engine Optimization (SEO):</strong> Improving organic search visibility</li>
                <li><strong>Pay-Per-Click (PPC):</strong> Paid advertising on search engines and social media</li>
                <li><strong>Social Media Marketing:</strong> Building brand awareness and engagement</li>
                <li><strong>Content Marketing:</strong> Creating valuable content to attract customers</li>
                <li><strong>Email Marketing:</strong> Direct communication with subscribers</li>
                <li><strong>Affiliate Marketing:</strong> Partnership-based promotion</li>
              </ul>
              
              <h3>Digital Marketing Strategy:</h3>
              <ul>
                <li>Defining target audience and buyer personas</li>
                <li>Setting SMART marketing goals</li>
                <li>Choosing the right marketing channels</li>
                <li>Creating compelling content</li>
                <li>Measuring and analyzing performance</li>
              </ul>
            `
          }
        ]
      }
    ]
  },
  {
    courseId: '5',
    sections: [
      {
        id: 'section-5-1',
        title: 'React Native Fundamentals',
        description: 'Learn the basics of React Native development',
        lessons: [
          {
            id: 'lesson-5-1-1',
            title: 'React Native Introduction',
            description: 'Getting started with React Native for mobile development',
            type: 'video',
            duration: '3 hours',
            videoId: '0-S5a0eXPoc',
            content: `
              <h2>React Native Introduction</h2>
              <p>React Native is a framework for building native mobile applications using React and JavaScript. It allows you to build mobile apps for both iOS and Android using a single codebase.</p>
              
              <h3>Why React Native?</h3>
              <ul>
                <li><strong>Cross-platform:</strong> Write once, run on both iOS and Android</li>
                <li><strong>Native Performance:</strong> Compiles to native code for better performance</li>
                <li><strong>Hot Reloading:</strong> See changes instantly during development</li>
                <li><strong>Large Community:</strong> Extensive ecosystem and support</li>
              </ul>
              
              <h3>Core Components:</h3>
              <ul>
                <li><code>View</code> - Basic building block for UI</li>
                <li><code>Text</code> - Displaying text content</li>
                <li><code>Image</code> - Displaying images</li>
                <li><code>ScrollView</code> - Scrollable container</li>
                <li><code>TextInput</code> - Text input field</li>
                <li><code>TouchableOpacity</code> - Touchable button</li>
              </ul>
              
              <h3>Basic React Native App:</h3>
              <pre><code>import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const App = () => {
  return (
    &lt;View style={styles.container}&gt;
      &lt;Text style={styles.title}&gt;Hello, React Native!&lt;/Text&gt;
    &lt;/View&gt;
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default App;</code></pre>
            `
          }
        ]
      }
    ]
  },
  {
    courseId: '6',
    sections: [
      {
        id: 'section-6-1',
        title: 'Cybersecurity Basics',
        description: 'Learn fundamental cybersecurity concepts',
        lessons: [
          {
            id: 'lesson-6-1-1',
            title: 'Introduction to Cybersecurity',
            description: 'Understanding cybersecurity threats and protection methods',
            type: 'video',
            duration: '2 hours',
            videoId: 'inWWhr5tnEA',
            content: `
              <h2>Introduction to Cybersecurity</h2>
              <p>Cybersecurity is the practice of protecting systems, networks, and programs from digital attacks. These attacks are usually aimed at accessing, changing, or destroying sensitive information.</p>
              
              <h3>Common Cyber Threats:</h3>
              <ul>
                <li><strong>Malware:</strong> Malicious software including viruses, worms, and trojans</li>
                <li><strong>Phishing:</strong> Fraudulent attempts to obtain sensitive information</li>
                <li><strong>Ransomware:</strong> Malware that encrypts files and demands payment</li>
                <li><strong>Social Engineering:</strong> Manipulating people to divulge information</li>
                <li><strong>DDoS Attacks:</strong> Overwhelming systems with traffic</li>
              </ul>
              
              <h3>Security Principles:</h3>
              <ul>
                <li><strong>Confidentiality:</strong> Ensuring information is accessible only to authorized users</li>
                <li><strong>Integrity:</strong> Maintaining accuracy and completeness of data</li>
                <li><strong>Availability:</strong> Ensuring systems are accessible when needed</li>
              </ul>
              
              <h3>Basic Security Measures:</h3>
              <ul>
                <li>Strong password policies</li>
                <li>Multi-factor authentication</li>
                <li>Regular software updates</li>
                <li>Network security monitoring</li>
                <li>Employee security training</li>
              </ul>
            `
          }
        ]
      }
    ]
  }
];

// Utility functions
export const getCourseContent = (courseId) => {
  return courseContentData.find(content => content.courseId === courseId);
};

export const getLesson = (courseId, lessonId) => {
  const courseContent = getCourseContent(courseId);
  if (!courseContent) return undefined;
  
  for (const section of courseContent.sections) {
    const lesson = section.lessons.find(l => l.id === lessonId);
    if (lesson) return lesson;
  }
  
  return undefined;
};

export const updateLessonProgress = (courseId, lessonId, completed) => {
  const key = `lesson_progress_${courseId}_${lessonId}`;
  localStorage.setItem(key, completed.toString());
};

export const getLessonProgress = (courseId, lessonId) => {
  const key = `lesson_progress_${courseId}_${lessonId}`;
  return localStorage.getItem(key) === 'true';
};