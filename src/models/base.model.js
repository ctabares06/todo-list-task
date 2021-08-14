function Model (table, attrs) {
    this.table = table;
    this.knex = require('../database/setup');
    this.attrs = attrs;
}

Model.prototype.call = function() {
    return this.knex(this.table);
}

Model.prototype.get = function() {
    return this.call().select(...this.attrs);
}

Model.prototype.insert = function(values) {
    return this.call().insert(values, values);
}

Model.prototype.updateById = function(id, values) {
    return this.call().where({id}).update(values);
}

// end of base model

function returnModel(table, attrs) {
    const model = createModel(table, attrs);
    connect(model);

    return model;
}

function createModel(table, attrs) {
    return function() {
        Model.call(this, table, attrs)
    }
}

function connect(childClass) {
    childClass.prototype = Object.create(Model.prototype);
    childClass.prototype.constructor = childClass;
}

module.exports = returnModel;