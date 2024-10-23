import {
  BadRequestException,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { GetDailySentense } from './get-daily-sentense.interface';
import { catchError, firstValueFrom, map, throwError, timeout } from 'rxjs';

@Injectable()
export class Itsthisforthat implements GetDailySentense {
  constructor(private httpService: HttpService) {}

  async getSetense(): Promise<string> {
    const res$ = this.httpService
      .get('https://itsthisforthat.com/api.php?text')
      .pipe(
        timeout(1000), // 設置 1000ms 超時
        map((response) => response.data),
        catchError((error) => {
          // 捕捉超時或其他錯誤
          if (error.message === 'Timeout has occurred') {
            return throwError(
              () => new RequestTimeoutException('Request timed out'),
            );
          } else {
            return throwError(() => new BadRequestException('Request failed'));
          }
        }),
      );
    const result = (await firstValueFrom(res$)) as string;
    return result;
  }
}
