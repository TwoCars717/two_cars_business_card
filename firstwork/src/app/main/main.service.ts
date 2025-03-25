import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MainService {
  constructor(private httpClient: HttpClient) {
  }

  submitTicketToCrm(name: string, phoneNumber: string): Observable<any> {
    const url = '/.netlify/functions/submit-ticket';

    const requestBody = {
      form: environment.crmApikey,
      fName: name,
      phone: phoneNumber,
      prodex24source: "Веб-сайт TWOCARS",
      getResultData: 1,
    };
    return this.httpClient.post(url, requestBody);

  }

  submitCarTicketToCrm(
    name: string,
    phone: string,
    bodyType: string,
    priceMin: number,
    priceMax: number,
    yearMin: number,
    yearMax: number
  ): Observable<any> {
    const url = '/.netlify/functions/submit-ticket';

    // Формуємо коментар із додатковими полями
    const comment = `
    Тип кузова: ${bodyType || 'Не вказано'}
    Діапазон ціни: ${priceMin || 'Не вказано'}$ - ${priceMax || 'Не вказано'}$
    Рік випуску: ${yearMin || 'Не вказано'} - ${yearMax || 'Не вказано'}
  `.trim();

    const requestBody = {
      form: environment.crmApikey,
      fName: name,
      phone: phone,
      prodex24source: "Веб-сайт TWOCARS",
      getResultData: 1,
      comment: comment, // Додаємо всі додаткові дані у коментар
    };

    return this.httpClient.post(url, requestBody);
  }

  assignTicketToAdminUser(ticketId: number): Observable<any> {
    const url = '/.netlify/functions/update-ticket';
    const salesDriveAdminManagerId = 2;

    const requestBody = {
      form: environment.crmApikey,
      id: ticketId,
      data: {
        salesdrive_manager: salesDriveAdminManagerId
      }
    };

    return this.httpClient.post(url, requestBody);
  }
}
