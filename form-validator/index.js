module.exports = function(model, data){
  let errors = [];

  //Get all the fields of the data obj
  for(let field of Object.keys(data)){
    //The field doesn't exist in the model
    if(!model[field]) errors.push({type: "missing", field: field, error: "Missing field in the model"});
  }
  //For each requirement of the model
  for(let field of Object.keys(model)){
    let requirements = model[field];
    for(let checkType of Object.keys(requirements)){
      //REQUIRED
      if(checkType == "required"){
        if(!data[field]) errors.push({type: checkType, field: field, error: requirements[checkType]});
      }

      //MIN LENGTH
      if(checkType == "minLength"){
        if(data[field] && data[field].length <= requirements[checkType].value) errors.push({type: checkType, field: field, error: requirements[checkType].error});
      }

      //MAX LENGTH
      if(checkType == "maxLength"){
        if(data[field] && data[field].length >= requirements[checkType].value) errors.push({type: checkType, field: field, error: requirements[checkType].error});
      }

      //IS EMAIL
      if(checkType == "isEmail"){
        const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if((regex.exec(data[field])) === null) errors.push({type: checkType, field: field, error: requirements[checkType]});
      }

      //IS NUMERIC
      if(checkType == "isNumber"){
        if(Number(parseFloat(data[field])) !== data[field]) errors.push({type: checkType, field: field, error: requirements[checkType]});
      }

      //IS DATE
      if(checkType == "isDate"){
        if(!(data[field] && Object.prototype.toString.call(data[field]) === "[object Date]" && !isNaN(data[field]))) errors.push({type: checkType, field: field, error: requirements[checkType]});
      }
    }
  }

  return errors;
}
