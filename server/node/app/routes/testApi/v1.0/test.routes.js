const express = require("express");
const asyncHandler = require("express-async-handler");
const router = express.Router();
const { param, body, query } = require("express-validator");
const { validate } = require("../../../utils/route.utils");
const UsersHandler = require("../../../handler/user.handler");
const { isAuthenticated } = require("../../../middlewares/auth.middleware");

// router.get(
//     "/",
//     query("pageNo")
//         .optional()
//         .isInt()
//         .withMessage("Page number field should be an integer")
//         .isInt({ min: 1 })
//         .withMessage("Page number field should be greater than 0")
//         .toInt(),
//     query("pageSize")
//         .optional()
//         .isInt()
//         .withMessage("Page size field should be an integer")
//         .isInt({ min: 1 })
//         .withMessage("Page size field should be greater than 0")
//         .isInt({ max: 100 })
//         .withMessage("Page size field should not be greater than 100")
//         .toInt(),
//     query("searchTag").optional(),
//     validate,
//     asyncHandler(UsersHandler.getUsers)
// );

router.get(
    "/",
    isAuthenticated,
    asyncHandler(async (req, res) => {
        const { userId } = req;

        try {
            res.json({ userId });
        } catch (err) {
            if (err.errorCode) throw err;

            err.customMessage = "Unable to fetch user, please try again later.";
            throw err;
        }
    })
);

module.exports = router;
