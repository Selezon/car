// Generated by CoffeeScript 1.8.0

/**
AutoModel.js

@description :: TODO: You might write a short summary of how this model works and what it represents here.
@docs        :: http://sailsjs.org/#!documentation/models
 */

(function() {
  module.exports = {
    connection: "someMysqlServer",
    tableName: "auto_model",
    schema: true,
    autoPK: false,
    autoCreatedAt: false,
    autoUpdatedAt: false,
    attributes: {
      id: {
        type: "integer",
        primaryKey: true,
        autoIncrement: true
      },
      id_make: {
        model: "AutoMake"
      },
      name: {
        type: "string",
        unique: true
      },
      certified: "integer",
      idYear: {
        model: "AutoYear"
      },
      params: {
        collection: "AutoParam",
        via: "model_id"
      },
      vin: {
        collection: "AutoVin"
      }
    }
  };

}).call(this);
