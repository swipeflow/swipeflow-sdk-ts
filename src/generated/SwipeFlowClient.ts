/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseHttpRequest } from './core/BaseHttpRequest';
import type { OpenAPIConfig } from './core/OpenAPI';
import { AxiosHttpRequest } from './core/AxiosHttpRequest';
import { AnalyticsService } from './services/AnalyticsService';
import { ItemsService } from './services/ItemsService';
import { ItemVersionsService } from './services/ItemVersionsService';
import { MediaService } from './services/MediaService';
import { ProjectMembersService } from './services/ProjectMembersService';
import { ProjectsService } from './services/ProjectsService';
import { ProjectTriggersService } from './services/ProjectTriggersService';
import { ProjectWebhooksService } from './services/ProjectWebhooksService';
type HttpRequestConstructor = new (config: OpenAPIConfig) => BaseHttpRequest;
export class SwipeFlowClient {
    public readonly analytics: AnalyticsService;
    public readonly items: ItemsService;
    public readonly itemVersions: ItemVersionsService;
    public readonly media: MediaService;
    public readonly projectMembers: ProjectMembersService;
    public readonly projects: ProjectsService;
    public readonly projectTriggers: ProjectTriggersService;
    public readonly projectWebhooks: ProjectWebhooksService;
    public readonly request: BaseHttpRequest;
    constructor(config?: Partial<OpenAPIConfig>, HttpRequest: HttpRequestConstructor = AxiosHttpRequest) {
        this.request = new HttpRequest({
            BASE: config?.BASE ?? 'https://api.swipeflow.io',
            VERSION: config?.VERSION ?? '1',
            WITH_CREDENTIALS: config?.WITH_CREDENTIALS ?? false,
            CREDENTIALS: config?.CREDENTIALS ?? 'include',
            TOKEN: config?.TOKEN,
            USERNAME: config?.USERNAME,
            PASSWORD: config?.PASSWORD,
            HEADERS: config?.HEADERS,
            ENCODE_PATH: config?.ENCODE_PATH,
        });
        this.analytics = new AnalyticsService(this.request);
        this.items = new ItemsService(this.request);
        this.itemVersions = new ItemVersionsService(this.request);
        this.media = new MediaService(this.request);
        this.projectMembers = new ProjectMembersService(this.request);
        this.projects = new ProjectsService(this.request);
        this.projectTriggers = new ProjectTriggersService(this.request);
        this.projectWebhooks = new ProjectWebhooksService(this.request);
    }
}

