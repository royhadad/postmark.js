import BaseClient from "./BaseClient";

import {
    Callback,
    ClientOptions,
    DefaultResponse,
    FilteringParameters,
} from "./models";

import {
    CreateDomainRequest,
    CreateServerRequest,
    CreateSignatureRequest,
    DomainDetails,

    Domains,
    Server,
    ServerFilteringParameters,
    Servers,
    SignatureDetails,

    Signatures,
    TemplatesPush,
    TemplatesPushRequest,
    UpdateDomainRequest,

    UpdateServerRequest,
    UpdateSignatureRequest,
} from "./models";

export default class AccountClient extends BaseClient {

    /**
     * Create a new AccountClient
     * @param accountToken The account token that should be used with requests.
     * @param configOptions Various options to customize client behavior.
     */
    constructor(accountToken: string, configOptions?: ClientOptions.Configuration) {
        super(accountToken, ClientOptions.AuthHeaderNames.ACCOUNT_TOKEN, configOptions);
    }

    /**
     * Retrieve a list of Servers.
     *
     * @param filter - An optional filter for which data is retrieved.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    public getServers(filter: ServerFilteringParameters = new ServerFilteringParameters(), callback?: Callback<Servers>): Promise<Servers> {
        this.setDefaultPaginationValues(filter);
        return this.processRequestWithoutBody(ClientOptions.HttpMethod.GET, "/servers", filter, callback);
    }

    /**
     * Retrieve a single server by ID.
     *
     * @param id - The ID of the Server for which you wish to retrieve details.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    public getServer(id: number, callback?: Callback<Server>): Promise<Server> {
        return this.processRequestWithoutBody(ClientOptions.HttpMethod.GET, `/servers/${id}`, {}, callback);
    }

    /**
     * Create a new Server.
     *
     * @param options - The options to be used to create new Server.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    public createServer(options: CreateServerRequest, callback?: Callback<Server>): Promise<Server> {
        return this.processRequestWithBody(ClientOptions.HttpMethod.POST, "/servers", options, callback);
    }

    /**
     * Modify the Server associated with this Client.
     *
     * @param id - The ID of the Server you wish to update.
     * @param options - The options to be used to create new Server.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    public editServer(id: number, options: UpdateServerRequest, callback?: Callback<Server>): Promise<Server> {
        return this.processRequestWithBody(ClientOptions.HttpMethod.PUT, `/servers/${id}`, options, callback);
    }

    /**
     * Modify the Server associated with this Client.
     *
     * @param id - The ID of the Domain you wish to delete.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    public deleteServer(id: number, callback?: Callback<DefaultResponse>): Promise<DefaultResponse> {
        return this.processRequestWithoutBody(ClientOptions.HttpMethod.DELETE, `/servers/${id}`, {}, callback);
    }

    /**
     * Retrieve a batch of Domains.
     *
     * @param filter - An optional filter for which data is retrieved.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    public getDomains(filter: FilteringParameters = new FilteringParameters(), callback?: Callback<Domains>): Promise<Domains> {
        this.setDefaultPaginationValues(filter);
        return this.processRequestWithoutBody(ClientOptions.HttpMethod.GET, "/domains", filter, callback);
    }

    /**
     * Retrieve a single Domain by ID.
     *
     * @param id - The ID of the Domain for which you wish to retrieve details.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    public getDomain(id: number, callback?: Callback<DomainDetails>): Promise<DomainDetails> {
        return this.processRequestWithoutBody(ClientOptions.HttpMethod.GET, `/domains/${id}`, {}, callback);
    }

    /**
     * Create a new Domain.
     *
     * @param options - The options to be used to create new Domain.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    public createDomain(options: CreateDomainRequest, callback?: Callback<DomainDetails>): Promise<DomainDetails> {
        return this.processRequestWithBody(ClientOptions.HttpMethod.POST, "/domains/", options, callback);
    }

    /**
     * Update a Domain.
     *
     * @param id - The ID of the Domain you wish to update.
     * @param domain - The values on the Domain you wish to update.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    public editDomain(id: number, options: UpdateDomainRequest, callback?: Callback<DomainDetails>): Promise<DomainDetails> {
        return this.processRequestWithBody(ClientOptions.HttpMethod.PUT, `/domains/${id}`, options, callback);
    }

    /**
     * Delete a Domain.
     *
     * @param id - The ID of the Domain you wish to delete.
     * @param options - The options to be used in create Domain.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    public deleteDomain(id: number, callback?: Callback<DefaultResponse>): Promise<DefaultResponse> {
        return this.processRequestWithoutBody(ClientOptions.HttpMethod.DELETE, `/domains/${id}`, {}, callback);
    }

    /**
     * Trigger Domain DKIM key verification.
     *
     * @param id - The ID of the Domain you wish to trigger DKIM verification for.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    public verifyDomainDKIM(id: number, callback?: Callback<DomainDetails>): Promise<DomainDetails> {
        return this.processRequestWithoutBody(ClientOptions.HttpMethod.PUT, `/domains/${id}/verifyDKIM`, {}, callback);
    }

    /**
     * Trigger Domain DKIM key verification.
     *
     * @param id - The ID of the Domain you wish to trigger DKIM verification for.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    public verifyDomainReturnPath(id: number, callback?: Callback<DomainDetails>): Promise<DomainDetails> {
        return this.processRequestWithoutBody(ClientOptions.HttpMethod.PUT, `/domains/${id}/verifyReturnPath`, {}, callback);
    }

    /**
     * Trigger Domain DKIM key verification.
     *
     * @param id - The ID of the Domain you wish to trigger DKIM verification for.
     * @param callback If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    public verifyDomainSPF(id: number, callback?: Callback<DomainDetails>): Promise<DomainDetails> {
        return this.processRequestWithoutBody(ClientOptions.HttpMethod.PUT, `/domains/${id}/verifySPF`, {}, callback);
    }

    /**
     * Trigger Domain DKIM key verification.
     *
     * @param id - The ID of the Domain you wish to trigger DKIM verification for.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    public rotateDomainDKIM(id: number, callback?: Callback<DomainDetails>): Promise<DomainDetails> {
        return this.processRequestWithoutBody(ClientOptions.HttpMethod.PUT, `/domains/${id}/rotateDKIM`, {}, callback);
    }

    /**
     * Retrieve a single Sender Signature by ID.
     *
     * @param id - The ID of the Sender Signature for which you wish to retrieve details.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    public getSenderSignature(id: number, callback?: Callback<SignatureDetails>): Promise<SignatureDetails> {
        return this.processRequestWithoutBody(ClientOptions.HttpMethod.GET, `/senders/${id}`, {}, callback);
    }

    /**
     * Retrieve a batch of Sender Signatures.
     *
     * @param filter - An optional filter for which data is retrieved.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    public getSenderSignatures(filter: FilteringParameters = new FilteringParameters(),
                               callback?: Callback<Signatures>): Promise<Signatures> {
        this.setDefaultPaginationValues(filter);
        return this.processRequestWithoutBody(ClientOptions.HttpMethod.GET, "/senders", filter, callback);
    }

    /**
     * Create a new Sender Signature.
     *
     * @param options - The options to be used to create new Sender Signature.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    public createSenderSignature(options: CreateSignatureRequest, callback?: Callback<SignatureDetails>): Promise<SignatureDetails> {
        return this.processRequestWithBody(ClientOptions.HttpMethod.POST, "/senders/", options, callback);
    }

    /**
     * Update a Sender Signature.
     *
     * @param id - The ID of the Sender Signature for which you wish to update.
     * @param options - The values on the Sender Signature you wish to update.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    public editSenderSignature(id: number, options: UpdateSignatureRequest,
                               callback?: Callback<SignatureDetails>): Promise<SignatureDetails> {
        return this.processRequestWithBody(ClientOptions.HttpMethod.PUT, `/senders/${id}`, options, callback);
    }

    /**
     * Delete a Domain.
     *
     * @param id - The ID of the Domain you wish to delete.
     * @param options - The options to be used in create Domain.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    public deleteSenderSignature(id: number, callback?: Callback<DefaultResponse>): Promise<DefaultResponse> {
        return this.processRequestWithoutBody(ClientOptions.HttpMethod.DELETE, `/senders/${id}`, {}, callback);
    }

    /**
     * Request a new confirmation email to be sent to the email address associated with a Sender Signature.
     *
     * @param id - The ID of the Sender Signature.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    public resendSenderSignatureConfirmation(id: number, callback?: Callback<DefaultResponse>): Promise<DefaultResponse> {
        return this.processRequestWithoutBody(ClientOptions.HttpMethod.POST, `/senders/${id}/resend`, {}, callback);
    }

    /**
     * Request that the SPF records for Sender Signature be verified.
     *
     * @param id - The ID of the Sender Signature.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    public verifySenderSignatureSPF(id: number, callback?: Callback<SignatureDetails>): Promise<SignatureDetails> {
        return this.processRequestWithoutBody(ClientOptions.HttpMethod.POST, `/senders/${id}/verifySpf`, {}, callback);
    }

    /**
     * Request that the SPF records for Sender Signature be verified.
     *
     * @param id - The ID of the Sender Signature.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    public requestNewDKIMForSenderSignature(id: number, callback?: Callback<SignatureDetails>): Promise<SignatureDetails> {
        return this.processRequestWithoutBody(ClientOptions.HttpMethod.POST, `/senders/${id}/requestNewDkim`, {}, callback);
    }

    /**
     * Request a push of templates from one server to another.
     *
     * @param options - details for pushing templates from one place to another.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    public pushTemplates(options: TemplatesPushRequest, callback?: Callback<TemplatesPush>): Promise<TemplatesPush> {
        return this.processRequestWithBody(ClientOptions.HttpMethod.PUT, "/templates/push", options, callback);
    }
}
