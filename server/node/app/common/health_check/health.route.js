const express = require("express");
const router = express.Router();
const config = require("../../../config");
const client = require("prom-file-client").prometheus; // for prometheus client
const register = require("prom-file-client").fileRegistry.getInstance({
    metricsDir: config.metrics_dir,
});
const labelEnum = {
    type: "type",
    name: "name",
};
const logErrorCounter = new client.Counter({
    name: "grimlock_storefront_error_log_event",
    help: "Event produced when error log is created",
    labelNames: [labelEnum.type, labelEnum.name],
    register: register,
});

const checkHealth = async (req, res, next) => {
    let errorObj = {
        mongodb: {},
        redis: {},
        kafka: {},
    };
    errorObj.redis = {
        ...errorObj.redis,
    };

    if (
        !Object.keys(errorObj.redis).length &&
        !Object.keys(errorObj.kafka).length
    ) {
        return res.json({
            ok: "ok",
        });
    }
    return res.status(500).json(errorObj);
};

router.get("/_healthz", checkHealth);
router.get("/_readyz", checkHealth);

module.exports = router;
