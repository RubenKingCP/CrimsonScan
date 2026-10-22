// Thin: read the request, call site.service, send the response.
const service = require("./site.service");

exports.list = async (req, res) => res.json(await service.list(req.user.id));

exports.create = async (req, res) => res.status(201).json(await service.create(req.user.id, req.body));

exports.get = async (req, res) => res.json(await service.get(req.user.id, req.params.id));

exports.verify = async (req, res) => res.json(await service.verify(req.user.id, req.params.id));

exports.remove = async (req, res) => res.json(await service.remove(req.user.id, req.params.id));