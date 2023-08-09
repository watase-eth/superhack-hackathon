// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

contract Course {
    struct Quiz {
        string question;
        string[] options;
        uint correctAnswerIndex;
    }

    struct QuizIndex {
        uint start;
        uint end;
    }

    struct Section {
        uint256 id;
        string name;
        QuizIndex quizzes;
        string sectionVideoContentIPFS;
    }

    Quiz[] public quizzes;
    mapping(address => bool) public enrolledStudents;
    mapping(address => mapping(uint256 => bool)) public studentSectionStatus;
    mapping(uint256 => Section) public sections;
    address public owner;
    string public courseName;
    string public courseDescription;
    string public courseImage;
    uint256 public sectionCount = 0;
    uint256 public totalEnrolledStudents;

    constructor(
        string memory _courseName, 
        string memory _courseDescription, 
        string memory _courseImage,  
        address _owner
    ) {
        courseName = _courseName;
        courseDescription = _courseDescription;
        courseImage = _courseImage;
        owner = _owner;
    }

    modifier onlyOwner {
        require(msg.sender == owner, "Only the course owner can call this function");
        _;
    }

    function addSection(uint256 _sectionId, string memory _name, string memory _sectionVideoContentIPFS) public onlyOwner {
        QuizIndex memory quizIndex = QuizIndex(quizzes.length, quizzes.length);
        sections[_sectionId] = Section(_sectionId, _name, quizIndex, _sectionVideoContentIPFS);
        sectionCount++;
    }

    function addQuizToSection(uint256 _sectionId, string memory _question, string[] memory _options, uint _correctAnswerIndex) public onlyOwner {
        Quiz memory newQuiz = Quiz(_question, _options, _correctAnswerIndex);
        quizzes.push(newQuiz);
        sections[_sectionId].quizzes.end++;
    }

    function getQuizCountForSection(uint256 _sectionId) public view returns (uint) {
        return sections[_sectionId].quizzes.end - sections[_sectionId].quizzes.start;
    }

    function getQuizzesForSection(uint256 _sectionId) public view returns (Quiz[] memory) {
        Quiz[] memory sectionQuizzes = new Quiz[](getQuizCountForSection(_sectionId));
        for (uint i = sections[_sectionId].quizzes.start; i < sections[_sectionId].quizzes.end; i++) {
            sectionQuizzes[i - sections[_sectionId].quizzes.start] = quizzes[i];
        }
        return sectionQuizzes;
    }

    function enrollStudent() public {
        // Enroll the student to this course
        enrolledStudents[msg.sender] = true;
        totalEnrolledStudents++;
    }

    function submitQuiz(uint256 _sectionId, uint[] memory _answers) public {
        require(enrolledStudents[msg.sender], "You are not enrolled in this course");
        require(sections[_sectionId].id != 0, "This section does not exist");
        require(sections[_sectionId].quizzes.end - sections[_sectionId].quizzes.start == _answers.length, "Wrong number of answers");

        // If all of the submitted answers are correct, the student passes
        for (uint i = sections[_sectionId].quizzes.start; i < sections[_sectionId].quizzes.end; i++) {
            require(quizzes[i].correctAnswerIndex == _answers[i - sections[_sectionId].quizzes.start], "One or more answers are incorrect");
        }

        // If we've reached this point without reverting, all of the answers were correct
        studentSectionStatus[msg.sender][_sectionId] = true;
    }

    function getSectionStatus(address _student, uint256 _sectionId) public view returns (bool) {
        return studentSectionStatus[_student][_sectionId];
    }
}