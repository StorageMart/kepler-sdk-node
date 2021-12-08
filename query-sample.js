var Kepler = new (require('./index'))(
  'https://6ndc2oaypg.execute-api.us-west-2.amazonaws.com/test',
  'Cviqankf0ScZQ05nootmadLyJqHaY1H841k8VbJ7'
);

var companyUUID = '6203a903-d9fa-496f-b2fb-e1c98d780f42';
var facilityUUID = 'c7b2bc07-fadf-45b6-8ce1-fde7218a53fc';

var promise = Kepler.request({
  
  // Revenue examples
  "revenue_by_year": (new Kepler.Query('facility_revenue'))
    .setCompany(companyUUID)
    .setTimeGranularity('year')
    .toJson(),
  "revenue_ytd": (new Kepler.Query('facility_revenue'))
    .setFacility(facilityUUID)
    .setTimeGranularity('month')
    .setTimeWindow("2015-01-01", "2015-12-31")
    .toJson(),
  "revenue_mtd": (new Kepler.Query('facility_revenue'))
    .setFacility(facilityUUID)
    .setTimeGranularity('day')
    .setTimeWindow("2015-12-01", "2015-12-31")
    .toJson(),
  "revenue_fail": (new Kepler.Query('facility_revenue')).toJson(),
  
  // Occupancy examples
  "net_occupancy_by_year": (new Kepler.Query('facility_occupancy'))
    .setCompany(companyUUID)
    .setTimeGranularity('year')
    .toJson(),
  "net_occupancy_ytd": (new Kepler.Query('facility_occupancy'))
    .setFacility(facilityUUID)
    .setTimeGranularity('month')
    .setTimeWindow("2015-01-01", "2015-12-31")
    .toJson(),
  "net_occupancy_mtd": (new Kepler.Query('facility_occupancy'))
    .setFacility(facilityUUID)
    .setTimeGranularity('day')
    .setTimeWindow("2015-12-01", "2015-12-31")
    .toJson(),
  "net_occupancy_fail": (new Kepler.Query('facility_occupancy')).toJson(),
  
});

promise.then(function(results) {
  console.log('Got results', results);
});

promise.catch(function(er) {
  console.log('Got error', er);
});

// @todo: actual unit tests with assertions