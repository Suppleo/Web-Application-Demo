import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { useState, useEffect } from "react";
import { CATEGORY_BY_ID, UPDATE_CATEGORY } from "../graphql/categories";
import { PRODUCTS_BY_CATEGORY, DELETE_PRODUCT, CREATE_PRODUCT } from "../graphql/products";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from "@/components/ui/card";
import { ArrowLeft, Save, Plus, Trash2, DollarSign } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";

const Category = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [categoryName, setCategoryName] = useState("");
  const [newProductName, setNewProductName] = useState("");
  const [newProductPrice, setNewProductPrice] = useState("");

  const { loading: categoryLoading, error: categoryError, data: categoryData } = useQuery(CATEGORY_BY_ID, {
    variables: { id },
  });

  const { loading: productsLoading, error: productsError, data: productsData, refetch: refetchProducts } = useQuery(PRODUCTS_BY_CATEGORY, {
    variables: { id },
  });

  const [updateCategory] = useMutation(UPDATE_CATEGORY);
  const [createProduct] = useMutation(CREATE_PRODUCT);
  const [deleteProduct] = useMutation(DELETE_PRODUCT);

  useEffect(() => {
    if (categoryData?.category) {
      setCategoryName(categoryData.category.name);
    }
  }, [categoryData]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    await updateCategory({
      variables: {
        id,
        input: { name: categoryName },
      },
    });
    navigate("/");
  };

  const handleCreateProduct = async (e) => {
    e.preventDefault();
    await createProduct({
      variables: {
        input: {
          name: newProductName,
          price: parseInt(newProductPrice, 10),
          categoryId: id,
        },
      },
    });
    setNewProductName("");
    setNewProductPrice("");
    refetchProducts();
  };

  const handleDeleteProduct = async (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      await deleteProduct({
        variables: { id: productId },
      });
      refetchProducts();
    }
  };

  if (categoryLoading || productsLoading) 
    return <div className="flex justify-center items-center h-screen"><p className="text-2xl">Loading...</p></div>;
  
  if (categoryError) 
    return <div className="flex justify-center items-center h-screen"><p className="text-red-500">Error: {categoryError.message}</p></div>;
  
  if (productsError) 
    return <div className="flex justify-center items-center h-screen"><p className="text-red-500">Error: {productsError.message}</p></div>;

  const products = productsData?.category?.products || [];

  return (
    <div className="container mx-auto py-8 max-w-4xl">
      <Card className="shadow-sm mb-8">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-primary">
            Edit Category
          </CardTitle>
        </CardHeader>
        <form onSubmit={handleUpdate}>
          <CardContent className="space-y-4">
            <Input
              type="text"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              required
              placeholder="Category name"
            />
          </CardContent>
          <CardFooter className="flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate("/")}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Categories
            </Button>
            <Button 
              type="submit"
              className="flex items-center gap-2"
            >
              <Save className="h-4 w-4" />
              Update Category
            </Button>
          </CardFooter>
        </form>
      </Card>

      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-primary">
            Products in {categoryName}
          </CardTitle>
          <CardDescription>
            Manage products for this category
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleCreateProduct} className="mb-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="productName">Product Name</Label>
                <Input
                  id="productName"
                  type="text"
                  value={newProductName}
                  onChange={(e) => setNewProductName(e.target.value)}
                  required
                  placeholder="Enter product name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="productPrice">Price</Label>
                <Input
                  id="productPrice"
                  type="number"
                  value={newProductPrice}
                  onChange={(e) => setNewProductPrice(e.target.value)}
                  required
                  placeholder="Enter price"
                  min="0"
                />
              </div>
            </div>
            <Button type="submit" className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Product
            </Button>
          </form>

          <Separator className="my-4" />

          {products.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((product) => (
                  <TableRow key={product._id}>
                    <TableCell className="font-medium">{product.name}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <DollarSign className="h-4 w-4 mr-1 text-gray-500" />
                        {product.price}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDeleteProduct(product._id)}
                        className="flex items-center gap-1"
                      >
                        <Trash2 className="h-4 w-4" />
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-8 text-gray-500">
              No products found for this category. Add your first product above.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Category;
