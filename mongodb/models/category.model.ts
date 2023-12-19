import { Schema, model, models } from 'mongoose';

const CategorySchema = new Schema({
  clerkId: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },

  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  photo: { type: String, required: true },
});

const Category = models.Category || model('Category', CategorySchema);

export default Category;
