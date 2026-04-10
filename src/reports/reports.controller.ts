import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CreateReportDto } from './dtos/create-report.dto';
import { ReportsService } from './reports.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { CurrentUser } from 'src/users/decorators/current-user.decorator';
import { User } from 'src/users/user.entity';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { ReportDto } from './dtos/report.dto';
import { ApprovedReportDto } from './dtos/Approved-Report.dto';
import { AdminGuard } from 'src/guards/admin.guard';
import { GetEstimateDto } from './dtos/get-estimate.dto';

@Controller('reports')
export class ReportsController {
  constructor(private reportService: ReportsService) {}

  @Post()
  @Serialize(ReportDto)
  @UseGuards(AuthGuard)
  createReport(
    @Body() createReportDto: CreateReportDto,
    @CurrentUser() user: User,
  ) {
    return this.reportService.create(createReportDto, user);
  }

  @Patch('/:id')
  @UseGuards(AdminGuard)
  approvedReport(
    @Param('id') id: string,
    @Body() approvedReportDto: ApprovedReportDto,
  ) {
    return this.reportService.changeApproval(parseInt(id), approvedReportDto);
  }

  @Get()
  getEstimate(@Query() getEstimateDto: GetEstimateDto) {
    return getEstimateDto;
  }
}
