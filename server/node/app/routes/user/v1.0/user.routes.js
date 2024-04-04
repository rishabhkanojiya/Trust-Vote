const express = require("express");
const asyncHandler = require("express-async-handler");
const router = express.Router();
const { param, body, query } = require("express-validator");
const { validate } = require("../../../utils/route.utils");
const UsersHandler = require("../../../handler/user.handler");
const { isAuthenticated } = require("../../../middlewares/auth.middleware");

const userBodyValidators = [
    body("state")
        .exists()
        .withMessage("State field should be present")
        .isString()
        .withMessage("State field value should be a string")
        .isLength({ min: 1, max: 255 })
        .withMessage(
            "State field value length should be between 1 to 255 characters"
        ),
    body("city")
        .exists()
        .withMessage("City field should be present")
        .isString()
        .withMessage("City field value should be a string")
        .isLength({ min: 1, max: 255 })
        .withMessage(
            "City field value length should be between 1 to 255 characters"
        ),
    body("firstName")
        .exists()
        .withMessage("FirstName field should be present")
        .isString()
        .withMessage("FirstName field value should be a string")
        .isLength({ min: 1, max: 255 })
        .withMessage(
            "FirstName field value length should be between 1 to 255 characters"
        ),
    body("lastName")
        .exists()
        .withMessage("LastName field should be present")
        .isString()
        .withMessage("LastName field value should be a string")
        .isLength({ min: 1, max: 255 })
        .withMessage(
            "LastName field value length should be between 1 to 255 characters"
        ),
    body("ssn")
        .exists()
        .withMessage("SSN field should be present")
        .isString()
        .withMessage("SSN field value should be a string")
        .isLength({ min: 1, max: 255 })
        .withMessage(
            "SSN field value length should be between 1 to 255 characters"
        ),
    body("email")
        .exists()
        .withMessage("email field should be present")
        .isString()
        .withMessage("email field value should be a string")
        .isEmail()
        .withMessage("invalid email")
        .isLength({ min: 1, max: 255 })
        .withMessage(
            "email field value length should be between 1 to 255 characters"
        ),
    body("password")
        .exists()
        .withMessage("Password field should be present")
];

router.post(
    "/register",
    ...userBodyValidators,
    validate,
    asyncHandler(UsersHandler.registerUser)
);

router.post(
    "/login",
    body("ssn")
        .exists()
        .withMessage("SSN field should be present")
        .isNumeric()
        .withMessage("SSN field value should be a Number")
        .isLength({ min: 9, max: 9 })
        .withMessage("SSN field value length should be of 9 Numbers"),
    body("password").exists().withMessage("Password field should be present"),
    validate,
    asyncHandler(UsersHandler.loginUser)
);

router.post(
    "/forgot-password",
    body("ssn")
        .exists()
        .withMessage("SSN field should be present")
        .isNumeric()
        .withMessage("SSN field value should be a Number")
        .isLength({ min: 9, max: 9 })
        .withMessage("SSN field value length should be of 9 Numbers"),
    validate,
    asyncHandler(UsersHandler.forgotPassword)
);

router.post(
    "/reset-password",
    body("password")
        .exists()
        .withMessage("Password field should be present")
        .isStrongPassword()
        .withMessage("Weak Password"),
    body("token")
        .exists()
        .withMessage("token field should be present")
        .isString()
        .withMessage("token field value should be a string")
        .isLength({ min: 1, max: 255 })
        .withMessage(
            "token field value length should be between 1 to 255 characters"
        ),
    validate,
    asyncHandler(UsersHandler.resetPassword)
);

router.get("/me", isAuthenticated, asyncHandler(UsersHandler.getUser));

router.patch(
    "/me",
    body("state")
        .exists()
        .withMessage("State field should be present")
        .isString()
        .withMessage("State field value should be a string")
        .isLength({ min: 1, max: 255 })
        .withMessage(
            "State field value length should be between 1 to 255 characters"
        ),
    body("city")
        .exists()
        .withMessage("City field should be present")
        .isString()
        .withMessage("City field value should be a string")
        .isLength({ min: 1, max: 255 })
        .withMessage(
            "City field value length should be between 1 to 255 characters"
        ),
    validate,
    isAuthenticated,
    asyncHandler(UsersHandler.updateUser)
);

router.delete("/me", isAuthenticated, asyncHandler(UsersHandler.deleteUser));

router.post("/logout", isAuthenticated, asyncHandler(UsersHandler.logOutUser));

module.exports = router;
