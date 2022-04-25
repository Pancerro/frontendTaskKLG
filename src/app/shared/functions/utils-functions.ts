export class UtilsFunctions {

  public static isUndefined(value: any): boolean {
    return typeof value === 'undefined';
  }

  static isObject(value: any): boolean {
    return value && typeof value === 'object' && value.constructor === Object;
  }


}
