'use strict';

const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.update = (event, context, callback) => {
  const timestamp = new Date().getTime();
  const data = JSON.parse(event.body);

  // validation
  if (typeof data.applicant !== 'string') {
    console.error('Validation Failed');
    callback(null, {
      statusCode: 400,
      headers: { 'Content-Type': 'text/plain' },
      body: 'Couldn\'t update the todo item.',
    });
    return;
  }

  const params = {
    TableName: 'RequirementOrdersTableSLESS',
    Key: {
      idRequirementOrder: event.pathParameters.idRequirementOrder,
    },
    ExpressionAttributeValues: {
      ':applicant': data.applicant,
      ':area': data.area,
      ':occupation': data.occupation,
      ':dateRegister': timestamp,
      ':note': data.note
    },
    UpdateExpression: 'SET applicant = :applicant, area = :area, occupation = :occupation, dateRegister=:dateRegister, note=:note',
    ReturnValues: 'ALL_NEW',
  };

  // update the todo in the database
  dynamoDb.update(params, (error, result) => {
    // handle potential errors
    if (error) {
      console.error(error);
      callback(null, {
        statusCode: error.statusCode || 501,
        headers: { 'Content-Type': 'text/plain' },
        body: 'Couldn\'t fetch the todo item.',
      });
      return;
    }

    // create a response
    const response = {
      statusCode: 200,
      body: JSON.stringify(result.Attributes),
    };
    callback(null, response);
  });
};
