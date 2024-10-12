import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Category } from "../../interface/interface.ts";
import urls from "../../services/urls.ts";
import { Loading } from '../../lib/index.ts';


const Categorie: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const getCategory = async () => {
    try {
      const response = await urls.getCategories();
      setCategories(response.data);
      setIsLoading(false);
    } catch (error) {
      setError("Failed to load data");
      console.error("Failed to load data", error);
    }
  };

  useEffect(() => {
    getCategory();
  }, []);

  const handleCategoryClick = (categoryId: number | undefined) => {
    if (categoryId !== undefined) {
      navigate(`/shop?category=${categoryId}`);
    }
  };

  if (isLoading) {
    return <Loading />; 
  }

  return (
    <>
      <div>
        {error && <div className="text-red-500 text-center mb-4">{error}</div>}

        <article className="mt-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 pl-3 pr-3 gap-5 flex-wrap justify-center pb-48">
          {categories.map((item, index) => (
              <div key={index} className="flex flex-col">
                <button
                    onClick={() => handleCategoryClick(item.id)}
                    className="bg-black group/item w-full h-full relative isolate flex flex-col justify-end px-8 p-52 max-w-sm mx-auto mt-8"
                    aria-label={`View category ${item.pub}`}
                >
                  <div className="hover:opacity-60">
                    <img
                        src={item.image}
                        loading="lazy"
                        sizes="1200px"
                        width={1200}
                        height={1200}
                        alt={item.pub}
                        className="absolute inset-0 h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40"></div>
                    <div className="absolute inset-0 flex items-center justify-center group-hover/item:invisible">
                      <h3 className="z-10 text-3xl font-bold text-white">{item.name}</h3>
                    </div>
                  </div>
                </button>
              </div>
          ))}
        </article>
      </div>
    </>
  );
};

export default Categorie;
