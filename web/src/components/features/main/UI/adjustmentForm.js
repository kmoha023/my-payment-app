import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';

const AdjustmentForm = ({ onChange, fields, amountDue, creditBal, onCancelClicked, onAdjustPaymentClicked }) => {

    const [form] = Form.useForm();

    const onReset = () => {

    }

    const onFinish = () => {

    }
    
    const clickedAppy = async () => {
            try {
              const values = await form.validateFields();
              console.log('Success:', values);
              let balanceDue = values.amountDue
              onAdjustPaymentClicked(values.amountDue)
            } catch (errorInfo) {
              console.log('Failed:', errorInfo);
            }
    };

    const onFill = () => {

    }

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
            name="creditBal"
            label="Credit Balance"
        >
            <div>{creditBal}</div>
        </Form.Item>
        <Form.Item
            name="amountDue"
            label="Amount Due"
            rules={[
                {
                    required: true,
                    message: 'Amount is required!',
                }
            ]}
        >
            <Input />
        </Form.Item>
        <Form.Item>
            <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="button" onClick={clickedAppy}>
                    Apply Credit
            </Button>
                <Button htmlType="button" onClick={onCancelClicked}>
                    Cancel
            </Button>
            </Form.Item>
        </Form.Item>
    </Form>
};

export default React.memo(AdjustmentForm)