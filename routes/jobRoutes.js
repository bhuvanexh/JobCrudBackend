import express from "express";
import {
    getAllJobs,
    getJobById,
    createJob,
    getJobFilters,
} from "../controllers/jobController.js";
import { validate } from "../middlewares/validate.js";
import { jobSchema } from "../utils/schema.js";

const router = express.Router();

// Static routes first
router.get("/filters", getJobFilters);

// Main job endpoints
router.get("/", getAllJobs);
router.get("/:id", getJobById);
router.post("/", validate(jobSchema), createJob);

export default router;
