'use server';

import { handleError } from '@/lib/helpers';
import { connectDB } from '@/mongodb/database';
import Category from '@/mongodb/models/category.model';
import Event from '@/mongodb/models/event.model';
import User from '@/mongodb/models/user.model';
import { CreateEventParams } from '@/types';

const populateEvent = async (query: any) => {
  return query
    .populate({
      path: 'organizer',
      model: User,
      select: '_id firstName lastName',
    })
    .populate({
      path: 'category',
      model: Category,
      select: '_id name',
    });
};

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

export const getEventById = async (eventId: string) => {
  try {
    await connectDB();

    const event = await populateEvent(Event.findById(eventId));

    if (!event) {
      throw new Error('Event not found');
    }

    return JSON.parse(JSON.stringify(event));
  } catch (error) {
    handleError(error);
  }
};
