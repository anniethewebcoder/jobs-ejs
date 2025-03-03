const Job = require('./../models/Job')
const parseVErr = require("./../util/parseValidationErr")
const csrf = require("host-csrf")

const showForm = (req, res) => {
    res.render("job")
}

const getAllJobs = async (req, res) => {
    const jobs = await Job.find({ createdBy: req.user._id }).sort("createdAt");
    res.render("jobs", { jobs, messages: req.flash() });
}

const getJob = async (req, res) => {
    const job = await Job.findById(req.params.id)
    res.render("job", { job, messages: req.flash() });
}
const createJob = async (req, res) => {}
const updateJob = async (req, res) => {
    const job = await Job.findByIdAndUpdate(req.params.id, req.body)
    res.rend("job", { job, messages: req.flash() })

}
const deleteJob = async(req, res) => {
    console.log(req.params.id)
    let token = csrf.token(req, res);
    const job = await Job.findByIdAndDelete(req.params.id)
    res.send("job", { job, token, messages: req.flash() })
}

module.exports = {
    getAllJobs,
    getJob,
    showForm,
    createJob,
    updateJob,
    deleteJob
}