/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/ban-types */
import { Injectable } from '@nestjs/common';
import { StatusRepository } from 'src/infrastructure/repositories/status-respository';

let count = [];

@Injectable()
export class StatusService {
  constructor(private statusRepository: StatusRepository) {}

  checkTime(time: any) {
    return (time < 10 ? '0' : '') + time;
  }

  serverRuntime() {
    const secondsTime = process.uptime();
    const hours = Math.floor(secondsTime / (60 * 60));
    const minutes = Math.floor((secondsTime % (60 * 60)) / 60);
    const seconds = Math.floor(secondsTime % 60);
    return (
      this.checkTime(hours) +
      ':' +
      this.checkTime(minutes) +
      ':' +
      this.checkTime(seconds)
    );
  }

  countConsultQuantityLastRestart(typeConsults: number) {
    if (typeConsults === 0) {
      count.push(0);
    }
    return count.length;
  }

  async addQuery() {
    return await this.statusRepository.addConsult();
  }
}
