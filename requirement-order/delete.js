'use strict';

const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.delete = (event, context, callback) => {
  console.log(" id de resjfsfs "+event.pathParameters.idRequirementOrder);
  const params = {
    TableName: 'RequirementOrdersTableSLESS',
    Key: {
      idRequirementOrder: event.pathParameters.idRequirementOrder
    }
  };

  // delete the todo from the database.
  console.log(params);
  dynamoDb.delete(params, (error)   => {
    // handle potential errors
    console.log(" no borro nada");
    if (error) {
      console.error(error);
      callback(null, {
        statusCode: error.statusCode || 501,
        headers: { 'Content-Type': 'text/plain' },
        body: 'Couldn\'t remove the todo item.',
      });
      return;
    }

    // create a response
    const response = {
      statusCode: 200,
      body: JSON.stringify('Order de Requerimiento borrada'),
    };
    callback(null, response);
    console.log
  });
};
