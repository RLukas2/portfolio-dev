import { MoodSad } from '@/components/common/icons';

/**
 * Empty State Component
 * This component displays a message indicating that there is no data available.
 *
 * @param {{ message: string }} param0
 * @param {string} param0.message
 * @returns {*}
 */
const EmptyState = ({ message }: { message: string }) => {
  return (
    <div className="my-4 flex flex-col items-center justify-center space-y-1 py-3">
      <MoodSad className="size-12" />
      <p className="m-0 text-center">{message}</p>
    </div>
  );
};

export default EmptyState;
