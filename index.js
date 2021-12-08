var request = require('request-promise');
var _ = require('lodash');

// Base KEPLER class

function Kepler(baseUrl, apiKey) {
  this.baseUrl = baseUrl;
  this.apiKey = apiKey;
}

Kepler.prototype.request = function(queryHash) {
  return request({
    method: 'POST',
    uri: this.baseUrl+'/query',
    json: true,
    body: queryHash,
    headers: { 'X-Api-Key': this.apiKey },
  });
};

Kepler.prototype.track = function(event) {
  return request({
    method: 'POST',
    uri: this.baseUrl+'/track',
    json: true,
    body: event.toJson(),
    headers: { 'X-Api-Key': this.apiKey },
  });
};

// EVENT stuff

function Event(type) {
  this.json = {
    type: type,
    date: new Date,
    data: {}
  };
}

Event.prototype.setFacility = function(uuid) {
  this.json.facility_uuid = uuid;
  return this;
};

Event.prototype.setCompany = function(uuid) {
  this.json.company_uuid = uuid;
  return this;
};

Event.prototype.setDate = function(date) {
  this.json.date = date;
  return this;
};

Event.prototype.setData = function(data, replace) {
  replace = (typeof replace === 'undefined') ? true : false;
  if (replace) {
    this.json.data = data;
  } else {
    this.json.data = _.assign({}, this.json.data, data);
  }
  return this;
};

Event.prototype.toJson = function() {
  return this.json;
};

Kepler.prototype.Event = Event;


// QUERY stuff

function Query(fact) {
  this.json = {
    fact: fact,
    date: { by: 'month' }
  };
}

Query.prototype.setFacility = function(uuid) {
  this.json.facility = uuid;
  return this;
};

Query.prototype.setCompany = function(uuid) {
  this.json.company = uuid;
  return this;
};

Query.prototype.setTimeGranularity = function(by) {
  this.json.date.by = by;
  return this;
};

Query.prototype.setTimeWindow = function(start, end) {
  this.json.date.between = [start, end];
  return this;
}

Query.prototype.toJson = function() {
  // @todo: validation here
  return this.json;
};

Kepler.prototype.Query = Query;


module.exports = Kepler;
