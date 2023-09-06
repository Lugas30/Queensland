import { Link } from "react-router-dom";
import "/src/assets/global.css";

export const ProductGrid = ({ products }) => {
  return (
    <div className="grid grid-cols-4 gap-2 p-2">
      {products.map((product) => (
        <div key={product.id} className="pb-4">
          
          <Link to={`/product/${product.id}`}>
            <img src={product.gambar} alt={product.name} />
            <div className="text-sm">
              <p>{product.prod_name}</p>
              {product.harga_disc !== 0 ? (
                <>
                  <span className="opacity-30 line-through pr-2">
                    IDR {product.harga}
                  </span>
                  <span>IDR {product.harga_disc}</span>
                </>
              ) : (
                <span>IDR {product.harga}</span>
              )}
            </div>
          </Link>

        </div>
      ))}
    </div>
  );
};