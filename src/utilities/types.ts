export type NewClientType = {
  firstName: string;
  lastName: string;
  phone: string;
  avatarUrl: string;
}

export type ClientType = NewClientType & {
    id: string;
};

export type ModalUpdateClientProps = {
    client: ClientType | null,
    setIsModalOpen: React.Dispatch<React.SetStateAction<Boolean>>,
    setCurrentUpdatingClient: React.Dispatch<React.SetStateAction<ClientType | null>>
}