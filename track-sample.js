var Kepler = new (require('./index'))(
//  'https://6ndc2oaypg.execute-api.us-west-2.amazonaws.com/test',
  'http://kepler.dev.rednovalabs.net/api/v1',
  'Cviqankf0ScZQ05nootmadLyJqHaY1H841k8VbJ7'
);

var companyUUID = '6203a903-d9fa-496f-b2fb-e1c98d780f42';
var facilityUUID = 'c7b2bc07-fadf-45b6-8ce1-fde7218a53fc';

var ev = new Kepler.Event('movein')
    .setCompany(companyUUID)
    .setFacility(facilityUUID)
    .setDate('2015-12-30 15:41:00')
    .setData({
      unit: 1,
      tenant: 2,
      hello: 'world'
    });

console.log('event', ev);

var promise = Kepler.track(
  new Kepler.Event('movein')
    .setCompany(companyUUID)
    .setFacility(facilityUUID)
    .setDate('2015-12-30 15:41:00')
    .setData({
      unit: 1,
      tenant: 2,
      hello: 'world'
    })
);

promise.then(function(response) {
  console.log('Got response', response);
});

promise.catch(function(er) {
  console.log('Got error', er);
});

// @todo: actual unit tests with assertions