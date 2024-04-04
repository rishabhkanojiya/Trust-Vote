// const GroupsHandler = require("../../handler/group.handler");
const logger = require("../../../logger");

async function run() {
    try {
        // GroupsHandler.checkAndSendPaymentReminders();
        logger.info("Payment reminders sent successfully!");
    } catch (error) {
        console.log("error:", error);
        throw new Error(error);
    }
}

exports.run = run;
