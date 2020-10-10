const router = require("express").Router();
const WorkoutTracker = require("../models/workout_tracker.js");

// Get all workouts
router.get("/api/workouts", (req, res) => {
    WorkoutTracker.find()
    .then(dbWorkouts => {
        res.json(dbWorkouts);
    })
    .catch(err => {
        res.json(err);
    });
});

// Post a workout
router.post("/api/workouts", (req, res) => {
    WorkoutTracker.create({})
    .then(dbWorkout => {
        res.json(dbWorkout);
    })
    .catch(err => {
        res.json(err);
    });
});

// Update Workout
router.put("/api/workouts/:id", ({ body, params }, res) => {
    WorkoutTracker.findByIdAndUpdate
    (
        params.id,
        { $push: { exercises: body } }, { new: true, runValidators: true }
    )
    .then(dbWorkout => {
        res.json(dbWorkout);
    })
    .catch(err => {
        res.json(err);
    });
});

// 1 week limit
router.get("/api/workouts/range", (req, res) => {
    WorkoutTracker.find({}).sort({'day': 1}).limit(7)
    .then(dbWorkouts => {
        res.json(dbWorkouts);
    })
    .catch(err => {
        res.json(err);
    });
});


module.exports = router;