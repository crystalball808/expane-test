import React from 'react';
import { useForm } from 'react-hook-form' 

type Props = {
    setIsModalOpen: Function
}

export default function ModalAddClient({ setIsModalOpen }: Props) {
    const { register, handleSubmit } = useForm()

    const addClient = (data: any) => {
        console.log(data);
        setIsModalOpen(false)
    }

    const closeModal = (event: React.FormEvent) => {
        event.preventDefault();
        setIsModalOpen(false)
    }

    return (
        <>
            <div className="flex items-center justify-center w-full h-full fixed top-0 left-0 bg-black bg-opacity-30">
                <div>
                    <button onClick={closeModal}>Close</button>
                    <form onSubmit={handleSubmit(addClient)}>
                        <label>First name</label>
                        <input name="firstName" type="text" ref={register({ required: true })} />
                        <label>Last name</label>
                        <input name="lastName" type="text" ref={register({ required: true })} />
                        <label>Phone</label>
                        <input name="Phone" type="text" ref={register} />
                        <label>Avatar URL</label>
                        <input name="avatarUrl" type="text" ref={register} />
                        <input type="submit" />
                    </form>
                </div>
            </div>
        </>
    )
}