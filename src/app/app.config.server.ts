import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { appConfig } from './app.config';
import {MessageService} from "primeng/api";
import {HospitalService} from "./service/hospital.service";
import {HttpClient} from "@angular/common/http";

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(),
    MessageService, HospitalService, HttpClient
  ]
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
