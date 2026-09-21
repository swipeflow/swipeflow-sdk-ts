/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class BillingService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * Current user's billing summary
     * Plan, subscription status, seats, renewal/cancel date, payment method, and the next invoice.
     * @returns any Billing summary
     * @throws ApiError
     */
    public getBilling(): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/v1/billing',
        });
    }
    /**
     * Recent invoices / transactions
     * @param limit
     * @returns any A list of invoices
     * @throws ApiError
     */
    public listBillingInvoices(
        limit: number = 12,
    ): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/v1/billing/invoices',
            query: {
                'limit': limit,
            },
        });
    }
}
