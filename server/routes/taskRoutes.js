import asyncHandler from "../middleware/asyncHandler";

Router.get("/", asyncHandler(async (req, res) => {
    const tasks = await Task.find();
    res.json(tasks);
}));

export default Router;