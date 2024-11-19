import { has, isArray, isBoolean, isEmpty, isObject, isString } from 'lodash';
import { NavRoutes } from '../../shared/enums';



export class UrlPathBuilder {
    private pathInstance = '';

    private constructor() {
        // private constructor to make this a singleton
    }

    public static build() {
        return new UrlPathBuilder();
    }

    public connection() {
        return this;
    }

    public params(paths: string[] | string | null) {
        let p = '';
        if (paths && !isEmpty(paths)) {
            if (isString(paths)) {
                p = (paths.startsWith('/') ? '' : '/') + paths;
            } else if (isArray(paths)) {
                p = '/' + paths.map((v) => v.toString()).join('/');
            }
        }

        this.pathInstance += p;
        return this;
    }

    public query(...args: object[]) {
        let p = '';
        if (args && args.length > 0) {
            const all = Object.assign({}, ...args);
            if (!isEmpty(all)) {
                const argPairs = Object.entries(all)
                    .filter(([k, v]) => v !== undefined)
                    .map(([k, v]) => {
                        return `${k}=${v}`;
                    })
                    .join('&');

                p = !isEmpty(argPairs) ? '?' + argPairs : '';
            }
        }

        this.pathInstance += p;
        return this;
    }

    public path() {
        return this.pathInstance;
    }
}

export const buildUrlFromPathAndOptionalQuery = (paths: string[], ...args: object[]): string => {
    return UrlPathBuilder.build()
        .connection()
        .params(paths)
        .query(...args)
        .path();
};

export function buildPathWithQuery(paths: any[] | string | null, ...args: object[]) {
    return UrlPathBuilder.build()
        .params(paths)
        .query(...args)
        .path();
}
