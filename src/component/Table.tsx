import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { request, gql } from 'graphql-request';
import ModalAddClient from './ModalAddClient';
import { END_POINT } from '../utilities/endPoint'
import { ClientType } from '../utilities/types'

export default function Table() {
  const [isModalAddClientOpen, setIsModalAddClientOpen] = useState<Boolean>(false);
  const [isModalUpdateClientOpen, setIsModalUpdateClientOpen] = useState<Boolean>(false);
  const [currentlyUpdatingClient, setCurrentlyUpdatingClient] = useState<ClientType | null>(null);

  const editClient = (client: ClientType) => {
    setCurrentlyUpdatingClient(client);
    setIsModalUpdateClientOpen(true)
  }

  const getClientsQuery = gql`
    {
      getClients {
        id
        firstName
        lastName
        phone
        avatarUrl
      }
    }
  `;

  function useClients() {
    return useQuery('clients', async () => {
      const data = await request(END_POINT, getClientsQuery);
      return data;
    });
  }

  const { status, data } = useClients();

  

  return (
    <>
      <button className='min-w-full' onClick={() => {
        setIsModalAddClientOpen(true);
      }}>Add client</button>
      {status === 'loading' ? (
        'Loading'
      ) : status === 'error' ? (
        <span>Error</span>
      ) : (
        <table className='min-w-full m-0 divide-y divide-gray-200'>
          <thead className='bg-gray-50'>
            <tr>
              <th className='max-w-full px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
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
                  <div className='flex items-center p-0.5'>
                    <div className='flex-shrink-0 h-12 w-12'>
                      <img
                        className='h-12 w-12 rounded-full'
                        src={client.avatarUrl}
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
                  <button className='text-indigo-600 hover:text-indigo-900' onClick={()=>{editClient(client)}}>
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      { isModalAddClientOpen ? (<ModalAddClient setIsModalOpen={setIsModalAddClientOpen} />) : (<></>)}
    </>
  );
}
