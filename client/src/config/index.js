export const registerFormControl=[
    {
        name:"userName",
        label:"User Name",
        type:"text",
        componentType:"input",
        placeholder:"Enter your userName",
        
    },
    {
        name:"email",
        label:"Email",
        type:"email",
        componentType:"input",
        placeholder:"Enter your email",
        
    },
    {
        name:"password",
        label:"Password",
        type:"password",
        componentType:"input",
        placeholder:"Enter your password",
        
    },
]
export const loginFormControl=[
    {
        name:"email",
        label:"Email",
        type:"email",
        componentType:"input",
        placeholder:"Enter your email",
        
    },
    {
        name:"password",
        label:"Password",
        type:"password",
        componentType:"input",
        placeholder:"Enter your password",
        
    },
]
export const addProductFormElements = [
  {
    name: "title",
    label: "Product Title",
    type: "text",
    componentType: "input",
    placeholder: "Enter product title",
  },
  {
    name: "description",
    label: "Description",
    componentType: "textarea",
    placeholder: "Enter product description",
  },
  {
    name: "category",
    label: "Category",
    componentType: "select",
    options: [
      { id: "men", label: "Men" },
      { id: "women", label: "Women" },
      { id: "kids", label: "Kids" },
      { id: "electronics", label: "Electronics" },
    ],
  },
  {
    name: "brand",
    label: "Brand",
    type: "text",
    componentType: "input",
    placeholder: "Enter brand name",
  },
  {
    name: "price",
    label: "Price",
    type: "number",
    componentType: "input",
    placeholder: "Enter product price",
  },
  {
    name: "salePrice",
    label: "Sale Price",
    type: "number",
    componentType: "input",
    placeholder: "Enter sale price",
  },
  {
    name: "totalStock",
    label: "Total Stock",
    type: "number",
    componentType: "input",
    placeholder: "Enter stock quantity",
  },
];