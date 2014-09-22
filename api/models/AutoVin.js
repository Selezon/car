/**
* AutoVin.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

    connection: 'someMysqlServer',
    tableName: 'auto_vin',
    schema: true,

    // Disables Automatic ID generation
    // (allows you to use a FLOAT type for your ID)
    autoPK: false,

    // Disables Automatic Timestamps
    // You will need to manually update your timestamps, usually best to leave this
    // on and remove the updated_at and created_at attributes below to let Waterline
    // keep these up to date for you
    autoCreatedAt: false,
    autoUpdatedAt: false,

    attributes: {
        id: {
            type: 'integer',
            primaryKey: true,
            autoIncrement: true
        },
        vin: {
            type: "varchar",
            size: 17
        },
        makeId: 'integer',
        makeName: {
            model:'AutoMake'
        },
        modelName: {
            model:'AutoModel'
        },
        modelYearId: {
            model:'AutoYear'
        },
        transmissionType: {
            model:'AutoTransmissionType'
        },
        engineType: {
            model:'AutoEngineType'
        },
        engineCompressorType: {
            model:'AutoEngineCompressorType'
        },
        engineFuelType: {
            model:'AutoEngineFuelType'
        },
        engineCylinder: {
            model:'AutoEngineCylinder'
        },
        engineSize: {
            model:'AutoEngineSize'
        },
        style: {
            model:'AutoStyle'
        }
    }
};
