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

const {
    expect
} = require('chai');

const MID = require('../src/mid/0025.js');

describe("MID 0025", () => {

    it("parser rev 1", (done) => {

        let msg = {
            mid: 25,
            revision: 1,
            payload: Buffer.from("012<xml>Data</xml>")
        };

        MID.parser(msg, {}, (err, data) => {

            if (err) {
                console.log(err);
            }

            expect(data).to.be.deep.equal({
                mid: 25,
                revision: 1,
                payload: {
                    destinationApplicationNumber: 12,
                    xmlData: "<xml>Data</xml>"
                }
            });

            done();
        });
    });

    it("serializer rev 1", (done) => {

        let msg = {
            mid: 25,
            revision: 1,
            payload: {
                destinationApplicationNumber: 15,
                xmlData: "<xml>Dat</xml>"
            }
        };

        MID.serializer(msg, {}, (err, data) => {

            if (err) {
                console.log(err);
            }

            expect(data).to.be.deep.equal({
                mid: 25,
                revision: 1,
                payload: Buffer.from("015<xml>Dat</xml>")
            });

            done();
        });
    });

    it("parser rev 2", (done) => {

        let msg = {
            mid: 25,
            revision: 2,
            payload: Buffer.from("eJyzqcjNsXNJLEm00QexACpOBUA=", 'base64')
        };

        MID.parser(msg, {}, (err, data) => {

            if (err) {
                console.log(err);
            }

            expect(data).to.be.deep.equal({
                mid: 25,
                revision: 2,
                payload: {
                    xmlData: "<xml>Data</xml>"
                }
            });

            done();
        });
    });

    it("parser rev 2 real case", (done) => {

        let msg = {
            mid: 25,
            revision: 2,
            payload: Buffer.from("eJyFU+9vmzAQ/VeQv4dfbdQRAVLXTlGkpo0GmqZ9mRy4gCVje7YR2X+/MxCWVov2ibvnd+/enU26P2hZsqa1IJhoDlTTDixo4507LszmbOqMtNaqTRAMw+APd77UTRCHYRR8378UVQsdJQuZ/Z+8YsJYKirAKsM2Qr5iR6NoBdP5i6yoZVJk5Iazn7Ef+uiL5OmjUpxN9GcwlWbKhd4OPScJ8ZwUf+27I+hrAHUyUoKxnsCQeFsuj+95M/Jv4jf0MPoLUZAau5c1O11cUIslcRivV1G4ih/KMNnE68363n8IP/0gwTvLi8+PjfL0M7VVW4C1OLnxxuxJ9sL1QuabAoHLsbKS3Gk+tVQI4N783Ykazjux1bJXzmWebjVV7VeopK4X0S+CHjnU3iQZE+9AewPjVCPdRagdzKJ5WljagHdZU+QOR+jqzYz5X8ZtQ0sN2hmfgf2tsHdlD2aNBp4H4Lxk3WSnUAC4qbvQxfCrB3w8GXG8ou3t2+n0KBqOSISrLFsNppW8LqVGZkbufVe2Z+ICJBNAzxcgmpBSs6YBvaBL4ayejEVzEifjbj7Mj8jV9WJ26+fK/wA7KSkE", 'base64')
        };

        MID.parser(msg, {}, (err, data) => {

            if (err) {
                console.log(err);
            }

            expect(data).to.be.deep.equal({
                mid: 25,
                revision: 2,
                payload: {
                    xmlData: "<MProTighteningParameters xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\" xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xsi:noNamespaceSchemaLocation=\"ProTighteningParameters_2.0.xsd\"><ApplicationDescription Id=\"99\" LocalNumber=\"99\" LocalName=\"Test name\" GlobalNumber=\"99\" GlobalName=\"Test name\" GlobalVersion=\"0\" LastModificationDate=\"2025-10-27T09:25:54.708Z\"/><Application Id=\"99\" Name=\"Test name\"><BatchSettings BatchCountMode=\"OpenProtocol\"/><Channel ChannelIndexInGroup=\"0\"><GraphRecordSettings Enabled Mode=\"2\" Pause=\"0\" Graph=\"0\"/></Channel><Stage Number=\"1\"/><StageParameters StageNumber=\"1\" ChannelIndexInGroup=\"0\"><ParameterSet xsi:type=\"ctPs50\" DwellTime=\"0\" Speed=\"300\" Sequence=\"50\" ShutOffAngle=\"19\" ThresholdTorque=\"4.00\" MinTorque=\"9.00\" MaxTorque=\"19.00\" TriggerTorque=\"14.00\" MinAngle=\"9\" MaxAngle=\"29\"/></StageParameters></Application></MProTighteningParameters>"
                }
            });

            done();
        });
    });

    it("serializer rev 2", (done) => {

        let msg = {
            mid: 25,
            revision: 2,
            payload: {
                xmlData: "<xml>Data2</xml>"
            }
        };

        MID.serializer(msg, {}, (err, data) => {

            if (err) {
                console.log(err);
            }

            expect(data).to.be.deep.equal({
                mid: 25,
                revision: 2,
                payload: Buffer.from("eJyzqcjNsXNJLEk0stEHMQEu8gVy", 'base64')
            });

            done();
        });
    });

    it("parser rev 2 invalid data", (done) => {

        let msg = {
            mid: 25,
            revision: 2,
            payload: Buffer.from("ab", 'hex')
        };

        MID.parser(msg, {}, (err, data) => {

            if (err) {
                console.log(err);
            }
            expect(err).to.be.an('error');
            expect(err.message).to.equal('[Parser MID25] unexpected end of file');
            done();
        });
    });

    it("serializer rev 1 invalid application number", (done) => {

        let msg = {
            mid: 25,
            revision: 1,
            payload: {
                destinationApplicationNumber: 1545,
                xmlData: "<xml>Dat</xml>"
            }
        };

        MID.serializer(msg, {}, (err, data) => {

            if (err) {
                console.log(err);
            }

            expect(err).to.be.an('error');
            expect(err.message).to.equal('MID0025 serializer: \'destinationApplicationNumber\' parameter is required and must be between 0 and 999 for revision 1');
            done();
        });
    });

    it("Should return error, parser with invalid revision", (done) => {
        let msg = {
            mid: 20,
            revision: 12,
            payload: Buffer.from("")
        };

        MID.parser(msg, {}, (err, data) => {
            expect(err).to.be.an('error');
            done();
        });
    });

    it("Should return error, serializer with invalid revision", (done) => {

        let msg = {
            mid: 20,
            revision: 12,
            payload: {}
        };

        MID.serializer(msg, {}, (err, data) => {
            expect(err).to.be.an('error');
            done();
        });
    });

    it("Should return array revision", (done) => {

        let revisions = MID.revision();

        expect(revisions).to.have.lengthOf(2);
        done();

    });

});