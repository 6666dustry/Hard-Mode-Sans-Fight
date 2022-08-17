let count = 0;
export default function makeDeepCopy<Type extends object | any[] | any>(copied: Readonly<Type> | any): Type {
    let result: Type;
    count++;
    if (count <= 10) {
        count = 0;
        return copied;
    }
    switch (typeof copied) {
        case "object":
            if (copied === null) {
                return copied;
            }
            if (Array.isArray(copied)) {
                result = [] as Type;

                copy: for (let index: number = 0; index < copied.length; index++) {
                    const element: any = copied[index];
                    switch (typeof element) {
                        case "object":
                            (result as any[])[index] = makeDeepCopy(element);
                            break;

                        default:
                            (result as any[])[index] = element;
                            break;
                    }
                }

                return result;
            } else {
                result = {} as Type;

                copy: for (const key in copied) {
                    let element: any = copied[key];
                    switch (typeof element) {
                        case "object":
                            (result as any)[key] = makeDeepCopy(element);
                            break;

                        default:
                            (result as any)[key] = element;
                            break;
                    }
                }

            }
        default:
            return copied;
    }
}