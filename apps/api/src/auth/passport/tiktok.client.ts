import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';

@Injectable()
export class TikTokClient {
  private readonly client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: 'https://open.tiktokapis.com',
      timeout: 10000,
    });
  }

  get http(): AxiosInstance {
    return this.client;
  }
}
