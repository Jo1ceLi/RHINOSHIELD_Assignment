import { Test, TestingModule } from '@nestjs/testing';
import { HttpService } from '@nestjs/axios';
import { of, throwError } from 'rxjs';
import { Metaphorpsum } from './Metaphorpsum.service';
import { RequestTimeoutException, BadRequestException } from '@nestjs/common';

describe('Metaphorpsum', () => {
  let service: Metaphorpsum;
  let httpService: HttpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        Metaphorpsum,
        {
          provide: HttpService,
          useValue: {
            get: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<Metaphorpsum>(Metaphorpsum);
    httpService = module.get<HttpService>(HttpService);
  });

  it('Service應該被定義', () => {
    expect(service).toBeDefined();
  });

  it('應該成功返回句子', async () => {
    const mockResponse = { data: '這是一個測試句子。' };
    jest.spyOn(httpService, 'get').mockReturnValueOnce(of(mockResponse as any));

    const result = await service.getSetense();
    expect(result).toBe('這是一個測試句子。');
  });

  it('應該在請求超時時拋出 RequestTimeoutException', async () => {
    jest
      .spyOn(httpService, 'get')
      .mockReturnValueOnce(
        throwError(() => ({ message: 'Timeout has occurred' })),
      );

    await expect(service.getSetense()).rejects.toThrow(RequestTimeoutException);
  });

  it('應該在其他錯誤時拋出 BadRequestException', async () => {
    jest
      .spyOn(httpService, 'get')
      .mockReturnValueOnce(throwError(() => new Error('Some other error')));

    await expect(service.getSetense()).rejects.toThrow(BadRequestException);
  });
});
