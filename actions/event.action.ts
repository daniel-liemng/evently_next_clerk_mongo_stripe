'use server';

import { handleError } from '@/lib/helpers';
import { connectDB } from '@/mongodb/database';
import Event from '@/mongodb/models/event.model';
import User from '@/mongodb/models/user.model';
import { CreateEventParams } from '@/types';

export const createEvent = async ({
  event,
  userId,
  path,
}: CreateEventParams) => {
  try {
    await connectDB();

    const organizer = await User.findById(userId);

    if (!organizer) {
      throw new Error('Organizer not found');
    }

    const newEvent = await Event.create({
      ...event,
      category: event.categoryId,
      organizer: userId,
    });

    console.log('NEWEVMT', newEvent);

    return JSON.parse(JSON.stringify(newEvent));
  } catch (error) {
    handleError(error);
  }
};
