const express = require("express")
const router = express.Router()
const {
    getAllJobs,
    getJob,
    showForm,
    createJob, 
    updateJob, 
    deleteJob
} = require('./../controllers/jobs')

// GET /jobs (display all the job listings belonging to this user)
router.route("/").get(getAllJobs)

// POST /jobs (Add a new job listing)
router.route("/").post(createJob)
// GET /jobs/new (Put up the form to create a new entry)

router.route("/new").post(showForm)

// GET /jobs/edit/:id (Get a particular entry and show it in the edit box)
router.route("/edit/:id").get(getJob)

// POST /jobs/update/:id (Update a particular entry)
router.route("/update/:id").post(updateJob)

// POST /jobs/delete/:id (Delete an entry)
router.route("/delete/:id").post(deleteJob)

module.exports = router

