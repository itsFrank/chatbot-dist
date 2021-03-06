"use strict";
exports.SCIENCE = 'sci';
exports.MANAGEMENT = 'mgmt';
exports.facultyList = [exports.SCIENCE, exports.MANAGEMENT];
exports.FacultyMap = {
    names: {},
    subdomains: {
        'science': exports.SCIENCE,
        'management': exports.MANAGEMENT
    },
    facebook: {
        ids: {
            '1397940820223215': exports.SCIENCE,
            '1582091102085150': exports.MANAGEMENT
        },
        tokens: {}
    },
    twilio: {
        numbers: {
            '+18443646366': exports.SCIENCE,
            '+33644600589': exports.MANAGEMENT,
            '+18443116468': exports.MANAGEMENT,
        },
        from: {}
    }
};
exports.FacultyMap.facebook.tokens[exports.SCIENCE] = 'EAAXBClPmZCXABAAE8MlaQeCViHwdth0s9jq3VMEOWTiOsxYQmAGlK0q1ZAv9xZAGFotnbMTw2a11WRHNqtCxl4cuTxq5uJonPCvrgBFHYHl7ZA2Q2eKzYciiifnZBEQA0nMybYrc0VhmTjOMEPmj003y79XFcSirF0xgd9MZCtNAZDZD';
exports.FacultyMap.facebook.tokens[exports.MANAGEMENT] = 'EAAXBClPmZCXABAE0UAZBwkrJL0MtCVvDRaADfId0WH7bwKcjkp5t2xrxCKPaDcu7OcwWAcElrFiPSjMJ9GbX8erzkQmTbpUD84bjMAPc6PfZCNmf2Y6W3xbL6mxgRvkoKFkWRUBHoYmpprzs4weBsRAcwsMbFw6qMBAZAkAZB3QZDZD';
exports.FacultyMap.names[exports.SCIENCE] = 'science';
exports.FacultyMap.names[exports.MANAGEMENT] = 'management';
exports.FacultyMap.twilio.from[exports.SCIENCE] = '+18443646366';
exports.FacultyMap.twilio.from[exports.MANAGEMENT] = '+18443116468';
function requestFaculty(req) {
    if (req.subdomains.length != 1)
        return null;
    else
        return exports.FacultyMap.subdomains[req.subdomains[0]];
}
exports.requestFaculty = requestFaculty;
//# sourceMappingURL=faculties.js.map