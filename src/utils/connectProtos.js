function returnProtos(Model) {
    function ConnectedProto() {
        Model.call(this, Model.prototype);
    }

    ConnectedProto.prototype = Object.create(Model.prototype);
    ConnectedProto.prototype.constructor = ConnectedProto;

    return ConnectedProto;
}

module.exports = returnProtos;