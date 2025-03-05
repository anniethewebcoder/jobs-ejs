const Job = require("./../models/Job");
const parseVErr = require("./../util/parseValidationErr");
const csrf = require("host-csrf");

const showForm = (req, res) => {
  res.render("job", { job: null });
};

const getAllJobs = async (req, res) => {
  const jobs = await Job.find({ createdBy: req.user._id }).sort("createdAt");
  res.render("jobs", { jobs, messages: req.flash() });
};

const getJob = async (req, res) => {
  const job = await Job.findById(req.params.id);
  res.render("job", { job, messages: req.flash() });
};

const createJob = async (req, res) => {
  req.body.createdBy = req.user._id;

  const job = await Job.create(req.body);

  res.render("job", { job: null });
};

const updateJob = async (req, res) => {
  const {
    body: { company, position },
    user: { userId },
    params: { id: jobId },
  } = req;

  const job = await Job.findByIdAndUpdate(
    {
      _id: jobId,
      createdBy: userId,
    },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  //   res.render("job", { job, messages: req.flash() });
  res.redirect("/jobs");
};

const deleteJob = async (req, res) => {
  console.log(req.params.id);
  let token = csrf.token(req, res);
  const job = await Job.findByIdAndDelete(req.params.id);
  res.render("job", { job, token, messages: req.flash() });
};

module.exports = {
  getAllJobs,
  getJob,
  showForm,
  createJob,
  updateJob,
  deleteJob,
};
