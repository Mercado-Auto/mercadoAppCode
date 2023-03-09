import Product from "./Product";

export default interface Section {
  id: string;
  name: string;
  products?: Product[];
}
