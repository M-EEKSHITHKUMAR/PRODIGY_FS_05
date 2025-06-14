import { useDisclosure } from '@mantine/hooks';
import { Modal, Button } from '@mantine/core';
import PostShare from '../PostShare/PostShare';

function Sharemodal({modalOpened, setModalOpened}) {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Modal
        
        
        title="Share something"
        size='55%'
        overlayProps={{
          backgroundOpacity: 0.55,
          blur: 3,
          
        }}
        opened = {modalOpened}
        onClose={() => setModalOpened(false)}

      >
        <PostShare/>
      </Modal>

      
    </>
  );
}

export default Sharemodal;