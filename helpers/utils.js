export const transformModel = {
  transform: function (document, returnedObj) {
    returnedObj.id = returnedObj._id;
    delete returnedObj._id;
    delete returnedObj.__v;
    return returnedObj;
  },
};
export const schemaOptions = {
  toJSON: transformModel,
  toObject: transformModel,
};
