import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';

const PaymentForm = ({ onChange, fields, amountDue, onCancelClicked, onPaymentClicked }) => {

    const [form] = Form.useForm();

    const onReset = () => {

    }

    const onFinish = () => {

    }


    const onFill = () => {

    }

    const clickedPayment = async () => {
        try {
          const values = await form.validateFields();
          console.log('Success:', values);
          onPaymentClicked(values.cardNumber)
        } catch (errorInfo) {
          console.log('Failed:', errorInfo);
        }
};

    const layout = {
        labelCol: {
            span: 8,
        },
        wrapperCol: {
            span: 16,
        },
    };

    const tailLayout = {
        wrapperCol: {
            offset: 8,
            span: 16,
        },
    };



    return <Form {...layout} form={form} name="control-hooks" 
    fields={fields}
    onFieldsChange={(changedFields, allFields) => {
      onChange(allFields);
    }}    
    onFinish={onFinish}>
        <Form.Item
            name="amountDue"
            label="Amount Due"
        >
            <div>{amountDue}</div>
        </Form.Item>
        <Form.Item
            name="cardNumber"
            label="Card Number"
            rules={[
                {
                    required: true,
                    message: 'Card number is required!',
                },
            ]}
        >
            <Input />
        </Form.Item>
        <Form.Item>
            <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="button" onClick={clickedPayment}>
                    Apply Payment
            </Button>
                <Button htmlType="button" onClick={onCancelClicked}>
                    Cancel
            </Button>
            </Form.Item>
        </Form.Item>
    </Form>
};

export default React.memo(PaymentForm)