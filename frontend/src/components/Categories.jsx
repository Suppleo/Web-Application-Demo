import { useQuery, useMutation } from '@apollo/client'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  CATEGORIES_QUERY,
  CREATE_CATEGORY,
  DELETE_CATEGORY,
} from '../graphql/categories'

const Categories = () => {
  const [newCategoryName, setNewCategoryName] = useState('')
  const { loading, error, data } = useQuery(CATEGORIES_QUERY)

  const [createCategory] = useMutation(CREATE_CATEGORY, {
    refetchQueries: [{ query: CATEGORIES_QUERY }],
  })

  const [deleteCategory] = useMutation(DELETE_CATEGORY, {
    refetchQueries: [{ query: CATEGORIES_QUERY }],
  })

  const handleCreate = async (e) => {
    e.preventDefault()
    await createCategory({
      variables: {
        input: { name: newCategoryName },
      },
    })
    setNewCategoryName('')
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      await deleteCategory({
        variables: { id },
      })
    }
  }

  if (loading) return <p className='text-2xl'>Loading...</p>
  if (error) return <p className='text-red-500'>Error: {error.message}</p>

  return (
    <div className='categories-container min-h-screen bg-[#242424] p-8 rounded-xl'>
      <h1 className='text-6xl font-bold pb-2 mb-8 bg-gradient-to-r from-[#646cff] to-[#535bf2] bg-clip-text text-transparent'>
        Categories
      </h1>

      <form onSubmit={handleCreate} className='flex gap-4 mb-8'>
        <input
          type='text'
          value={newCategoryName}
          onChange={(e) => setNewCategoryName(e.target.value)}
          placeholder='New category name'
          required
          className='flex-1 bg-[#1a1a1a] text-white border border-[#646cff] rounded-lg px-4 py-2 focus:outline-none focus:border-[#535bf2]'
        />
        <button
          type='submit'
          className='bg-[#646cff] hover:bg-[#535bf2] text-white'
        >
          Add Category
        </button>
      </form>

      <div className='space-y-4'>
        {data.categories.map((category) => (
          <div
            key={category._id}
            className='flex items-center justify-between p-4 bg-[#1a1a1a] rounded-lg border border-transparent hover:border-[#646cff] transition-all'
          >
            <span className='text-xl text-white'>{category.name}</span>
            <div className='flex items-center gap-4'>
              <Link
                to={`/category/${category._id}`}
                className='text-[#646cff] hover:text-[#535bf2] transition-colors'
              >
                Edit
              </Link>
              <button
                onClick={() => handleDelete(category._id)}
                className='text-red-400 hover:text-red-300 transition-colors'
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Categories
