import SimpleSchema from 'simpl-schema';
SimpleSchema.extendOptions(['autoform']);

// Create Collection
NetworkApp = new Mongo.Collection('NetworkApp');

// Only allow inert to collection if userId is true (logged in)
NetworkApp.allow({
  insert: function(userId, doc) {
    return !!userId;
  },
  update: function(userId, doc) {
    return !!userId;
  }
});


// DB Schema for Quickform
NetworkAppSchema = new SimpleSchema({
  ign: {
    type: String,
    label: "IGN"
  },
  discordName: {
    type: String,
    label: "Discord Name"
  },
  memberlength: {
    type: String,
    label: "How long have you been a member at Digital Hazards?"
  },
  languageKnown: {
    type: String,
    label: "What languages do you know?",
    autoform: {
      type: 'textarea'
    }
  },
  whyyou: {
    type: String,
    label: "Why do you want to join the Network staff?",
    autoform: {
      type: 'textarea'
    }
  },
  applicant: {
    type: String,
    label: "Applicant",
    autoValue: function() {
      if (this.isInsert) return Meteor.userId();
    },
    autoform: {
      type: "hidden"
    }
  },
  createdAt: {
    type: Date,
    autoform: {
      type: "hidden"
    },
    autoValue() {
      if (this.isInsert) return new Date();
    },
  },
  status: {
    type: String,
    label: "Status",
    autoValue() {
      if (this.isInsert) return "Pending";
    },
    autoform: {
      type: "hidden",
    }
  }
});

NetworkApp.attachSchema(NetworkAppSchema);
