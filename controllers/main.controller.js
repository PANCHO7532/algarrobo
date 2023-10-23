/*
 * /=======================================================\
 * | Copyright (c) P7COMunications LLC                     |
 * | Author(s): Francisco Medina [pancho7532@p7com.net]    |
 * | Date: 23/Oct/2023 (rev 1)                             |
 * |=======================================================|
 * |-> Purpose: Renders all the visuals of the page.       |
 * \=======================================================/
 */
exports.index = async(req, res) => {
    await res.render("index");
};