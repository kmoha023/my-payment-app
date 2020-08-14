import React from 'react';
import Modal from 'antd/lib/modal/Modal';

function modal(props) {
    return (
        <Modal
          { ...props }
        >
            {props.children}
        </Modal>
    )
}

export default modal;
        