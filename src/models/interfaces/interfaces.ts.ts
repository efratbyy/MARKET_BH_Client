export interface UserInterface {
  first: string;
  last: string;
  phone: string;
  email: string;
  password: string;
  city: string;
  street: string;
  houseNumber: number;
  forgotPasswordKey?: string;
  forgotPasswordKeyCreatedTime?: Date;
  isAdmin: boolean;
}

export interface ProductInterface {
  title: string;
  brand: string;
  barcode: string;
  price: number;
  image: {
    url: string;
    alt: string;
  };
  details: {
    weightTopDisplay: number;
    weightUnitTopDisplay: string;
    weight: number;
    weightUnit: string;
    divideBy: number;
    isSugar: boolean;
    isSodium: boolean;
    isSaturatedFat: boolean;
    isGreenMark: boolean;
    isSupervised: boolean;
    ingredients: string;
    content: string;
    manufacturingCountry: string;
  };
  inventory: number;

  categoryCode: [string];
}

export interface CartProductInterface {
  title: string;
  barcode: string;
  amount: number;
  price: number;
  image: {
    url: string;
    alt: string;
  };
  brand: string;
  note: string;
}

export interface CreditCardInterface {
  cardHolderName: string;
  creditCardNumber: string;
  EXPdate: string;
  CVV: string;
  ID: string;
}

export interface PurchaseHistoryInterface {
  orderDate: Date;
  orderNumber: number;
  order: [CartProductInterface];
}

export interface SmallCategoryInterface {
  code: string;
  title: string;
}

export interface MiddleCategoryInterface {
  code: string;
  title: string;
  data: [SmallCategoryInterface];
  image: {
    url: string;
    alt: string;
  };
}
export interface BigCategoryInterface {
  code: string;
  title: string;
  data: [MiddleCategoryInterface];
  image: {
    url: string;
    alt: string;
  };
}
