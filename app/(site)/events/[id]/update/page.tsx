import { getEventById } from '@/actions/event.action';
import EventForm from '@/components/shared/event-form';
import { UpdateEventParams } from '@/types';
import { auth } from '@clerk/nextjs';

const UpdateEventPage = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  const { sessionClaims } = auth();

  const userId = sessionClaims?.userId as string;

  const event = await getEventById(id);

  console.log(event);

  return (
    <>
      <section className='bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10'>
        <h3 className='wrapper h3-bold text-center sm:text-left'>
          Update Event
        </h3>
      </section>

      <div className='wrapper my-8'>
        <EventForm
          event={event}
          eventId={event._id}
          userId={userId}
          type='Update'
        />
      </div>
    </>
  );
};

export default UpdateEventPage;
