import BaseClient from "./BaseClient";

import {
    Callback,
    ClientOptions,
    DefaultResponse,
    FilteringParameters,
} from "./models/index";

import {
    Bounce,
    BounceActivationResponse,

    BounceCounts,
    BounceDump,
    BounceFilteringParameters,
    Bounces,
    BrowserUsageCounts,

    ClickCounts,
    ClickLocationCounts,
    ClickPlatformUsageCounts,
    CreateInboundRuleRequest,
    CreateMessageStreamRequest,
    CreateSuppressionsRequest,
    CreateTemplateRequest,

    CreateWebhookRequest,
    DeleteSuppressionsRequest,

    DeliveryStatistics,
    EmailClientUsageCounts,
    EmailPlaformUsageCounts,
    EmailReadTimesCounts,
    InboundMessageDetails,
    InboundMessages,
    InboundMessagesFilteringParameters,
    InboundRule,

    InboundRules,
    Message,
    MessageSendingResponse,

    MessageStream,
    MessageStreamArchiveResponse,
    MessageStreams,
    MessageStreamsFilteringParameters,
    MessageStreamUnarchiveResponse,
    OpenCounts,
    OutboundMessageClicks,
    OutboundMessageClicksFilteringParameters,
    OutboundMessageDetails,
    OutboundMessageDump,
    OutboundMessageOpens,

    OutboundMessageOpensFilteringParameters,
    OutboundMessages,
    OutboundMessagesFilteringParameters,
    OutboundStatistics,
    SentCounts,
    Server,

    SpamCounts,
    StatisticsFilteringParameters,

    Suppressions,
    SuppressionStatuses,
    Template,
    TemplatedMessage,
    TemplateFilteringParameters,

    Templates,
    TemplateValidation,
    TemplateValidationOptions,
    TrackedEmailCounts,

    UpdateMessageStreamRequest,
    UpdateServerRequest,
    UpdateTemplateRequest,
    UpdateWebhookRequest,
    Webhook,
    WebhookFilteringParameters,
    Webhooks,
} from "./models/index";

/**
 * Server client class that can be used to interact with an individual Postmark Server.
 */
export default class ServerClient extends BaseClient {

    /**
     * Create a client.
     *
     * @param serverToken - The token for the server that you wish to interact with.
     * @param configOptions - Options to customize the behavior of the this client.
     */
    constructor(serverToken: string, configOptions?: ClientOptions.Configuration) {
        super(serverToken, ClientOptions.AuthHeaderNames.SERVER_TOKEN, configOptions);
    }

    /** Send a single email message.
     *
     * @param email - Email message to send.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    public sendEmail(email: Message, callback?: Callback<MessageSendingResponse>): Promise<MessageSendingResponse> {
        return this.processRequestWithBody<MessageSendingResponse>(ClientOptions.HttpMethod.POST, "/email", email, callback);
    }

    /**
     * Send a batch of email messages.
     *
     * @param emails - An array of messages to send.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    public sendEmailBatch(emails: Message[], callback?: Callback<MessageSendingResponse[]>): Promise<MessageSendingResponse[]> {
        return this.processRequestWithBody(ClientOptions.HttpMethod.POST, "/email/batch", emails, callback);
    }

    /**
     * Send a message using a template.
     *
     * @param template - Message you wish to send.
     * @param callback If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    public sendEmailWithTemplate(template: TemplatedMessage, callback?: Callback<MessageSendingResponse>): Promise<MessageSendingResponse> {
        return this.processRequestWithBody(ClientOptions.HttpMethod.POST, "/email/withTemplate", template, callback);
    }

    /**
     * Send a batch of template email messages.
     *
     * @param templates - An array of templated messages you wish to send using this Client.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    public sendEmailBatchWithTemplates(templates: TemplatedMessage[],
                                       callback?: Callback<MessageSendingResponse[]>): Promise<MessageSendingResponse[]> {
        return this.processRequestWithBody(ClientOptions.HttpMethod.POST, "/email/batchWithTemplates", { Messages: templates }, callback);
    }

    /**
     * Get bounce statistic information for the associated Server.
     *
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    public getDeliveryStatistics(callback?: Callback<DeliveryStatistics>): Promise<DeliveryStatistics> {
        return this.processRequestWithoutBody(ClientOptions.HttpMethod.GET, "/deliveryStats", {}, callback);
    }

    /**
     * Get a batch of bounces.
     *
     * @param filter - Optional filtering parameters.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    public getBounces(filter: BounceFilteringParameters = new BounceFilteringParameters(), callback?: Callback<Bounces>): Promise<Bounces> {
        this.setDefaultPaginationValues(filter);
        return this.processRequestWithoutBody(ClientOptions.HttpMethod.GET, "/bounces", filter, callback);
    }

    /**
     * Get details for a specific Bounce.
     *
     * @param id - The ID of the Bounce you wish to retrieve.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    public getBounce(id: number, callback?: Callback<Bounce>): Promise<Bounce> {
        return this.processRequestWithoutBody(ClientOptions.HttpMethod.GET, `/bounces/${id}`, {}, callback);
    }

    /**
     * Get a Bounce Dump for a specific Bounce.
     *
     * @param id - The ID of the Bounce for which you wish to retrieve Bounce Dump.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    public getBounceDump(id: number, callback?: Callback<BounceDump>): Promise<BounceDump> {
        return this.processRequestWithoutBody(ClientOptions.HttpMethod.GET, `/bounces/${id}/dump`, {}, callback);
    }

    /**
     * Activate email address that was deactivated due to a Bounce.
     *
     * @param id - The ID of the Bounce for which you wish to activate the associated email.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    public activateBounce(id: number, callback?: Callback<BounceActivationResponse>): Promise<BounceActivationResponse> {
        return this.processRequestWithBody(ClientOptions.HttpMethod.PUT, `/bounces/${id}/activate`, {}, callback);
    }

    /**
     * Get the list of templates associated with this server.
     *
     * @param filter - Optional filtering options.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    public getTemplates(filter: TemplateFilteringParameters = new TemplateFilteringParameters(),
                        callback?: Callback<Templates>): Promise<Templates> {
        this.setDefaultPaginationValues(filter);
        return this.processRequestWithoutBody(ClientOptions.HttpMethod.GET, "/templates", filter, callback);
    }

    /**
     * Get the a specific template associated with this server.
     *
     * @param idOrAlias - ID or alias for the template you wish to retrieve.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    public getTemplate(idOrAlias: (number | string), callback?: Callback<Template>): Promise<Template> {
        return this.processRequestWithoutBody(ClientOptions.HttpMethod.GET, `/templates/${idOrAlias}`, {}, callback);
    }

    /**
     * Delete a template associated with this server.
     *
     * @param idOrAlias - ID or template alias you wish to delete.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    public deleteTemplate(idOrAlias: (number | string), callback?: Callback<DefaultResponse>): Promise<DefaultResponse> {
        return this.processRequestWithoutBody(ClientOptions.HttpMethod.DELETE, `/templates/${idOrAlias}`, {}, callback);
    }

    /**
     * Create a new template on the associated server.
     *
     * @param options - Configuration options to be used to create the Template.
     * @param callback If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    public createTemplate(options: CreateTemplateRequest, callback?: Callback<Template>): Promise<Template> {
        return this.processRequestWithBody(ClientOptions.HttpMethod.POST, "/templates/", options, callback);
    }

    /**
     * Update a template on the associated server.
     *
     * @param idOrAlias - Id or alias of the template you wish to update.
     * @param options - Template options you wish to update.
     * @param callback If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    public editTemplate(idOrAlias: (number | string), options: UpdateTemplateRequest, callback?: Callback<Template>): Promise<Template> {
        return this.processRequestWithBody(ClientOptions.HttpMethod.PUT, `/templates/${idOrAlias}`, options, callback);
    }

    /**
     * Validate template markup to verify that it will be parsed. Also provides a recommended template
     * model to be used when sending using the specified template content.
     *
     * @param options - The template content you wish to validate.
     * @param callback If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    public validateTemplate(options: TemplateValidationOptions, callback?: Callback<TemplateValidation>):
        Promise<TemplateValidation> {
        return this.processRequestWithBody(ClientOptions.HttpMethod.POST, "/templates/validate", options, callback);
    }

    /**
     * Get the information for the Server associated with this Client.
     *
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    public getServer(callback?: Callback<Server>): Promise<Server> {
        return this.processRequestWithoutBody(ClientOptions.HttpMethod.GET, "/server", {}, callback);
    }

    /**
     * Modify the Server associated with this Client.
     *
     * @param options - The options you wish to modify.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    public editServer(options: UpdateServerRequest, callback?: Callback<Server>): Promise<Server> {
        return this.processRequestWithBody(ClientOptions.HttpMethod.PUT, "/server", options, callback);
    }

    /**
     * Get a batch of Outbound Messages.
     *
     * @param filter - Optional filtering parameters.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    public getOutboundMessages(filter: OutboundMessagesFilteringParameters = new OutboundMessagesFilteringParameters(),
                               callback?: Callback<OutboundMessages>): Promise<OutboundMessages> {
        this.setDefaultPaginationValues(filter);
        return this.processRequestWithoutBody(ClientOptions.HttpMethod.GET, "/messages/outbound", filter, callback);
    }

    /**
     * Get details for a specific Outbound Message.
     *
     * @param messageId - The ID of the OutboundMessage you wish to retrieve.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    public getOutboundMessageDetails(messageId: string,
                                     callback?: Callback<OutboundMessageDetails>): Promise<OutboundMessageDetails> {
        return this.processRequestWithoutBody(ClientOptions.HttpMethod.GET, `/messages/outbound/${messageId}`, {}, callback);
    }

    /**
     * Get details for a specific Outbound Message.
     *
     * @param messageId - The ID of the OutboundMessage you wish to retrieve.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    public getOutboundMessageDump(messageId: string,
                                  callback?: Callback<OutboundMessageDump>): Promise<OutboundMessageDump> {
        return this.processRequestWithoutBody(ClientOptions.HttpMethod.GET, `/messages/outbound/${messageId}/dump`, {}, callback);
    }

    /**
     * Get a batch of Inbound Messages.
     *
     * @param filter - Optional filtering parameters.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    public getInboundMessages(filter: InboundMessagesFilteringParameters = new InboundMessagesFilteringParameters(),
                              callback?: Callback<InboundMessages>): Promise<InboundMessages> {
        this.setDefaultPaginationValues(filter);
        return this.processRequestWithoutBody(ClientOptions.HttpMethod.GET, "/messages/inbound", filter, callback);
    }

    /**
     * Get details for a specific Inbound Message.
     *
     * @param messageId - The ID of the Inbound Message you wish to retrieve.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    public getInboundMessageDetails(messageId: string, callback?: Callback<InboundMessageDetails>): Promise<InboundMessageDetails> {
        return this.processRequestWithoutBody(ClientOptions.HttpMethod.GET, `/messages/inbound/${messageId}/details`, {}, callback);
    }

    /**
     * Cause an Inbound Message to bypass filtering rules defined on this Client's associated Server.
     *
     * @param messageId - The ID of the Inbound Message for which you wish to bypass the filtering rules.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    public bypassBlockedInboundMessage(messageId: string, callback?: Callback<DefaultResponse>): Promise<DefaultResponse> {
        return this.processRequestWithoutBody(ClientOptions.HttpMethod.PUT, `/messages/inbound/${messageId}/bypass`, {}, callback);
    }

    /**
     * Request that Postmark retry POSTing to the Inbound Hook for the specified message.
     *
     * @param messageId - The ID of the Inbound Message for which you wish to retry the inbound hook.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    public retryInboundHookForMessage(messageId: string, callback?: Callback<DefaultResponse>): Promise<DefaultResponse> {
        return this.processRequestWithoutBody(ClientOptions.HttpMethod.PUT, `/messages/inbound/${messageId}/retry`, {}, callback);
    }

    /**
     * Get the Opens for Outbound Messages.
     *
     * @param filter - Optional filtering parameters.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    public getMessageOpens(filter: OutboundMessageOpensFilteringParameters = new OutboundMessageOpensFilteringParameters(),
                           callback?: Callback<OutboundMessageOpens>): Promise<OutboundMessageOpens> {
        this.setDefaultPaginationValues(filter);
        return this.processRequestWithoutBody(ClientOptions.HttpMethod.GET, "/messages/outbound/opens", filter, callback);
    }

    /**
     * Get details of Opens for specific Outbound Message.
     *
     * @param messageId - Message ID of the message for which you wish to retrieve Opens.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    public getMessageOpensForSingleMessage(messageId: string,
                                           filter: OutboundMessageOpensFilteringParameters = new OutboundMessageOpensFilteringParameters(50, 0),
                                           callback?: Callback<OutboundMessageOpens>): Promise<OutboundMessageOpens> {
        this.setDefaultPaginationValues(filter);
        return this.processRequestWithoutBody(ClientOptions.HttpMethod.GET, `/messages/outbound/opens/${messageId}`, filter, callback);
    }

    /**
     * Get the Clicks for Outbound Messages.
     *
     * @param filter - Optional filtering parameters.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    public getMessageClicks(filter: OutboundMessageClicksFilteringParameters = new OutboundMessageClicksFilteringParameters(),
                            callback?: Callback<OutboundMessageClicks>): Promise<OutboundMessageClicks> {
        this.setDefaultPaginationValues(filter);
        return this.processRequestWithoutBody(ClientOptions.HttpMethod.GET, "/messages/outbound/clicks", filter, callback);
    }

    /**
     * Get Click information for a single Outbound Message.
     *
     * @param messageId - The MessageID for which clicks should be retrieved.
     * @param filter - Optional filtering parameters.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    public getMessageClicksForSingleMessage(messageId: string,
                                            filter: OutboundMessageClicksFilteringParameters = new OutboundMessageClicksFilteringParameters(),
                                            callback?: Callback<OutboundMessageClicks>): Promise<OutboundMessageClicks> {
        this.setDefaultPaginationValues(filter);
        return this.processRequestWithoutBody(ClientOptions.HttpMethod.GET, `/messages/outbound/clicks/${messageId}`, filter, callback);
    }

    /**
     * Get overview statistics on Outbound Messages sent from the Server associated with this Client.
     *
     * @param filter - Optional filtering parameters.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    public getOutboundOverview(filter: StatisticsFilteringParameters = new StatisticsFilteringParameters(),
                               callback?: Callback<OutboundStatistics>): Promise<OutboundStatistics> {
        return this.processRequestWithoutBody(ClientOptions.HttpMethod.GET, "/stats/outbound", filter, callback);
    }

    /**
     * Get statistics on email sent from the Server associated with this Client.
     *
     * @param filter - Optional filtering parameters.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    public getSentCounts(filter: StatisticsFilteringParameters = new StatisticsFilteringParameters(),
                         callback?: Callback<SentCounts>): Promise<SentCounts> {
        return this.processRequestWithoutBody(ClientOptions.HttpMethod.GET, "/stats/outbound/sends", filter, callback);
    }

    /**
     * Get statistiscs on emails that bounced after being sent from the Server associated with this Client.
     *
     * @param filter - Optional filtering parameters.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    public getBounceCounts(filter: StatisticsFilteringParameters = new StatisticsFilteringParameters(),
                           callback?: Callback<BounceCounts>): Promise<BounceCounts> {
        return this.processRequestWithoutBody(ClientOptions.HttpMethod.GET, "/stats/outbound/bounces", filter, callback);
    }

    /**
     * Get SPAM complaint statistics for email sent from the Server associated with this Client.
     *
     * @param filter - Optional filtering parameters.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    public getSpamComplaintsCounts(filter: StatisticsFilteringParameters = new StatisticsFilteringParameters(),
                                   callback?: Callback<SpamCounts>): Promise<SpamCounts> {
        return this.processRequestWithoutBody(ClientOptions.HttpMethod.GET, "/stats/outbound/spam", filter, callback);
    }

    /**
     * Get email tracking statistics for messages sent from the Server associated with this Client.
     *
     * @param filter - Optional filtering parameters.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    public getTrackedEmailCounts(filter: StatisticsFilteringParameters = new StatisticsFilteringParameters(),
                                 callback?: Callback<TrackedEmailCounts>): Promise<TrackedEmailCounts> {
        return this.processRequestWithoutBody(ClientOptions.HttpMethod.GET, "/stats/outbound/tracked", filter, callback);
    }

    /**
     * Get Open statistics for messages sent from the Server associated with this Client.
     *
     * @param filter - Optional filtering parameters.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    public getEmailOpenCounts(filter: StatisticsFilteringParameters = new StatisticsFilteringParameters(),
                              callback?: Callback<OpenCounts>): Promise<OpenCounts> {
        return this.processRequestWithoutBody(ClientOptions.HttpMethod.GET, "/stats/outbound/opens", filter, callback);
    }

    /**
     * Get Email Client Platform statistics for messages sent from the Server associated with this Client.
     *
     * @param filter - Optional filtering parameters.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    public getEmailOpenPlatformUsage(filter: StatisticsFilteringParameters = new StatisticsFilteringParameters(),
                                     callback?: Callback<EmailPlaformUsageCounts>): Promise<EmailPlaformUsageCounts> {
        return this.processRequestWithoutBody(ClientOptions.HttpMethod.GET, "/stats/outbound/opens/platforms", filter, callback);
    }

    /**
     * Get statistics on which Email Clients were used to open messages sent from the Server associated with this Client.
     *
     * @param filter - Optional filtering parameters.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    public getEmailOpenClientUsage(filter: StatisticsFilteringParameters = new StatisticsFilteringParameters(),
                                   callback?: Callback<EmailClientUsageCounts>): Promise<EmailClientUsageCounts> {
        return this.processRequestWithoutBody(ClientOptions.HttpMethod.GET, "/stats/outbound/opens/emailClients", filter, callback);
    }

    /**
     * Get Read Time statistics for messages sent from the Server associated with this Client.
     * @param filter Optional filtering parameters.
     * @param callback If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    public getEmailOpenReadTimes(filter: StatisticsFilteringParameters = new StatisticsFilteringParameters(),
                                 callback?: Callback<EmailReadTimesCounts>): Promise<EmailReadTimesCounts> {
        return this.processRequestWithoutBody(ClientOptions.HttpMethod.GET, "/stats/outbound/opens/readTimes", filter, callback);
    }

    /**
     * Get total clicks statistics for tracked links for messages sent from the Server associated with this Client.
     *
     * @param filter - Optional filtering parameters.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    public getClickCounts(filter: StatisticsFilteringParameters = new StatisticsFilteringParameters(),
                          callback?: Callback<ClickCounts>): Promise<ClickCounts> {
        return this.processRequestWithoutBody(ClientOptions.HttpMethod.GET, "/stats/outbound/clicks", filter, callback);
    }

    /**
     * Get browser family statistics for tracked links for messages sent from the Server associated with this Client.
     * @param filter Optional filtering parameters.
     * @param callback If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    public getClickBrowserUsage(filter: StatisticsFilteringParameters = new StatisticsFilteringParameters(),
                                callback?: Callback<BrowserUsageCounts>): Promise<BrowserUsageCounts> {
        return this.processRequestWithoutBody(ClientOptions.HttpMethod.GET, "/stats/outbound/clicks/browserFamilies", filter, callback);
    }

    /**
     * Get browser platform statistics for tracked links for messages sent from the Server associated with this Client.
     *
     * @param filter - Optional filtering parameters.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    public getClickPlatformUsage(filter: StatisticsFilteringParameters = new StatisticsFilteringParameters(),
                                 callback?: Callback<ClickPlatformUsageCounts>): Promise<ClickPlatformUsageCounts> {
        return this.processRequestWithoutBody(ClientOptions.HttpMethod.GET, "/stats/outbound/clicks/platforms", filter, callback);
    }

    /**
     * Get click location (in HTML or Text body of the email) statistics for tracked links for messages sent
     * from the Server associated with this Client.
     *
     * @param filter - Optional filtering parameters.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    public getClickLocation(filter: StatisticsFilteringParameters = new StatisticsFilteringParameters(),
                            callback?: Callback<ClickLocationCounts>): Promise<ClickLocationCounts> {
        return this.processRequestWithoutBody(ClientOptions.HttpMethod.GET, "/stats/outbound/clicks/location", filter, callback);
    }

    /**
     * Create an Inbound Rule Trigger.
     *
     * @param options - Configuration options to be used when creating this Trigger.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    public createInboundRuleTrigger(options: CreateInboundRuleRequest, callback?: Callback<InboundRule>): Promise<InboundRule> {
        return this.processRequestWithBody(ClientOptions.HttpMethod.POST, "/triggers/inboundRules", options, callback);
    }

    /**
     * Delete an Inbound Rule Trigger.
     *
     * @param id - The ID of the Inbound Rule Trigger you wish to delete.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    public deleteInboundRuleTrigger(id: number, callback?: Callback<DefaultResponse>): Promise<DefaultResponse> {
        return this.processRequestWithoutBody(ClientOptions.HttpMethod.DELETE, `/triggers/inboundRules/${id}`, {}, callback);
    }

    /**
     * Get a list of Inbound Rule Triggers.
     *
     * @param filter - Optional filtering parameters.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    public getInboundRuleTriggers(filter: FilteringParameters = new FilteringParameters(), callback?: Callback<InboundRules>): Promise<InboundRules> {
        this.setDefaultPaginationValues(filter);
        return this.processRequestWithoutBody(ClientOptions.HttpMethod.GET, "/triggers/inboundRules", filter, callback);
    }

    /**
     * Get the list of Webhooks for specific server.
     *
     * @param filter - Optional filtering parameters
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    public getWebhooks(filter: WebhookFilteringParameters = {}, callback?: Callback<Webhooks>): Promise<Webhooks> {
        return this.processRequestWithoutBody(ClientOptions.HttpMethod.GET, "/webhooks", filter, callback);
    }

    /**
     * Get details for a specific Webhook.
     *
     * @param id - The ID of the Webhook you wish to retrieve.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    public getWebhook(id: number, callback?: Callback<Webhook>): Promise<Webhook> {
        return this.processRequestWithoutBody(ClientOptions.HttpMethod.GET, `/webhooks/${id}`, {}, callback);
    }

    /**
     * Create a Webhook on the associated server.
     *
     * @param options - Configuration options to be used when creating Webhook trigger.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    public createWebhook(options: CreateWebhookRequest, callback?: Callback<Webhook>): Promise<Webhook> {
        return this.processRequestWithBody(ClientOptions.HttpMethod.POST, "/webhooks", options, callback);
    }

    /**
     * Update Webhook on the associated server.
     *
     * @param id - Id of the webhook you wish to update.
     * @param options - Webhook options you wish to update.
     * @param callback If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    public editWebhook(id: number, options: UpdateWebhookRequest, callback?: Callback<Webhook>): Promise<Webhook> {
        return this.processRequestWithBody(ClientOptions.HttpMethod.PUT, `/webhooks/${id}`, options, callback);
    }

    /**
     * Delete an existing Webhook.
     *
     * @param id - The ID of the Webhook you wish to delete.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    public deleteWebhook(id: number, callback?: Callback<DefaultResponse>): Promise<DefaultResponse> {
        return this.processRequestWithoutBody(ClientOptions.HttpMethod.DELETE, `/webhooks/${id}`, {}, callback);
    }

    /**
     * Get the list of message streams on a server.
     *
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    public getMessageStreams(filter: MessageStreamsFilteringParameters = {}, callback?: Callback<MessageStreams>): Promise<MessageStreams> {
        return this.processRequestWithoutBody(ClientOptions.HttpMethod.GET, "/message-streams", filter, callback);
    }

    /**
     * Get details for a specific message stream on a server.
     *
     * @param id - The ID of the message stream you wish to retrieve.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    public getMessageStream(id: string, callback?: Callback<MessageStream>): Promise<MessageStream> {
        return this.processRequestWithoutBody(ClientOptions.HttpMethod.GET, `/message-streams/${id}`, {}, callback);
    }

    /**
     * Update message stream on the associated server.
     *
     * @param id - Id of the webhook you wish to update.
     * @param options - Webhook options you wish to update.
     * @param callback If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    public editMessageStream(id: string, options: UpdateMessageStreamRequest, callback?: Callback<MessageStream>): Promise<MessageStream> {
        return this.processRequestWithBody(ClientOptions.HttpMethod.PATCH, `/message-streams/${id}`, options, callback);
    }

    /**
     * Create a message stream on the associated server.
     *
     * @param options - Configuration options to be used when creating message stream on the server.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    public createMessageStream(options: CreateMessageStreamRequest, callback?: Callback<MessageStream>): Promise<MessageStream> {
        return this.processRequestWithBody(ClientOptions.HttpMethod.POST, "/message-streams", options, callback);
    }

    /**
     * Archive a message stream on the associated server.
     *
     * @param options - Configuration options to be used when creating message stream on the server.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    public archiveMessageStream(id: string , callback?: Callback<MessageStreamArchiveResponse>): Promise<MessageStreamArchiveResponse> {
        return this.processRequestWithBody(ClientOptions.HttpMethod.POST, `/message-streams/${id}/archive`, {}, callback);
    }

    /**
     * Unarchive a message stream on the associated server.
     *
     * @param options - Configuration options to be used when creating message stream on the server.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    public unarchiveMessageStream(id: string , callback?: Callback<MessageStreamUnarchiveResponse>): Promise<MessageStreamUnarchiveResponse> {
        return this.processRequestWithBody(ClientOptions.HttpMethod.POST, `/message-streams/${id}/unarchive`, {}, callback);
    }

    /**
     * Get the list of suppressions for a message stream on a server.
     *
     * @param messageStream - Select message stream
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    public getSuppressions(messageStream: string, callback?: Callback<Suppressions>): Promise<Suppressions> {
        return this.processRequestWithoutBody(ClientOptions.HttpMethod.GET, `/message-streams/${messageStream}/suppressions/dump`, callback);
    }

    /**
     * Add email addresses to a suppressions list on a message stream on a server.
     *
     * @param messageStream - Select message stream
     * @param options - Suppressions you wish to add.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    public createSuppressions(messageStream: string, options: CreateSuppressionsRequest,
                              callback?: Callback<SuppressionStatuses>): Promise<SuppressionStatuses> {
        return this.processRequestWithBody(ClientOptions.HttpMethod.POST, `/message-streams/${messageStream}/suppressions`, options, callback);
    }

    /**
     * Delete email addresses from a suppressions list on a message stream on a server.
     *
     * @param messageStream - Select message stream
     * @param options - Suppressions you wish to delete.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    public deleteSuppressions(messageStream: string, options: DeleteSuppressionsRequest,
                              callback?: Callback<SuppressionStatuses>): Promise<SuppressionStatuses> {
        return this.processRequestWithBody(ClientOptions.HttpMethod.POST, `/message-streams/${messageStream}/suppressions/delete`, options, callback);
    }
}
