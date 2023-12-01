const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();
const Job = require("../model/JobPostingSchema")
require("../db/conn");
const AuthenticateEmp = require("../middleware/EmployerAuthentication")
const User = require("../model/userSchema");
const UserEmployer = require("../model/userSchemaEmployer");
const Authenticate = require("../middleware/authentication");
const transporter = require("../mail/mail");

router.get("/", (req, res) => {
  res.send("Hello world from server router js");
});

// router.post("/register", (req, res) => {
//   const { name, email, phone, work, password, cpassword } = req.body;
//   if (!name || !email || !phone || !work || !password || !cpassword) {
//     return res.status(422).json({ error: "Plz fill the fields properly" });
//   }
//   User.findOne({ email: email }).then((userExist) => {
//     if (userExist) {
//       return res.status(422).json({ error: "Email already exist" });
//     }
//     const user = new User({ name, email, phone, work, password, cpassword });

//     user
//       .save()
//       .then(() => {
//         res.status(201).json({ message: "User registered successfully" });
//       })
//       .catch((error) => {
//         res.status(500).json({ error: "Failed registration"+error });
//       });
//   });
// });
router.post("/register", async (req, res) => {
  const { name, email, phone, work, password, cpassword } = req.body;

  try {
    if (!name || !email || !phone || !work || !password || !cpassword) {
      return res.status(406).json({ error: "Please fill in all the fields properly" });
    }

    const userExist = await User.findOne({ email: email });

    if (userExist) {
      return res.status(422).json({ error: "Email already exists" });
    } else if (password !== cpassword) {
      return res.status(422).json({ error: "Passwords do not match" });
    }

    const user = new User({ name, email, phone, work, password, cpassword });

    await user.save();

    const token = await user.generateAuthToken();

    res.cookie("jwtoken", token, {
      expires: new Date(Date.now() + 25892000000),
      httpOnly: true,
    });

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/signin", async (req, res) => {
  try {
    let token;
    const { email, password } = req.body;

    if (!email || !password) {
      res.send(422).json({ error: "Plz fill the data" });
    }

    const userLogin = await User.findOne({ email: email });
    if (userLogin) {
      const isMatch = await bcrypt.compare(password, userLogin.password);

      if (isMatch) {
        transporter.sendMail(
          {
            from: process.env.EMAIL,
            to: email,
            subject: "Login successfull",
            text: `Hi ${
              userLogin.name
            }, You have logged in successfully at ${new Date().toLocaleString()}`,
          },
          function (error, info) {
            if (error) {
              console.log(error);
            } else {
              console.log("Email sent: " + info.response);
            }
          }
        );
        token = await userLogin.generateAuthToken();

        res.cookie("jwtoken", token, {
          expires: new Date(Date.now() + 25892000000),
          httpOnly: true,
        });
        res.status(201).json({ message: "User signIn successfull" });
      } else {
        res.status(422).json({ error: "Invalid Password" });
      }
    } else {
      res.status(401).json({ error: "Invalid Credientials" });
    }
  } catch (err) {
    console.log(err);
  }
});

router.get("/about", Authenticate, (req, res) => {
  console.log("Hello my about");
  res.send(req.rootUser);
});
router.get("/getData", Authenticate, (req, res) => {
  console.log("Hello my about");
  res.send(req.rootUser);
});
router.get("/logout", (req, res) => {
  res.clearCookie("jwtoken"); // Clear the JWT token cookie
  res.status(200).json({ message: "Logged out successfully" });
});


router.get("/check", Authenticate, (req, res) => {

  res.status(200).json({ message: "User is authenticated" });
});


//EMPLOYER


router.post("/employerregister", async (req, res) => {
  const {
    name,
    email,
    phone,
    work,
    password,
    cpassword,
    companyInformation,
    contactInformation,
    companyAddress,
  } = req.body;
 

  if (!name || !email || !phone || !work || !password || !cpassword) {
    return res.status(406).json({ error: "Please fill in all the fields properly" });
  }

  try {
    const userExist = await UserEmployer.findOne({ email: email });

    if (userExist) {
      return res.status(422).json({ error: "Email already exists" });
    } else if (password !== cpassword) {
      return res.status(422).json({ error: "Passwords do not match" });
    } else {
      const newUserEmployer = new UserEmployer({
        name,
        email,
        phone,
        work,
        password,
        cpassword,
        companyInformation,
        contactInformation,
        companyAddress,
      });

      await newUserEmployer.save();

      res.status(201).json({ message: "Employer registered successfully" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});router.post("/signinemployer", async (req, res) => {
  try {
    const { email, password , phone ,work, name } = req.body;

    if (!email || !password) {
      return res.status(422).json({ error: "Please provide email and password" });
    }

    const employer = await UserEmployer.findOne({ email });

    if (!employer) {
      return res.status(401).json({ error: "Invalid Credentials" });
    }

    const isMatch = await bcrypt.compare(password, employer.password);

    if (!isMatch) {
      return res.status(422).json({ error: "Invalid Password" });
    }

    // Generate token for employer upon successful login
    const token = await employer.generateAuthToken();

    // Respond with the generated token and a success message
    res.cookie("jwtoken", token, {
      expires: new Date(Date.now() + 25892000000),
      httpOnly: true,
    });

    res.status(201).json({ message: "Employer sign-in successful", token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/aboutemployer", AuthenticateEmp, (req, res) => {
  console.log("Hello my about");
  res.send(req.rootUser);
  console.log(req.rootUser);
});

router.post('/jobs', async (req, res) => {
  try {
    const newJob = new Job(req.body);
    await newJob.save();
    res.status(201).json(newJob);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error creating job listing' });
  }
});

router.get('/jobs', async (req, res) => {
  try {
    const jobs = await Job.find();
    res.json(jobs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching jobs' });
  }
});
router.delete('/jobs/:id', async (req, res) => {
  try {
    const deletedJob = await Job.findByIdAndDelete(req.params.id);
    if (!deletedJob) {
      return res.status(404).json({ error: 'Job not found' });
    }
    res.json({ message: 'Job deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error deleting job' });
  }
});

router.get("/logoutemployer", (req, res) => {
  res.clearCookie("jwtoken"); // Clear the JWT token cookie
  res.status(200).json({ message: "Logged out successfully" });
});

module.exports = router;
