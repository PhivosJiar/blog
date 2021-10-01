import * as Parse from 'parse';
import { environment } from 'src/environments/environment';

export function initParse():void{
 Parse.initialize(environment.parse.appId);
 (Parse as any).serverURL = environment.parse.serverURL;
}

