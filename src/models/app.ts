import mongoose, { Document, Model } from "mongoose";

interface AppAttrs {
  name: string;
  type: string;
  status: string;
}

interface AppModel extends Model<AppDoc> {
  build(attrs: AppAttrs): AppDoc;
}

interface AppDoc extends Document {
  name: string;
  type: string;
  status: string;
}

const appSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
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

//   orderSchema.set('versionKey', 'version');
//   orderSchema.plugin(updateIfCurrentPlugin);

appSchema.statics.build = (attrs: AppAttrs) => {
  return new App(attrs);
};

const App = mongoose.model<AppDoc, AppModel>("App", appSchema);

export { App };
