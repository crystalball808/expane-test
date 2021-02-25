import React from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';
import { gql, request } from 'graphql-request';
import Portal from './Portal';
import { END_POINT } from '../utilities/endPoint';
import { ModalUpdateClientProps} from '../utilities/types';

export default function ModalUpdateClient({
  client,
  setIsModalOpen,
  setCurrentUpdatingClient,
}: ModalUpdateClientProps) {
  const { register, errors, handleSubmit } = useForm();
  const queryClient = useQueryClient();

  const addClientMutation = gql`
    mutation updateClient(
      $id: ID!
      $firstName: String!
      $lastName: String!
      $phone: String
      $avatarUrl: String
    ) {
      updateClient(
        id: $id
        firstName: $firstName
        lastName: $lastName
        phone: $phone
        avatarUrl: $avatarUrl
      ) {
        firstName
        lastName
        phone
        avatarUrl
      }
    }
  `;
  const mutation = useMutation(
    (variables) => request(END_POINT, addClientMutation, variables),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('clients');
      },
    }
  );

  const closeModal = () => {
    setCurrentUpdatingClient(null);
    setIsModalOpen(false);
  };

  const updateClient = (variables: any) => {
    mutation.mutate({...variables, id: client?.id});
    setCurrentUpdatingClient(null)
    setIsModalOpen(false);
  };

  return (
    <Portal>
      <div className='flex items-center justify-center w-full h-full fixed top-0 left-0 bg-black bg-opacity-30'>
        <div>
          <button
            className='rounded px-2 cursor-pointer text-lg font-medium bg-gray-300 text-gray-900 border-gray-300 border-2 border-solid hover:border-black'
            onClick={closeModal}
          >
            Close
          </button>
          <form
            className='flex flex-col p-3 bg-gray-50 min-w-300 rounded'
            onSubmit={handleSubmit(updateClient)}
          > 
            <label className='text-xs font-medium text-gray-500 uppercase tracking-wider'>
              First name
              {errors.firstName && <p className='text-red-500'>is required</p>}
            </label>
            <input
              className='border-b border-solid border-gray-300'
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
              className='border-b border-solid border-gray-300'
              name='lastName'
              type='text'
              defaultValue={client?.lastName}
              ref={register({ required: true })}
            />
            <label className='text-xs font-medium text-gray-500 uppercase tracking-wider'>
              Phone
            </label>
            <input
              className=' border-b border-solid border-gray-300'
              name='phone'
              type='text'
              defaultValue={client?.phone}
              ref={register}
            />
            <label className='text-xs font-medium text-gray-500 uppercase tracking-wider'>
              Avatar URL
            </label>
            <input
              className='mb-1 border-b border-solid border-gray-300'
              name='avatarUrl'
              type='text'
              defaultValue={client?.avatarUrl}
              ref={register}
            />
            <input
              className='rounded-b cursor-pointer text-lg font-medium bg-gray-300 text-gray-900 border-gray-300 border-2 border-solid hover:border-black'
              type='submit'
            />
          </form>
        </div>
      </div>
    </Portal>
  );
}
