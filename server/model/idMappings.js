const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const entityChildrenSchema = new Schema({
  entityType: {
    type: String,
    required: true
  },
  entityName: {
    type: String,
    required: true
  },
  entityId: {
    type: String,
    required: true
  },
  entityChildren: [
    {
      entityType: {
        type: String,
        required: true
      },
      entityName: {
        type: String,
        required: true
      },
      entityId: {
        type: String,
        required: true
      }
    }
  ]
}, { _id: false });

const mappingsSchema = new Schema({
  entityType: {
    type: String,
    required: true
  },
  entityName: {
    type: String,
    required: true
  },
  entityId: {
    type: String,
    required: true,
    unique: true 
  },
  entityChildren: [entityChildrenSchema]
}, {
  timestamps: true 
});

mappingsSchema.index({ entityId: 1 });

const idMappings = mongoose.model('idMapping', mappingsSchema);

module.exports = idMappings;
