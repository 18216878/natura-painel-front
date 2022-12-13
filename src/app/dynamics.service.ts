import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MsalService, MsalBroadcastService, MSAL_GUARD_CONFIG, MsalGuardConfiguration } from '@azure/msal-angular';
import { AuthenticationResult, InteractionStatus, PopupRequest, RedirectRequest, EventMessage, EventType, InteractionType, AccountInfo, SsoSilentRequest } from '@azure/msal-browser';
import { IdTokenClaims, PromptValue } from '@azure/msal-common'
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { readFile } from 'fs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'OData-MaxVersion': '4.0',
    'OData-Version': '4.0',
    'Prefer': 'odata.include-annotations="OData.Community.Display.V1.FormattedValue"',
    Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IjJaUXBKM1VwYmpBWVhZR2FYRUpsOGxWMFRPSSIsImtpZCI6IjJaUXBKM1VwYmpBWVhZR2FYRUpsOGxWMFRPSSJ9.eyJhdWQiOiJodHRwczovL25hdHVyYS5hcGkuY3JtMi5keW5hbWljcy5jb20iLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC9iOTIwMzU0MC1iZmIxLTQ3YTItOWUyYi1kNzNlYzBkZWJmNDkvIiwiaWF0IjoxNjcwODYxNDIzLCJuYmYiOjE2NzA4NjE0MjMsImV4cCI6MTY3MDg2NjUzOSwiYWNyIjoiMSIsImFpbyI6IkUyWmdZQ2g1VU5Na211c2dzSEwvMXVBZDZlWU1GbTh0NzdUSXFHMmJ0VFZMM0ozdlpWdWt1TVlDdTRzbGZBdXRReFQ4V3VYOEFBPT0iLCJhbXIiOlsicHdkIl0sImFwcGlkIjoiNTFmODE0ODktMTJlZS00YTllLWFhYWUtYTI1OTFmNDU5ODdkIiwiYXBwaWRhY3IiOiIwIiwiZmFtaWx5X25hbWUiOiJzaWx2YSIsImdpdmVuX25hbWUiOiJIdWdvIiwiaXBhZGRyIjoiMTg3LjguMzEuMTA2IiwibmFtZSI6Ikh1Z28gRG8gTmFzY2ltZW50byBTaWx2YSIsIm9pZCI6IjBlNjA0ZjJkLTMwNmItNDY2ZS05MWMzLTI2ZjdiNWM0Zjc3MiIsIm9ucHJlbV9zaWQiOiJTLTEtNS0yMS0yNDM4ODMzMDgtNDIxNDM3NzktMzU5MjkxNTE5LTE5MzE1MSIsInB1aWQiOiIxMDAzMjAwMUJBNDNFMzBDIiwicmgiOiIwLkFTVUFRRFVndWJHX29rZWVLOWMtd042X1NRY0FBQUFBQUFBQXdBQUFBQUFBQUFBbEFOby4iLCJzY3AiOiJ1c2VyX2ltcGVyc29uYXRpb24iLCJzdWIiOiIyRUd3OWNqM0J2aDJFRy1GQUdhRWMzR3FMWW8yUV9nS2hhcGtYSzByRjQ0IiwidGlkIjoiYjkyMDM1NDAtYmZiMS00N2EyLTllMmItZDczZWMwZGViZjQ5IiwidW5pcXVlX25hbWUiOiJodWdvc2lsdmEuY3N1QG5hdHVyYS5uZXQiLCJ1cG4iOiJodWdvc2lsdmEuY3N1QG5hdHVyYS5uZXQiLCJ1dGkiOiJDd0c0YW9IQVRFV1JaOGpLSjVkVEFRIiwidmVyIjoiMS4wIn0.lhu-eEH7fqWGmglGOaudmKigTrUeRmSkahddReWzd598JM7TfAKAzYhKneRh3wdbDqRjUBthJ5LJc5VVlUPr2LB8YPNbUb8I2l0tktniC2RgXYaQQtUez9CS4itk9vm7RiAd5ZexZf2WBSU46ps7N9_e8-dl6060Q1Hq-QE47BCz1DzkWDraNAHrJ-gPKjySz3aOrOqZJ_PsYSoNU8Vxmc9ifcCUo8Zyaaid80JmRibuoNFIogz_9aP2w9Mk1Vjd4O3ZXtPDszVPZdVDEhCF6MkhsU8CtAbs9cfvvAurbS4jFsqerZWnYwAmV_KpO6h5ZDD43sRly5uP7mFCLl2qxw'
  })
};



@Injectable({
  providedIn: 'root'
})

export class DynamicsService {

  
  DYNAMICS_ORDER_URL = 'https://natura.crm2.dynamics.com/api/data/v9.0/incidents?fetchXml=<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="false"><entity name="incident"><attribute name="incidentid" /><attribute name="ticketnumber" /><attribute name="title" /><attribute name="statuscode" /><attribute name="createdon" /><attribute name="nat_primarycategory" /><attribute name="nat_secondcategory" /><attribute name="nat_reason" /><attribute name="nat_solution" /><attribute name="nat_solutionsecondlevel" /><attribute name="ownerid" /><attribute name="nat_naturacode" /><attribute name="customerid" /><attribute name="nat_naturaorder" /><attribute name="ownerid" /><attribute name="caseorigincode" /><attribute name="nat_title" /><attribute name="description" /><order attribute="title" descending="false" /><filter type="and"><condition attribute="statecode" operator="not-null" /><condition attribute="nat_naturaordername" operator="like" value="9495387536%" /></filter></entity></fetch>';

  SERVER_URL = 'https://10.171.2.240:44366';

  constructor(private httpClient: HttpClient) {
    this.storage = window.localStorage;
  }

  public storage: Storage;
  public arquivo: string;
  public token: string;

  public getDynamicsCode(code: string) {

    var url = `https://natura.crm2.dynamics.com/api/data/v9.0/incidents?fetchXml=<fetch version=\"1.0\" output-format=\"xml-platform\" mapping=\"logical\" distinct=\"false\"><entity name=\"incident\"><attribute name=\"incidentid\" /><attribute name=\"ticketnumber\" /><attribute name=\"title\" /><attribute name=\"statuscode\" /><attribute name=\"createdon\" /><attribute name=\"nat_primarycategory\" /><attribute name=\"nat_secondcategory\" /><attribute name=\"nat_reason\" /><attribute name=\"nat_solution\" /><attribute name=\"nat_solutionsecondlevel\" /><attribute name=\"ownerid\" /><attribute name=\"nat_naturacode\" /><attribute name=\"customerid\" /><attribute name=\"nat_naturaorder\" /><attribute name=\"ownerid\" /><attribute name=\"caseorigincode\" /><attribute name=\"nat_title\" /><attribute name=\"description\" /><order attribute=\"title\" descending=\"false\" /><filter type=\"and\"><condition attribute=\"statecode\" operator=\"not-null\" /></filter><link-entity name=\"contact\" from=\"contactid\" to=\"customerid\" link-type=\"inner\" alias=\"ae\"><filter type=\"and\"><condition attribute=\"nat_naturacode\" operator=\"eq\" value=\"${code}\" /></filter></link-entity></entity></fetch>`;

    fetch('../../assets/at.txt').then(
      response => response.text()).then(
        text => {
          this.storage.removeItem("AuthToken");
          this.storage.setItem("AuthToken", text);
        }
    );

    this.token = this.storage.getItem("AuthToken");
    
	const httpOptions = {
		headers: new HttpHeaders({
		  'Content-Type': 'application/json',
		  'Accept': 'application/json',
		  'OData-MaxVersion': '4.0',
		  'OData-Version': '4.0',
		  'Prefer': 'odata.include-annotations="OData.Community.Display.V1.FormattedValue"',
		  'Authorization': `Bearer ${this.token}`
		})
	  };

    
  
  
	  return this.httpClient.get(url, httpOptions);

}

  public getDynamicsOrder(order: string) {

    var url = `https://natura.crm2.dynamics.com/api/data/v9.0/incidents?fetchXml=<fetch version=\"1.0\" output-format=\"xml-platform\" mapping=\"logical\" distinct=\"false\"><entity name=\"incident\"><attribute name=\"incidentid\" /><attribute name=\"ticketnumber\" /><attribute name=\"title\" /><attribute name=\"statuscode\" /><attribute name=\"createdon\" /><attribute name=\"nat_primarycategory\" /><attribute name=\"nat_secondcategory\" /><attribute name=\"nat_reason\" /><attribute name=\"nat_solution\" /><attribute name=\"nat_solutionsecondlevel\" /><attribute name=\"ownerid\" /><attribute name=\"nat_naturacode\" /><attribute name=\"customerid\" /><attribute name=\"nat_naturaorder\" /><attribute name=\"ownerid\" /><attribute name=\"caseorigincode\" /><attribute name=\"nat_title\" /><attribute name=\"description\" /><order attribute=\"title\" descending=\"false\" /><filter type=\"and\"><condition attribute=\"statecode\" operator=\"not-null\" /><condition attribute=\"nat_naturaordername\" operator=\"like\" value=\"${order}%\" /></filter></entity></fetch>`;
    fetch('../../assets/at.txt').then(
      response => response.text()).then(
        text => {
          this.storage.removeItem("AuthToken");
          this.storage.setItem("AuthToken", text);

        }
    );
  
    this.token = this.storage.getItem("AuthToken");
    
	const httpOptions = {
		headers: new HttpHeaders({
		  'Content-Type': 'application/json',
		  'Accept': 'application/json',
		  'OData-MaxVersion': '4.0',
		  'OData-Version': '4.0',
		  'Prefer': 'odata.include-annotations="OData.Community.Display.V1.FormattedValue"',
		  'Authorization': `Bearer ${this.token}`
		})
	  };

    
  
	  return this.httpClient.get(url, httpOptions);

}

public getDynamicsDocument(document: string) {

  var url = `https://natura.crm2.dynamics.com/api/data/v9.0/incidents?fetchXml=<fetch version=\"1.0\" output-format=\"xml-platform\" mapping=\"logical\" distinct=\"false\"><entity name=\"incident\"><attribute name=\"incidentid\" /><attribute name=\"ticketnumber\" /><attribute name=\"title\" /><attribute name=\"statuscode\" /><attribute name=\"createdon\" /><attribute name=\"nat_primarycategory\" /><attribute name=\"nat_secondcategory\" /><attribute name=\"nat_reason\" /><attribute name=\"nat_solution\" /><attribute name=\"nat_solutionsecondlevel\" /><attribute name=\"ownerid\" /><attribute name=\"nat_naturacode\" /><attribute name=\"customerid\" /><attribute name=\"nat_naturaorder\" /><attribute name=\"ownerid\" /><attribute name=\"caseorigincode\" /><attribute name=\"nat_title\" /><attribute name=\"description\" /><order attribute=\"title\" descending=\"false\" /><filter type=\"and\"><condition attribute=\"statecode\" operator=\"not-null\" /><condition attribute="nat_clientdocument" operator="eq" value="${document}" /></filter></entity></fetch>`;
  fetch('../../assets/at.txt').then(
    response => response.text()).then(
      text => {
        this.storage.removeItem("AuthToken");
        this.storage.setItem("AuthToken", text);

      }
  );

  this.token = this.storage.getItem("AuthToken");
  
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'OData-MaxVersion': '4.0',
    'OData-Version': '4.0',
    'Prefer': 'odata.include-annotations="OData.Community.Display.V1.FormattedValue"',
    'Authorization': `Bearer ${this.token}`
  })
  };

  

  return this.httpClient.get(url, httpOptions);

}

}
