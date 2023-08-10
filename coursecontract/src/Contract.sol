// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

contract Course {
    struct Quiz {
        string question;
        string[] options;
        uint correctAnswerIndex;
    }

    struct Section {
        uint256 id;
        string name;
        string description;
    }

    mapping(uint256 => Section) public sections;
    mapping(uint256 => mapping(uint256 => Quiz)) public sectionQuizzes; // Nested mapping to store quizzes
    mapping(uint256 => uint256) public sectionQuizCounts; // To track the number of quizzes in each section
    mapping(address => bool) public enrolledStudents;
    mapping(address => mapping(uint256 => bool)) public studentSectionStatus;

    address public owner;
    string public courseName;
    uint256 public sectionCount = 0;
    uint256 public totalEnrolledStudents;
    string public courseDescription;
    string public courseImage;

    constructor(string memory _courseName, address _owner, string memory _courseDescription, string memory _courseImage) {
        courseName = _courseName;
        owner = _owner;
        courseDescription = _courseDescription;
        courseImage = _courseImage;
    }

    modifier onlyOwner {
        require(msg.sender == owner, "Only the course owner can call this function");
        _;
    }

    function addSection(uint256 _sectionId, string memory _name, string memory _description) public onlyOwner {
        sections[_sectionId] = Section(_sectionId, _name, _description);
        sectionCount++;
    }

    function addQuizToSection(uint256 _sectionId, string memory _question, string[] memory _options, uint _correctAnswerIndex) public onlyOwner {
        Quiz memory newQuiz = Quiz(_question, _options, _correctAnswerIndex);
        sectionQuizzes[_sectionId][sectionQuizCounts[_sectionId]] = newQuiz;
        sectionQuizCounts[_sectionId]++;
    }

    function getQuizCountForSection(uint256 _sectionId) public view returns (uint) {
        return sectionQuizCounts[_sectionId];
    }

    function enrollStudent() public {
        enrolledStudents[msg.sender] = true;
        totalEnrolledStudents++;
    }

    function submitQuiz(uint256 _sectionId, uint[] memory _answers) public {
        require(enrolledStudents[msg.sender], "You are not enrolled in this course");
        require(sections[_sectionId].id != 0, "This section does not exist");
        require(sectionQuizCounts[_sectionId] == _answers.length, "Wrong number of answers");

        for (uint i = 0; i < sectionQuizCounts[_sectionId]; i++) {
            require(sectionQuizzes[_sectionId][i].correctAnswerIndex == _answers[i], "One or more answers are incorrect");
        }

        studentSectionStatus[msg.sender][_sectionId] = true;
    }

    function getSectionStatus(address _student, uint256 _sectionId) public view returns (bool) {
        return studentSectionStatus[_student][_sectionId];
    }
}
