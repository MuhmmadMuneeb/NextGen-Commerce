import { Card, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";

function ShoppingProductTile({ product, handleGetProductDetails }) {
  return (
    <Card
      onClick={() => handleGetProductDetails(product._id)}
      className="cursor-pointer"
    >
      <CardContent>
        <img src={product.image} alt={product.title} />
        <h2>{product.title}</h2>
        <p>${product.price}</p>
      </CardContent>

      <CardFooter>
        <Button
          onClick={(e) => {
            e.stopPropagation(); // prevent dialog opening
            alert("Added to cart");
          }}
        >
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}

export default ShoppingProductTile;