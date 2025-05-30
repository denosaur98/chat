import { Injectable } from '@nestjs/common';

@Injectable()
export class FilesService {
  findAll() {
    return {
      "mediaPlans": [
        {
          "id": 1,
          "title": "Companyname 11/23",
          "status": "prepare"
        },
        {
          "id": 2,
          "title": "Companyname 10/23",
          "status": "ready"
        },
        {
          "id": 3,
          "title": "Companyname 9/23",
          "status": "ready"
        },
        {
          "id": 4,
          "title": "Companyname 8/23",
          "status": "ready"
        },
        {
          "id": 5,
          "title": "Companyname 11/23",
          "status": "ready"
        }
      ],
      "reports": [
        {
          "id": 1,
          "title": "Companyname 11/23",
          "status": "prepare"
        },
        {
          "id": 2,
          "title": "Companyname 10/23",
          "status": "ready"
        },
        {
          "id": 3,
          "title": "Companyname 9/23",
          "status": "ready"
        },
        {
          "id": 4,
          "title": "Companyname 8/23",
          "status": "ready"
        },
        {
          "id": 5,
          "title": "Companyname 11/23",
          "status": "prepare"
        }
      ]
    };
  }
}
