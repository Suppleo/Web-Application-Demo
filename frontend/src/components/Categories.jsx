import { useQuery, useMutation } from '@apollo/client'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  CATEGORIES_QUERY,
  CREATE_CATEGORY,
  DELETE_CATEGORY,
} from '../graphql/categories'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { PlusCircle, Pencil, Trash2 } from "lucide-react"

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

  if (loading) return <div className="flex justify-center items-center h-screen"><p className="text-2xl">Loading...</p></div>
  if (error) return <div className="flex justify-center items-center h-screen"><p className="text-red-500">Error: {error.message}</p></div>

  return (
    <div className="container mx-auto py-8 max-w-3xl">
      <h1 className="text-4xl font-bold mb-8 text-primary">
        Categories
      </h1>

      <form onSubmit={handleCreate} className="flex gap-4 mb-8">
        <Input
          type="text"
          value={newCategoryName}
          onChange={(e) => setNewCategoryName(e.target.value)}
          placeholder="New category name"
          required
          className="flex-1"
        />
        <Button type="submit" className="flex items-center gap-2">
          <PlusCircle className="h-4 w-4" />
          Add Category
        </Button>
      </form>

      <div className="space-y-3">
        {data.categories.map((category) => (
          <Card key={category._id} className="shadow-sm">
            <CardContent className="flex items-center justify-between p-4">
              <span className="text-lg font-medium">{category.name}</span>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" asChild>
                  <Link to={`/category/${category._id}`} className="flex items-center gap-1">
                    <Pencil className="h-4 w-4" />
                    Edit
                  </Link>
                </Button>
                <Button 
                  variant="destructive" 
                  size="sm" 
                  onClick={() => handleDelete(category._id)}
                  className="flex items-center gap-1"
                >
                  <Trash2 className="h-4 w-4" />
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default Categories
