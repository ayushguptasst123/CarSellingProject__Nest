import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Report } from './report.entity';
import { Repository } from 'typeorm';
import { CreateReportDto } from './dtos/create-report.dto';
import { User } from 'src/users/user.entity';
import { ApprovedReportDto } from './dtos/Approved-Report.dto';
import { GetEstimateDto } from './dtos/get-estimate.dto';

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

  createEstimate(estimatedDto: GetEstimateDto) {
    console.log(estimatedDto);

    return this.reportRepository
      .createQueryBuilder()
      .select('AVG(price)', 'price')
      .where('make = :make', { make: estimatedDto.make })
      .andWhere('model = :model', { model: estimatedDto.model })
      .andWhere('lng - :lng BETWEEN -5 AND 5', { lng: estimatedDto.lng })
      .andWhere('lat - :lat BETWEEN -5 AND 5', { lat: estimatedDto.lat })
      .andWhere('year - :year BETWEEN -3 and 3', { year: estimatedDto.year })
      .orderBy('ABS(mileage - :mileage)', 'DESC')
      .setParameters({ mileage: estimatedDto.mileage })
      .limit(3)
      .getRawOne();

    /*
      SELECT *
      FROM report
      WHERE make = :make
      AND model = :model
      AND (lng - :lng) BETWEEN -5 AND 5
      AND (lat - :lat) BETWEEN -5 AND 5
      AND (year - :year) BETWEEN -3 AND 3;
      */
  }

  showAll() {
    return this.reportRepository.createQueryBuilder().select('*').getRawMany();
  }
}
