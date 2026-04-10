import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Report } from './report.entity';
import { Repository } from 'typeorm';
import { CreateReportDto } from './dtos/create-report.dto';
import { User } from 'src/users/user.entity';
import { ApprovedReportDto } from './dtos/Approved-Report.dto';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Report)
    private reportRepository: Repository<Report>,
  ) {}

  create(createReportDto: CreateReportDto, user: User) {
    const report = this.reportRepository.create(createReportDto);
    report.user = user;
    return this.reportRepository.save(report);
  }

  async changeApproval(id: number, approvedReportDto: ApprovedReportDto) {
    const report = await this.reportRepository.findOne({ where: { id } });

    if (!report) throw new NotFoundException('Report not found');

    report.approved = approvedReportDto.approved;

    return this.reportRepository.save(report);
  }
}
