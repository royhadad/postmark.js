import ServerClient from './client/ServerClient';
import AccountClient from './client/AccountClient';

import * as Models from './client/models';
import * as Errors from './client/models/client/Errors'

// Essential types are exposed directly
// to make working with common requests simpler.
import {Message} from "./client/models";
import {TemplatedMessage} from "./client/models";
import {Attachment} from "./client/models";
import {Header} from "./client/models";

export {ServerClient, AccountClient, Models, Errors};
export {Message, TemplatedMessage, Attachment, Header}

// Client aliases are provided for backward compatibility with version 1.x
export {ServerClient as Client, AccountClient as AdminClient}