import {
  BadRequestException,
  Inject,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { GetDailySentense } from './get-daily-sentense.interface';
import { timeout, map, catchError, throwError, firstValueFrom } from 'rxjs';

@Injectable()
export class Metaphorpsum implements GetDailySentense {
  constructor(
    @Inject(HttpService)
    private httpService: HttpService,
  ) {}
  async getSetense(): Promise<string> {
    const res$ = this.httpService
      .get('http://metaphorpsum.com/sentences/3')
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
