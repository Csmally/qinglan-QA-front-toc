interface ResDataType<T> {
    success: boolean;
    code: number;
    data: T;
    message: string;
  }
  
  declare module "*.jpg" {
    const value: string;
    export default value;
  }
  
  declare module "*.png" {
    const value: string;
    export default value;
  }
  
  declare module "*.jpeg" {
    const value: string;
    export default value;
  }
  
  declare module "*.module.css" {
    const classes: { [key: string]: string };
    export default classes;
  }
  
  