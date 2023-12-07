import { useForm } from 'react-hook-form'
import { useState } from 'react'
import DataGrid from 'react-data-grid'

import 'bootstrap/dist/css/bootstrap.css'
import 'react-data-grid/lib/styles.css'
import './App.css'

import Button from 'react-bootstrap/Button'
import CloseButton from 'react-bootstrap/CloseButton'

function App() {
  interface Product {
    id: number,
    title: string,
    source: string,
    created: string,
    delete: React.JSX.Element,
  }

  const [productCount, setProductCount] = useState<number>(0)
  const [rows, setRows] = useState<Product[]>([])
  const { formState, handleSubmit, register } = useForm<Product>()
  const sourceValues: string[] = [
    'ChatGPT',
    'Google',
    'YouTube',
  ]

  const columns = [
    { key: 'id', name: 'Product ID', width: 90 },
    { key: 'title', name: 'Product Title' },
    { key: 'source', name: 'Source', width: 100},
    { key: 'created', name: 'Created' },
    { key: 'delete', name: '', width: 60 },
  ]

  const handleDeleteClick = (e:any) => {
    const id = e.target.getAttribute('data-id')
    const newRows = rows
    const clickedIndex = newRows.findIndex((row) => row.id === id)
    
    newRows.splice(clickedIndex, 1)
    setRows(newRows)
  }

  const handleFormSubmit = (data:Product) => {
    const created = new Date().toLocaleString()
    const id = productCount + 1
    const newRow = { ...data, id, created, delete: renderDeleteButton(id) }

    const newRows = rows
    newRows.unshift(newRow) // Show rows in time descending order

    setProductCount(id) // Update count for the next Product ID
    setRows(newRows) // Update state to add the new rpw
  }

  const renderDeleteButton = (id:number) =>
    <CloseButton data-id={id} onClick={handleDeleteClick} title="Delete this product" />

  return (
    <>
      <h1>Product List</h1>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <div className="form-group">
          <label htmlFor="title">Product Title</label>
          <input className="form-control" id="title" {...register('title', { required: true })} />
        </div>
        <div className="form-group">
          <label htmlFor="source">Source</label>
          <select className="form-select" id="source" {...register('source')}>
            { sourceValues.map((v) => <option key={v}>{v}</option>) }
          </select>
        </div>
        <div className="form-actions">
          <Button disabled={!formState.isValid} type="submit">Create Product</Button>
        </div>
      </form>
      <DataGrid columns={columns} rows={rows} />
    </>
  )
}

export default App
