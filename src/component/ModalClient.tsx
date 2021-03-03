import { useForm } from 'react-hook-form';
import Portal from './Portal';
import { useAddClient, useUpdateClient } from '../utilities/hooks';
import { ClientType } from '../utilities/types';

type ModalClientProps = {
  client: ClientType | null;
  setIsModalOpen: React.Dispatch<React.SetStateAction<Boolean>>;
  setCurrentUpdatingClient: React.Dispatch<
    React.SetStateAction<ClientType | null>
  >;
};

export default function ModalUpdateClient({
  client,
  setIsModalOpen,
  setCurrentUpdatingClient,
}: ModalClientProps) {
  const { register, errors, handleSubmit } = useForm();

  const addClientMutation = useAddClient();
  const updateClientMutation = useUpdateClient();

  const closeModal = () => {
    setCurrentUpdatingClient(null);
    setIsModalOpen(false);
  };

  const submitClient = (variables: any) => {
    if (client && setCurrentUpdatingClient) {
      updateClientMutation.mutate({ ...variables, id: client?.id });
      setCurrentUpdatingClient(null);
    } else {
      addClientMutation.mutate(variables);
    }
    setIsModalOpen(false);
  };

  return (
    <Portal>
      <div
        onClick={closeModal}
        className='flex items-center justify-center w-full h-full fixed top-0 left-0 bg-black bg-opacity-50'
      >
        <div onClick={(e) => e.stopPropagation()} className='w-6/12'>
          <div className='flex justify-between'>
            <h1 className='text-white font-medium text-lg'>
              {client ? 'Update' : 'Add'} client
            </h1>
            <button
              className='rounded px-2 cursor-pointer text-lg font-medium bg-red-400 text-gray-900 border-red-400 border-2 border-solid hover:border-black'
              onClick={closeModal}
            >
              Close
            </button>
          </div>
          <form
            className='flex flex-col p-3 bg-gray-50 rounded'
            onSubmit={handleSubmit(submitClient)}
          >
            <label className='text-xs font-medium text-gray-500 uppercase tracking-wider'>
              First name
              {errors.firstName && <p className='text-red-500'>is required</p>}
            </label>
            <input
              className='border-b border-solid border-indigo-400'
              name='firstName'
              type='text'
              defaultValue={client?.firstName}
              ref={register({ required: true })}
            />
            <label className='bg-gray-50 text-xs font-medium text-gray-500 uppercase tracking-wider'>
              Last name
              {errors.lastName && <p className='text-red-500'>is required</p>}
            </label>
            <input
              className='border-b border-solid border-indigo-400'
              name='lastName'
              type='text'
              defaultValue={client?.lastName}
              ref={register({ required: true })}
            />
            <label className='text-xs font-medium text-gray-500 uppercase tracking-wider'>
              Phone
            </label>
            <input
              className=' border-b border-solid border-indigo-400'
              name='phone'
              type='text'
              defaultValue={client?.phone}
              ref={register}
            />
            <label className='text-xs font-medium text-gray-500 uppercase tracking-wider'>
              Avatar URL
            </label>
            <input
              className='mb-1 border-b border-solid border-indigo-400'
              name='avatarUrl'
              type='text'
              defaultValue={client?.avatarUrl}
              ref={register}
            />
            <input
              className='rounded-b cursor-pointer text-lg font-medium bg-indigo-500 text-white border-indigo-500 border-2 border-solid hover:border-black'
              type='submit'
            />
          </form>
        </div>
      </div>
    </Portal>
  );
}
