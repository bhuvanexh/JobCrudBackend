// controllers/jobController.js

import Job from "../models/Job.js";

export const getAllJobs = async (req, res) => {
    try {
        const {
            keyword,
            location,
            title,
            type,
            sort = "-createdAt",
            page = 1,
            limit = 10,
        } = req.query;

        const query = {};

        // Search by keyword on title, location, company
        if (keyword) {
            query.$or = [
                { title: { $regex: keyword, $options: "i" } },
                { location: { $regex: keyword, $options: "i" } },
                { company: { $regex: keyword, $options: "i" } },
            ];
        }

        // Filters: exact match
        if (location) query.location = location;
        if (title) query.title = title;
        if (type) query.type = type;

        // Pagination
        const skip = (parseInt(page) - 1) * parseInt(limit);

        // Fetch jobs with filters and pagination
        const jobs = await Job.find(query)
            .sort(sort)
            .skip(skip)
            .limit(parseInt(limit));

        // Total count for pagination UI
        const total = await Job.countDocuments(query);

        res.status(200).json({
            jobs,
            page: parseInt(page),
            totalPages: Math.ceil(total / limit),
            totalCount: total,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to fetch jobs" });
    }
};

export const getJobById = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);
        if (!job) {
            return res.status(404).json({ message: "Job not found" });
        }
        res.status(200).json(job);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch job" });
    }
};

export const createJob = async (req, res) => {
    try {
        const { title, company, type, location, description } = req.body;

        if (!title || !company || !type || !location || !description) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const newJob = new Job({ title, company, type, location, description });
        const savedJob = await newJob.save();

        res.status(201).json(savedJob);
    } catch (error) {
        res.status(500).json({ message: "Failed to create job" });
    }
};


export const getJobFilters = async (req, res) => {
    try {
        const titles = await Job.distinct("title");
        const locations = await Job.distinct("location");
        const types = await Job.distinct("type");

        res.status(200).json({
            titles,
            locations,
            types,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to fetch filter options" });
    }
};