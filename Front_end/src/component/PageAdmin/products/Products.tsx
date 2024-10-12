import { useEffect, useState } from 'react';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ProductsDetails from './ProductsDetails';
import { Product } from "../../../interface/interface.ts";
import urls from "../../../services/urls.ts";
import { Pagination, usePagination } from '../../../lib/index.ts';


const parseDate = (dateStr) => {
  const [datePart, timePart] = dateStr.split(' '); // Split date and time
  const [day, month, year] = datePart.split('/'); // Split day, month, year
  const [hours, minutes] = timePart.split(':'); // Split hours and minutes

  // Create a valid Date object
  return new Date(`${year}-${month}-${day}T${hours}:${minutes}:00`);
};

const Products = () => {
  const [showDetails, setShowDetails] = useState('main');
  const [products, setProducts] = useState<Product[]>([]);
  const [productid, setProductid] = useState<number>(0);
  const [items, setItems] = useState<Product[]>([]);
  const [searchText, setSearchText] = useState('');
  const { currentPage, paginatedData, setCurrentPage, pageSize } = usePagination(products);


  const getProduct = async () => {
    try {
      const response = await urls.getProducts();
      const sortedData = response.data.sort((a, b) => {
        const dateA = parseDate(a.daTe_creation); // Assuming your date field is named 'date'
        const dateB = parseDate(b.daTe_creation);
        return dateB.getTime() - dateA.getTime(); // Sort in descending order
      });

      const productsWithSeller = await Promise.all(
        sortedData.map(async (product) => {
          const sellerName = await urls.getSellerById(product.idseller);
          return {
            ...product,
            sellerName: sellerName.data.fullName,  // Add seller's full name to the product
          };
        })
      );

      setProducts(productsWithSeller);
      setItems(productsWithSeller);
    } catch (err) {
      console.log("failed to fetch products", err);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  const handleButtonClick = (page: string, productId: number | undefined) => {
    setProductid(productId !== undefined ? productId : 0);
    setShowDetails(page);
  };

  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchText(value);

    if (value.trim() === '') {
      setProducts(items);
    } else {
      const filteredProduct = items.filter((product) =>
        (product.name && product.name.toLowerCase().includes(value)) ||
        (product.sellerName && product.sellerName.toLowerCase().includes(value))
      );
      setProducts(filteredProduct);
    }
  };

  const handleProductDeletion = (id: number) => {
    // Update product list after deletion
    setProducts((prevProducts) => prevProducts.filter((prod) => prod.idProduct !== id));
  };

  return (
    <>
      {showDetails === 'main' ? (
        <div className="relative min-h-screen grid">
          <div className="overflow-auto sm:rounded-lg ml-16">
            <div className="flex justify-between">
              <div className="relative w-full max-w-96 mt-3 mb-5">
                <h1 className="font-semibold text-3xl">Products</h1>
              </div>
              <div className="relative w-full max-w-96 mt-3 mb-5">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg aria-hidden="true" className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                  </svg>
                </div>
                <input
                  type="text"
                  id="simple-search"
                  value={searchText} // Control search input
                  onChange={handleSearch}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5"
                  placeholder="Search"
                  required
                />
              </div>
            </div>
            <table className="w-full text-sm text-left text-gray-800 md:max-lg:w-[769px] max-[600px]:w-[769px]">
              <thead className="text-xs text-black uppercase bg-green-300">
                <tr>
                  <th scope="col" className="px-6 py-3">Name of owner</th>
                  <th scope="col" className="px-6 py-3">Name of product</th>
                  <th scope="col" className="px-6 py-3">Price</th>
                  <th scope="col" className="px-6 py-3">Date</th>
                  <th scope="col" className="px-6 py-3">Quantity</th>
                  <th scope="col" className="px-6 py-3">Category</th>
                  <th scope="col" className="px-6 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {paginatedData.map((product) => (
                  <tr key={product.idProduct} className="bg-white border-b">
                    <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap">{product.sellerName}</th>
                    <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap">{product.name}</th>
                    <td className="px-6 py-4">${product.price}</td>
                    <td className="px-6 py-4">{product.daTe_creation}</td>
                    <td className="px-6 py-4">{product.stock}</td>
                    <td className="px-6 py-4">{product.idcategory}</td>
                    <td className="px-6 py-4 text-black">
                      <button onClick={() => handleButtonClick('details', product.idProduct)}>
                        <MoreHorizIcon />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {products.length > 10 && (
            <Pagination<Product>
              items={products}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={setCurrentPage}
            />
            )}
          </div>
        </div>
      ) : showDetails === 'details' ? (
        <div className="relative min-h-screen">
          <ProductsDetails setShowDetails={setShowDetails} productid={productid} onDeleteProduct={handleProductDeletion}  />
        </div>
      ) : null}
    </>
  );
};

export default Products;
