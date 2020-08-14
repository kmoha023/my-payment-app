import React, { useState, useEffect } from 'react'

import { Table, Button } from 'antd';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { fetchCall2AndCall3 } from '../configSlice';


function MyTable(props) {
  // React hooks
  let [tableColumns, setTableColumns] = useState(null);
  let [tableRows, setTableRows] = useState(null);

  // React - Redux
      const { appConfig, invoices, vendors }   =  useSelector(state => state.configSlice, shallowEqual );
      const dispatch = useDispatch()

    const onButtonClicked = (row) => {
      if(props.onOpenModalClicked){
        props.onOpenModalClicked(row)
      }
    }

    const buildTableData = () => {
      return new Promise((resolve, reject) => {
        // Build columns
          if(appConfig.tableConfig.columns){
            let columns = appConfig.tableConfig.columns.map(col => {
              if(col.fieldName === 'pay') {
                return {
                  title: col.displayName,
                  dataIndex: col.fieldName,
                  key: col.fieldName,
                  render: (_, row) => {
                   return <Button disabled={!appConfig.tableConfig.paymentEnabled} type="primary" onClick={ () => onButtonClicked(row)}>Pay</Button>
                  }
                }
              } else {
                return {
                  title: col.displayName,
                  dataIndex: col.fieldName,
                  key: col.fieldName,
                }
              }
               
            });
            setTableColumns(columns)
          }

        // Build table rows
          if(invoices && vendors){
            let currentVendor;
            let data = invoices.map((invoice, index) => {
              if(appConfig.tableConfig.columns){
                 currentVendor = vendors.filter(vendor => vendor.vendorId === invoice.vendorId );
              }

               return {
                key: index,
                vendorId: invoice.invoiceId,
                quantity: invoice.quantity,
                amountBal: invoice.amountBal,
                amountDue: invoice.amountDue,
                creditBal: currentVendor && currentVendor.length > 0 ? currentVendor[0].creditBal : 0,
               }
            });
            setTableRows(data)
          }
          
      })
    } 

useEffect(() => {
    if( !vendors && !invoices && appConfig && appConfig.dataEndPoints && appConfig.dataEndPoints.call2 && appConfig.dataEndPoints.call2.API && appConfig.dataEndPoints.call3.API){
        dispatch(fetchCall2AndCall3({call2:appConfig.dataEndPoints.call2, call3: appConfig.dataEndPoints.call3 }))
    }
  }, [appConfig])
      
  useEffect(() => {
    if( invoices && vendors ) {
        buildTableData()
          .then(res => {
            // console.log('====================================');
            console.log('BUILT TABLE');
            // console.log('====================================');
          })
          .catch(err => console.log('ERR buildingTable'))
    }
  }, [invoices, vendors])

    return (
            <Table dataSource={tableRows}  columns={tableColumns}/>
    )
}

export default React.memo(MyTable)
