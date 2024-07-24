/*
   Copyright 2018 Smart-Tech Controle e Automação

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/
"use strict";
/*jshint esversion: 6, node: true*/

/**
 * @name MID0029
 * @class
 * @param {object} MID0029 
 * @param {number} MID0029.parameterSetID 
 * @param {string} MID0029.parameterSetName
 * @param {number} MID0029.rotationDirection
 * @param {number} MID0029.batchSize
 * @param {number} MID0029.torqueMin
 * @param {number} MID0029.torqueMax
 * @param {number} MID0029.torqueFinalTarget
 * @param {number} MID0029.angleMin
 * @param {number} MID0029.angleMax
 * @param {number} MID0029.finalAngleTarget
 * @param {number} MID0029.cycleEndTime
 * @param {number} MID0029.control
 * @param {number} MID0029.torqueThreshold
 * @param {number} MID0029.angleThreshold
 * @param {number} MID0029.mode
 * @param {number} MID0029.auditAngle
 * @param {number} MID0029.adapterID
 * @param {number} MID0029.adapterLength
 */

const helpers = require("../helpers.js");
const processParser = helpers.processParser;
const processKey = helpers.processKey;
const serializerField = helpers.serializerField;
const serializerKey = helpers.serializerKey;

function parser(msg, opts, cb) {
    let status = true;

    let buffer = msg.payload;
    msg.payload = {};

    let position = {
        value: 0
    };

    msg.revision = msg.revision || 1;

    switch (msg.revision) {

        case 1:
            status = processKey(msg, buffer, "parameterSetID", 1, 2, position, cb) &&
                processParser(msg, buffer, "parameterSetID", "number", 3, position, cb) &&
                processKey(msg, buffer, "parameterSetName", 2, 2, position, cb) &&
                processParser(msg, buffer, "parameterSetName", "string", 25, position, cb) &&
                processKey(msg, buffer, "rotationDirection", 3, 2, position, cb) &&
                processParser(msg, buffer, "rotationDirection", "number", 1, position, cb) &&
                processKey(msg, buffer, "batchSize", 4, 2, position, cb) &&
                processParser(msg, buffer, "batchSize", "number", 2, position, cb) &&
                processKey(msg, buffer, "torqueMin", 5, 2, position, cb) &&
                processParser(msg, buffer, "torqueMin", "number", 6, position, cb) &&
                processKey(msg, buffer, "torqueMax", 6, 2, position, cb) &&
                processParser(msg, buffer, "torqueMax", "number", 6, position, cb) &&
                processKey(msg, buffer, "torqueFinalTarget", 7, 2, position, cb) &&
                processParser(msg, buffer, "torqueFinalTarget", "number", 6, position, cb) &&
                processKey(msg, buffer, "angleMin", 8, 2, position, cb) &&
                processParser(msg, buffer, "angleMin", "number", 5, position, cb) &&
                processKey(msg, buffer, "angleMax", 9, 2, position, cb) &&
                processParser(msg, buffer, "angleMax", "number", 5, position, cb) &&
                processKey(msg, buffer, "finalAngleTarget", 10, 2, position, cb) &&
                processParser(msg, buffer, "finalAngleTarget", "number", 5, position, cb) &&
                processKey(msg, buffer, "cycleEndTime", 11, 2, position, cb) &&
                processParser(msg, buffer, "cycleEndTime", "number", 1, position, cb) &&
                processKey(msg, buffer, "control", 12, 2, position, cb) &&
                processParser(msg, buffer, "control", "number", 1, position, cb) &&
                processKey(msg, buffer, "torqueThreshold", 13, 2, position, cb) &&
                processParser(msg, buffer, "torqueThreshold", "number", 6, position, cb) &&
                processKey(msg, buffer, "angleThreshold", 14, 2, position, cb) &&
                processParser(msg, buffer, "angleThreshold", "number", 6, position, cb) &&
                processKey(msg, buffer, "mode", 15, 2, position, cb) &&
                processParser(msg, buffer, "mode", "number", 1, position, cb) &&
                processKey(msg, buffer, "auditAngle", 16, 2, position, cb) &&
                processParser(msg, buffer, "auditAngle", "number", 5, position, cb) &&
                processKey(msg, buffer, "adapterID", 17, 2, position, cb) &&
                processParser(msg, buffer, "adapterID", "number", 3, position, cb) &&
                processKey(msg, buffer, "adapterLength", 18, 2, position, cb) &&
                processParser(msg, buffer, "adapterLength", "number", 3, position, cb);

            if (status) {
                msg.payload.torqueMin = (msg.payload.torqueMin / 100);
                msg.payload.torqueMax = (msg.payload.torqueMax / 100);
                msg.payload.torqueFinalTarget = (msg.payload.torqueFinalTarget / 100);
                msg.payload.torqueThreshold = (msg.payload.torqueThreshold / 100);
                msg.payload.angleThreshold = (msg.payload.angleThreshold / 100);

                cb(null, msg)
            }
            break;

        default:
            cb(new Error(`[Parser MID${msg.mid}] invalid revision [${msg.revision}]`));
            break;
    }
}

function serializer(msg, opts, cb) {

    let buf;
    let statusprocess = false;

    let position = {
        value: 0
    };

    msg.revision = msg.revision || 1;

    switch (msg.revision) {

        case 1:

            if (buf === undefined) {
                statusprocess = true;
                buf = Buffer.alloc(126);
                position.value = 126;
            }

            if (!statusprocess) {
                return;
            }

            msg.payload.torque = Math.round(msg.payload.torque * 100);
            msg.payload.torqueFinalTarget = Math.round(msg.payload.torqueFinalTarget * 100);
            msg.payload.torqueMax = Math.round(msg.payload.torqueMax * 100);
            msg.payload.torqueMin = Math.round(msg.payload.torqueMin * 100);
            msg.payload.torqueThreshold = Math.round(msg.payload.torqueThreshold * 100);
            msg.payload.angleThreshold = Math.round(msg.payload.angleThreshold * 100);

            statusprocess =
                serializerField(msg, buf, "adapterLength", "number", 3, position, cb) &&
                serializerKey(msg, buf, 18, 2, position, cb) &&
                serializerField(msg, buf, "adapterID", "number", 3, position, cb) &&
                serializerKey(msg, buf, 17, 2, position, cb) &&
                serializerField(msg, buf, "auditAngle", "number", 5, position, cb) &&
                serializerKey(msg, buf, 16, 2, position, cb) &&
                serializerField(msg, buf, "mode", "number", 1, position, cb) &&
                serializerKey(msg, buf, 15, 2, position, cb) &&
                serializerField(msg, buf, "angleThreshold", "number", 6, position, cb) &&
                serializerKey(msg, buf, 14, 2, position, cb) &&
                serializerField(msg, buf, "torqueThreshold", "number", 6, position, cb) &&
                serializerKey(msg, buf, 13, 2, position, cb) &&
                serializerField(msg, buf, "control", "number", 1, position, cb) &&
                serializerKey(msg, buf, 12, 2, position, cb) &&
                serializerField(msg, buf, "cycleEndTime", "number", 1, position, cb) &&
                serializerKey(msg, buf, 11, 2, position, cb) &&
                serializerField(msg, buf, "finalAngleTarget", "number", 5, position, cb) &&
                serializerKey(msg, buf, 10, 2, position, cb) &&
                serializerField(msg, buf, "angleMax", "number", 5, position, cb) &&
                serializerKey(msg, buf, 9, 2, position, cb) &&
                serializerField(msg, buf, "angleMin", "number", 5, position, cb) &&
                serializerKey(msg, buf, 8, 2, position, cb) &&
                serializerField(msg, buf, "torqueFinalTarget", "number", 6, position, cb) &&
                serializerKey(msg, buf, 7, 2, position, cb) &&
                serializerField(msg, buf, "torqueMax", "number", 6, position, cb) &&
                serializerKey(msg, buf, 6, 2, position, cb) &&
                serializerField(msg, buf, "torqueMin", "number", 6, position, cb) &&
                serializerKey(msg, buf, 5, 2, position, cb) &&
                serializerField(msg, buf, "batchSize", "number", 2, position, cb) &&
                serializerKey(msg, buf, 4, 2, position, cb) &&
                serializerField(msg, buf, "rotationDirection", "number", 1, position, cb) &&
                serializerKey(msg, buf, 3, 2, position, cb) &&
                serializerField(msg, buf, "parameterSetName", "string", 25, position, cb) &&
                serializerKey(msg, buf, 2, 2, position, cb) &&
                serializerField(msg, buf, "parameterSetID", "number", 3, position, cb) &&
                serializerKey(msg, buf, 1, 2, position, cb);

            if (!statusprocess) {
                return;
            }

            msg.payload = buf;

            cb(null, msg);

            break;

        default:
            cb(new Error(`[Serializer MID${msg.mid}] invalid revision [${msg.revision}]`));
            break;
    }
}

function revision() {
    return [1];
}

module.exports = {
    parser,
    serializer,
    revision
};