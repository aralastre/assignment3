/*********************************************************************************
*  WEB700 – Assignment 03
*  I declare that this assignment is my own work in accordance with Seneca  Academic Policy.  No part 
*  of this assignment has been copied manually or electronically from any other source 
*  (including 3rd party web sites) or distributed to other students.
* 
*  Name: April Alastre Student ID: 151509221 Date: 15 June 2024
*
********************************************************************************/ 


const express = require("express");
const path = require("path");
const collegeData = require("./modules/collegeData"); // Adjust the path accordingly
const app = express();
const port = process.env.PORT || 8080;

// Initialize collegeData
collegeData.initialize()
  .then(() => {
    // Routes

    app.get("/students", (req, res) => {
      const course = req.query.course;
      if (course) {
        collegeData.getStudentsByCourse(parseInt(course))
          .then(students => res.json(students))
          .catch(() => res.json({ message: "no results" }));
      } else {
        collegeData.getAllStudents()
          .then(students => res.json(students))
          .catch(() => res.json({ message: "no results" }));
      }
    });

    app.get("/tas", (req, res) => {
      collegeData.getTAs()
        .then(tas => res.json(tas))
        .catch(() => res.json({ message: "no results" }));
    });

    app.get("/courses", (req, res) => {
      collegeData.getCourses()
        .then(courses => res.json(courses))
        .catch(() => res.json({ message: "no results" }));
    });

    app.get("/student/:num", (req, res) => {
      const num = req.params.num;
      collegeData.getStudentByNum(parseInt(num))
        .then(student => res.json(student))
        .catch(() => res.json({ message: "no results" }));
    });

    app.get("/", (req, res) => {
      res.sendFile(path.join(__dirname, "views", "home.html"));
    });

    app.get("/about", (req, res) => {
      res.sendFile(path.join(__dirname, "views", "about.html"));
    });

    app.get("/htmlDemo", (req, res) => {
      res.sendFile(path.join(__dirname, "views", "htmlDemo.html"));
    });

    // 404 route
    app.use((req, res) => {
      res.status(404).send("Page Not Found");
    });

    // Start the server
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  })
  .catch(err => {
    console.error(`Error initializing collegeData: ${err}`);
  });