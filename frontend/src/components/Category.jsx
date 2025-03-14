import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { useState, useEffect } from "react";
import { CATEGORY_BY_ID, UPDATE_CATEGORY } from "../graphql/categories";

const Category = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [categoryName, setCategoryName] = useState("");

  const { loading, error, data } = useQuery(CATEGORY_BY_ID, {
    variables: { id },
  });

  const [updateCategory] = useMutation(UPDATE_CATEGORY);

  useEffect(() => {
    if (data?.category) {
      setCategoryName(data.category.name);
    }
  }, [data]);

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

  if (loading) return <p className="text-2xl">Loading...</p>;
  if (error) return <p className="text-red-500">Error: {error.message}</p>;

  return (
    <div className="category-edit bg-[#242424] p-8 rounded-xl">
      <h2 className="text-3xl font-bold pb-2 mb-8 bg-gradient-to-r from-[#646cff] to-[#535bf2] bg-clip-text text-transparent">
        Edit Category
      </h2>
      <form onSubmit={handleUpdate} className="flex flex-col gap-6">
        <input
          type="text"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          required
          className="bg-[#1a1a1a] text-white border border-[#646cff] rounded-lg px-4 py-2 focus:outline-none focus:border-[#535bf2]"
        />
        <div className="flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="bg-[#1a1a1a] text-white hover:border-[#646cff]"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-[#646cff] hover:bg-[#535bf2] text-white"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default Category;
