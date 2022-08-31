const { Activity } = require('../db');
const ModelCRUD = require('./modelCRUD');

class ActivityController extends ModelCRUD {
  constructor(model) {
    super(model);
  }
}

const activityController = new ActivityController(Activity);

module.exports = activityController;