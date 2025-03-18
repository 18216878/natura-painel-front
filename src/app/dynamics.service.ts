import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { PainelService } from '../../src/app/painel.service';

@Injectable({
  providedIn: 'root'
})

export class DynamicsService {

  DYNAMICS_ORDER_URL = 'https://natura.crm2.dynamics.com/api/data/v9.0/incidents?fetchXml=<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="false"><entity name="incident"><attribute name="incidentid" /><attribute name="ticketnumber" /><attribute name="title" /><attribute name="statuscode" /><attribute name="createdon" /><attribute name="nat_primarycategory" /><attribute name="nat_secondcategory" /><attribute name="nat_reason" /><attribute name="nat_solution" /><attribute name="nat_solutionsecondlevel" /><attribute name="ownerid" /><attribute name="nat_naturacode" /><attribute name="customerid" /><attribute name="nat_naturaorder" /><attribute name="ownerid" /><attribute name="caseorigincode" /><attribute name="nat_title" /><attribute name="description" /><order attribute="title" descending="false" /><filter type="and"><condition attribute="statecode" operator="not-null" /><condition attribute="nat_naturaordername" operator="like" value="9495387536%" /></filter></entity></fetch>';

  SERVER_URL = 'https://10.171.2.240:44366';

  constructor(
    private httpClient: HttpClient,
    private painelService: PainelService
    ) {
    this.storage = window.localStorage;

  }

  public storage: Storage;
  public arquivo: string;
  public token: string;

  public tokenGenerate() {
    this.painelService.getDynamicsToken().subscribe(
      data => {
        this.storage.setItem("AuthToken", data[0].auth_token);
      }
    );
  }

  public getDynamicsCode(contactid: string) {
    var token = this.storage.getItem("AuthToken");
    var url = `https://natura.crm2.dynamics.com/api/data/v9.0/incidents?fetchXml=<fetch version=\"1.0\" output-format=\"xml-platform\" mapping=\"logical\" distinct=\"false\"><entity name=\"incident\"><attribute name=\"incidentid\" /><attribute name=\"ticketnumber\" /><attribute name=\"title\" /><attribute name=\"statuscode\" /><attribute name=\"createdon\" /><attribute name=\"nat_primarycategory\" /><attribute name=\"nat_secondcategory\" /><attribute name=\"nat_reason\" /><attribute name=\"nat_solution\" /><attribute name=\"nat_solutionsecondlevel\" /><attribute name=\"ownerid\" /><attribute name=\"nat_naturacode\" /><attribute name=\"customerid\" /><attribute name=\"nat_naturaorder\" /><attribute name=\"ownerid\" /><attribute name=\"caseorigincode\" /><attribute name=\"nat_title\" /><attribute name=\"description\" /><order attribute=\"createdon\" descending=\"true\" /><filter type=\"and\"><condition attribute=\"statecode\" operator=\"not-null\" /></filter><link-entity name=\"contact\" from=\"contactid\" to=\"customerid\" link-type=\"inner\" alias=\"ae\"><filter type=\"and\"><condition attribute="contactid" operator="eq" value="${contactid}" /></filter></link-entity></entity></fetch>`;
          const httpOptions = {
            headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'OData-MaxVersion': '4.0',
            'OData-Version': '4.0',
            'Prefer': 'odata.include-annotations="OData.Community.Display.V1.FormattedValue"',
            'Authorization': `Bearer ${token}`
          })
      };

      return this.httpClient.get(url, httpOptions);

  }

  public getContactCode(code: string){
    var token = this.storage.getItem("AuthToken");
    var url = `https://natura.api.crm2.dynamics.com/api/data/v9.2/contacts?$select=nat_naturacode,fullname&$filter=nat_naturacode eq '${code}'`;
          const httpOptions = {
            headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'OData-MaxVersion': '4.0',
            'OData-Version': '4.0',
            'Prefer': 'odata.include-annotations="OData.Community.Display.V1.FormattedValue"',
            'Authorization': `Bearer ${token}`
          })
      };

      return this.httpClient.get(url, httpOptions);
  }

  public getDynamicsOrder(order: string) {
    var token = this.storage.getItem("AuthToken");
    var url = `https://natura.crm2.dynamics.com/api/data/v9.0/incidents?fetchXml=<fetch version=\"1.0\" output-format=\"xml-platform\" mapping=\"logical\" distinct=\"false\"><entity name=\"incident\"><attribute name=\"incidentid\" /><attribute name=\"ticketnumber\" /><attribute name=\"title\" /><attribute name=\"statuscode\" /><attribute name=\"createdon\" /><attribute name=\"nat_primarycategory\" /><attribute name=\"nat_secondcategory\" /><attribute name=\"nat_reason\" /><attribute name=\"nat_solution\" /><attribute name=\"nat_solutionsecondlevel\" /><attribute name=\"ownerid\" /><attribute name=\"nat_naturacode\" /><attribute name=\"customerid\" /><attribute name=\"nat_naturaorder\" /><attribute name=\"ownerid\" /><attribute name=\"caseorigincode\" /><attribute name=\"nat_title\" /><attribute name=\"description\" /><order attribute=\"createdon\" descending=\"true\" /><filter type=\"and\"><condition attribute=\"statecode\" operator=\"not-null\" /><condition attribute=\"nat_naturaordername\" operator=\"like\" value=\"${order}%\" /></filter></entity></fetch>`;

    const httpOptions = {

      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'OData-MaxVersion': '4.0',
        'OData-Version': '4.0',
        'Prefer': 'odata.include-annotations="OData.Community.Display.V1.FormattedValue"',
        'Authorization': `Bearer ${token}`
      })
    };

    return this.httpClient.get(url, httpOptions);



  }




  public getDynamicsDocument(contactid: string) {
    var token = this.storage.getItem("AuthToken");
    var url = `https://natura.crm2.dynamics.com/api/data/v9.0/incidents?fetchXml=<fetch version=\"1.0\" output-format=\"xml-platform\" mapping=\"logical\" distinct=\"false\"><entity name=\"incident\"><attribute name=\"incidentid\" /><attribute name=\"ticketnumber\" /><attribute name=\"title\" /><attribute name=\"statuscode\" /><attribute name=\"createdon\" /><attribute name=\"nat_primarycategory\" /><attribute name=\"nat_secondcategory\" /><attribute name=\"nat_reason\" /><attribute name=\"nat_solution\" /><attribute name=\"nat_solutionsecondlevel\" /><attribute name=\"ownerid\" /><attribute name=\"nat_naturacode\" /><attribute name=\"customerid\" /><attribute name=\"nat_naturaorder\" /><attribute name=\"ownerid\" /><attribute name=\"caseorigincode\" /><attribute name=\"nat_title\" /><attribute name=\"description\" /><order attribute=\"createdon\" descending=\"true\" /><filter type=\"and\"><condition attribute=\"statecode\" operator=\"not-null\" /><condition attribute="customerid" operator="eq" value="${contactid}" /></filter></entity></fetch>`;

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'OData-MaxVersion': '4.0',
        'OData-Version': '4.0',
        'Prefer': 'odata.include-annotations="OData.Community.Display.V1.FormattedValue"',
        'Authorization': `Bearer ${token}`
      })
    };

    return this.httpClient.get(url, httpOptions);

  }

  public getContactDocument(document: string){
    var token = this.storage.getItem("AuthToken");
    var url = `https://natura.api.crm2.dynamics.com/api/data/v9.2/contacts?$select=nat_naturacode,fullname&$filter=nat_documentnumber eq '${document}'`;
          const httpOptions = {
            headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'OData-MaxVersion': '4.0',
            'OData-Version': '4.0',
            'Prefer': 'odata.include-annotations="OData.Community.Display.V1.FormattedValue"',
            'Authorization': `Bearer ${token}`
          })
      };

      return this.httpClient.get(url, httpOptions);
  }

  public getDynamicsData(ticketNumber: string) {
    var token = this.storage.getItem("AuthToken");
    var url = `https://natura.api.crm2.dynamics.com/api/data/v9.2/tasks?fetchXml=<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="false"><entity name="task"><attribute name="statecode"/><attribute name="activityid"/><attribute name="nat_sladate"/><attribute name="createdon"/><attribute name="subject"/><attribute name="nat_solution"/><attribute name="ownerid"/><attribute name="nat_pointsavaibility"/><attribute name="nat_availablecoast"/><attribute name="nat_diagnosis"/><attribute name="description"/><order attribute="statecode" descending="false"/><filter type="and"><condition attribute="statecode" operator="eq" value="0"/></filter><link-entity name="incident" from="incidentid" to="nat_casetitle" visible="false" link-type="outer" alias="a_b3650777f846e811a83d000d3ac085f9"><attribute name="nat_repairid"/></link-entity><link-entity name="nat_bank" from="nat_bankid" to="nat_bankid" visible="false" link-type="outer" alias="a_8a1a573f96acea11a812000d3a885384"><attribute name="nat_code"/></link-entity><link-entity name="contact" from="contactid" to="nat_customer" visible="false" link-type="outer" alias="a_93650777f846e811a83d000d3ac085f9"><attribute name="nat_documentnumber"/><attribute name="address1_line3"/><attribute name="address1_line1"/><attribute name="address1_county"/><attribute name="address1_city"/><attribute name="address1_postalcode"/></link-entity><link-entity name="incident" from="incidentid" to="regardingobjectid" link-type="inner" alias="ah"><attribute name="ticketnumber"/><attribute name="nat_purchasechannelid"/><attribute name="nat_currentaccount"/><attribute name="nat_bank"/><attribute name="nat_numberagency"/><attribute name="nat_ithasbankaccount"/><attribute name="nat_claimedvalue"/><attribute name="nat_favoredname"/><attribute name="nat_clientdocument"/><attribute name="customerid"/><attribute name="caseorigincode"/><attribute name="nat_callcenter"/><attribute name="nat_incident"/><attribute name="description"/><filter type="and"><condition attribute="ticketnumber" operator="eq" value="${ticketNumber}"/></filter></link-entity></entity></fetch>`;
    const httpOptions = {
      headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'OData-MaxVersion': '4.0',
      'OData-Version': '4.0',
      'Prefer': 'odata.include-annotations="OData.Community.Display.V1.FormattedValue"',
      'Authorization': `Bearer ${token}`
      })
    };

    return this.httpClient.get(url, httpOptions);

  }

}
