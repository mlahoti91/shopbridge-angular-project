import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

export interface IProduct {
  id: number;
  name: string;
  active: boolean;
  expirationDate: string;
  description: string;
  type: string;
  price: string;
  features?: string[];
}

function generateId() {
  return Math.floor(Math.random() * 1000);
}

@Injectable()
export class ProductsService {
  products: IProduct[] = [
    {
      id: generateId(),
      name: "IPhone X",
      active: false,
      description:
        "The iPhone X has arrived to scintillate our senses with a host of features, such as the Liquid Retina Display, a faster Face ID, and a powerful A12 Bionic Chip",
      expirationDate: "01/15/2019",
      price: "25,000",
      type: "mobile"
    },
    {
      id: generateId(),
      name: "IPhone XR",
      active: true,
      description:
        "The iPhone XR has arrived to scintillate our senses with a host of features",
      expirationDate: "01/14/2019",
      price: "25,000",
      type: "mobile"
    },
    {
      id: generateId(),
      name: "Samsung S9",
      active: true,
      description:
        "A revolutionary camera that adapts like the human eye, near bezel-less, edge-to-edge screen",
      expirationDate: "01/13/2019",
      price: "25,000",
      type: "mobile"
    },
    {
      id: generateId(),
      name: "Dell Inspiron 3505",
      active: false,
      description:
        "With 8 GB of RAM, 256 GB SSD, and an FHD, anti-glare display, it is an ideal laptop for work and entertainment",
      expirationDate: "01/6/2019",
      price: "25,000",
      type: "computer"
    },
    {
      id: generateId(),
      name: "APPLE iPad (8th Gen)",
      active: false,
      description:
        "It has a powerful A12 Bionic chip that helps you use the Apple Pencil and the Smart Keyboard.",
      expirationDate: "01/5/2019",
      price: "25,000",
      type: "mobile"
    },
    {
      id: generateId(),
      name: "Lenovo Ideapad",
      active: false,
      description: "Light Laptop without Optical Disk Drive",
      expirationDate: "01/5/2019",
      price: "25,000",
      type: "mobile"
    }
  ];

  products$ = new BehaviorSubject<IProduct[]>(this.products);
  productsLength$ = new BehaviorSubject(this.products.length);

  constructor() {}

  addProduct(product) {
    this.products = [
      {
        id: generateId(),
        ...product
      },
      ...this.products
    ];
    this.products$.next(this.products);
    this.productsLength$.next(this.products.length);
  }

  editProduct(id, product) {
    const index = this.products.findIndex(p => p.id === id);
    this.products = [
      ...this.products.slice(0, index),
      {
        id: id,
        ...product
      },
      ...this.products.slice(index + 1)
    ];
    this.products$.next(this.products);
    this.productsLength$.next(this.products.length);
  }

  removeProduct(product) {
    const index = this.products.indexOf(product);
    this.products = [
      ...this.products.slice(0, index),
      ...this.products.slice(index + 1)
    ];
    this.products$.next(this.products);
    this.productsLength$.next(this.products.length);
  }
}
