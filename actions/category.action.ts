'use server';

import { handleError } from '@/lib/helpers';
import { connectDB } from '@/mongodb/database';
import Category from '@/mongodb/models/category.model';
import { CreateCategoryParams } from '@/types';

export const createCategory = async ({
  categoryName,
}: CreateCategoryParams) => {
  try {
    await connectDB();

    const newCategory = await Category.create({ name: categoryName });

    return JSON.parse(JSON.stringify(newCategory));
  } catch (error) {
    handleError(error);
  }
};

export const getAllCategories = async () => {
  try {
    await connectDB();

    const categories = await Category.find();

    return JSON.parse(JSON.stringify(categories));
  } catch (error) {
    handleError(error);
  }
};
