import React, { useState } from 'react';
import ModalClient from './ModalClient';
import { ClientType } from '../utilities/types';
import { useClients } from '../utilities/hooks'

export default function Table() {
  const [isModalClientOpen, setIsModalClientOpen] = useState<Boolean>(false);
  const [
    currentUpdatingClient,
    setCurrentUpdatingClient,
  ] = useState<ClientType | null>(null);

  const editClient = (client: ClientType) => {
    setCurrentUpdatingClient(client);
    setIsModalClientOpen(true);
  };

  const { status, data } = useClients();

  return (
    <div>
      <div className='fixed left-0 top-0 w-full bg-white'>
        <button
          className='px-3 cursor-pointer text-lg font-medium bg-indigo-500 text-white rounded border-indigo-500 border-2 border-solid hover:border-black'
          onClick={() => {
            setIsModalClientOpen(true);
          }}
        >
          Add client
        </button>
      </div>
      {status === 'loading' ? (
        <p className='mt-8 pl-3 text-3xl'>loading...</p>
      ) : status === 'error' ? (
        <span>Error</span>
      ) : (
        <table className='m-0 mt-8 divide-y divide-gray-200 border-gray-400 border-2 border-solid overflow-auto'>
          <thead className='bg-gray-50'>
            <tr>
              <th className='max-w-full px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                First name
              </th>
              <th className='max-w-full px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                Last name
              </th>
              <th className='max-w-full px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                Phone number
              </th>
              <th scope='col' className='relative px-6 py-3'>
                <span className='sr-only'>Edit</span>
              </th>
            </tr>
          </thead>
          <tbody className='bg-white divide-y divide-gray-200'>
            {data.getClients.map((client: ClientType) => (
              <tr key={client.id}>
                <td>
                  <div className='flex items-center py-1 pl-4'>
                    <div className='flex-shrink-0 h-12 w-12'>
                      <img
                        className='h-12 w-12 rounded-full'
                        src={
                          client.avatarUrl ||
                          'https://i.pinimg.com/236x/1d/16/51/1d1651093718c02665b19a7ae50db6aa.jpg'
                        }
                        alt='avatar'
                      />
                    </div>
                    <div className='ml-4'>
                      <div className='text-lg font-medium text-gray-900'>
                        {client.firstName}
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  <div className='mx-4'>
                    <div className='text-lg font-medium text-gray-900'>
                      {client.lastName}
                    </div>
                  </div>
                </td>
                <td>
                  <div className='mx-4'>
                    <div className='text-lg font-medium text-gray-900'>
                      {client.phone}
                    </div>
                  </div>
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-right text-sm font-medium'>
                  <button
                    className='text-indigo-600 hover:text-indigo-900'
                    onClick={() => {
                      editClient(client);
                    }}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {isModalClientOpen ? (
        <ModalClient
          client={currentUpdatingClient}
          setIsModalOpen={setIsModalClientOpen}
          setCurrentUpdatingClient={setCurrentUpdatingClient}
        />
      ) : (
        <></>
      )}
    </div>
  );
}
