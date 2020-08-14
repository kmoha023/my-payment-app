import React, { useState } from 'react';
import { produce } from 'immer';
import { useSelector, useDispatch } from 'react-redux';

import './App.less';
import Main from './components/features/main/main';
import Modal from './components/features/main/UI/modal';
import Form from 'antd/lib/form/Form';
import hoc from './components/features/main/hoc/hoc';
import PaymentForm from './components/features/main/UI/paymentForm';
import AdjustmentForm from './components/features/main/UI/adjustmentForm';
import { submitPaymentAsync } from './components/features/main/configSlice';

function App() {
  const [fields, setFields] = useState([
    {
      name: ['cardNumber'],
      value: '',
    },
  ]);

  const [adjustmentFields, setAdjustmentFields] = useState([
    {
      name: ['amountDue'],
      value: '',
    },
  ]);

  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [modalTitle, setModalTitle] = useState('');
  const [rowSelected, setRowSelected] = useState(null);


  const { appConfig } = useSelector(state => state.configSlice)
  const dispatch = useDispatch()

  const onPaymentClicked = (cardNumber) => {
    console.log('====================================');
    console.log('PAYING ', cardNumber, fields);
    console.log('====================================');
  
    dispatch(submitPaymentAsync({ paymentPost: appConfig.dataEndPoints.paymentPost }))
    
    setModalVisible(false)
  }

  const onAdjustPaymentClicked = (amountPaid) => {
    console.log('====================================');
    console.log('PAYING ', amountPaid, rowSelected);
    console.log('====================================');
  
    dispatch(submitPaymentAsync({ paymentPost: appConfig.dataEndPoints.creditPost }))

      setModalVisible(false)
    
  }

  const onCancelClicked = () => {
    setModalVisible(false)
  }

  const openModal = (row) => {
    let BuiltModalTitle = appConfig && appConfig.tableConfig && appConfig.tableConfig.adjustEnabled && row.creditBal > 0 ? 'Credit Adjustment' : 'Make Payment';
      setAdjustmentFields(produce(adjustmentFields, draft => {
        draft[0].value = row.amountDue;
      }))
    
    let builtModalContent = appConfig && appConfig.tableConfig && appConfig.tableConfig.adjustEnabled && row.creditBal > 0 ?
      
      <AdjustmentForm 
        amountDue={row.amountDue}
        creditBal={row.creditBal}
        onAdjustPaymentClicked={(amountPaid) => onAdjustPaymentClicked(amountPaid)}
        onCancelClicked={onCancelClicked}
        fields={adjustmentFields}
        onChange={newFields => {setAdjustmentFields(newFields)}}
      />
      :
      <PaymentForm
        amountDue={row.amountDue}
        onPaymentClicked={(cardNumber) => onPaymentClicked(cardNumber)}
        onCancelClicked={onCancelClicked}
        fields={fields}
        onChange={newFields => {setFields(newFields)}}
      />

    setRowSelected(row)
    setModalTitle(BuiltModalTitle)
    setModalContent(builtModalContent)
    setModalVisible(true)
  }

  return (
    <React.Fragment>
      <Modal
        title={modalTitle}
        visible={modalVisible}
        footer={null}
        onCancel={onCancelClicked}
      >
        {modalContent}
      </Modal>
      <Main
        onOpenModalClicked={(row) => openModal(row)}
      />
    </React.Fragment>
  );
}

export default App;
