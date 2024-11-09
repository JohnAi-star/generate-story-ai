import React, { useEffect } from 'react'
import {  Modal,   ModalContent,   
    ModalHeader,   ModalBody,   
    ModalFooter,
    useDisclosure} from "@nextui-org/modal";
import Image from 'next/image';

function CustomLoader({isLoading}:any) {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    useEffect(() => {
        onOpen();
    },[])
  return (
    <div>
    {isLoading&& <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalBody className='p-10 flex w-full items-center justify-center'>
                <Image src={'/loader.gif'} alt='loader' width={300} height={300} 
                className='w-[200px] h-[200px]' />
                <h2 className='font-bold text-xl text-primary-600 text-center'>Please Hold On... Story is generating...</h2>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>}
      </div>
  )
}

export default CustomLoader