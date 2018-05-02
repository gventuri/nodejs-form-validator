module.exports = function(model, data){
  global.validationErrors = [];

  //Run the validation
  run_validation(model, data);

  return global.validationErrors;
}

function run_validation(model, data){
  //Get all the fields of the data obj
  for(let field of Object.keys(data)){
    //The field doesn't exist in the model
    if(!model[field]) global.validationErrors.push({type: "missing", field: field, error: "Missing field in the model"});
  }
  //For each requirement of the model
  for(let field of Object.keys(model)){
    let requirements = model[field];
    for(let checkType of Object.keys(requirements)){
      //REQUIRED
      if(checkType == "required"){
        if(!data) global.validationErrors.push({type: checkType, field: field, error: "Missing field '" + field + "'"});
        if(data && !data[field]) global.validationErrors.push({type: checkType, field: field, error: requirements[checkType]});
      }

      //MIN LENGTH
      if(checkType == "minLength"){
        if(data && data[field] && data[field].length <= requirements[checkType].value) global.validationErrors.push({type: checkType, field: field, error: requirements[checkType].error});
      }

      //MAX LENGTH
      if(checkType == "maxLength"){
        if(data && data[field] && data[field].length >= requirements[checkType].value) global.validationErrors.push({type: checkType, field: field, error: requirements[checkType].error});
      }

      //IS EMAIL
      if(checkType == "isEmail"){
        const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if(data && data[field] && ((regex.exec(data[field])) === null)) global.validationErrors.push({type: checkType, field: field, error: requirements[checkType]});
      }

      //IS NUMERIC
      if(checkType == "isNumber"){
        if(data && data[field] && (Number(parseFloat(data[field])) !== data[field])) global.validationErrors.push({type: checkType, field: field, error: requirements[checkType]});
      }

      //IS DATE
      if(checkType == "isDate"){
        if(data && data[field] && !(Object.prototype.toString.call(data[field]) === "[object Date]" && !isNaN(data[field]))) global.validationErrors.push({type: checkType, field: field, error: requirements[checkType]});
      }

      //CHILDREN VALIDATION
      if(checkType == "__children"){
        if(data && data[field]) run_validation(model[field]['__children'], data[field]);
      }
    }
  }
}