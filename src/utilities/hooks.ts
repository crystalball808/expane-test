import { END_POINT } from './endPoint';
import { gql, request } from 'graphql-request';
import { useQuery, useMutation, useQueryClient } from 'react-query';

export function useAddClient() {
  const queryClient = useQueryClient();
  const addClientMutation = gql`
    mutation addClient(
      $firstName: String!
      $lastName: String!
      $phone: String
      $avatarUrl: String!
    ) {
      addClient(
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
  return useMutation(
    (variables) => request(END_POINT, addClientMutation, variables),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('clients');
      },
    }
  );
}

export function useUpdateClient() {
  const queryClient = useQueryClient();
  const updateClientMutation = gql`
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
  return useMutation(
    (variables) => request(END_POINT, updateClientMutation, variables),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('clients');
      },
    }
  );
}

export function useClients() {
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
  return useQuery('clients', async () => {
    const data = await request(END_POINT, getClientsQuery);
    return data;
  });
}
