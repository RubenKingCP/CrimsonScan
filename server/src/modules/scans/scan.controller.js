// Thin: read the request, call scan.service, send the response.
const service = require("./scan.service");

exports.create = async (req, res) => res.status(201).json(await service.create(req.user.id, req.body));
exports.list = async (req, res) => res.json(await service.list(req.user.id));
exports.get = async (req, res) => res.json(await service.get(req.user.id, req.params.id));
exports.remove = async (req, res) => res.json(await service.remove(req.user.id, req.params.id));
