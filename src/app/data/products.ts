export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  discountPrice: number;
  fabric: string;
  sizes: string[];
  colors: string[];
  image: string;
  isFeatured: boolean;
  isNewArrival: boolean;
}

export const products: Product[] = [
  {
    id: "P001",
    name: "Gold Chiffon Mirror Work Top",
    category: "Festive Wear",
    price: 2499,
    discountPrice: 1999,
    fabric: "Chiffon",
    sizes: ["S", "M", "L"],
    colors: ["Gold", "Beige"],
    image: "https://images.unsplash.com/photo-1756483509254-3cc48a5a15b2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBldGhuaWMlMjBmZXN0aXZlJTIwZmFzaGlvbiUyMG1vZGVsfGVufDF8fHx8MTc3Mzg5NzI5M3ww&ixlib=rb-4.1.0&q=80&w=1080",
    isFeatured: true,
    isNewArrival: true
  },
  {
    id: "P002",
    name: "Beige Mirror Embellished Shorts",
    category: "Summer Wear",
    price: 1999,
    discountPrice: 1599,
    fabric: "Cotton Blend",
    sizes: ["S", "M"],
    colors: ["Beige"],
    image: "https://images.unsplash.com/photo-1765958317162-1ce88e48ed0d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdW1tZXIlMjBldGhuaWMlMjBkcmVzcyUyMGJlaWdlfGVufDF8fHx8MTc3Mzg5NzI5NXww&ixlib=rb-4.1.0&q=80&w=1080",
    isFeatured: false,
    isNewArrival: true
  },
  {
    id: "P003",
    name: "Traditional Festive Ensemble",
    category: "Festive Wear",
    price: 3999,
    discountPrice: 3199,
    fabric: "Silk Blend",
    sizes: ["M", "L", "XL"],
    colors: ["Red", "Maroon", "Gold"],
    image: "https://images.unsplash.com/photo-1756304598536-560096376e49?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmFkaXRpb25hbCUyMGZlc3RpdmUlMjB3ZWFyJTIwaW5kaWF8ZW58MXx8fHwxNzczODk3Mjk0fDA&ixlib=rb-4.1.0&q=80&w=1080",
    isFeatured: true,
    isNewArrival: false
  },
  {
    id: "P004",
    name: "Elegant Brown Editorial Set",
    category: "New Arrivals",
    price: 2899,
    discountPrice: 2319,
    fabric: "Premium Cotton",
    sizes: ["S", "M", "L"],
    colors: ["Brown", "Tan"],
    image: "https://images.unsplash.com/photo-1675240963946-c105ddcab6a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwbW9kZWwlMjBlZGl0b3JpYWwlMjBicm93bnxlbnwxfHx8fDE3NzM4OTcyOTV8MA&ixlib=rb-4.1.0&q=80&w=1080",
    isFeatured: true,
    isNewArrival: true
  },
  {
    id: "P005",
    name: "Embroidered Detail Kurta",
    category: "Festive Wear",
    price: 2199,
    discountPrice: 1759,
    fabric: "Chanderi",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Cream", "Ivory"],
    image: "https://images.unsplash.com/photo-1771654104349-f6ec79a48205?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxldGhuaWMlMjBmYXNoaW9uJTIwb3V0Zml0JTIwZGV0YWlsc3xlbnwxfHx8fDE3NzM4OTcyOTN8MA&ixlib=rb-4.1.0&q=80&w=1080",
    isFeatured: false,
    isNewArrival: true
  },
  {
    id: "P006",
    name: "Luxury Embroidered Collection",
    category: "Collections",
    price: 4499,
    discountPrice: 3599,
    fabric: "Pure Silk",
    sizes: ["M", "L"],
    colors: ["Gold", "Royal Blue"],
    image: "https://images.unsplash.com/photo-1761724794734-4ee4148a621b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBlbWJyb2lkZXJ5JTIwZmFicmljJTIwZGV0YWlsfGVufDF8fHx8MTc3Mzg5NzI5NXww&ixlib=rb-4.1.0&q=80&w=1080",
    isFeatured: true,
    isNewArrival: false
  }
];

export interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
  initial: string;
}

export const reviews: Review[] = [
  {
    id: "R001",
    name: "Priya Sharma",
    rating: 5,
    comment: "Absolutely stunning! The fabric quality is premium and the embroidery work is exquisite. Perfect for festive occasions.",
    initial: "P"
  },
  {
    id: "R002",
    name: "Ananya Patel",
    rating: 5,
    comment: "Loved the fit and the attention to detail. The colors are vibrant and true to the pictures. Highly recommended!",
    initial: "A"
  },
  {
    id: "R003",
    name: "Meera Reddy",
    rating: 4,
    comment: "Beautiful collection! The delivery was fast and packaging was elegant. Will definitely shop again.",
    initial: "M"
  },
  {
    id: "R004",
    name: "Kavya Iyer",
    rating: 5,
    comment: "The summer collection is so comfortable and stylish. Perfect blend of traditional and modern aesthetics.",
    initial: "K"
  },
  {
    id: "R005",
    name: "Riya Desai",
    rating: 5,
    comment: "Outstanding quality and craftsmanship! Every piece feels luxurious. Customer service was excellent too.",
    initial: "R"
  }
];
