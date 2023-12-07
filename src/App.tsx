import { useForm } from 'react-hook-form'

import 'bootstrap/dist/css/bootstrap.css'
import './App.css'

import Button from 'react-bootstrap/Button'

function App() {
  interface Product {
    title: string,
    source: string,
    created: string,
  }

  const { formState, handleSubmit, register } = useForm<Product>()
  const sourceValues: string[] = [
    'ChatGPT',
    'Google',
    'YouTube',
  ]

  const handleFormSubmit = (data:Product) => {
    console.log('data', data)
  }

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
    </>
  )
}

export default App
