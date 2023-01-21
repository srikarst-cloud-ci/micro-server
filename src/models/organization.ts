import mongoose from "mongoose";
import { OrgStatus } from "@srikar-test/micro-common";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";

interface OrganizationAttrs {
  _id: string;
  cloudCredentials: {
    accessKey: string;
    secretKey: string;
  };
  status: OrgStatus;
}

interface OrganizationDoc extends mongoose.Document {
  _id: mongoose.Schema.Types.ObjectId;
  cloudCredentials: {
    accessKey: string;
    secretKey: string;
  };
  status: OrgStatus;
}

interface OrganizationModel extends mongoose.Model<OrganizationDoc> {
  build(attrs: OrganizationAttrs): OrganizationDoc;
}

const organizationSchema = new mongoose.Schema(
  {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    cloudCredentials: {
      accessKey: {
        type: String,
        required: true,
      },
      secretKey: {
        type: String,
        required: true,
      },
    },
    status: {
      type: String,
      required: true,
      enum: Object.values(OrgStatus),
      default: OrgStatus.Created,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

organizationSchema.set("versionKey", "version");
organizationSchema.plugin(updateIfCurrentPlugin);

organizationSchema.statics.build = (attrs: OrganizationAttrs) => {
  return new Organization(attrs);
};

const Organization = mongoose.model<OrganizationDoc, OrganizationModel>(
  "Organization",
  organizationSchema
);

export { Organization };
