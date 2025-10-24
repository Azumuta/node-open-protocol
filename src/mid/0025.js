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
const { deflateSync, inflateSync } = require('zlib');

/**
 * @name MID0025
 * @class
 * @param {object} MID0025
 * @param {string} MID0025.xmlData
 * Revision 1 only:
 * @param {number} MID0025.destinationApplicationNumber
 */

function parser(msg, opts, cb) {
    /** @type {Buffer} */
    let buffer = msg.payload;
    msg.payload = {};

    msg.revision = msg.revision || 1;

    try {
        switch (msg.revision) {

            case 2:
                const xmlData = inflateSync(buffer);
                msg.payload = {
                    xmlData: xmlData.toString()
                };
                break;

            case 1:
                msg.payload = {
                    xmlData: buffer.slice(3).toString(),
                    destinationApplicationNumber: parseInt(buffer.slice(0, 3).toString())
                };
                break;

            default:
                cb(new Error(`[Parser MID${msg.mid}] invalid revision [${msg.revision}]`));
                break;
        }
    } catch (err) {
        cb(new Error(`[Parser MID${msg.mid}] ${err.message}`));
        return;
    }
    cb(null, msg);
}

function serializer(msg, opts, cb) {

    let buf;

    msg.revision = msg.revision || 1;

    switch (msg.revision) {

        case 2:
            /** @type {Buffer} */
            const xmlData = deflateSync(msg.payload.xmlData);
            if (buf === undefined) {
                buf = Buffer.alloc(xmlData.length);
            }
            // copy buffer to main buffer from position 20 on, last byte should remain null
            xmlData.copy(buf);
            break;

        case 1:
            const xmlDataString = msg.payload.xmlData;
            if (buf === undefined) {
                buf = Buffer.alloc(3 + xmlDataString.length);
            }
            // copy destination application number to main buffer at position 20 (3 bytes)
            if (msg.payload.destinationApplicationNumber === undefined || msg.payload.destinationApplicationNumber > 999 || msg.payload.destinationApplicationNumber < 0) {
                cb(new Error("MID0025 serializer: 'destinationApplicationNumber' parameter is required and must be between 0 and 999 for revision 1"));
                return;
            }
            buf.write(msg.payload.destinationApplicationNumber.toString().padStart(3, '0'));
            // copy string to main buffer from position 23 on, last byte should remain null
            buf.write(xmlDataString, 3);
            break;

        default:
            cb(new Error(`[Serializer MID${msg.mid}] invalid revision [${msg.revision}]`));
            break;
    }

    msg.payload = buf;
    cb(null, msg);
}

function revision() {
    return [1, 2];
}

module.exports = {
    parser,
    serializer,
    revision
};